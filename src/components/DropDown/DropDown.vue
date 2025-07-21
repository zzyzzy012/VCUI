<template>
  <div class="vk-dropdown">
    <Tooltip
      ref="tooltipRef"
      v-bind="props"
      @visible-change="visibleChange"
    >
    <slot></slot>
    <template #content>
      <ul class="vk-dropdown__menu">
        <!-- JS数组结构管理 -->
        <template v-for="item in props.menuOptions" :key="item.key">
          <li
            class="vk-dropdown__menu-item"
            @click="itemClick(item)"
            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
          >
            <!-- 支持VNode -->
            <!-- <RenderVNode :VNode="item.label"></RenderVNode> -->
             {{ item.label }}
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DropDownProps, MenuOption, DropDownEmits, DropDownInstance } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
// import { RenderVNode } from '../common/RenderVNode'

defineOptions({
  name: 'VkDropdown',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<DropDownProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
  hideAfterClick: true,
})
const emmits = defineEmits<DropDownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (value: boolean) => {
  emmits('visible-change', value)
}
const itemClick = (item: MenuOption) => {
  if (item.disabled) { return }
  emmits('select', item)
  // 点击之后隐藏
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}
defineExpose<DropDownInstance>({
  // 防止tooltipRef未定义报错
  'show': () => tooltipRef.value?.show(),
  'hide': () => tooltipRef.value?.hide(),
})
</script>
