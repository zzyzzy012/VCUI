<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="vk-tooltip"
    ref="tooltipRef"
    @mouseleave="closeDebounce"
  >
    <div class="vk-tooltip_trigger"
      ref="triggerNode"
      v-on="events"
    >
      <slot></slot>
    </div>
    <transition :name="transition">
      <div class="vk-tooltip_popper"
      ref="popperNode"
      :style="floatingStyles"
      v-if="isOpen"
      >
        <slot name="content">{{ content }}</slot>
        <!-- 添加箭头样式 -->
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { useFloating, offset, flip } from '@floating-ui/vue'
import { useClickOutside } from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'VkTooltip',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  manual: false,
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const { floatingStyles } = useFloating(triggerNode, popperNode, {
  placement: props.placement,
  middleware: [
    offset(8),
    flip(),
  ]
})
const togglePopper = () => {
  // isOpen.value = !isOpen.value
  // emits('visible-change', isOpen.value)
  if (isOpen.value) {
    // close()
    closeDebounce()
  } else {
    // open()
    openDebounce()
  }
}
watch(() => isOpen.value, (newValue) => {
  emits('visible-change', newValue)
}, {
  // 确保 DOM 更新完成后再执行这段副作用
  flush: 'post'
})

// 支持动态事件
// 声明一个对象，其键是字符串，值是处理事件的函数。
let events: Record<string, (e: Event) => void> = reactive({})
// 添加外部事件，防止鼠标移开triggerNode时，popperNode不显示
// let outerEvents: Record<string, (e: Event) => void> = reactive({})
// 实现延时显示隐藏功能
const openTimes = ref<number>(0)
const closetimes = ref<number>(0)
const open = () => {
  // setTimeout(() => {
  //   openTimes.value++
  //   isOpen.value = true
  //   emits('visible-change', true)
  // }, props.openDelay)
  openTimes.value++
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  // setTimeout(() => {
  //   closetimes.value++
  //   isOpen.value = false
  //   emits('visible-change', false)
  // }, props.closeDelay)
  closetimes.value++
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
// const openFinal = () => {
//   openDebounce().cancel()
//   openDebounce()
// }
// const closeFinal = () => {
//   closeDebounce().cancel()
//   closeDebounce()
// }
const attachEvents = () => {
  if (props.trigger === 'hover') {
    // events['mouseenter'] = open
    events['mouseenter'] = openDebounce
    // events['mouseleave'] = close
    // events['mouseleave'] = closeDebounce
    // outerEvents['mouseleave'] = close
    // outerEvents['mouseleave'] = closeDebounce
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
// 事件不一致时，可以重新执行事件
watch(() => props.trigger, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    events = {}
    // outerEvents = {}
    attachEvents()
  }
})
onMounted(() => {
  if (!props.manual) { attachEvents() }
})

// 点击外侧可以关闭popper
const tooltipRef = ref<HTMLDivElement>()
useClickOutside(tooltipRef, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) { close() }
})

// 实现手动关闭隐藏
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    // outerEvents = {}
    attachEvents()
  } else {
    attachEvents()
  }
})
defineExpose<TooltipInstance>({
  // show: open,
  // hide: close,
  show: openDebounce,
  hide: closeDebounce,
})
</script>
