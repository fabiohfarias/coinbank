import { z } from 'zod'

export const transferSchema = z.object({
  recipient: z.string().min(2, 'Nome do destinatário é obrigatório'),
  amount: z
    .number()
    .positive('O valor deve ser maior que zero')
    .max(99_999_999_999.99, 'Valor máximo excedido'),
  description: z.string().optional(),
})

export type TransferFormData = z.infer<typeof transferSchema>
