import type MockAdapter from 'axios-mock-adapter'
import { mockAccounts } from '@/mocks/data/accounts'
import { storage } from '@/lib/storage'
import type { Transaction } from '@/features/dashboard/types/dashboard.types'
import { mockTransactions } from '@/mocks/data/transactions'

export function dashboardHandlers(mock: MockAdapter) {
  mock.onGet('/account').reply(() => {
    const persisted = storage.get<number>('balance')
    const account = { ...mockAccounts[0] }
    if (persisted !== null) {
      account.balance = persisted
    }
    return [200, { data: account }]
  })

  mock.onGet('/transactions').reply(() => {
    const extra = storage.get<Transaction[]>('transactions') ?? []
    const all = [...extra, ...mockTransactions]
    return [200, { data: all }]
  })
}
