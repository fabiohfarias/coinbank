export interface TransferPayload {
  recipient: string
  amount: number
  description?: string
}

export interface TransferResult {
  transactionId: string
  newBalance: number
  date: string
}
