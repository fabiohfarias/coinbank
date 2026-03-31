export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthSession {
  user: User
  token: string
}
