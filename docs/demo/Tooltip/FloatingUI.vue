<template>
  <div class="basic block">
    <button ref="reference" @click="handleClick">Button</button>
    <div ref="floating" :style="floatingStyles" v-show="isShow" class="tooltip">Tooltip</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFloating, offset, flip, shift } from '@floating-ui/vue';

const reference = ref(null);
const floating = ref(null);
const {floatingStyles} = useFloating(reference, floating, {
  placement: 'right',
  middleware: [offset(5), flip(), shift()]
});
const isShow = ref(false)
const handleClick = () => {
  isShow.value = !isShow.value
}
</script>

<style scoped>
.tooltip {
  background-color: #333;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  /* position: absolute; */
  z-index: 999;
}
</style>
