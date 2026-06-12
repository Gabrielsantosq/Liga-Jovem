import { Card, CardContent } from "@workspace/ui/components/card"
import { Users } from "lucide-react"
import { Link } from "react-router"

type Turma = {
  id: number
  nome: string

  alunos: number
  media: number
}

export function CardTurma({ turma }: { turma: Turma }) {
  return (
    <Link to={`/turmas/${turma.id}`} className="block">
      <Card className="space-y-5 rounded-3xl transition hover:border-primary">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>

            <div>
              <h2 className="font-semibold">{turma.nome}</h2>

              <p className="text-sm text-muted-foreground">
                {turma.alunos} alunos
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold">{turma.media}</p>

            <p className="text-sm text-muted-foreground">Média</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
