import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {  Search, Users, Mail, Building2, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPessoas, mockSetores } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PessoasSkeleton } from '@/components/skeleton/pessoas-skeleton';
import { PessoasModal } from '@/components/pessoas/pessoas-modal';
import { toast } from 'sonner';
import { queryClient } from '@/lib/react-query';

export default function PessoasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSetor, setSelectedSetor] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<string>('');
  const [modalMode, setModalMode] = useState("create");

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
  const { mutate: deletePeopleMutation } = useMutation({
    mutationFn:async () => (console.log("Teste")),
    onSuccess: () => {
      toast.success("Pessoa deletada com sucesso.")
      queryClient.invalidateQueries({ queryKey: ['pessoaList'] })
    },
    onError: () => {
      toast.error("Erro ao deletar Pessoa")
    }
    
  })
  
  
    if (isLoading) {
      return <PessoasSkeleton />;
    }
  function openEditModal(pessoa) {
    setSelectedPeople(pessoa);
    setModalMode("edit");
    setIsModalOpen(true);
  }
  const handleDeletePeople = (pessoa: any) => {
    if (confirm("Tem certeza que deseja deletar esta pessoa?")) {
      deletePeopleMutation(pessoa)
    }
  };

  function handleCreatePeople(data) {
    console.log("Criando Pessoa:", data);
    // Chamar API de criação...
  }

  function handleEditPeople(data) {
    console.log("Editando Pessoa:", data);
    // Chamar API de edição...
  }

  function handleOpenChange(isOpen) {
    setIsModalOpen(isOpen);

    // Quando fechar a modal, volta para o modo de criação
    if (!isOpen) {
      setModalMode("create");
      setSelectedPeople(null);
    }
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
        <PessoasModal
          isOpen={isModalOpen}
          onOpenChange={handleOpenChange}
          mode={modalMode}
          defaultValues={selectedPeople}
          onSubmit={modalMode === 'create' ? handleCreatePeople : handleEditPeople}
        />
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Button className='absolute  right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6 ' onClick={() => setSelectedSetor('')}><X /></Button>
              </div>
            </div>
            <div className="sm:w-48">

              <Select value={selectedSetor} onValueChange={setSelectedSetor}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os setores" />
                </SelectTrigger>

                <SelectContent className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  {setores?.map(setor => (
                    <SelectItem key={setor.id} value={setor.id}>
                      {setor.nome}

                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>

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
                      <Button variant="ghost" size="sm"
                        onClick={() => openEditModal(pessoa)}

                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"
                        onClick={() => handleDeletePeople(pessoa)}
                      >
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
