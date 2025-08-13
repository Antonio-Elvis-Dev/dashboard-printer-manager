import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Printer, 
  PieChart as PieChartIcon,
  BarChart3
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function RelatoriosPage() {
  const [periodoInicio, setPeriodoInicio] = useState('');
  const [periodoFim, setPeriodoFim] = useState('');
  const [filtroSetor, setFiltroSetor] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  // Dados mockados para os gráficos
  const dadosImpressoesPorMes = [
    { mes: 'Jan', pb: 1200, colorida: 800 },
    { mes: 'Fev', pb: 1100, colorida: 900 },
    { mes: 'Mar', pb: 1300, colorida: 750 },
    { mes: 'Abr', pb: 1250, colorida: 850 },
    { mes: 'Mai', pb: 1400, colorida: 920 },
    { mes: 'Jun', pb: 1350, colorida: 880 }
  ];

  const dadosImpressoesPorSetor = [
    { setor: 'Financeiro', total: 1250, pb: 800, colorida: 450 },
    { setor: 'Marketing', total: 2100, pb: 1200, colorida: 900 },
    { setor: 'RH', total: 680, pb: 500, colorida: 180 },
    { setor: 'TI', total: 890, pb: 700, colorida: 190 }
  ];

  const dadosImpressoesPorPessoa = [
    { nome: 'João Silva', total: 345, pb: 280, colorida: 65 },
    { nome: 'Maria Santos', total: 298, pb: 150, colorida: 148 },
    { nome: 'Pedro Oliveira', total: 267, pb: 220, colorida: 47 },
    { nome: 'Ana Costa', total: 234, pb: 180, colorida: 54 },
    { nome: 'Carlos Lima', total: 189, pb: 95, colorida: 94 }
  ];

  const dadosDistribuicaoTipo = [
    { name: 'P&B', value: 3400, color: '#8884d8' },
    { name: 'Colorida', value: 1620, color: '#82ca9d' }
  ];

  const dadosEvolucaoMensal = [
    { mes: 'Jan', total: 2000 },
    { mes: 'Fev', total: 2000 },
    { mes: 'Mar', total: 2050 },
    { mes: 'Abr', total: 2100 },
    { mes: 'Mai', total: 2320 },
    { mes: 'Jun', total: 2230 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise detalhada do uso das impressoras
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Filtros do Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input 
                type="date" 
                value={periodoInicio}
                onChange={(e) => setPeriodoInicio(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input 
                type="date" 
                value={periodoFim}
                onChange={(e) => setPeriodoFim(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Setor</Label>
              <Select value={filtroSetor} onValueChange={setFiltroSetor}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os setores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os setores</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="ti">TI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Impressão</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="pb">P&B</SelectItem>
                  <SelectItem value="colorida">Colorida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">5,020</p>
                <p className="text-sm text-muted-foreground">Total de Impressões</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">+12%</p>
                <p className="text-sm text-muted-foreground">vs. Mês Anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">40</p>
                <p className="text-sm text-muted-foreground">Usuários Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Printer className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">R$ 1.890</p>
                <p className="text-sm text-muted-foreground">Custo Estimado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios em Abas */}
      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="setores">Por Setores</TabsTrigger>
          <TabsTrigger value="pessoas">Por Pessoas</TabsTrigger>
          <TabsTrigger value="impressoras">Por Impressoras</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Barras - Impressões por Mês */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Impressões por Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosImpressoesPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pb" stackId="a" fill="#8884d8" name="P&B" />
                    <Bar dataKey="colorida" stackId="a" fill="#82ca9d" name="Colorida" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Pizza - Distribuição por Tipo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Distribuição por Tipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dadosDistribuicaoTipo}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosDistribuicaoTipo.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Linha - Evolução Mensal */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Evolução das Impressões
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosEvolucaoMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="setores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impressões por Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dadosImpressoesPorSetor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="setor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pb" stackId="a" fill="#8884d8" name="P&B" />
                  <Bar dataKey="colorida" stackId="a" fill="#82ca9d" name="Colorida" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ranking dos Setores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dadosImpressoesPorSetor
                  .sort((a, b) => b.total - a.total)
                  .map((setor, index) => (
                    <div key={setor.setor} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{setor.setor}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>P&B: {setor.pb}</span>
                            <span>Colorida: {setor.colorida}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{setor.total}</p>
                        <Badge variant="outline">impressões</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pessoas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impressões por Pessoa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dadosImpressoesPorPessoa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pb" stackId="a" fill="#8884d8" name="P&B" />
                  <Bar dataKey="colorida" stackId="a" fill="#82ca9d" name="Colorida" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dadosImpressoesPorPessoa.map((pessoa, index) => (
                  <div key={pessoa.nome} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{pessoa.nome}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>P&B: {pessoa.pb}</span>
                          <span>Colorida: {pessoa.colorida}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{pessoa.total}</p>
                      <Badge variant="outline">impressões</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impressoras" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Consistência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <h4 className="font-medium mb-2">HP LaserJet Pro 400</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Físico</p>
                      <p className="font-bold">267 impressões</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Registrado</p>
                      <p className="font-bold">245 impressões</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Diferença</p>
                      <p className="font-bold text-yellow-600">22 impressões</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium mb-2">Canon PIXMA G6010</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Físico</p>
                      <p className="font-bold">178 impressões</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Registrado</p>
                      <p className="font-bold">178 impressões</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Diferença</p>
                      <p className="font-bold text-green-600">0 impressões</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Brother HL-L2395DW</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Físico</p>
                      <p className="font-bold">0 impressões</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Registrado</p>
                      <p className="font-bold">0 impressões</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Diferença</p>
                      <p className="font-bold text-gray-600">0 impressões</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}