import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TransferForm } from '../features/transfer/components/TransferForm'
import { useAccount } from '../features/dashboard/hooks/useDashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export function TransferPage() {
  const { data: account, isLoading } = useAccount()

  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-foreground text-2xl font-bold">Transferência</h1>
          <p className="text-muted-foreground text-sm">
            Envie dinheiro para qualquer pessoa
          </p>
        </div>
      </div>

      {/* Available balance indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
        <span>Saldo disponível:</span>
        {isLoading ? (
          <Skeleton className="h-4 w-24 bg-surface-elevated" />
        ) : (
          <span className="text-foreground font-semibold">
            {formatCurrency(account?.balance ?? 0)}
          </span>
        )}
      </div>

      <Card className="bg-surface border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground text-base font-semibold">
            Dados da transferência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransferForm />
        </CardContent>
      </Card>
    </div>
  )
}
