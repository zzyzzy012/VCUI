import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 只有一种类型
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// 一种类型的集合
import { fas } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(fas)
const app = createApp(App)
// 定义全局组件
// app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
// console.log(App.render?.toString())

