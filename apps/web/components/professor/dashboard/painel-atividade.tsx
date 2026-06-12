import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Button } from "@workspace/ui/components/button"

import { Progress } from "@workspace/ui/components/progress"

import { Link } from "react-router"

import { BookOpen, FlaskConical, Calculator } from "lucide-react"

type Atividade = {
  id: number
  titulo: string
  materia: string
  turma: string
  data: string
  entregues: number
  totalAlunos: number
  status: "pendente" | "concluida" | "rascunho"
  icon: React.ReactNode
}

const atividades: Atividade[] = [
  {
    id: 1,
    titulo: "Equações do 1º grau",
    materia: "Matemática",
    turma: "1º Ano A",
    data: "14/05",
    entregues: 20,
    totalAlunos: 30,
    status: "pendente",
    icon: <Calculator className="h-5 w-5" />,
  },

  {
    id: 2,
    titulo: "Reações químicas",
    materia: "Ciências",
    turma: "8º Ano A",
    data: "15/05",
    entregues: 30,
    totalAlunos: 30,
    status: "concluida",
    icon: <FlaskConical className="h-5 w-5" />,
  },

  {
    id: 3,
    titulo: "Revolução Francesa",
    materia: "História",
    turma: "7º Ano B",
    data: "16/05",
    entregues: 18,
    totalAlunos: 28,
    status: "pendente",
    icon: <BookOpen className="h-5 w-5" />,
  },
]

function StatusBadge({ status }: { status: Atividade["status"] }) {
  const styles = {
    pendente: "bg-yellow-100 text-yellow-700",
    concluida: "bg-green-100 text-green-700",
    rascunho: "bg-blue-100 text-blue-700",
  }

  const labels = {
    pendente: "Pendente",
    concluida: "Concluída",
    rascunho: "Rascunho",
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}

function AtividadeItem({ atividade }: { atividade: Atividade }) {
  const porcentagem = (atividade.entregues / atividade.totalAlunos) * 100

  return (
    <div className="space-y-3 rounded-2xl border p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {atividade.icon}
          </div>

          <div>
            <h3 className="font-medium">{atividade.titulo}</h3>

            <p className="text-sm text-muted-foreground">
              {atividade.materia} • {atividade.turma}
            </p>
          </div>
        </div>

        <StatusBadge status={atividade.status} />
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

export function PainelAtividade() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Atividades Recentes</CardTitle>

        <Button variant="ghost" asChild>
          <Link to="/turmas">Ver todas</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {atividades.slice(0, 3).map((atividade) => (
          <AtividadeItem key={atividade.id} atividade={atividade} />
        ))}
      </CardContent>
    </Card>
  )
}
