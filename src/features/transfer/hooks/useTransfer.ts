import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { transferService } from '../services/transferService'
import type { TransferPayload } from '../types/transfer.types'
import { getApiErrorMessage } from '@/lib/utils'
import {
  ACCOUNT_QUERY_KEY,
  TRANSACTIONS_QUERY_KEY,
} from '@/features/dashboard/hooks/useDashboard'

export function useTransfer() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: TransferPayload) => transferService.send(payload),
    onSuccess: (_result, variables) => {
      // Invalidate both queries so the dashboard reflects the new state immediately
      void queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY })
      void queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY })

      toast.success(
        `Transferência de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(variables.amount)} realizada!`,
        { description: 'Seu extrato já foi atualizado.' },
      )

      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, 'Erro ao realizar transferência.'),
      )
    },
  })
}
