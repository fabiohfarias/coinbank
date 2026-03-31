import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(dateString))
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data
  ) {
    return String((error.response.data as { message: string }).message)
  }
  return fallback
}

/**
 * Formats a raw digit string into BRL mask: xxx.xxx.xxx,xx
 * - Strips non-digits
 * - Caps at 13 digits (max 11 before comma + 2 decimals)
 * - Always shows 2 decimal places
 *
 * Examples: '1' → '0,01' | '100' → '1,00' | '1000000' → '10.000,00'
 */
export function formatBrlMask(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, '').slice(0, 13)
  if (digits === '') return ''

  const padded = digits.padStart(3, '0')
  const intPart = padded.slice(0, -2).replace(/^0+(\d)/, '$1')
  const decPart = padded.slice(-2)

  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formatted},${decPart}`
}

/**
 * Parses a BRL-masked string back to a float number.
 * '10.000,50' → 10000.5
 */
export function parseBrlMask(masked: string): number {
  const normalized = masked.replace(/\./g, '').replace(',', '.')
  return parseFloat(normalized) || 0
}

