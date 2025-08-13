import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Building2, Plus, Search, Edit, Trash2, Users, Printer } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function SetoresPage() {
  const [busca, setBusca] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetor, setEditingSetor] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      nome: '',
      descricao: '',
      responsavel: '',
      localizacao: ''
    }
  });

  const setoresMock = [
    {
      id: '1',
      nome: 'Financeiro',
      descricao: 'Departamento responsável pela gestão financeira e contábil',
      responsavel: 'Ana Silva',
      localizacao: 'Andar 1 - Ala Sul',
      totalPessoas: 8,
      totalImpressoras: 2,
      impressoesMes: 1250,
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Marketing',
      descricao: 'Setor de marketing digital e comunicação',
      responsavel: 'Carlos Lima',
      localizacao: 'Andar 2 - Ala Norte',
      totalPessoas: 12,
      totalImpressoras: 3,
      impressoesMes: 2100,
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Recursos Humanos',
      descricao: 'Gestão de pessoas e desenvolvimento organizacional',
      responsavel: 'Maria Santos',
      localizacao: 'Andar 1 - Ala Norte',
      totalPessoas: 5,
      totalImpressoras: 1,
      impressoesMes: 680,
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Tecnologia da Informação',
      descricao: 'Suporte técnico e desenvolvimento de sistemas',
      responsavel: 'João Pedro',
      localizacao: 'Andar 3 - Ala Sul',
      totalPessoas: 15,
      totalImpressoras: 2,
      impressoesMes: 890,
      status: 'ativo'
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('Setor:', data);
    setIsDialogOpen(false);
    setEditingSetor(null);
    form.reset();
  };

  const handleEdit = (setor: any) => {
    setEditingSetor(setor);
    form.reset(setor);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSetor(null);
    form.reset();
  };

  const filteredSetores = setoresMock.filter(setor =>
    setor.nome.toLowerCase().includes(busca.toLowerCase()) ||
    setor.responsavel.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Setores</h1>
          <p className="text-muted-foreground">
            Gerencie os setores da empresa e suas informações
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Setor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {editingSetor ? 'Editar Setor' : 'Cadastrar Novo Setor'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Setor</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Recursos Humanos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do responsável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="localizacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Andar 1 - Ala Sul" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Breve descrição das atividades do setor..." 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingSetor ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar setores por nome ou responsável..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{setoresMock.length}</p>
                <p className="text-sm text-muted-foreground">Total de Setores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {setoresMock.reduce((acc, setor) => acc + setor.totalPessoas, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total de Pessoas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Printer className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {setoresMock.reduce((acc, setor) => acc + setor.totalImpressoras, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total de Impressoras</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded-full bg-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {setoresMock.reduce((acc, setor) => acc + setor.impressoesMes, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Impressões no Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Setores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Lista de Setores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setor</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Pessoas</TableHead>
                <TableHead>Impressoras</TableHead>
                <TableHead>Impressões/Mês</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSetores.map((setor) => (
                <TableRow key={setor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{setor.nome}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {setor.descricao}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      {setor.responsavel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{setor.localizacao}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {setor.totalPessoas} pessoas
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {setor.totalImpressoras} impressoras
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {setor.impressoesMes.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(setor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredSetores.length === 0 && busca && (
        <Card>
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum setor encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca ou cadastre um novo setor.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}