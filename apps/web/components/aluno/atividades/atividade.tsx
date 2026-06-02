import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ListaAtividades } from "./lista-atividades"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type Atividade = {
  id: number
  titulo: string
  disciplina: string
  professor: string
  entrega: string
  status: "pendente" | "andamento" | "concluida"
}
const atividades: Atividade[] = [
  {
    id: 1,
    titulo: "Lista de Equações",
    disciplina: "Matemática",
    professor: "Jocelmo",
    entrega: "10/06/2026",
    status: "pendente",
  },
  {
    id: 2,
    titulo: "Trabalho da Revolução Francesa",
    disciplina: "História",
    professor: "Carlos",
    entrega: "12/06/2026",
    status: "andamento",
  },
  {
    id: 3,
    titulo: "Interpretação de Texto",
    disciplina: "Português",
    professor: "Ana Clara",
    entrega: "05/06/2026",
    status: "concluida",
  },
  {
    id: 4,
    titulo: "Experimento de Química",
    disciplina: "Química",
    professor: "Mariana",
    entrega: "15/06/2026",
    status: "pendente",
  },
]
export function Atividade() {
  const atividadesPendentes = atividades.filter(
    (atividade) => atividade.status === "pendente"
  )

  const atividadesAndamento = atividades.filter(
    (atividade) => atividade.status === "andamento"
  )

  const atividadesConcluidas = atividades.filter(
    (atividade) => atividade.status === "concluida"
  )
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Pendentes</p>
            <h2 className="text-3xl font-bold">{atividadesPendentes.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Em andamento</p>
            <h2 className="text-3xl font-bold">{atividadesAndamento.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Concluídas</p>
            <h2 className="text-3xl font-bold">
              {atividadesConcluidas.length}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Minhas Atividades</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="pendentes">
            <TabsList>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>

              <TabsTrigger value="andamento">Em andamento</TabsTrigger>

              <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
            </TabsList>

            <TabsContent value="pendentes">
              <ListaAtividades atividades={atividadesPendentes} />
            </TabsContent>

            <TabsContent value="andamento">
              <ListaAtividades atividades={atividadesAndamento} />
            </TabsContent>

            <TabsContent value="concluidas">
              <ListaAtividades atividades={atividadesConcluidas} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
