import { useAccount, useTransactions } from '../features/dashboard/hooks/useDashboard'
import { BalanceCard } from '../features/dashboard/components/BalanceCard'
import { TransactionList } from '../features/dashboard/components/TransactionList'
import { Card, CardContent } from '@/components/ui/card'

export function DashboardPage() {
  const { data: account, isLoading: accountLoading } = useAccount()
  const { data: transactions, isLoading: txLoading } = useTransactions()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Visão geral</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Acompanhe seu saldo e movimentações
        </p>
      </div>

      <BalanceCard account={account} isLoading={accountLoading} />

      <Card className="bg-surface border-border">
        <CardContent className="p-6">
          <TransactionList
            transactions={transactions}
            isLoading={txLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
