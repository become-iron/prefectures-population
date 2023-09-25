import { PopulationCompositionStatisticsType } from "@/services/api/resas/enums"

export const populationCompositionStatisticsTypeToKey: Record<PopulationCompositionStatisticsType, string> = {
  [PopulationCompositionStatisticsType.OVERALL]: "総人口",
  [PopulationCompositionStatisticsType.YOUNG]: "年少人口",
  [PopulationCompositionStatisticsType.WORKING]: "生産年齢人口",
  [PopulationCompositionStatisticsType.ELDERLY]: "老年人口",
}
export const populationCompositionStatisticsKeyToType: Record<string, PopulationCompositionStatisticsType> =
  Object.fromEntries(
    Object.entries(populationCompositionStatisticsTypeToKey).map(([key, value]) => [
      value,
      key as PopulationCompositionStatisticsType,
    ]),
  )
