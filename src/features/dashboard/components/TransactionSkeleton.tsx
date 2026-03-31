import { Skeleton } from '@/components/ui/skeleton'

export function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="size-10 rounded-full bg-surface-elevated" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-40 bg-surface-elevated" />
        <Skeleton className="h-3 w-28 bg-surface-elevated" />
      </div>
      <div className="space-y-1.5 text-right">
        <Skeleton className="h-3.5 w-20 bg-surface-elevated ml-auto" />
        <Skeleton className="h-3 w-16 bg-surface-elevated ml-auto" />
      </div>
    </div>
  )
}
