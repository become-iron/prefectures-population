<script setup lang="ts">
import { computed, ref, unref } from "vue"
import { useMobile } from "@/utils/composables"
import { PopulationCompositionStatisticsType } from "@/services/api/resas/enums"
import { populationCompositionStatisticsTypeToKey } from "@/services/api/resas/configurations"
import YCheckbox from "@/components/YCheckbox.vue"
import type { PrefectureModel } from "@/pages/ChartPage/ChartPage.vue"

const props = defineProps<{
  prefectures: PrefectureModel[]
  statisticsType: PopulationCompositionStatisticsType
}>()
const emit = defineEmits(["togglePrefecture", "update:statisticsType"])

const statisticsTypeModel = computed({
  get() {
    return props.statisticsType
  },
  set(value) {
    emit("update:statisticsType", value)
  },
})

const statisticsTypeOptions = [
  PopulationCompositionStatisticsType.OVERALL,
  PopulationCompositionStatisticsType.YOUNG,
  PopulationCompositionStatisticsType.WORKING,
  PopulationCompositionStatisticsType.ELDERLY,
].map((value) => ({ value, label: populationCompositionStatisticsTypeToKey[value] }))

const loading = computed(() => !unref(props.prefectures).length)
const isMobile = useMobile()
const isOpened = ref(false)
</script>

<template>
  <div class="prefecture-list y-card" :class="{ 'prefecture-list_mobile': isMobile }">
    <div v-if="loading" class="prefecture-list__loading-message">読み込み中。。。</div>

    <template v-else>
      <div v-if="!isMobile || isOpened" class="list-wrapper">
        <div class="prefecture-list__list">
          <YCheckbox
            v-for="prefecture of prefectures"
            :key="prefecture.code"
            :model-value="prefecture.visible"
            :label="prefecture.name"
            @update:model-value="$emit('togglePrefecture', $event, prefecture.code)"
          />
        </div>

        <button v-if="isMobile" class="y-btn" @click="isOpened = !isOpened">確認</button>
      </div>

      <button v-if="isMobile" class="y-btn" @click="isOpened = !isOpened">都道府県を選ぶ</button>

      <div>
        <select v-model="statisticsTypeModel" class="y-select">
          <option v-for="option of statisticsTypeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.prefecture-list {
  display: flex;
  justify-content: center;

  .list-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &.prefecture-list_mobile {
    justify-content: space-around;

    .list-wrapper {
      position: fixed;
      z-index: 5;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      padding: 16px;
      background: #fafafa;
      overflow: scroll;

      button {
        margin-top: 16px;
        font-size: 24px;
      }
    }
  }

  .prefecture-list__list {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    grid-auto-rows: max-content;
  }

  .prefecture-list__loading-message {
    font-size: 20px;
  }
}
</style>
