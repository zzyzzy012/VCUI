<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="vk-collapse">
    <!-- <CollapseItem></CollapseItem> -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// import CollapseItem from './CollapseItem.vue'
import { provide, ref, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'VKCollapse',
  inheritAttrs: false,
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
// 响应式数组维护items的激活状态
const activeNames = ref<NameType[]>(props.modelValue)
// 异步更新v-model
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  },
)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode must only set one active item')
}

const handleItemClick = (name: NameType) => {
  // 如果开启手风琴模式，则只允许一个激活项
  if (props.accordion) {
    // activeNames.value = [(activeNames.value[0] = name ? '' : name)]
    // 如果当前点击项是已激活的，就收起它
    if (activeNames.value[0] === name) {
      activeNames.value = []
    } else {
      // 否则只激活当前项
      activeNames.value = [name]
    }
  } else {
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      // 如果存在，则删除
      activeNames.value.splice(index, 1)
    } else {
      // 如果不存在，则添加
      activeNames.value.push(name)
    }
  }

  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
// 通过provide提供给子组件
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>
