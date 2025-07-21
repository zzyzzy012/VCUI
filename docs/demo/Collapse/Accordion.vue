<template>
<div class="basic block">
  <Collapse v-model="openedValue" accordion>
    <Item name="Consistency" title="Consistency">
      <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </Item>
    <Item name="Feedback" title="Feedback">
      <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;
        Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
    </Item>
    <Item name="Efficiency" title="Efficiency">
      <div>Simplify the process: keep operating process simple and intuitive;
        Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.
      </div>
    </Item>
  </Collapse>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
const openedValue = ref(['Consistency'])
</script>