import { Activity, Trash2, UserPlus, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export const TabsView =({selectedPrinter})=>{
    return(
         <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="pessoas">Pessoas</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Informações Básicas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">MODELO</Label>
                        <p className="text-sm">{selectedPrinter.modelo}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">NÚMERO DE SÉRIE</Label>
                        <p className="text-sm">{selectedPrinter.numeroSerie}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">LOCALIZAÇÃO</Label>
                        <p className="text-sm">{selectedPrinter.localizacao}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">ÚLTIMA MANUTENÇÃO</Label>
                        <p className="text-sm">{new Date(selectedPrinter.ultimaManutencao).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contadores</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">ÚLTIMA LEITURA</Label>
                        <p className="text-sm font-medium">{selectedPrinter.ultimaLeitura.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">LEITURA ATUAL</Label>
                        <p className="text-sm font-medium">{selectedPrinter.leituraAtual.toLocaleString()}</p>
                      </div>
                      <Separator />
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">TOTAL DE IMPRESSÕES</Label>
                        <p className="text-lg font-bold text-primary">{selectedPrinter.totalImpressoes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pessoas" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pessoas Associadas</h3>

                  {/* TODO */}

                  <Button size="sm" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Associar Pessoa
                  </Button>
                </div>

                <div className="grid gap-2">
                  {selectedPrinter.pessoasAssociadas.map((pessoa, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{pessoa}</p>
                              <p className="text-sm text-muted-foreground">245 impressões este mês</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="historico" className="space-y-4">
                <h3 className="text-lg font-semibold">Histórico de Uso</h3>
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Histórico detalhado em desenvolvimento</p>
                </div>
              </TabsContent>
            </Tabs>
    )
}