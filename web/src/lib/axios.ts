import { API_URL } from '@/env';
import axios from 'axios'
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
