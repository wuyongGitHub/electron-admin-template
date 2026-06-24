import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//路由
import router from './router'

//状态管理
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)

//icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'element-plus/theme-chalk/index.css'

//国际化
import i18n from './locales'

app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
