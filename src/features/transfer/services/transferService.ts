import { api } from '@/lib/axios'
import { storage } from '@/lib/storage'
import type { TransferPayload, TransferResult } from '../types/transfer.types'

export const transferService = {
  async send(payload: TransferPayload): Promise<TransferResult> {
    const { data } = await api.post<{ data: TransferResult }>(
      '/transfers',
      payload,
    )
    return data.data
  },
}

// Sync the Zustand store balance after a successful transfer
export function persistBalance(newBalance: number) {
  storage.set('balance', newBalance)
}
