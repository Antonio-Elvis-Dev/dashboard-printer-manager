import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Download, 
  Upload,
  Palette,
  Database,
  Mail,
  Clock,
  AlertTriangle,
  Save,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ConfiguracoesPage() {
  const { toast } = useToast();
  const [notificacaoEmail, setNotificacaoEmail] = useState(true);
  const [notificacaoSistema, setNotificacaoSistema] = useState(true);
  const [backupAutomatico, setBackupAutomatico] = useState(false);
  const [manutencaoAlerta, setManutencaoAlerta] = useState(true);
  const [limiteDiario, setLimiteDiario] = useState('1000');
  const [diasManutencao, setDiasManutencao] = useState('30');

  const handleSalvarConfiguracoes = () => {
    toast({
      title: "Configurações Salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  const handleExportarDados = () => {
    toast({
      title: "Exportação Iniciada",
      description: "Os dados estão sendo preparados para download.",
    });
  };

  const handleImportarDados = () => {
    toast({
      title: "Importação de Dados",
      description: "Selecione um arquivo para importar os dados.",
    });
  };

  const handleResetarConfiguracoes = () => {
    toast({
      title: "Configurações Resetadas",
      description: "Todas as configurações foram restauradas ao padrão.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as preferências e configurações do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetarConfiguracoes}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Resetar
          </Button>
          <Button onClick={handleSalvarConfiguracoes}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="usuario">Usuário</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="dados">Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configure as preferências básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Nome da Empresa</Label>
                  <Input id="empresa" placeholder="Digite o nome da empresa" defaultValue="Empresa XYZ" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="limite-diario">Limite Diário de Impressões</Label>
                  <Input 
                    id="limite-diario" 
                    type="number" 
                    value={limiteDiario}
                    onChange={(e) => setLimiteDiario(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dias-manutencao">Intervalo de Manutenção (dias)</Label>
                  <Input 
                    id="dias-manutencao" 
                    type="number" 
                    value={diasManutencao}
                    onChange={(e) => setDiasManutencao(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Idioma do Sistema</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tema e Aparência</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <Label>Tema do Sistema</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Escolha entre tema claro e escuro
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuario" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>
                Configure suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Seu nome completo" defaultValue="Administrador Sistema" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" defaultValue="admin@empresa.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" placeholder="Seu cargo" defaultValue="Administrador de TI" />
                </div>

                <div className="space-y-2">
                  <Label>Nível de Acesso</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferências de Visualização</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mostrar Tutorial Inicial</Label>
                      <p className="text-sm text-muted-foreground">
                        Exibir tutorial para novos usuários
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dashboard Expandido</Label>
                      <p className="text-sm text-muted-foreground">
                        Mostrar mais informações no dashboard
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure quando e como receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label>Notificações por E-mail</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas importantes por e-mail
                    </p>
                  </div>
                  <Switch 
                    checked={notificacaoEmail}
                    onCheckedChange={setNotificacaoEmail}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label>Notificações do Sistema</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mostrar notificações na interface
                    </p>
                  </div>
                  <Switch 
                    checked={notificacaoSistema}
                    onCheckedChange={setNotificacaoSistema}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <Label>Alertas de Manutenção</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando impressoras precisarem de manutenção
                    </p>
                  </div>
                  <Switch 
                    checked={manutencaoAlerta}
                    onCheckedChange={setManutencaoAlerta}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Frequência de Notificações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Relatórios Automáticos</Label>
                    <Select defaultValue="semanal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="nunca">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Alertas de Limite</Label>
                    <Select defaultValue="imediato">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imediato">Imediato</SelectItem>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="nunca">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Configure opções de segurança e acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação em Duas Etapas</Label>
                    <p className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Inativo</Badge>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sessão Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Desconectar automaticamente após inatividade
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Log de Atividades</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar todas as ações dos usuários
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Controle de Acesso</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tempo de Sessão (minutos)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="240">4 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nível de Log</Label>
                    <Select defaultValue="medio">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico</SelectItem>
                        <SelectItem value="medio">Médio</SelectItem>
                        <SelectItem value="detalhado">Detalhado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Alterar Senha</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha-atual">Senha Atual</Label>
                    <Input id="senha-atual" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input id="nova-senha" type="password" />
                  </div>
                </div>
                <Button variant="outline">Alterar Senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dados" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Gerenciamento de Dados
              </CardTitle>
              <CardDescription>
                Configure backups, importação e exportação de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <Label>Backup Automático</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Criar backup automático dos dados diariamente
                    </p>
                  </div>
                  <Switch 
                    checked={backupAutomatico}
                    onCheckedChange={setBackupAutomatico}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Exportar Dados</h3>
                <p className="text-sm text-muted-foreground">
                  Baixe uma cópia de todos os seus dados em formato CSV ou JSON
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExportarDados}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                  <Button variant="outline" onClick={handleExportarDados}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar JSON
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Importar Dados</h3>
                <p className="text-sm text-muted-foreground">
                  Importe dados de um arquivo CSV ou JSON
                </p>
                <Button variant="outline" onClick={handleImportarDados}>
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Arquivo
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configuração de Backup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequência do Backup</Label>
                    <Select defaultValue="diario">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Retenção (dias)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 dias</SelectItem>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="365">1 ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-destructive mb-2">Zona de Perigo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Estas ações são irreversíveis. Proceda com cuidado.
                </p>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm">
                    Limpar Todos os Dados
                  </Button>
                  <Button variant="outline" size="sm">
                    Restaurar Backup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}