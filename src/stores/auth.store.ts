import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

// TODO: Replace with real auth flow later
const HARDCODED_USER: User = {
  id: 'rajkumar.abbadi@wavemaker.com',
  name: 'Rajkumar Abbadi',
  email: 'rajkumar.abbadi@wavemaker.com',
  role: 'CUSTOMER',
}
const HARDCODED_TOKEN = 'dev-token'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Pre-populate with hardcoded user so API calls work immediately
      user: HARDCODED_USER,
      token: HARDCODED_TOKEN,
      isAuthenticated: true,
      setAuth: (user, token) => {
        localStorage.setItem('auth_token', token)
        set({ user, token, isAuthenticated: true })
      },
      clearAuth: () => {
        localStorage.removeItem('auth_token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'loancorp-auth' }
  )
)
