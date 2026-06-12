import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"

import { Link } from "lucide-react"

type Atividade = {
  id: number
  titulo: string
  materia: string
  turma: string
  data: string
  entregues: number
  totalAlunos: number
  status: "pendente" | "concluida"
}

const atividade: Atividade[] = [
  {
    id: 1,
    titulo: "",
    materia: "Matematica",
    turma: " 1 ano ",
    data: "10/05",
    entregues: 10,
    totalAlunos: 30,
    status: "pendente",
  },
  {
    id: 2,
    titulo: "",
    materia: "Fisica",
    turma: "",
    data: "10/05",
    entregues: 10,
    totalAlunos: 30,
    status: "pendente",
  },
]

function AtividadeItem({ atividade }: { atividade: Atividade }) {
  const porcentagem = (atividade.entregues / atividade.totalAlunos) * 100

  return (
    <div className="space-y-3 rounded-2xl border p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"></div>

          <div>
            <h3 className="font-medium">{atividade.titulo}</h3>

            <p className="text-sm text-muted-foreground">
              {atividade.materia} • {atividade.turma}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Entregas</span>

          <span className="font-medium">
            {atividade.entregues}/{atividade.totalAlunos}
          </span>
        </div>

        <Progress value={porcentagem} />
      </div>
    </div>
  )
}

export function PostagemAtividade() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Atividades Recentes</CardTitle>

        <Button variant="ghost" asChild>
          <Link to="/">Ver todas</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {atividade.slice(0, 3).map((atividade) => (
          <AtividadeItem key={atividade.id} atividade={atividade} />
        ))}
      </CardContent>
    </Card>
  )
}
