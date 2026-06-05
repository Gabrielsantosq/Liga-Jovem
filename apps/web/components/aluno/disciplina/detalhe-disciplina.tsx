import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Progress } from "@workspace/ui/components/progress"

type Disciplina = {
  id: number
  nome: string
  professor: string
  media: number
  faltas: number
  progresso: number
}

export const disciplinas: Disciplina[] = [
  {
    id: 1,
    nome: "Matematica",
    professor: "jocelmo",
    media: 10,
    faltas: 0,
    progresso: 80,
  },
  {
    id: 2,
    nome: "Portugues",
    professor: "maria",
    media: 10,
    faltas: 2,
    progresso: 20,
  },
  {
    id: 3,
    nome: "Fisica",
    professor: "Wagner",
    media: 10,
    faltas: 0,
    progresso: 50,
  },
  {
    id: 4,
    nome: "Biologia",
    professor: "Adriele",
    media: 6,
    faltas: 5,
    progresso: 20,
  },
]

export function DisciplinaDetalhes() {
  return (
    <div className="md: grid grid-cols-2 gap-4">
      {disciplinas.map((disciplina) => (
        <Card key={disciplina.id}>
          <CardHeader>
            <CardTitle>{disciplina.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md: grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Professor</p>
                  <p className="font-medium">{disciplina.professor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Media</p>
                  <p className="font-medium">{disciplina.media}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Faltas</p>
                  <p className="font-medium">{disciplina.faltas}</p>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between">
                  <span>Progresso</span>
                  <span>{disciplina.progresso}</span>
                </div>
                <Progress value={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
