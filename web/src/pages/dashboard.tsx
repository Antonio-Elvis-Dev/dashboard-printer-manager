import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Printer,
  Activity,
  Palette,
  Monitor,
  TrendingUp,
  Clock
} from 'lucide-react';
import { MetricCard, type MetricCardProps } from '@/components/dashboard/metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/AppContext';
import { dashboardApi, usuarioApi } from '@/services/mockApi';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Dashboard() {
  const { dispatch } = useApp();

  // Carregar usuário atual
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: usuarioApi.getCurrentUser
  });

  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_USUARIO', payload: user });
    }
  }, [user, dispatch]);

  // Carregar métricas do dashboard
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: dashboardApi.getMetrics
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Erro ao carregar dados do dashboard</p>
      </div>
    );
  }

  const totalImpressoesMes = metrics.impressoesColoridoMes + metrics.impressoesPretoBrancoMes;

  const printerMetricCards: MetricCardProps[] = [

    {
      title: "Total de Impressoras",
      value: metrics.totalImpressoras,
      icon: Printer,
      description: `${metrics.impressorasAtivas} ativas, ${metrics.impressorasInativas} inativas`,
      variant: "default"
    },
    {
      title: "Impressoras Ativas",
      value: metrics.impressorasAtivas,
      icon: Activity,
      description: `Funcionando normalmente`,
      variant: "success"
    },
    {
      title: "Impressões Coloridas",
      value: metrics.impressoesColoridoMes.toLocaleString(),
      icon: Palette,
      description: `Este mês`,
      variant: "info"
    },
    {
      title: "Impressões P&B",
      value: metrics.impressoesPretoBrancoMes.toLocaleString(),
      icon: Monitor,
      description: `Este mês`,
      variant: "warning"
    },
  ]

  return (
    <div className="space-y-6">
      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          printerMetricCards.map((value, index) => (
            <MetricCard
              key={index}
              title={value.title}
              value={value.value}
              icon={value.icon}
              description={value.description}
              variant={value.variant}
            />
          ))
        }

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking das impressoras mais usadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Impressoras Mais Utilizadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.rankingImpressoras.map((item, index) => (
                <div key={item.impressora.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {item.impressora.nome}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.impressora.modelo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      {item.totalImpressoes.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">impressões</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Últimos registros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Últimas Impressões</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.ultimosRegistros.map((registro) => (
                <div key={registro.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Printer className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {registro.impressora.nome}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(registro.data, {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={registro.tipo === 'colorida' ? 'default' : 'secondary'}
                    >
                      {registro.tipo === 'colorida' ? 'Colorida' : 'P&B'}
                    </Badge>
                    <span className="font-bold text-foreground">
                      {registro.quantidade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo geral */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {totalImpressoesMes.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                Total de impressões este mês
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {Math.round((metrics.impressoesColoridoMes / totalImpressoesMes) * 100) || 0}%
              </div>
              <p className="text-sm text-muted-foreground">
                Impressões coloridas
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">
                {Math.round(totalImpressoesMes / metrics.impressorasAtivas) || 0}
              </div>
              <p className="text-sm text-muted-foreground">
                Média por impressora ativa
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}