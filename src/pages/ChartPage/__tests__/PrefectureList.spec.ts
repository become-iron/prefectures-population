import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import { PopulationCompositionStatisticsType } from "@/services/api/resas/enums"
import PrefectureList from "@/pages/ChartPage/components/PrefectureList.vue"

describe("PrefectureList", () => {
  it("renders properly", () => {
    const wrapper = mount(PrefectureList, {
      props: { prefectures: [], statisticsType: PopulationCompositionStatisticsType.OVERALL },
    })
    expect(wrapper.text()).toContain("読み込み中。。。")
  })
})
