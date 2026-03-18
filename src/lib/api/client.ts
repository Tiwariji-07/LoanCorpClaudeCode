import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000') + '/services',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach auth token from localStorage on every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global 401 handler — clear token and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Orval mutator — named export used by generated hooks
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return apiClient(config).then(({ data }) => data)
}

export { apiClient }
