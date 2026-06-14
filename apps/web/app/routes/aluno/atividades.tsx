import { useParams, Link } from "react-router"

type Atividade = {
  id: string
  turmaId: string
  titulo: string
  materia: string
  dataEntrega: string
  status: "pendente" | "entregue" | "atrasado"
  nota?: number
}

export default function Atividades() {
  const { id } = useParams()

  const atividades: Atividade[] = [
    {
      id: "1",
      turmaId: "1",
      titulo: "Lista de Frações",
      materia: "Matemática",
      dataEntrega: "Amanhã",
      status: "pendente",
      nota: 8.5,
    },
    {
      id: "2",
      turmaId: "1",
      titulo: "Redação Argumentativa",
      materia: "Português",
      dataEntrega: "Sexta-feira",
      status: "entregue",
      nota: 9,
    },
    {
      id: "3",
      turmaId: "1",
      titulo: "Exercícios de História",
      materia: "História",
      dataEntrega: "Semana que vem",
      status: "atrasado",
    },
  ]

  function getStatusColor(status: Atividade["status"]) {
    if (status === "pendente") return "text-yellow-600 border-yellow-300"
    if (status === "entregue") return "text-green-600 border-green-300"
    return "text-red-600 border-red-300"
  }

  return (
    <main className="min-h-screen space-y-6 px-6 py-8">
      <header>
        <h1 className="text-2xl font-bold">Atividades da Turma {id}</h1>
        <p className="text-sm text-muted-foreground">
          Todas as atividades disponíveis nesta turma.
        </p>
      </header>

      <section className="space-y-3">
        {atividades.map((a) => (
          <Link
            key={a.id}
            to={`/aluno/turma/${id}/atividades/${a.id}`}
            className="block rounded-xl border p-4 transition hover:bg-muted"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{a.titulo}</p>

              <span
                className={`rounded-full border px-2 py-1 text-xs ${getStatusColor(
                  a.status
                )}`}
              >
                {a.status}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{a.materia}</span>
              <span>Entrega: {a.dataEntrega}</span>
            </div>

            {a.nota !== undefined && (
              <p className="mt-2 text-xs text-muted-foreground">
                Nota: {a.nota}
              </p>
            )}
          </Link>
        ))}
      </section>
    </main>
  )
}
