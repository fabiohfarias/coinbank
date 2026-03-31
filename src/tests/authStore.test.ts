import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/features/auth/store/authStore'

const { getState } = useAuthStore

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
  })

  it('should start unauthenticated', () => {
    const { user, token, isAuthenticated } = getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isAuthenticated).toBe(false)
  })

  it('should set session correctly', () => {
    const mockSession = {
      user: { id: 'usr_001', name: 'Ana Souza', email: 'user@coinbank.com' },
      token: 'mock-token-123',
    }

    getState().setSession(mockSession)

    const { user, token, isAuthenticated } = getState()
    expect(user).toEqual(mockSession.user)
    expect(token).toBe('mock-token-123')
    expect(isAuthenticated).toBe(true)
  })

  it('should clear session correctly', () => {
    useAuthStore.getState().setSession({
      user: { id: 'usr_001', name: 'Ana Souza', email: 'user@coinbank.com' },
      token: 'mock-token-123',
    })

    useAuthStore.getState().clearSession()

    const { user, token, isAuthenticated } = getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isAuthenticated).toBe(false)
  })

  it('should update user when setSession is called twice', () => {
    const first = {
      user: { id: 'usr_001', name: 'Ana Souza', email: 'ana@test.com' },
      token: 'token-1',
    }
    const second = {
      user: { id: 'usr_002', name: 'Carlos Melo', email: 'carlos@test.com' },
      token: 'token-2',
    }

    getState().setSession(first)
    getState().setSession(second)

    const { user, token } = getState()
    expect(user?.id).toBe('usr_002')
    expect(token).toBe('token-2')
  })
})
