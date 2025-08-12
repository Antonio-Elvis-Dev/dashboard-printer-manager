import { useAuth } from '@/hooks/useAuth'
import { ScreenShare } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { ThemeToggle } from '../theme/theme-toggle'

export function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen flex flex-col-reverse  sm:grid sm:grid-cols-2 antialiased">
      <div className="sm:h-full  border-r border-foreground/5 bg-muted sm:p-18 p-6 text-muted-foreground flex flex-col justify-between items-center">
        <div className="flex items-center gap-3  text-lg font-medium text-foreground">
          <ScreenShare className="h-5 w-5" />
          <span className="font-semibold">shop.screen</span>
        </div>
        <footer>
          Painel do parceiro &copy;{' '}
          <a href="https://github.com/Antonio-Elvis-Dev">elvis.dev</a> -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className='h-full flex items-center justify-end sm:relative mr-8'>

        <ThemeToggle/>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
