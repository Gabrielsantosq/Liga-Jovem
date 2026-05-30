import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Progress } from "@workspace/ui/components/progress"

export function DisciplinaDetalhes() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">Matemática</h1>

        <p className="text-muted-foreground">Prof. Ana Clara</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Média</p>
            <h2 className="text-3xl font-bold">8.5</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Frequência</p>
            <h2 className="text-3xl font-bold">95%</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Atividades</p>
            <h2 className="text-3xl font-bold">12/15</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Posição</p>
            <h2 className="text-3xl font-bold">3º</h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso da disciplina</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <Progress value={85} />

          <p className="text-sm text-muted-foreground">
            Você concluiu 85% do conteúdo.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximas atividades</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            <li>Exercícios de funções</li>
            <li>Lista de equações</li>
            <li>Trabalho de geometria</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimas notas</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            <li>Prova de Funções — 9.0</li>
            <li>Lista de Exercícios — 8.5</li>
            <li>Trabalho de Geometria — 10.0</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
