import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import type { AuthCredentials } from '../types/auth.types'
import { getApiErrorMessage } from '@/lib/utils'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: AuthCredentials) =>
      authService.login(credentials),
    onSuccess: (session) => {
      setSession(session)
      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'E-mail ou senha inválidos.'))
    },
  })
}

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession)
  const navigate = useNavigate()

  return async () => {
    try {
      await authService.logout()
    } finally {
      clearSession()
      navigate('/login')
    }
  }
}
