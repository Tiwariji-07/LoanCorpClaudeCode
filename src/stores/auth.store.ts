import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setAuth: (user: User) => void
  clearAuth: () => void
}

function setAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'loancorp_authenticated=1; path=/; max-age=86400; SameSite=Lax'
  }
}

function clearAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'loancorp_authenticated=; path=/; max-age=0'
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => {
        setAuthCookie()
        set({ user, isAuthenticated: true })
      },
      clearAuth: () => {
        clearAuthCookie()
        set({ user: null, isAuthenticated: false })
      },
    }),
    { name: 'loancorp-auth' }
  )
)
