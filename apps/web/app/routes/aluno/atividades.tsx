import { useLoaderData } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { activities } from "@workspace/database/schema/academics/activities"
import { submissions } from "@workspace/database/schema/academics/submission"
import { Link } from "react-router"

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await requireSession(request)

  const atividadesList = await db
    .select()
    .from(activities)
    .where(eq(activities.classId, params.id!))

  const submissoesList = await db
    .select()
    .from(submissions)
    .where(eq(submissions.userId, session.user.id))

  const submissaoMap = Object.fromEntries(
    submissoesList.map((s) => [s.activityId, s])
  )

  const now = new Date()
  const atividadesComStatus = atividadesList.map((a) => {
    const sub = a.id ? submissaoMap[a.id] : null
    let status: "pendente" | "entregue" | "atrasado" = "pendente"
    if (sub) {
      status = "entregue"
    } else if (a.dueDate && new Date(a.dueDate) < now) {
      status = "atrasado"
    }
    return { ...a, status, nota: sub?.grade ?? null }
  })

  return { atividades: atividadesComStatus, classId: params.id! }
}

function getStatusColor(status: "pendente" | "entregue" | "atrasado") {
  if (status === "pendente") return "text-yellow-600 border-yellow-300"
  if (status === "entregue") return "text-green-600 border-green-300"
  return "text-red-600 border-red-300"
}

export default function AtividadesAluno() {
  const { atividades, classId } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen space-y-6 bg-[#F7F4F1] px-6 py-8">
      <header>
        <h1 className="text-2xl font-bold">Atividades da Turma</h1>
        <p className="text-sm text-muted-foreground">
          Todas as atividades disponíveis nesta turma.
        </p>
      </header>

      {atividades.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma atividade disponível.
        </p>
      ) : (
        <section className="space-y-3">
          {atividades.map((a) => (
            <Link
              key={a.id}
              to={`/aluno/turma/${classId}/atividades/${a.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{a.name}</p>

                <span
                  className={`rounded-full border px-2 py-1 text-xs ${getStatusColor(a.status)}`}
                >
                  {a.status}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span className="capitalize">{a.type}</span>
                <span>
                  Entrega:{" "}
                  {a.dueDate
                    ? new Date(a.dueDate).toLocaleDateString("pt-BR")
                    : "—"}
                </span>
              </div>

              {a.nota && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Nota: {a.nota}
                </p>
              )}
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
