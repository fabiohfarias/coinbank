import { Eye, EyeOff, TrendingUp, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import type { Account } from '../types/dashboard.types'

interface BalanceCardProps {
  account?: Account
  isLoading: boolean
}

export function BalanceCard({ account, isLoading }: BalanceCardProps) {
  const [visible, setVisible] = useState(true)

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-primary to-blue-800 border-0 text-white">
        <CardContent className="p-6">
          <Skeleton className="h-4 w-32 bg-white/20 mb-4" />
          <Skeleton className="h-10 w-48 bg-white/20 mb-2" />
          <Skeleton className="h-3 w-24 bg-white/20" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-primary to-blue-800 border-0 text-white overflow-hidden relative">
      {/* Decorative circle */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
      <div className="absolute -bottom-10 -right-4 w-28 h-28 bg-white/5 rounded-full" />

      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-1">
          <span className="text-blue-100 text-sm font-medium">Saldo disponível</span>
          <button
            onClick={() => setVisible((v) => !v)}
            className="text-blue-200 hover:text-white transition-colors"
            aria-label={visible ? 'Ocultar saldo' : 'Exibir saldo'}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <p className="text-3xl font-bold tracking-tight mb-4">
          {visible
            ? formatCurrency(account?.balance ?? 0)
            : 'R$ •••••'}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-blue-100 text-xs space-y-0.5">
            <p>Ag. {account?.agency ?? '—'} | Cc. {account?.accountNumber ?? '—'}</p>
          </div>
          <Link to="/transfer">
            <Button
              size="sm"
              className="bg-white/15 hover:bg-white/25 text-white border-0 text-xs gap-1.5 backdrop-blur-sm"
            >
              <ArrowUpRight size={14} />
              Transferir
            </Button>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-blue-100 text-xs">
          <TrendingUp size={14} />
          <span>Conta digital CoinBank</span>
        </div>
      </CardContent>
    </Card>
  )
}
