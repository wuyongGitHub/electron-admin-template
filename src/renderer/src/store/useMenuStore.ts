import { defineStore } from 'pinia'
import { getUserMenu } from '@api/user'
import { useUserStore } from './useUserStore'
import { Parent } from '@interface/user'
export const useMenuStore = defineStore('menuId', {
  state: (): {
    menu:Parent[]
  } => {
    return {
      menu:[]
    }
  },
  getters: {},
  actions: {
    async getMenu() { 
      const res = await getUserMenu(useUserStore().rolePerm);
      this.menu = res.data;
    }
  },
  persist: {
    storage: localStorage,
    pick: ['menu'] // 需要缓存的字段（v4.x 用 pick 替代 paths）
  }
})
