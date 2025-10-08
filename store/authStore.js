import { defineStore } from 'pinia'
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: Cookies.get('admin-user') ? JSON.parse(Cookies.get('admin-user')) : null,
    token: Cookies.get('admin-token') || null,
  }),
  actions: {
    login(user, token) {
      this.user = user
      this.token = token
      Cookies.set('admin-user', JSON.stringify(user))
      Cookies.set('admin-token', token)
    },
    logout() {
      this.user = null
      this.token = null
      Cookies.remove('admin-user')
      Cookies.remove('admin-token')
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
})

