import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { loginSchema, type LoginFormData } from '../schemas/loginSchema'
import { useLogin } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(data: LoginFormData) {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground-muted text-sm">
          E-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          disabled={isPending}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-foreground-muted text-sm">
          Senha
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isPending}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring pr-10"
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin mr-2" />
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  )
}
