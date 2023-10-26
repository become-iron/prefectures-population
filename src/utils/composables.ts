import { ref } from "vue"

export function useMobile() {
  const mobile = ref()

  function update() {
    mobile.value = window.innerWidth <= 768  // approximate "mobile" screen width
  }

  update()

  window.addEventListener("resize", update, { passive: true })

  return mobile
}
