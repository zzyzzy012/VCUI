import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
// 样式
import '@/styles/index.css'
// 图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// 扩展默认主题
import './custom.css'
// 导入组件
import Message from '../../../src/components/Message/Message.vue'
import { createMessage } from '../../../src/components/Message/method'
import Button from '../../../src/components/Button/Button.vue'

library.add(fas)
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
    app.component('VkMessage', Message)
    app.component('VkButton', Button)
    // 全局挂载 createMessage 方法
    app.config.globalProperties.$createMessage = createMessage
    // 也挂载到 window 对象上，方便在 demo 中使用
    if (typeof window !== 'undefined') {
      ;(window as any).$createMessage = createMessage
    }
  },
}
