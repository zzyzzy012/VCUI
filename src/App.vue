<script setup lang="ts">
// import VNode from './VNode'
import VNode from '@/VNode.tsx'

import { createMessage } from '@/components/Message/method'
import Button from '@/components/Button/Button.vue'

const open = () => {
  createMessage({ message: 'hello world' })
}
</script>

<template>
  <div class="app">
    基于 Vue3开发的仿照element-plus的UI组件库
    <VNode msg="hello world " />
    <Button @click="open">打开消息提示</Button>
  </div>
</template>
