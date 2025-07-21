import type { Ref, InjectionKey } from 'vue'
// 有多个地方用到该属性，确定类型，方便复用
export type NameType = string | number

export type CollapseItemProps = {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseProps {
  modelValue: NameType[]
  // 手风琴效果
  accordion?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export type CollapseEmits = {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType[]): void
}
// InjectionKey 是 Vue 中 provide / inject API 的 类型安全增强工具，为 TypeScript 提供类型推导支持
// 这个 key 对应的数据是 CollapseContext 类型
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
