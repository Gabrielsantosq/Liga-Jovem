import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

const notas = {
  "1": [
    { disciplina: "Matemática", media: 8.5 },
    { disciplina: "Português", media: 7.0 },
    { disciplina: "Física", media: 5.8 },
    { disciplina: "Biologia", media: 4.0 },
  ],

  "2": [
    { disciplina: "Matemática", media: 9.0 },
    { disciplina: "Português", media: 8.0 },
    { disciplina: "Física", media: 6.5 },
    { disciplina: "Biologia", media: 5.0 },
  ],

  "3": [
    { disciplina: "Matemática", media: 8.0 },
    { disciplina: "Português", media: 7.5 },
    { disciplina: "Física", media: 7.0 },
    { disciplina: "Biologia", media: 6.0 },
  ],
}

type DisciplinaNota = {
  disciplina: string
  media: number
}

function ListaNotas({ disciplinas }: { disciplinas: DisciplinaNota[] }) {
  const mediaGeral =
    disciplinas.reduce((acc, item) => acc + item.media, 0) / disciplinas.length

  const getSituacao = (media: number) => {
    if (media >= 7)
      return {
        texto: "Ótimo",
        classe: "text-green-500",
      }

    if (media >= 5)
      return {
        texto: "Médio",
        classe: "text-yellow-500",
      }

    return {
      texto: "Ruim",
      classe: "text-red-500",
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center py-6">
          <p className="text-muted-foreground">Média Geral</p>

          <h2 className="text-4xl font-bold">{mediaGeral.toFixed(1)}</h2>
        </CardContent>
      </Card>

      {disciplinas.map((disciplina) => {
        const situacao = getSituacao(disciplina.media)

        return (
          <Card key={disciplina.disciplina}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <h3 className="font-medium">{disciplina.disciplina}</h3>

                <p className={`text-sm ${situacao.classe}`}>{situacao.texto}</p>
              </div>

              <div className="text-2xl font-bold">{disciplina.media}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function Notas() {
  return (
    <div className="space-y-6 p-4">
      <header>
        <h1 className="text-2xl font-bold">Minhas Notas</h1>

        <p className="text-muted-foreground">
          Acompanhe seu desempenho por bimestre
        </p>
      </header>

      <Tabs defaultValue="1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1">1º Bimestre</TabsTrigger>

          <TabsTrigger value="2">2º Bimestre</TabsTrigger>

          <TabsTrigger value="3">3º Bimestre</TabsTrigger>
        </TabsList>

        <TabsContent value="1">
          <ListaNotas disciplinas={notas["1"]} />
        </TabsContent>

        <TabsContent value="2">
          <ListaNotas disciplinas={notas["2"]} />
        </TabsContent>

        <TabsContent value="3">
          <ListaNotas disciplinas={notas["3"]} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
