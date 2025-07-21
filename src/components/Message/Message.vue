<template>
  <transition
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateComponent"
  >
    <div class="vk-message" v-show="isVisible">
      <div class="vk-message__content"
        :class="{
          [`vk-message--${props.type}`]: props.type,
          'is-close': props.showClose,
        }"
        role="alert"
        ref="messageRef"
        :style="cssStyle"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
      >
      <!-- 显示消息内容 message | VNode -->
        <slot>
          {{ props.message }}
          <!-- message 一开始为undefined，v-if类型收窄 -->
          <!-- <RenderVNode :VNode="props.message" v-if="props.message">{{ props.message }}</RenderVNode> -->
        </slot>
      </div>
      <!-- 手动关闭 -->
      <div class="vk-message__close" v-if="props.showClose">
        <!-- stop阻止冒泡 -->
        <Icon icon="xmark" @click.stop="isVisible = false"></Icon>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { MessageProps } from './types'
// import { RenderVNode } from '../common/RenderVNode'
import Icon from '../Icon/Icon.vue'
import { ref, onMounted, watch, computed, nextTick, getCurrentInstance } from 'vue'
// import { getLastInstance } from './method'
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'

defineOptions({
  name: 'VkMessage',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

const isVisible = ref(false)
// const prevInstance = getLastInstance()
// console.log('prev', prevInstance)
const messageRef = ref<HTMLDivElement>()
// 组件内部实例
// const instance = getCurrentInstance()
// console.log('组件内部实例',instance)
// VNode 通过 component的expose属性，可以拿到组件实例的bottomOffset（组件暴露出去的属性）
// 计算偏移高度
// 这个div的高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(() => { return getLastBottomOffset(props.id) })
// 这个元素的top
const topOffset = computed(() => { return props.offset + lastOffset.value})
// 这个元素为下一个元素预留的 offset，也就是它最底端的 bottom 的值
const bottomOffset = computed(() => { return topOffset.value + height.value })
const cssStyle = computed(() => {
  return ({top: `${topOffset.value}px`, })
})
let timer: any = null
function startTimer () {
  if (props.duration === 0) { return }
  timer = setTimeout(() => {
    isVisible.value = false
  }, props.duration)
}
// 鼠标hover不会自动关闭
function clearTimer () {
  clearTimeout(timer)
}

onMounted(async () => {
  isVisible.value = true
  startTimer()
  // // 等待DOM渲染完成，拿到最新height
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
// // 组件卸载
// watch(isVisible, (newValue) => {
//   if (!newValue) {
//     props.onDestroy()
//   }
// })
function destroyComponent () {
  props.onDestroy()
}
function updateComponent () {
  height.value = messageRef.value!.getBoundingClientRect().height
}
// 键盘esc关闭
function handleKeydown (event: KeyboardEvent) {
  if (event.key === 'Escape' && isVisible.value) {
    isVisible.value = false
  }
}
useEventListener(document, 'keydown', handleKeydown)
defineExpose({
  bottomOffset,
  isVisible,
})
</script>
