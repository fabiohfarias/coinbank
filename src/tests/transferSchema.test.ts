import { describe, it, expect } from 'vitest'
import { transferSchema } from '@/features/transfer/schemas/transferSchema'

describe('transferSchema', () => {
  it('should accept valid transfer data', () => {
    const result = transferSchema.safeParse({
      recipient: 'João Silva',
      amount: 250.5,
      description: 'Aluguel',
    })
    expect(result.success).toBe(true)
  })

  it('should accept transfers without description', () => {
    const result = transferSchema.safeParse({
      recipient: 'Maria Costa',
      amount: 100,
    })
    expect(result.success).toBe(true)
  })

  it('should reject empty recipient', () => {
    const result = transferSchema.safeParse({
      recipient: '',
      amount: 100,
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].path).toContain('recipient')
  })

  it('should reject recipient shorter than 2 characters', () => {
    const result = transferSchema.safeParse({
      recipient: 'J',
      amount: 100,
    })
    expect(result.success).toBe(false)
  })

  it('should reject zero amount', () => {
    const result = transferSchema.safeParse({
      recipient: 'Ana',
      amount: 0,
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].path).toContain('amount')
  })

  it('should reject negative amount', () => {
    const result = transferSchema.safeParse({
      recipient: 'Ana',
      amount: -50,
    })
    expect(result.success).toBe(false)
  })


})
