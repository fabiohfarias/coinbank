import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransferForm } from '@/features/transfer/components/TransferForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import type { UseMutationResult } from '@tanstack/react-query'
import type { TransferPayload, TransferResult } from '@/features/transfer/types/transfer.types'

// Shared mock function so we can assert on it across tests
const mockMutate = vi.fn()

vi.mock('@/features/transfer/hooks/useTransfer', () => ({
  useTransfer: (): Partial<UseMutationResult<TransferResult, Error, TransferPayload>> => ({
    mutate: mockMutate,
    isPending: false,
  }),
}))

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('TransferForm', () => {
  beforeEach(() => {
    mockMutate.mockClear()
  })

  it('should render all form fields', () => {
    renderWithProviders(<TransferForm />)

    expect(screen.getByLabelText(/destinatário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /confirmar transferência/i }),
    ).toBeInTheDocument()
  })

  it('should display validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TransferForm />)

    await user.click(
      screen.getByRole('button', { name: /confirmar transferência/i }),
    )

    await waitFor(() => {
      expect(
        screen.getByText(/nome do destinatário é obrigatório/i),
      ).toBeInTheDocument()
    })
  })

  it('should show error for invalid amount (zero)', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TransferForm />)

    await user.type(screen.getByLabelText(/destinatário/i), 'João Silva')
    await user.type(screen.getByLabelText(/valor/i), '0')

    await user.click(
      screen.getByRole('button', { name: /confirmar transferência/i }),
    )

    await waitFor(() => {
      expect(
        screen.getByText(/o valor deve ser maior que zero/i),
      ).toBeInTheDocument()
    })
  })

  it('should call mutate with correct data on valid submission', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TransferForm />)

    await user.type(screen.getByLabelText(/destinatário/i), 'Ana Costa')
    await user.type(screen.getByLabelText(/valor/i), '15000')
    await user.type(screen.getByLabelText(/descrição/i), 'Divisão jantar')

    await user.click(
      screen.getByRole('button', { name: /confirmar transferência/i }),
    )

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          recipient: 'Ana Costa',
          amount: 150,
          description: 'Divisão jantar',
        }),
        expect.any(Object),
      )
    })
  })
})
