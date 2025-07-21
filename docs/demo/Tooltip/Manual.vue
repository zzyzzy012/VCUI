<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <!-- 手动 触发 -->
    <Tooltip :manual="true" ref="tooltipRef">
      <Button>容器</Button>
      <template #content>
        <h3>This is a tooltip</h3>
      </template>
    </Tooltip><br /><br />
    <Button type="primary" @click="show">手动显示tooltip</Button>
    <Button type="danger" @click="hide">手动隐藏tooltip</Button>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
import { ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/types'

const tooltipRef = ref<TooltipInstance>()
const show = () => {
  tooltipRef.value!.show()
}
const hide = () => {
  tooltipRef.value!.hide()
}
</script>

<style scoped>

</style>
