import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Users, Mail, Building2, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { mockPessoas, mockSetores } from '@/data/mockData';
import type { Pessoa } from '@/types';

export default function PessoasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSetor, setSelectedSetor] = useState<string>('');

  // Simular carregamento de dados
  const { data: pessoas, isLoading } = useQuery({
    queryKey: ['pessoas'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPessoas;
    }
  });

  const { data: setores } = useQuery({
    queryKey: ['setores'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSetores;
    }
  });

  const getSetorNome = (setorId?: string) => {
    return setores?.find(s => s.id === setorId)?.nome || 'Sem setor';
  };

  const filteredPessoas = pessoas?.filter(pessoa => {
    const matchesSearch = pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pessoa.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSetor = !selectedSetor || pessoa.setorId === selectedSetor;
    return matchesSearch && matchesSetor;
  }) || [];

  if (isLoading) {
    return <PessoasSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pessoas</h1>
          <p className="text-muted-foreground">
            Gerencie as pessoas cadastradas no sistema
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Pessoa
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={selectedSetor}
                onChange={(e) => setSelectedSetor(e.target.value)}
              >
                <option value="">Todos os setores</option>
                {setores?.map(setor => (
                  <option key={setor.id} value={setor.id}>
                    {setor.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {pessoas?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Total de pessoas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Building2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {setores?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Setores ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredPessoas.length}
                </p>
                <p className="text-sm text-muted-foreground">Resultados filtrados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de pessoas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pessoas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPessoas.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma pessoa encontrada</p>
              </div>
            ) : (
              filteredPessoas.map((pessoa) => (
                <div
                  key={pessoa.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-medium">
                        {pessoa.nome.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{pessoa.nome}</h3>
                      <p className="text-sm text-muted-foreground">{pessoa.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      {getSetorNome(pessoa.setorId)}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PessoasSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div>
                  <Skeleton className="h-8 w-12 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}