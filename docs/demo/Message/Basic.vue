<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <VkButton type="primary" @click="open"> 创建一条消息 </VkButton>
  </div>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button/Button.vue'

const open = () => {
  // 使用全局挂载的方法
  if (typeof window !== 'undefined' && (window as any).$createMessage) {
    ;(window as any).$createMessage({ message: 'hello world' })
  } else {
    // 降级方案
    alert('hello world')
  }
}
</script>
