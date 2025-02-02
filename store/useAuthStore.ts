import type { CachedUser } from '~/types/user.interface';
import { useAuthApi } from '~/composables/useAuthApi';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import { useUsersApi } from '~/composables/useUsersApi';

export interface AuthState {
  user: CachedUser | null
  authenticated: boolean
  token: string | null
  lastUpdate?: Date
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    token: localStorage.getItem('token') || null,
    authenticated: false,
    lastUpdate: localStorage.getItem('lastUpdate') ? new Date(+(localStorage.getItem('lastUpdate')!)) : null
  } as AuthState),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)

      this.authenticateUser()
    },

    async authenticateUser(updateUser = true) {
      try {
        this.authenticated = await useAuthApi().validateToken()
        if (this.authenticated && updateUser) await this.updateUserData()
      } catch (e: any) {
        if (e.errorCode === ErrorCode.TokenInvalid) {
          this.authenticated = false
          this.dropValues(true)
        }
        this.dropValues()
      }
    },

    dropValues(withToken: boolean = false) {
      this.user = null
      this.authenticated = false
      localStorage.removeItem('user')
      if (withToken) {
        this.token = null
        localStorage.removeItem('token')
      }
    },

    async updateUserData() {
      const data = await useUsersApi().getUser('@me')

      this.user = data
      localStorage.setItem('lastUpdate', new Date().getTime().toString())
      localStorage.setItem('user', JSON.stringify(data))
    }
  },
  getters:{
    getUser: (state): AuthState['user'] => state.user,
    isAuthenticated: (state) => state.authenticated,
    getToken: (state) => state.token,
    getLastUpdate: (state) => state.lastUpdate
  }
})