import axios from 'axios'
import { AUTH_API } from './config'

const loginClient = axios.create({
  baseURL: AUTH_API,
})

loginClient.interceptors.response.use(res => res.data)

export const authProvider = {
  async login(params) {
    const { token } = await loginClient.post('login', params)
    if (token) {
      localStorage.setItem('token', token)
      return Promise.resolve()
    }
    return Promise.reject()
  },
  logout() {
    localStorage.removeItem('token')
    return Promise.resolve()
  },
  checkAuth() {
    return localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject({ redirectTo: '/login' })
  },
  checkError(error) {
    const status = error.response.status
    if ([401, 403].includes(status)) {
      localStorage.removeItem('token')
      return Promise.reject()
    }
    return Promise.resolve()
  },
  getPermissions: () => Promise.resolve(),
}
