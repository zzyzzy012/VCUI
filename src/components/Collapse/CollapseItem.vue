<template>
  <div
    class="vk-collapse-item"
    :class="{
      'is-disabled': disabled,
      'is-active': isActive,
    }"
  >
    <!-- class命名，同级--，下级__ -->
    <div class="vk-collapse-item__header" :id="`vk-collapse-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
      <Icon icon="fa-solid fa-angle-right" class="header-angle" :class="{ 'is-active': isActive }" ></Icon>
    </div>
    <transition name="slide" v-on="transitionEvents">
      <!-- 因为一开始有padding-bottom，所以这里包裹一层，防止内容闪烁 -->
      <div class="vk-collapse-item__wrapper" v-show="isActive">
        <div class="vk-collapse-item__content" :id="`vk-collapse-content-${name}`">
          <slot name="default"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { computed, inject } from 'vue'
import { collapseContextKey } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VKCollapseItem',
  inheritAttrs: false,
})

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)!
// 当前 Item 是否在 activeNames 中，确认是否激活
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
const handleClick = () => {
  if (props.disabled) { return }
  collapseContext?.handleItemClick(props.name)
}
// 给 Vue 的 <transition> 组件绑定生命周期钩子函数
// 一个对象，它的 key 是字符串，value 是一个函数，这个函数接收 HTMLElement 参数并无返回值
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0'
    // 内容v-show会直接显示，但是父元素添加动画会慢慢显示，通过overflow隐藏内容，避免闪烁
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>
