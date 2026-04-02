import type { Roles, Users, UsersProfile } from '#layers/1.base/server/prisma/client'

const initState: {
  token: string
  info: Pick<Users, 'email' | 'id'> & {
    role: Pick<Roles, 'id' | 'name'> | null
    profile: Pick<UsersProfile, 'name' | 'photo_profile'> | null
  } | null
} = {
  token: '',
  info: null,
}

export const useAuthStoreDashboard = defineStore('auth', {
  state: () => initState,
  getters: {
    getToken: state => state.token,
    getInfo: state => state.info,
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setInfo(info: typeof initState.info) {
      this.info = info
    },
  },
  persist: {
    pick: ['token'],
    storage: lsStorage,
  },
})
