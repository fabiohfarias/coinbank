import { LoginForm } from '../features/auth/components/LoginForm'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'

export function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary to-blue-900 flex-col justify-between p-12 overflow-hidden">
        {/* Hero image — full panel cover */}
        <img
          src="/herobank.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40 select-none pointer-events-none"
        />
        {/* Gradient overlay to protect text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/60 to-blue-900/70 pointer-events-none" />

        {/* Content above layers */}
        <div className="relative z-10">
          <img src="/coinbank.png" alt="CoinBank" className="h-10 w-auto" />
        </div>
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Seu dinheiro,
            <br />
            <span className="text-blue-200">do seu jeito.</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Banco digital seguro, rápido e sem complicação.
            <br />
            Controle sua vida financeira em um só lugar.
          </p>
        </div>
        <div className="relative z-10 flex gap-8 text-blue-200 text-sm">
          <div>
            <p className="text-white text-2xl font-bold">250k+</p>
            <p>Clientes ativos</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">R$2bi+</p>
            <p>Em transações</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">4.9★</p>
            <p>Avaliação</p>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <img src="/coinbank.png" alt="CoinBank" className="h-8 w-auto" />
          </div>

          <div className="mb-8">
            <h2 className="text-foreground text-2xl font-bold mb-1">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground text-sm">
              Acesse sua conta para continuar
            </p>
          </div>

          <LoginForm />

          <p className="text-muted-foreground text-xs text-center mt-6">
            Credenciais de demo:{' '}
            <span className="text-foreground font-mono">
              user@coinbank.com
            </span>{' '}
            /{' '}
            <span className="text-foreground font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
