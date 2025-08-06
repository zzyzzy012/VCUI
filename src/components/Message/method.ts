import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import Message from './Message.vue'
import { useZIndex } from '@/hooks/useZIndex'

let seed = 1
// 不是reactive，是因为会将每一层级包装成响应式对象，耗费性能
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  try {
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
      // 移除 DOM 元素
      if (container.firstElementChild && container.firstElementChild.parentNode) {
        container.firstElementChild.parentNode.removeChild(container.firstElementChild)
      }
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
      zIndex: nextZIndex(),
      onDestroy: destory,
    }

    const container = document.createElement('div')
    const vnode = h(Message, newProps)

    render(vnode, container)

    // 只将container的第一个子元素添加到body中，!排除null和undefined情况
    const firstElement = container.firstElementChild
    if (firstElement) {
      document.body.appendChild(firstElement)
    } else {
      throw new Error('Failed to create message element')
    }

    const instance = {
      id,
      vnode,
      props: newProps,
      destroy: manualDestroy,
      vm: vnode.component!,
    }
    instances.push(instance)
    return instance
  } catch (error) {
    throw error
  }
}

export const getLastInstance = () => {
  // 最后一项
  return instances.at(-1)
}

// 获取当前消息应该显示的位置
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    // 计算前面所有实例的总高度
    let totalHeight = 0
    for (let i = 0; i < idx; i++) {
      const prev = instances[i]
      if (prev && prev.vm.exposed) {
        // 获取每个消息的高度
        const messageHeight = prev.vm.exposed.height?.value || 0
        totalHeight += messageHeight
        // 添加间距
        totalHeight += 16 // 16px 间距
      }
    }
    return totalHeight
  }
}
