<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <i class="vk-icon"
    :class="{ [`vk-icon-${type}`]: type }"
    :style="color ? { 'color': color } : null"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
// 局部注册组件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types'
import { computed } from 'vue'
import { omit } from 'lodash-es'

defineOptions({
  name: 'VKIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()
// 把用于 font-awesome 的 props 过滤出来（可选）
// const filteredProps = computed(() => {
//   const { type, color, ...rest } = props
//   return rest
// })
const filteredProps = computed(() => omit(props, ['type', 'color']))
// const customStyle = computed(() => {
//   return props.color ? { 'color': props.color } : null
// })
</script>
