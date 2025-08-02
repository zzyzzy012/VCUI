<template>
  <transition :name="transitionName" @after-leave="destroyComponent" @enter="updateComponent">
    <div class="vk-message" v-show="isVisible">
      <div
        class="vk-message__content"
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
        </slot>
      </div>
      <!-- 手动关闭 -->
      <div class="vk-message__close" v-if="props.showClose">
        <!-- stop阻止冒泡 -->
        <Icon icon="xmark" type="info" color="currentColor" @click.stop="isVisible = false"></Icon>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { MessageProps } from './types'
// @ts-ignore
import Icon from '../Icon/Icon.vue'
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { getLastBottomOffset } from './method'
import './style.css'

defineOptions({
  name: 'VkMessage',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
})

const isVisible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0)

// 确保 id 存在，如果不存在则使用默认值
const messageId = computed(() => props.id || 'message_default')

// 上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(() => {
  return getLastBottomOffset(messageId.value)
})

// 这个元素的top
const topOffset = computed(() => {
  return props.offset + lastOffset.value
})

// 这个元素为下一个元素预留的 offset，也就是它最底端的 bottom 的值
const bottomOffset = computed(() => {
  return topOffset.value + height.value
})

const cssStyle = computed(() => {
  return {
    top: `${topOffset.value}px`,
    zIndex: props.zIndex || 2000,
  }
})

let timer: ReturnType<typeof setTimeout> | null = null

function startTimer() {
  if (props.duration === 0) {
    return
  }
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    isVisible.value = false
  }, props.duration)
}

// 鼠标hover不会自动关闭
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(async () => {
  // 确保组件显示
  isVisible.value = true
  startTimer()

  // 等待DOM渲染完成，拿到最新height
  await nextTick()
  if (messageRef.value) {
    height.value = messageRef.value.getBoundingClientRect().height
  }
})

// 监听 isVisible 变化，当隐藏时调用销毁
watch(isVisible, (newValue) => {
  if (!newValue) {
    // 延迟销毁，让动画完成
    setTimeout(() => {
      props.onDestroy()
    }, 300)
  }
})

function destroyComponent() {
  props.onDestroy()
}

function updateComponent() {
  if (messageRef.value) {
    height.value = messageRef.value.getBoundingClientRect().height
  }
}

// 键盘esc关闭
function handleKeydown(event: Event) {
  const keyboardEvent = event as KeyboardEvent
  if (keyboardEvent.key === 'Escape' && isVisible.value) {
    isVisible.value = false
  }
}

// 添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

defineExpose({
  bottomOffset,
  isVisible,
})
</script>
