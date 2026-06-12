import { Card, CardContent } from "@workspace/ui/components/card"

import { Users, UserSearch, ClipboardPenIcon, Calculator } from "lucide-react"
const resumo = [
  {
    icon: <Users className="h-8 w-8" />,
    titulo: "Turmas",
    subtitulo: "Ativas",
  },
  {
    icon: <UserSearch className="h-8 w-8" />,
    titulo: "Alunos",
    subtitulo: "Matriculados  ",
  },
  {
    icon: <ClipboardPenIcon className="h-8 w-8" />,
    titulo: "Atividade",
    subtitulo: "Este mes",
  },
  {
    icon: <Calculator className="h-8 w-8" />,
    titulo: "Media",
    subtitulo: "Das Turmas",
  },
]

export function PainelProfessor() {
  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {resumo.map((item) => (
        <Card key={item.titulo}>
          <CardContent className="flex flex-col items-center p-2">
            {item.icon}

            <p className="mt-1 text-xs font-medium">{item.titulo}</p>

            <p className="text-[10px] text-muted-foreground">
              {item.subtitulo}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
