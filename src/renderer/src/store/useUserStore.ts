import { defineStore } from 'pinia'
import { getInfo } from '@api/user'
import { Role } from '@interface/login'
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
      const { permission, roles, units, userInfo } = res.data;
      this.roles = roles;
      this.rolePerm = roles[0].rolePerm;
      console.log(res)
    }
  },
  persist: {
    storage: localStorage,
    pick: ['rolePerm'] // 需要缓存的字段（v4.x 用 pick 替代 paths）
  }
})
