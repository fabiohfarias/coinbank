import type MockAdapter from 'axios-mock-adapter'
import { mockUsers } from '@/mocks/data/users'

export function authHandlers(mock: MockAdapter) {
  mock.onPost('/auth/login').reply((config) => {
    const { email, password } = JSON.parse(config.data as string) as {
      email: string
      password: string
    }

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    )

    if (!user) {
      return [401, { message: 'E-mail ou senha inválidos.' }]
    }

    const { password: _pass, ...safeUser } = user
    void _pass

    return [
      200,
      {
        data: {
          user: safeUser,
          token: `mock-token-${user.id}-${Date.now()}`,
        },
      },
    ]
  })

  mock.onPost('/auth/logout').reply(204)
}
