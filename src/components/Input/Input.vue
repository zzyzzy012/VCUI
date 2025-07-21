<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
     <!-- Input -->
     <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
       <div
        v-if="$slots.prepend"
        class="vk-input__prepend"
       >
        <slot name="prepend"></slot>
      </div>
      <!-- Input -->
       <div class="vk-input__wrapper">
        <!-- prefix slot -->
         <span
          v-if="$slots.prefix"
          class="vk-input__prefix"
         >
          <slot name="prefix"></slot>
        </span>
        <!-- Input -->
         <input
          class="vk-input__inner"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :placeholder="placeholder"
          :form="form"
          ref="inputRef"
          v-bind="attrs"
         />
       </div>
       <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPassword"
          class="vk-input__suffix"
          @click="keepFocus"
        >
         <slot name="suffix"></slot>
         <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="vk-input__clear"
            @click="handleClear"
            @mousedown.prevent="NOOP"
         ></Icon>
         <Icon
            icon="eye"
            v-if="showPassword && passwordVisible"
            class="vk-input__password"
            @click="togglePassword"
         ></Icon>
         <Icon
            icon="eye-slash"
            v-if="showPassword && !passwordVisible"
            class="vk-input__password"
            @click="togglePassword"
         ></Icon>
      </span>
      <!-- append slot -->
       <div
        v-if="$slots.append"
        class="vk-input__append"
       >
        <slot name="append"></slot>
      </div>
     </template>
     <!-- Textarea -->
     <template v-else>
      <textarea
        class="vk-textarea__wrapper"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :form="form"
        ref="inputRef"
        v-bind="attrs"
      ></textarea>
     </template>
  </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from './types'
import { ref, watch, computed, useAttrs, nextTick } from 'vue'
import Icon from '@/components/Icon/Icon.vue'
import type { Ref } from 'vue'

defineOptions({
  name: 'VKInput',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})
const emits = defineEmits<InputEmits>()
// 支持v-model
const innerValue = ref(props.modelValue)
// 支持事件
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleChange = () => {
  emits('change', innerValue.value)
}
watch(() => props.modelValue, (value) => {
  innerValue.value = value
})
// 按钮清空
const isFocus = ref(false)
const showClear = computed(() => {
  return props.clearable && !props.disabled && !!innerValue.value && isFocus.value
})
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
}
const handleClear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('change', '')
  emits('input', '')
}

// 密码切换
const passwordVisible = ref(false)
const showPassword = computed(() => {
  return props.showPassword && !props.disabled && !!innerValue.value
})
const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
}
// 继承
const attrs = useAttrs()
const inputRef = ref() as Ref<HTMLInputElement>
defineExpose({
  ref: inputRef,
})

const NOOP = () => {}
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
</script>

<style>

</style>
