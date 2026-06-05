import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Button } from "@workspace/ui/components/button"

import { Link } from "react-router"
import { BookOpen, FlaskConical, PenSquare, Calculator } from "lucide-react"

type Atividade = {
  id: number
  titulo: string
  materia: string
  professor: string
  data: string
  status: "pendente" | "concluida" | "rascunho"
  icon: React.ReactNode
}

const atividades: Atividade[] = [
  {
    id: 1,
    titulo: "Equações do 1º grau",
    materia: "Matemática",
    professor: "Prof. Ana Clara",
    data: "14/05",
    status: "pendente",
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    id: 2,
    titulo: "Reações químicas",
    materia: "Ciências",
    professor: "Prof. João Pedro",
    data: "15/05",
    status: "concluida",
    icon: <FlaskConical className="h-5 w-5" />,
  },
  {
    id: 3,
    titulo: "Revolução Francesa",
    materia: "História",
    professor: "Prof. Maria Eduarda",
    data: "16/05",
    status: "concluida",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: 4,
    titulo: "Produção de texto",
    materia: "Português",
    professor: "Prof. Lucas Martins",
    data: "17/05",
    status: "rascunho",
    icon: <PenSquare className="h-5 w-5" />,
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
  return (
    <div className="flex items-center justify-between rounded-2xl border p-3">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {atividade.icon}
        </div>

        <div>
          <h3 className="font-medium">{atividade.titulo}</h3>

          <p className="text-sm text-muted-foreground">
            {atividade.materia} • {atividade.professor}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{atividade.data}</span>

        <StatusBadge status={atividade.status} />
      </div>
    </div>
  )
}

export function CardAtividade() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Atividades da Semana</CardTitle>

        <Button variant="ghost" asChild>
          <Link to={"/minhas-atividades"}>Ver Todas</Link>
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
