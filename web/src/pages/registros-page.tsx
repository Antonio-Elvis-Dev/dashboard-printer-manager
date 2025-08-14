import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { CalendarDays, Plus, Filter, Download, Printer, User, FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function RegistrosPage() {
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroImpressora, setFiltroImpressora] = useState('');
    const [filtroPessoa, setFiltroPessoa] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            impressora: '',
            pessoa: '',
            quantidade: '',
            tipo: '',
            data: new Date().toISOString().split('T')[0]
        }
    });

    const registrosMock = [
        {
            id: '1',
            data: '2024-01-15',
            impressora: 'HP LaserJet Pro 400',
            pessoa: 'João Silva',
            quantidade: 25,
            tipo: 'pb',
            setor: 'Financeiro'
        },
        {
            id: '2',
            data: '2024-01-15',
            impressora: 'Canon PIXMA G6010',
            pessoa: 'Maria Santos',
            quantidade: 12,
            tipo: 'colorida',
            setor: 'Marketing'
        },
        {
            id: '3',
            data: '2024-01-14',
            impressora: 'Brother HL-L2395DW',
            pessoa: 'Pedro Oliveira',
            quantidade: 8,
            tipo: 'pb',
            setor: 'RH'
        }
    ];

    const handleSubmit = (data: any) => {
        console.log('Novo registro:', data);
        setIsDialogOpen(false);
        form.reset();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Registros de Impressões</h1>
                    <p className="text-muted-foreground">
                        Gerencie e monitore todas as impressões realizadas
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Novo Registro
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Registrar Impressão
                            </DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="data"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Data</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="impressora"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Impressora</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione a impressora" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="hp-400">HP LaserJet Pro 400</SelectItem>
                                                    <SelectItem value="canon-g6010">Canon PIXMA G6010</SelectItem>
                                                    <SelectItem value="brother-2395">Brother HL-L2395DW</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="pessoa"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pessoa</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione a pessoa" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="joao">João Silva</SelectItem>
                                                    <SelectItem value="maria">Maria Santos</SelectItem>
                                                    <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="quantidade"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantidade</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tipo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Tipo" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="pb">P&B</SelectItem>
                                                        <SelectItem value="colorida">Colorida</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit">Registrar</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filtros */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtros
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>Impressora</Label>
                            <Select value={filtroImpressora} onValueChange={setFiltroImpressora}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todas as impressoras" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas as impressoras</SelectItem>
                                    <SelectItem value="hp-400">HP LaserJet Pro 400</SelectItem>
                                    <SelectItem value="canon-g6010">Canon PIXMA G6010</SelectItem>
                                    <SelectItem value="brother-2395">Brother HL-L2395DW</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Pessoa</Label>
                            <Select value={filtroPessoa} onValueChange={setFiltroPessoa}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todas as pessoas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas as pessoas</SelectItem>
                                    <SelectItem value="joao">João Silva</SelectItem>
                                    <SelectItem value="maria">Maria Santos</SelectItem>
                                    <SelectItem value="pedro">Pedro Oliveira</SelectItem>
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

                        <div className="space-y-2">
                            <Label>Período</Label>
                            <div className="flex gap-2">
                                <Input type="date" placeholder="Data inicial" />
                                <Input type="date" placeholder="Data final" />
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Exportar CSV
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            {registrosMock.length} registros encontrados
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Tabela de Registros */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Histórico de Impressões
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Impressora</TableHead>
                                <TableHead>Pessoa</TableHead>
                                <TableHead>Setor</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead>Tipo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrosMock.map((registro) => (
                                <TableRow key={registro.id}>
                                    <TableCell className="font-medium">
                                        {new Date(registro.data).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Printer className="h-4 w-4 text-muted-foreground" />
                                            {registro.impressora}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {registro.pessoa}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{registro.setor}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {registro.quantidade}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={registro.tipo === 'colorida' ? 'default' : 'secondary'}>
                                            {registro.tipo === 'colorida' ? 'Colorida' : 'P&B'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}