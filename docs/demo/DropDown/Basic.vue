<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <DropDown :menu-options="menuOptions">
      <nav>下拉菜单</nav>
    </DropDown>
  </div>
</template>

<script setup lang="ts">
import DropDown from '@/components/DropDown/DropDown.vue'
import { ref } from 'vue'

const menuOptions = ref([
  { label: 'Option 1', key: 'dorp-down-1' },
  { label: 'Option 2', key: 'dorp-down-2', disabled: true },
  { label: 'Option 3', key: 'dorp-down-3', divided: true },
  { label: 'Option 4', key: 'dorp-down-4' },
])
</script>

