import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role } from '@/types/api/role'

export interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  role: Role | null
  isAuthenticated: boolean
  setAuth: (user: User, role: Role) => void
  clearAuth: () => void
}

function setAuthCookie(roleName?: string) {
  if (typeof document !== 'undefined') {
    document.cookie = 'loancorp_authenticated=1; path=/; max-age=86400; SameSite=Lax'
    // Store role in cookie so middleware can read it for routing
    if (roleName) {
      document.cookie = `loancorp_role=${roleName}; path=/; max-age=86400; SameSite=Lax`
    }
  }
}

function clearAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'loancorp_authenticated=; path=/; max-age=0'
    document.cookie = 'loancorp_role=; path=/; max-age=0'
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      setAuth: (user, role) => {
        setAuthCookie(role.name)
        set({ user, role, isAuthenticated: true })
      },
      clearAuth: () => {
        clearAuthCookie()
        set({ user: null, role: null, isAuthenticated: false })
      },
    }),
    { name: 'loancorp-auth' }
  )
)
