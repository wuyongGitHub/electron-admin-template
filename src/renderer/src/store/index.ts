import { defineStore } from 'pinia'
// 用户
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 1000,
      token: 'xxxxxxxxxxxxxxtokenxxxxxxxxxxxxxx'
    }
  },
  getters: {},
  actions: {},
  persist: {
    storage: localStorage,
    pick: ['token'] // 需要缓存的字段（v4.x 用 pick 替代 paths）
  }
})
