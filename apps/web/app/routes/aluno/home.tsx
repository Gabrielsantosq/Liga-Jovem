import { Plus } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

type Turma = {
  id: number
  nome: string
}

export default function HomeAluno() {
  const turmas: Turma[] = []

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Minhas Turmas</h1>

        <p className="text-muted-foreground">Visualize e acesse suas turmas.</p>
      </div>

      {turmas.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold">
              Você ainda não faz parte de nenhuma turma
            </h2>

            <p className="text-sm text-muted-foreground">
              Entre em uma turma utilizando um código fornecido pelo professor.
            </p>
          </div>

          <Button asChild>
            <Link to="/aluno/entrar-turma">
              <Plus className="mr-2 h-4 w-4" />
              Entrar em uma turma
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {turmas.map((turma) => (
            <Link
              key={turma.id}
              to={`/aluno/turma/${turma.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >
              <h2 className="font-semibold">{turma.nome}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Toque para acessar a turma
              </p>
            </Link>
          ))}

          <Button asChild>
            <Link to="/aluno/entrar-turma">
              <Plus className="mr-2 h-4 w-4" />
              Entrar em outra turma
            </Link>
          </Button>
        </div>
      )}
    </main>
  )
}
