import { useLoaderData } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { activities } from "@workspace/database/schema/academics/activities"
import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)

  const atividadesList = await db
    .select()
    .from(activities)
    .where(eq(activities.classId, params.id!))

  return { atividades: atividadesList, classId: params.id! }
}

export default function AtividadesProfessor() {
  const { atividades, classId } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen space-y-6 p-6">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">Atividades</h1>
          <p className="text-sm text-muted-foreground">
            Todas as atividades desta turma.
          </p>
        </header>

        <Button asChild>
          <Link to={`/professor/turmas/${classId}/atividades/nova`}>
            Nova atividade
          </Link>
        </Button>
      </div>

      {atividades.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma atividade criada ainda.
        </p>
      ) : (
        <div className="space-y-3">
          {atividades.map((atividade) => (
            <Link
              key={atividade.id}
              to={`/professor/turmas/${classId}/atividades/${atividade.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{atividade.name}</p>
                <span className="text-sm text-muted-foreground">
                  {atividade.dueDate
                    ? new Date(atividade.dueDate).toLocaleDateString("pt-BR")
                    : "—"}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {atividade.description ?? atividade.type}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
