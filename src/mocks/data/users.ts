import type { User } from '@/features/auth/types/auth.types'

export const mockUsers: (User & { password: string })[] = [
  {
    id: 'usr_001',
    name: 'Ana Souza',
    email: 'user@coinbank.com',
    password: 'password123',
    avatarUrl: undefined,
  },
]
