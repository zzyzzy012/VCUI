<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <!-- hover 触发 -->
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip><br /><br />
    <!-- click 触发 -->
    <Tooltip content="This is a tooltip" :trigger="'click'">
      <Button>Click me</Button>
    </Tooltip><br /><br />
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
</script>

<style scoped>

</style>
