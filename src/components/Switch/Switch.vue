<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="vk-switch"
    :class="{
      [`vk-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="vk-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
      ref="input"
    />
    <div class="vk-switch__core">
      <div class="vk-switch__core-inner">
        <span v-if="activeText || inactiveText" class="vk-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="vk-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from './types'
import { ref, computed, onMounted, watch } from 'vue'

defineOptions({
  name: 'vk-switch',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})
const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
}
const input = ref<HTMLInputElement>()
onMounted(() => {
  input.value!.checked = checked.value
})
watch(checked, (value) => {
  input.value!.checked = value
})
watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value
  },
)
</script>

<style></style>
