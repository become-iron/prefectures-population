<script setup lang="ts">
import { computed } from "vue"
import * as Highcharts from "highcharts"
import { Chart } from "highcharts-vue"
import {
  POPULATION_STATISTICS_END_YEAR,
  POPULATION_STATISTICS_START_YEAR,
  POPULATION_STATISTICS_STEP_YEAR,
} from "@/services/api/resas/constants"

const props = defineProps({
  prefectures: {
    type: Object,
    required: true,
  },
})

const populationValueFormat = new Intl.NumberFormat("ja-JP")
const emptyDataset = [{ name: "", data: [] }]

const baseChartOptions: Highcharts.Options = {
  title: {
    text: undefined,
  },
  chart: {
    type: "spline",
    scrollablePlotArea: {
      minWidth: 700,  // minimal size for the appropriate visualization of data
      scrollPositionX: 1, // scroll to the end
    },
  },
  xAxis: [
    {
      title: {
        text: "年度",
      },
      categories: Array(
        (POPULATION_STATISTICS_END_YEAR - POPULATION_STATISTICS_START_YEAR) / POPULATION_STATISTICS_STEP_YEAR + 1,
      )
        .fill(null)
        .map((_, i) => String(POPULATION_STATISTICS_START_YEAR + i * POPULATION_STATISTICS_STEP_YEAR)),
      crosshair: true,
      lineWidth: 0,
    },
  ],
  yAxis: {
    title: {
      text: "人口数",
    },
    labels: {
      formatter: (value) => populationValueFormat.format(value.pos),
    },
  },
  tooltip: {
    shared: true,
  },
  credits: {
    enabled: false,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 400,  // adapt the graph to the very small screens
        },
        chartOptions: {
          legend: {
            enabled: false,
          },
          yAxis: {
            labels: {
              formatter: undefined, // use the original formatter
            },
            title: {
              text: null,
            },
          },
        },
      },
    ],
  },
}

const chartOptions = computed(() => {
  const havePrefectures = !!Object.keys(props.prefectures).length
  return {
    ...baseChartOptions,
    // force to draw a graph by setting an empty dataset
    series: havePrefectures ? props.prefectures : emptyDataset,
  }
})
</script>

<template>
  <Chart class="statistics-chart y-card" :options="chartOptions" />
</template>

<style lang="scss" scoped></style>
