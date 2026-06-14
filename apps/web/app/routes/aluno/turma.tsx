import { useParams, Link } from "react-router"

type AtividadeResumo = {
  id: string

  titulo: string
  materia: string
  dataEntrega: string
  status: "pendente" | "entregue" | "atrasado"
  nota?: number
}

export default function Turma() {
  const { id } = useParams()

  const atividades: AtividadeResumo[] = [
    {
      id: "1",

      titulo: "Lista de Frações",
      materia: "Matemática",
      dataEntrega: "Amanhã",
      status: "pendente",
      nota: 8.5,
    },
    {
      id: "2",

      titulo: "Redação Argumentativa",
      materia: "Português",
      dataEntrega: "Sexta-feira",
      status: "entregue",
      nota: 9,
    },
  ]

  return (
    <main className="min-h-screen space-y-8 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Turma {id}</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe suas atividades, notas e avisos da turma.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border p-4">
          <p className="text-xl font-semibold">{atividades.length}</p>
          <p className="text-xs text-muted-foreground">Atividades</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xl font-semibold">8.2</p>
          <p className="text-xs text-muted-foreground">Média</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xl font-semibold">80%</p>
          <p className="text-xs text-muted-foreground">Progresso</p>
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Atividades recentes</h2>

          <Link
            to={`/aluno/turma/${id}/atividades`}
            className="text-sm text-primary"
          >
            Ver todas
          </Link>
        </div>

        <div className="space-y-2">
          {atividades.map((a) => (
            <Link
              key={a.id}
              to={`/aluno/turma/${id}/atividades/${a.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{a.titulo}</p>

                <span
                  className={`rounded-full border px-2 py-1 text-xs ${
                    a.status === "pendente"
                      ? "border-yellow-300 text-yellow-600"
                      : a.status === "entregue"
                        ? "border-green-300 text-green-600"
                        : "border-red-300 text-red-600"
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{a.materia}</span>
                <span>Entrega: {a.dataEntrega}</span>
              </div>

              {a.nota !== undefined && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Nota: {a.nota}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
