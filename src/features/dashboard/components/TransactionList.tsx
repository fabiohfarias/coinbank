import { useState } from 'react'
import { Receipt } from 'lucide-react'
import { TransactionItem } from './TransactionItem'
import { TransactionSkeleton } from './TransactionSkeleton'
import { Separator } from '@/components/ui/separator'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { Transaction } from '../types/dashboard.types'

const PAGE_SIZE = 10

interface TransactionListProps {
  transactions?: Transaction[]
  isLoading: boolean
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const [page, setPage] = useState(1)

  const total = transactions?.length ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // Reset to page 1 when transaction list changes (e.g. after a transfer)
  const safePage = Math.min(page, totalPages)

  const paginated = transactions?.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  function goTo(p: number) {
    setPage(Math.max(1, Math.min(p, totalPages)))
  }

  /** Returns the page numbers to render, inserting null for ellipsis */
  function getPageNumbers(): (number | null)[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | null)[] = [1]
    if (safePage > 3) pages.push(null)
    const start = Math.max(2, safePage - 1)
    const end = Math.min(totalPages - 1, safePage + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (safePage < totalPages - 2) pages.push(null)
    pages.push(totalPages)
    return pages
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Receipt size={18} className="text-muted-foreground" />
        <h2 className="text-foreground font-semibold">Extrato</h2>
        {!isLoading && transactions && (
          <span className="text-muted-foreground text-xs ml-auto">
            {total} transações
          </span>
        )}
      </div>

      <div className="divide-y divide-border">
        {isLoading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <TransactionSkeleton key={i} />
          ))}

        {!isLoading && total === 0 && (
          <div className="py-12 text-center">
            <Receipt size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm">Nenhuma transação encontrada</p>
          </div>
        )}

        {!isLoading &&
          paginated?.map((transaction, index) => (
            <div key={transaction.id}>
              <TransactionItem transaction={transaction} />
              {index < paginated.length - 1 && (
                <Separator className="bg-border/50" />
              )}
            </div>
          ))}
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="pt-4 mt-2 border-t border-border">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goTo(safePage - 1)}
                  disabled={safePage === 1}
                  className="disabled:opacity-40 disabled:pointer-events-none"
                />
              </PaginationItem>

              {getPageNumbers().map((p, i) =>
                p === null ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === safePage}
                      onClick={() => goTo(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => goTo(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="disabled:opacity-40 disabled:pointer-events-none"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
