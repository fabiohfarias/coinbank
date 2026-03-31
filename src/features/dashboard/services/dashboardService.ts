import { api } from '@/lib/axios'
import type { Account, Transaction } from '../types/dashboard.types'

export const dashboardService = {
  async getAccount(): Promise<Account> {
    const { data } = await api.get<{ data: Account }>('/account')
    return data.data
  },

  async getTransactions(): Promise<Transaction[]> {
    const { data } = await api.get<{ data: Transaction[] }>('/transactions')
    return data.data
  },
}
