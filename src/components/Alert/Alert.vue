<template>
  <div
    class="vk-alert"
    :class="[
      `vk-alert--${mode}`,
      `vk-alert-${type}`,
      { 'is-disabled': disabled }
    ]"
    v-if="isShow"
  >
    <slot>
      <span class="vk-alert__title">{{ title }}</span>
    </slot>
    <Icon class="vk-alert__close" icon="fa-solid fa-xmark" @click="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps, AlertEmits } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VKAlert',
  inheritAttrs: false,
})

withDefaults(defineProps<AlertProps>(), {
  mode: 'light',
  type: 'info',
})
const emits = defineEmits<AlertEmits>()
const isShow = ref(true)
const handleClose = () => {
  isShow.value = false
  emits('close')
}
</script>
