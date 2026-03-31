export type TransactionType = 'credit' | 'debit' | 'transfer'

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  amount: number
  counterpart: string 
  date: string 
  balanceAfter: number
}

export interface Account {
  id: string
  userId: string
  balance: number
  agency: string
  accountNumber: string
}
