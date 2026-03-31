import { type ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLogout } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/store/authStore'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/transfer', label: 'Transferir', Icon: ArrowLeftRight },
]

function NavLink({
  to,
  label,
  Icon,
  onClick,
}: (typeof navItems)[number] & { onClick?: () => void }) {
  const { pathname } = useLocation()
  const active = pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated',
      )}
    >
      <Icon size={18} />
      {label}
    </Link>
  )
}

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const logout = useLogout()
  const user = useAuthStore((s) => s.user)

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'CB'

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5">
        <img src="/coinbank.png" alt="CoinBank" className="h-8 w-auto" />
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            {...item}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border flex flex-col gap-3">
        <div className="flex items-center gap-3 px-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-sm font-medium truncate">
              {user?.name ?? 'Usuário'}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {user?.email ?? ''}
            </p>
          </div>
        </div>

        <div className="px-2">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={16} className="mr-2" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col border-r border-border bg-surface sticky top-0 h-screen">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-surface sticky top-0 z-30">
          <div className="flex items-center">
            <img src="/coinbank.png" alt="CoinBank" className="h-7 w-auto" />
          </div>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-4xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
