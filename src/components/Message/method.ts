import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import Message from './Message.vue'
import { useZIndex } from '@/hooks/useZIndex'

let seed = 1
// 不是reactive，是因为会将每一层级包装成响应式对象，耗费性能
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  // 组件卸载
  const destory = () => {
    // 删除数组中的实例
    const index = instances.findIndex((instance) => instance.id === id)
    if (index === -1) {
      return
    }
    instances.splice(index, 1)
    // 销毁组件
    render(null, container)
  }
  // 手动销毁
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.isVisible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    // zIndex: 2000,
    zIndex: nextZIndex(),
    onDestroy: destory,
  }
  const container = document.createElement('div')
  // const vnode = h(Message, props)
  const vnode = h(Message, newProps)
  render(vnode, container)
  // 只将container的第一个子元素添加到body中，!排除null和undefined情况
  document.body.appendChild(container.firstElementChild!)

  const instance = {
    id,
    vnode,
    props: newProps,
    destroy: manualDestroy,
    vm: vnode.component!,
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  // 最后一项
  return instances.at(-1)
}
// 获取最后一项组件实例底部的偏移位置
export const getLastBottomOffset = (id: string) => {
  // return 0
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}
