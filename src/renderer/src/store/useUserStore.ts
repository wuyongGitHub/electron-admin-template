import { defineStore } from 'pinia'
export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      userName: '张三',
      token: '原始值'
    }
  },
  getters: {},
  actions: {},

  persist: {
    storage: localStorage,
    pick: ['token'] // 需要缓存的字段（v4.x 用 pick 替代 paths）
  }
})
