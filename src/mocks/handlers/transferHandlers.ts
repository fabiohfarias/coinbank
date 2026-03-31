import type MockAdapter from 'axios-mock-adapter'
import { storage } from '@/lib/storage'
import type { TransferPayload, TransferResult } from '@/features/transfer/types/transfer.types'
import type { Transaction } from '@/features/dashboard/types/dashboard.types'
import { nanoid } from './nanoid'

export function transferHandlers(mock: MockAdapter) {
  mock.onPost('/transfers').reply((config) => {
    const payload = JSON.parse(config.data as string) as TransferPayload

    const currentBalance = storage.get<number>('balance') ?? 12569.8

    if (payload.amount <= 0) {
      return [400, { message: 'Valor inválido.' }]
    }

    if (payload.amount > currentBalance) {
      return [422, { message: 'Saldo insuficiente.' }]
    }

    const newBalance = currentBalance - payload.amount
    const date = new Date().toISOString()
    const transactionId = `txn_${nanoid()}`

    storage.set('balance', newBalance)

    const newTransaction: Transaction = {
      id: transactionId,
      type: 'transfer',
      description: payload.description ?? 'Transferência',
      amount: payload.amount,
      counterpart: payload.recipient,
      date,
      balanceAfter: newBalance,
    }

    const existing = storage.get<Transaction[]>('transactions') ?? []
    storage.set('transactions', [newTransaction, ...existing])

    const result: TransferResult = {
      transactionId,
      newBalance,
      date,
    }

    return [201, { data: result }]
  })
}
