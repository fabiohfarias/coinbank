import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, ArrowUpRight, Info } from 'lucide-react'
import { transferSchema, type TransferFormData } from '../schemas/transferSchema'
import { useTransfer } from '../hooks/useTransfer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatBrlMask, parseBrlMask } from '@/lib/utils'

export function TransferForm() {
  const { mutate: transfer, isPending } = useTransfer()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(transferSchema) as any,
    defaultValues: {
      recipient: '',
      amount: 0,
      description: '',
    },
  })

  function onSubmit(data: TransferFormData) {
    transfer(
      { recipient: data.recipient, amount: data.amount, description: data.description },
      { onSuccess: () => reset() },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="recipient" className="text-foreground/70 text-sm">
          Destinatário
        </Label>
        <Input
          id="recipient"
          placeholder="Nome completo"
          disabled={isPending}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          {...register('recipient')}
        />
        {errors.recipient && (
          <p className="text-red-400 text-sm">{errors.recipient.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="amount" className="text-foreground/70 text-sm">
          Valor (R$)
        </Label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              id="amount"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              disabled={isPending}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              value={field.value ? formatBrlMask(String(Math.round(field.value * 100))) : ''}
              onChange={(e) => {
                const masked = formatBrlMask(e.target.value)
                const numeric = parseBrlMask(masked)
                field.onChange(numeric > 0 ? numeric : 0)
              }}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        {errors.amount && (
          <p className="text-red-400 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-foreground/70 text-sm">
          Descrição{' '}
          <span className="text-muted-foreground text-xs">(opcional)</span>
        </Label>
        <Input
          id="description"
          placeholder="Ex: Divisão de conta, aluguel..."
          disabled={isPending}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          {...register('description')}
        />
      </div>

      <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-xs text-muted-foreground">
        <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
        <span>
          Transferências são processadas instantaneamente. Verifique os dados antes de confirmar.
        </span>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold gap-2"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <ArrowUpRight size={16} />
            Confirmar transferência
          </>
        )}
      </Button>
    </form>
  )
}
