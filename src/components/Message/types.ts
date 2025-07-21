import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  message?: string | VNode
  // 持续时间，0表示不关闭永远显示
  duration?: number
  // 关闭按钮
  showClose?: boolean
  type?: 'info' | 'warning' | 'error' |'success'
  // 组件卸载
  onDestroy: () => void
  // 组件实例的偏移位置
  offset?: number
  id: string
  zIndex: number
  // 动画效果
  transitionName?: string
}
// 忽略必须的onDestroy属性
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>
// 获取不同的实例
export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  // 手动销毁
  destroy: () => void
}
