<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <Tooltip content="This is a tooltip" placement="top">
      <Button>top</Button>
    </Tooltip><br /><br />
    <Tooltip content="This is a tooltip" placement="bottom">
      <Button>bottom</Button>
    </Tooltip><br /><br />
    <Tooltip content="This is a tooltip" placement="right">
      <Button>right</Button>
    </Tooltip><br /><br />
    <Tooltip content="This is a tooltip" placement="left">
      <Button>left</Button>
    </Tooltip><br /><br />
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
</script>

<style scoped>
Tooltip {
  margin-right: 10px;
}
</style>

