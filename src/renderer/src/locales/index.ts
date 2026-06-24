import { createI18n } from 'vue-i18n'

//自己的包
import zh from './lang/zh-cn'
import en from './lang/en'

//element语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import English from 'element-plus/dist/locale/en.mjs'

const messages = {
  'zh-cn': {
    el: zhCn,
    ...zh
  },
  en: {
    el: English,
    ...en
  }
}
const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh-cn', // 初始化配置语言
  messages,
  // 关键配置：关闭运行时编译
  runtimeOnly: true,
  // 或者使用 compositionOnly
  compositionOnly: true
})

export default i18n
