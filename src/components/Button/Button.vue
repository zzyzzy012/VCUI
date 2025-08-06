<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- :disabled="disabled"原生button属性 -->
  <button
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    ref="_ref"
    @click="handleClick"
  >
    <Icon v-if="loading" icon="spinner" type="info" color="currentColor"></Icon>
    <Icon v-if="icon" :icon="icon" type="info" color="currentColor"></Icon>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VKButton', // 配置组件名称
  inheritAttrs: false, // 禁止组件根节点自动继承父组件属性
})

const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 将button实例暴露出去
const _ref = ref<HTMLButtonElement>()

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    return
  }
  emit('click', event)
}

defineExpose({
  ref: _ref,
})
</script>

<style scoped>
@import './style.css';
</style>
