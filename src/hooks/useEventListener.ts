import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'
export default function useEventListener (
  // 支持响应式数据
  // 一开始可能为 null 或 undefined
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (event: Event) => any,
) {
  if (isRef(target)) {
    watch(target, (newTarget, oldTarget) => {
      oldTarget?.removeEventListener(event, handler)
      newTarget?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
