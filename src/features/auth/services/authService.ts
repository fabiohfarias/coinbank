import { api } from '@/lib/axios'
import type { AuthCredentials, AuthSession } from '../types/auth.types'

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const { data } = await api.post<{ data: AuthSession }>(
      '/auth/login',
      credentials,
    )
    return data.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },
}
