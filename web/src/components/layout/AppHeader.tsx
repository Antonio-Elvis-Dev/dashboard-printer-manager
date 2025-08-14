import { useLocation } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useApp } from "@/contexts/AppContext";

// Mapeamento de títulos das páginas
const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/pessoas": "Gerenciar Pessoas",
  "/setores": "Gerenciar Setores",
  "/registros": "Registros de Impressão",
  "/relatorios": "Relatórios",
  "/configuracoes": "Configurações",
};

export function AppHeader() {
  const location = useLocation();
  const { state } = useApp();

  const currentTitle = pageTitles[location.pathname] || "PrinterPulse";

  return (
    <header className="h-16 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between">
      {/* Título da página */}
      <div>
        <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate max-w-[150px] sm:max-w-none">
          {currentTitle}
        </h1>
      </div>

      {/* Área de busca e ações */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Busca global (oculta no mobile) */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar impressoras, setores..."
            className="pl-10 w-48 lg:w-80 bg-muted/50"
          />
        </div>

        {/* Ícone de busca no mobile */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>

        {/* Tema */}
        <ThemeToggle />

        {/* Notificações */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* Perfil do usuário */}
        {state.usuario && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {state.usuario.nome.charAt(0)}
              </span>
            </div>
            {/* Nome e função ocultos no mobile */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">
                {state.usuario.nome}
              </p>
              <p className="text-xs text-muted-foreground">
                {state.usuario.role === "admin"
                  ? "Administrador"
                  : "Usuário"}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
