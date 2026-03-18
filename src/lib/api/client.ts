import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000') + '/services',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials is only needed when backend security is enabled (cookie-based sessions).
  // Enable it once WaveMaker security is turned on. Keeping it off avoids CORS issues.
})

// Global 401 handler — redirect to login on unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear persisted auth state and cookie
      try {
        localStorage.removeItem('loancorp-auth')
        document.cookie = 'loancorp_authenticated=; path=/; max-age=0'
      } catch { /* noop */ }
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
