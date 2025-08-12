import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Printer, 
  Users,
  Building2, 
  FileText, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Impressoras', url: '/impressoras', icon: Printer },
  { title: 'Pessoas', url: '/pessoas', icon: Users },
  { title: 'Setores', url: '/setores', icon: Building2 },
  { title: 'Registros', url: '/registros', icon: FileText },
  { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { state } = useApp();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar-bg border-r border-border/20 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-fg">PrinterPulse</h1>
              <p className="text-sm text-sidebar-fg/70">Gerenciamento</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors text-sidebar-fg"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* User Info */}
      {state.usuario && (
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {state.usuario.nome.charAt(0)}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-fg truncate">
                  {state.usuario.nome}
                </p>
                <p className="text-xs text-sidebar-fg/70 truncate">
                  {state.usuario.role === 'admin' ? 'Administrador' : 'Usuário'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);
            
            return (
              <li key={item.url}>
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-sidebar-hover",
                    active 
                      ? "bg-sidebar-active text-primary-foreground" 
                      : "text-sidebar-fg hover:text-sidebar-fg"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/20">
        <div className="text-xs text-sidebar-fg/50 text-center">
          {collapsed ? 'PP' : 'PrinterPulse Dashboard'}
        </div>
      </div>
    </aside>
  );
}