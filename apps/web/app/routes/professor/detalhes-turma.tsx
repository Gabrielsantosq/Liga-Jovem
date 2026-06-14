import { Button } from "@workspace/ui/components/button"
import { Link, useParams } from "react-router"

type Atividade = {
  id: string
  titulo: string
  materia: string
  entrega: string
}

export default function DetalhesTurma() {
  const { id } = useParams()

  const turma = {
    nome: "1º Ano B",
    codigo: "ABC123",
    alunos: 28,
  }

  const atividades: Atividade[] = [
    {
      id: "1",
      titulo: "Lista de Frações",
      materia: "Matemática",
      entrega: "10/06",
    },
    {
      id: "2",
      titulo: "Redação Argumentativa",
      materia: "Português",
      entrega: "15/06",
    },
  ]

  return (
    <main className="min-h-screen space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{turma.nome}</h1>

        <p className="text-sm text-muted-foreground">
          Código da turma: {turma.codigo}
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-bold">{turma.alunos}</p>
          <p className="text-sm text-muted-foreground">Alunos</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-2xl font-bold">{atividades.length}</p>
          <p className="text-sm text-muted-foreground">Atividades</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Atividades</h2>

          <Button asChild>
            <Link to={`/professor/turmas/${id}/atividades/nova`}>
              Nova atividade
            </Link>
          </Button>
        </div>

        <div className="space-y-3">
          {atividades.map((atividade) => (
            <Link
              key={atividade.id}
              to={`/professor/turmas/${id}/atividades/${atividade.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{atividade.titulo}</p>

                <span className="text-sm text-muted-foreground">
                  {atividade.entrega}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {atividade.materia}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
