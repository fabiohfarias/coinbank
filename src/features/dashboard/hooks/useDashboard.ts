import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'

export const ACCOUNT_QUERY_KEY = ['account'] as const
export const TRANSACTIONS_QUERY_KEY = ['transactions'] as const

export function useAccount() {
  return useQuery({
    queryKey: ACCOUNT_QUERY_KEY,
    queryFn: dashboardService.getAccount,
    staleTime: 0, // Always refetch for fresh balance
  })
}

export function useTransactions() {
  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: dashboardService.getTransactions,
    staleTime: 0,
  })
}
