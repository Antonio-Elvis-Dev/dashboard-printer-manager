import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import {
  Printer,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Users,
  Activity,
  Settings,
  Eye,
  UserPlus
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PrinterModal } from '@/components/impressoras/printer-modal';
import { TabsView } from '@/components/impressoras/tabs-view';

export default function ImpressorasPage() {
  const [busca, setBusca] = useState('');
  const [filtroSetor, setFiltroSetor] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<any>(null);
  const [modalMode, setModalMode] = useState("create");

  const form = useForm({
    defaultValues: {
      nome: '',
      modelo: '',
      numeroSerie: '',
      tipo: '',
      setor: '',
      status: true,
      localizacao: '',
      observacoes: '',
      ultimaLeitura: '',
      leituraAtual: ''
    }
  });

  const impressorasMock = [
    {
      id: '1',
      nome: 'HP LaserJet Pro 400',
      modelo: 'M404n',
      numeroSerie: 'VNC4X12345',
      tipo: 'pb',
      setor: 'Financeiro',
      status: 'ativa',
      localizacao: 'Sala 101',
      ultimaLeitura: 15420,
      leituraAtual: 15687,
      totalImpressoes: 267,
      pessoasAssociadas: ['João Silva', 'Ana Costa'],
      ultimaManutencao: '2024-01-10'
    },
    {
      id: '2',
      nome: 'Canon PIXMA G6010',
      modelo: 'G6010',
      numeroSerie: 'CN9876543',
      tipo: 'colorida',
      setor: 'Marketing',
      status: 'ativa',
      localizacao: 'Sala 205',
      ultimaLeitura: 8945,
      leituraAtual: 9123,
      totalImpressoes: 178,
      pessoasAssociadas: ['Maria Santos', 'Carlos Lima'],
      ultimaManutencao: '2024-01-05'
    },
    {
      id: '3',
      nome: 'Brother HL-L2395DW',
      modelo: 'HL-L2395DW',
      numeroSerie: 'BR5555678',
      tipo: 'pb',
      setor: 'RH',
      status: 'inativa',
      localizacao: 'Sala 150',
      ultimaLeitura: 12300,
      leituraAtual: 12300,
      totalImpressoes: 0,
      pessoasAssociadas: ['Pedro Oliveira'],
      ultimaManutencao: '2023-12-20'
    }
  ];


  const queryClient = useQueryClient()


  const { mutate: deletePrinterMutation } = useMutation({
    mutationFn: async () => {
      console.log('Teste')
    } ,
    onSuccess: () => {
      toast.success("Impressora deletada com sucesso.")
      queryClient.invalidateQueries({ queryKey: ['printerList'] })
    },
    onError: () => {
      toast.error("Erro ao deletar impressora")
    }

  })

  const handleSubmit = (data: any) => {
    console.log('Nova impressora:', data);
    setIsModalOpen(false);
    form.reset();
  };

  const handleViewDetails = (impressora: any) => {
    setSelectedPrinter(impressora);
    setIsDetailOpen(true);
  };


  function handleCreatePrinter(data) {
    console.log("Criando impressora:", data);
    // Chamar API de criação...
  }

  function handleEditPrinter(data) {
    console.log("Editando impressora:", data);
    // Chamar API de edição...
  }

  function openCreateModal() {
    setSelectedPrinter(null);
    setModalMode("create");
    setIsModalOpen(true);
  }

  function openEditModal(printer) {
    setSelectedPrinter(printer);
    setModalMode("edit");
    setIsModalOpen(true);
  }
  // TODO - Deletar impressora
  const handleDeletePrinter = (impressora: any) => {
    if (confirm("Tem certeza que deseja deletar esta impressora?")) {
      deletePrinterMutation(impressora)
    }
  };

function handleOpenChange(isOpen) {
  setIsModalOpen(isOpen);

  // Quando fechar a modal, volta para o modo de criação
  if (!isOpen) {
    setModalMode("create");
    setSelectedPrinter(null);
  }
}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impressoras</h1>
          <p className="text-muted-foreground">
            Gerencie todas as impressoras da empresa
          </p>
        </div>

        {/* TODO */}
        <PrinterModal
         isOpen={isModalOpen} 
         onOpenChange={handleOpenChange} 
         mode={modalMode}
         defaultValues={selectedPrinter}
         onSubmit={modalMode === 'create' ? handleCreatePrinter : handleEditPrinter}
         />

      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar impressoras..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label>Status</Label>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="inativa">Inativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipo</Label>
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
          </div>
        </CardContent>
      </Card>

      {/* Lista de Impressoras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Lista de Impressoras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome/Modelo</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Leituras</TableHead>
                <TableHead>Pessoas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {impressorasMock.map((impressora) => (
                <TableRow key={impressora.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{impressora.nome}</div>
                      <div className="text-sm text-muted-foreground">
                        {impressora.modelo} • {impressora.numeroSerie}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        📍 {impressora.localizacao}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{impressora.setor}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={impressora.tipo === 'colorida' ? 'default' : 'secondary'}>
                      {impressora.tipo === 'colorida' ? 'Colorida' : 'P&B'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={impressora.status === 'ativa' ? 'default' : 'destructive'}>
                      {impressora.status === 'ativa' ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Atual: {impressora.leituraAtual.toLocaleString()}</div>
                      <div className="text-muted-foreground">
                        Anterior: {impressora.ultimaLeitura.toLocaleString()}
                      </div>
                      <div className="font-medium text-primary">
                        Diff: {impressora.totalImpressoes}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{impressora.pessoasAssociadas.length}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* TODO - ações impressoras*/}
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(impressora)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm"
                        onClick={() => openEditModal(impressora)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm"
                        onClick={() => handleDeletePrinter(impressora)}
                      >
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

      {/* Dialog de Detalhes */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Printer className="h-5 w-5" />
              {selectedPrinter?.nome}
            </DialogTitle>
          </DialogHeader>

          {selectedPrinter && (
           <TabsView selectedPrinter={selectedPrinter}/>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}