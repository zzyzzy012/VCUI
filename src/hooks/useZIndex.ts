import { ref, computed } from 'vue'
const zIndex = ref(0)
export const useZIndex = (initialValue = 2000) => {
  const initailZIndex = ref(initialValue)
  const currentZIndex = computed(() => { return zIndex.value + initailZIndex.value })
  const nextZIndex = () => {
    zIndex.value ++
    return currentZIndex.value
  }
  return {
    nextZIndex,
    initailZIndex,
    currentZIndex,
  }
}
