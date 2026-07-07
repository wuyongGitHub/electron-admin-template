import { defineStore } from 'pinia'
import { getInfo } from '@api/user'
import { Role } from '@interface/user'
export const useUserStore = defineStore('userId', {
  state: (): {
    roles: Role[]
    rolePerm: string
  } => {
    return {
       roles: [],
      rolePerm: ''
    }
  },
  getters: {},
  actions: {
    async getUserInfo() {
      const res = await getInfo()
      const { roles, units, userInfo } = res.data;
      this.roles = roles;
      this.rolePerm = roles[0].rolePerm;
    }
  },
  persist: {
    storage: localStorage,
    pick: ['rolePerm'] // 需要缓存的字段（v4.x 用 pick 替代 paths）
  }
})
