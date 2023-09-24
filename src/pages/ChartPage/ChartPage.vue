<script setup lang="ts">
import { computed, ref } from "vue"
import type { Ref } from "vue"
import { POPULATION_STATISTICS_OVERALL_KEY } from "@/services/api/resas/constants"
import { ResasService } from "@/services/api/resas/client"
import { resas } from "@/services/api/resas"
import PrefectureList from "@/pages/ChartPage/components/PrefectureList.vue"
import StatisticsChart from "@/pages/ChartPage/components/StatisticsChart.vue"
import CredentialsForm from "@/pages/ChartPage/components/CredentialsForm.vue"

const resasApiKeyEntered = ref(ResasService.hasApiKey)

export type PrefectureModel = { code: number; name: string; visible: boolean; data: number[] | null }
const prefectures: Ref<PrefectureModel[]> = ref([])
const prefectureIndex = computed(() =>
  prefectures.value.reduce<Record<number, PrefectureModel>>((acc, prefecture) => {
    acc[prefecture.code] = prefecture
    return acc
  }, {}),
)

const visiblePrefectureStatistics = computed(() =>
  Object.values(prefectures.value).reduce<{ name: string; data: number[] }[]>((acc, { name, visible, data }) => {
    visible && data && acc.push({ name, data })
    return acc
  }, []),
)

async function fetchPrefectures() {
  const result = await resas.getPrefectures()

  for (const prefecture of result.data.result) {
    const { prefCode: code, prefName: name } = prefecture
    prefectures.value.push({
      code,
      name,
      visible: false,
      data: null,
    })
  }
}

function handleEnterApiKey(apiKey: string) {
  resasApiKeyEntered.value = true
  ResasService.setApiKey(apiKey)
  fetchPrefectures()
}

async function togglePrefectureGraph(visible: boolean, prefectureCode: number) {
  const prefectureModel = prefectureIndex.value[prefectureCode]

  prefectureModel.visible = visible

  const cached = !!prefectureModel.data
  if (cached) {
    return
  }

  const result = await resas.getPopulationComposition({ prefCode: prefectureCode, cityCode: "-" })
  const prefectureData = result.data.result.data
  prefectureModel.data = prefectureData
    .find((statistics) => statistics.label === POPULATION_STATISTICS_OVERALL_KEY)!
    .data.map((yearData) => yearData.value)
}

function init() {
  if (resasApiKeyEntered.value) {
    fetchPrefectures()
  }
}
init()
</script>

<template>
  <div class="chart-page">
    <h1 class="chart-page__title">都道府県人口数</h1>

    <template v-if="resasApiKeyEntered">
      <PrefectureList :prefectures="prefectures" @toggle-prefecture="togglePrefectureGraph" />
      <StatisticsChart :prefectures="visiblePrefectureStatistics" />
    </template>

    <CredentialsForm v-else @entered="handleEnterApiKey" />
  </div>
</template>

<style lang="scss" scoped>
.chart-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .chart-page__title {
    text-align: center;
    font-size: 28px;
    margin: 0 0 16px 0;
  }

  .credentials-form {
    max-width: max-content;
  }

  .prefecture-list {
    width: 100%;
    margin-bottom: 16px;
  }

  .statistics-chart {
    width: 100%;
  }
}
</style>
