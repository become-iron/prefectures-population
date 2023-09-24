// https://opendata.resas-portal.go.jp/docs/api/v1/index.html

import { resasClient } from "@/services/api/resas/client"
import type { AxiosResponse } from "axios"

type GetPrefecturesResult = {
  message: null | string
  result: {
    prefCode: number
    prefName: string
  }[]
}

function getPrefectures(): Promise<AxiosResponse<GetPrefecturesResult>> {
  return resasClient.get("prefectures")
}

type GetPopulationCompositionResult = {
  message: null | string
  result: {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
        rate?: number
      }[]
    }[]
  }
}

function getPopulationComposition({
  prefCode,
  cityCode,
  addArea,
}: {
  prefCode: number
  cityCode: number | "-"
  addArea?: string
}): Promise<AxiosResponse<GetPopulationCompositionResult>> {
  return resasClient.get("population/composition/perYear", {
    params: {
      prefCode,
      cityCode,
      addArea,
    },
  })
}

export const resas = {
  getPrefectures,
  getPopulationComposition,
}
