import { describe, expect, it } from "vitest"
import { useMobile } from "@/utils/composables"

describe("useMobile", () => {
  function setWindowWidth(width: number) {
    Object.defineProperty(global, "innerWidth", { writable: true, configurable: true, value: width })
    global.dispatchEvent(new Event("resize"))
  }

  it("should work", () => {
    const isMobile = useMobile()
    expect(isMobile.value).toBe(false)

    setWindowWidth(300)
    expect(isMobile.value).toBe(true)

    setWindowWidth(1024)
    expect(isMobile.value).toBe(false)
  })
})
