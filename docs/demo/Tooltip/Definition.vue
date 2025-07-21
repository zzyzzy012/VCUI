<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <Tooltip>
      <Button>容器</Button>
      <template #content>
        <h3>This is a tooltip</h3>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
</script>

