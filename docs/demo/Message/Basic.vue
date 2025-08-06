<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <VkButton type="primary" @click="open"> 创建一条消息 </VkButton>
    <VkButton type="success" @click="openMultiple" style="margin-left: 10px">
      创建多个消息
    </VkButton>
  </div>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/method'

const open = () => {
  try {
    createMessage({ message: 'hello world' })
  } catch (error) {
    console.error('Error creating message:', error)
  }
}

const openMultiple = () => {
  try {
    // 创建多个不同类型的消息，间隔更长便于观察
    createMessage({ message: '这是第一条消息 - 信息类型', type: 'info' })

    setTimeout(() => {
      createMessage({ message: '这是第二条消息 - 成功类型', type: 'success' })
    }, 500)

    setTimeout(() => {
      createMessage({ message: '这是第三条消息 - 警告类型', type: 'warning' })
    }, 1000)

    setTimeout(() => {
      createMessage({ message: '这是第四条消息 - 危险类型', type: 'danger' })
    }, 1500)
  } catch (error) {
    console.error('Error creating multiple messages:', error)
  }
}
</script>
