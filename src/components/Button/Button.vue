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
  >
    <Icon v-if="loading" icon="spinner" spin></Icon>
    <Icon v-if="icon" :icon="icon"></Icon>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { buttonProps } from './types'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VKButton',  // 配置组件名称
  inheritAttrs: false,  // 禁止组件根节点自动继承父组件属性
})
// 为defineProps中的props设置默认值
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

// 将button实例暴露出去
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref,
})
</script>

<style scoped>
@import './style.css';
</style>
