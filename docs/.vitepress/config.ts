import { defineConfig } from 'vitepress'
import path from 'path'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VueElement组件',
  description: '基于Vue3开发的，仿照ElementPlus的组件库',
  // srcDir: ".",
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'), // @ => 项目根目录下的 src
        '~': path.resolve(__dirname, '../../'), // ~ => 项目根目录
      },
    },
    // 添加组件自动导入
    optimizeDeps: {
      include: ['vue', '@vueuse/core'],
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],
    outlineTitle: '本页目录',
    nav: [{ text: '首页', link: '/' }],
    // 侧边栏
    sidebar: [
      {
        text: 'Basic基础组件',
        items: [
          { text: 'Button 组件', link: '../components/button' },
          { text: 'Icon 组件', link: '../components/icon' },
        ],
      },
      {
        text: 'Data数据展示组件',
        items: [{ text: 'Collapse 组件', link: '../components/collapse' }],
      },
      {
        text: 'Feedback 反馈组件',
        items: [
          { text: 'Alert 组件', link: '../components/alert' },
          { text: 'Tooltip 组件', link: '../components/tooltip' },
          { text: 'Message 组件', link: '../components/message' },
        ],
      },
      {
        text: 'Navigation导航组件',
        items: [{ text: 'DropDown 组件', link: '../components/drop-down' }],
      },
      {
        text: 'Form表单组件',
        items: [
          { text: 'Input 组件', link: '../components/input' },
          { text: 'Switch 组件', link: '../components/switch' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
