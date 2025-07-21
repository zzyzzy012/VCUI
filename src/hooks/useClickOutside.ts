import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

// 实现Tooltip组件点击外侧也能实现popper关闭的功能
export const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      // 点击外侧，不包含Tooltip组件
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
   document.removeEventListener('click', handler)
  })
}
