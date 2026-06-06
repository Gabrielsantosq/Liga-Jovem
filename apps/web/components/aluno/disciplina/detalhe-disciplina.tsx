import { Card, CardContent } from "@workspace/ui/components/card"

import { Progress } from "@workspace/ui/components/progress"

type Disciplina = {
  id: number
  nome: string
  professor: string
  media: number
  faltas: number
  progresso: number
  icon: React.ReactNode
}
import { Calculator, Atom, MapPlusIcon, FlaskConical, Hand } from "lucide-react"

export const disciplinas: Disciplina[] = [
  {
    id: 1,
    nome: "Matematica",
    professor: "jocelmo",
    media: 10,
    faltas: 0,
    progresso: 80,
    icon: <Calculator className="h-10 w-10" />,
  },
  {
    id: 2,
    nome: "Portugues",
    professor: "maria",
    media: 10,
    faltas: 2,
    progresso: 20,
    icon: <Hand className="h-10 w-10" />,
  },
  {
    id: 3,
    nome: "Fisica",
    professor: "Wagner",
    media: 10,
    faltas: 0,
    progresso: 50,
    icon: <Atom className="h-10 w-10" />,
  },
  {
    id: 4,
    nome: "Biologia",
    professor: "Adriele",
    media: 6,
    faltas: 5,
    progresso: 20,
    icon: <FlaskConical className="h-10 w-10" />,
  },
]

export function DisciplinaDetalhes() {
  return (
    <div className="space-y-4 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold"> Minhas Disciplinas</h1>

        <p className="text-muted-foreground">
          Acompanhe seu progresso nas Materias
        </p>
      </header>
      <div className="grid gap-4 px-4 pt-7 md:grid-cols-2">
        {disciplinas.map((disciplina) => (
          <Card key={disciplina.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="items-top flex h-14 w-14 shrink-0">
                  {disciplina.icon}
                </div>

                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="font-semibold">{disciplina.nome}</h3>

                    <p className="text-sm text-muted-foreground">
                      Prof. {disciplina.professor}
                    </p>

                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span>Progresso</span>

                        <span>{disciplina.progresso}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={disciplina.progresso} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
