import { useAuth } from '@/hooks/useAuth'
import { ScreenShare } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme/theme-toggle' // Ajustei o caminho, assumindo que está em components/

export function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    // Adicione 'replace' para uma melhor experiência de navegação
    return <Navigate to="/" replace />
  }

  return (
    // Usamos 'grid' em todas as telas. 1 coluna no mobile, 2 no desktop.
    <div className="grid min-h-screen grid-cols-1 antialiased lg:grid-cols-2">
      {/* Coluna da Esquerda (Branding): Fica escondida no mobile */}
      <div className="hidden h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <ScreenShare className="h-5 w-5" />
          <span className="font-semibold">shop.screen</span>
        </div>
        <footer className="text-sm">
          Painel do parceiro &copy;{' '}
          <a
            href="https://github.com/Antonio-Elvis-Dev"
            className="underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            elvis.dev
          </a>{' '}
          - {new Date().getFullYear()}
        </footer>
      </div>

      {/* Coluna da Direita (Formulário): Sempre visível */}
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* Posicionamento absoluto para o botão de tema */}
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ThemeToggle />
        </div>

        {/* Container que centraliza e limita a largura do formulário */}
        <div className="flex w-full max-w-sm flex-col justify-center gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}