import { ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction, TransactionType } from '../types/dashboard.types'

interface TransactionItemProps {
  transaction: Transaction
}

const typeConfig: Record<
  TransactionType,
  { icon: React.ElementType; label: string; colorClass: string; amountPrefix: string }
> = {
  credit: {
    icon: ArrowDownLeft,
    label: 'Crédito',
    colorClass: 'text-success bg-success/10',
    amountPrefix: '+',
  },
  debit: {
    icon: ArrowUpRight,
    label: 'Débito',
    colorClass: 'text-error bg-error/10',
    amountPrefix: '-',
  },
  transfer: {
    icon: RefreshCw,
    label: 'Transferência',
    colorClass: 'text-accent bg-accent/10',
    amountPrefix: '-',
  },
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const config = typeConfig[transaction.type]
  const { icon: Icon, colorClass, amountPrefix } = config
  const isCredit = transaction.type === 'credit'

  return (
    <div className="flex items-center gap-4 py-3">
      <div className={cn('size-10 rounded-full flex items-center justify-center flex-shrink-0', colorClass)}>
        <Icon size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-foreground text-sm font-medium truncate">
          {transaction.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 text-muted-foreground text-xs">
          <span className="truncate">{transaction.counterpart}</span>
          <span className="flex-shrink-0 sm:before:content-['·'] sm:before:mr-1">
            {formatDate(transaction.date)}
          </span>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p
          className={cn(
            'text-sm font-semibold tabular-nums',
            isCredit ? 'text-success' : 'text-foreground',
          )}
        >
          {amountPrefix}
          {formatCurrency(transaction.amount)}
        </p>
        <p className="text-muted-foreground text-xs tabular-nums">
          {formatCurrency(transaction.balanceAfter)}
        </p>
      </div>
    </div>
  )
}
