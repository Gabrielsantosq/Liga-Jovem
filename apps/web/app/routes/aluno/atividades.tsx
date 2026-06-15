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
  if (status === "pendente") return "text-amber-100 border-amber-700"
  if (status === "entregue") return "text-green-100 border-green-700"
  return "text-red-100 border-red-700"
}

export default function AtividadesAluno() {
  const { atividades, classId } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen space-y-6 bg-[#FAF8F4] px-6 py-8">
      <header>
        <h1 className="font-sans text-3xl text-[#1F2937]">
          Atividades da Turma
        </h1>
        <p className="text-sm text-[#6B7280]">
          Todas as atividades disponíveis nesta turma.
        </p>
      </header>

      {atividades.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-[#6B7280]">
            Nenhuma atividade disponível.
          </p>
        </div>
      ) : (
        <section className="space-y-3">
          {atividades.map((a) => (
            <Link
              key={a.id}
              to={`/aluno/turma/${classId}/atividades/${a.id}`}
              className="block rounded-2xl border border-[#E8E3DA] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#DCE7F5] hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="font-sans text-lg text-[#1F2937]">{a.name}</p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(a.status)}`}
                >
                  {a.status}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm text-[#6B7280]">
                <span className="capitalize">{a.type}</span>
                <span>
                  Entrega:{" "}
                  {a.dueDate
                    ? new Date(a.dueDate).toLocaleDateString("pt-BR")
                    : "—"}
                </span>
              </div>

              {a.nota && (
                <div className="mt-4 rounded-xl bg-[#EEF5FF] px-3 py-2">
                  <p className="text-sm text-[#1E3A8A]">Nota: {a.nota}</p>
                </div>
              )}
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
