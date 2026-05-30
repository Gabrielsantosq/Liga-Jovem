import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Button } from "@workspace/ui/components/button"

import { BookOpen, FlaskConical, PenSquare, Calculator } from "lucide-react"

function AtividadeItem({
  titulo,
  materia,
  professor,
  data,
  status,
  icon,
}: {
  titulo: string
  materia: string
  professor: string
  data: string
  status: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl p-3 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <h3 className="font-medium">{titulo}</h3>

          <p className="text-sm text-muted-foreground">
            {materia} • {professor}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{data}</span>

        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "Pendente" ? "bg-yellow-100 text-yellow-700" : ""
          } ${status === "Concluída" ? "bg-green-100 text-green-700" : ""} ${
            status === "Rascunho" ? "bg-blue-100 text-blue-700" : ""
          } `}
        >
          {status}
        </div>
      </div>
    </div>
  )
}

export function CardAtividade() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Atividades da semana</CardTitle>

        <Button variant="ghost">Ver todas</Button>
      </CardHeader>

      <CardContent className="space-y-2">
        <AtividadeItem
          titulo="Equações do 1º grau"
          materia="Matemática"
          professor="Prof. Ana Clara"
          data="14/05"
          status="Pendente"
          icon={<Calculator className="h-5 w-5" />}
        />

        <AtividadeItem
          titulo="Reações químicas"
          materia="Ciências"
          professor="Prof. João Pedro"
          data="15/05"
          status="Concluída"
          icon={<FlaskConical className="h-5 w-5" />}
        />

        <AtividadeItem
          titulo="Revolução Francesa"
          materia="História"
          professor="Prof. Maria Eduarda"
          data="16/05"
          status="Concluída"
          icon={<BookOpen className="h-5 w-5" />}
        />

        <AtividadeItem
          titulo="Produção de texto"
          materia="Português"
          professor="Prof. Lucas Martins"
          data="17/05"
          status="Rascunho"
          icon={<PenSquare className="h-5 w-5" />}
        />
      </CardContent>
    </Card>
  )
}
