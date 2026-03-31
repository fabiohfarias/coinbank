import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthSession } from '../types/auth.types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: ({ user, token }) =>
        set({ user, token, isAuthenticated: true }),
      clearSession: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'coinbank:auth',
      // Only persist the essential fields, not the whole state
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
