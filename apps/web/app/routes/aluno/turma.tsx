import { useLoaderData } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classes } from "@workspace/database/schema/academics/classes"
import { activities } from "@workspace/database/schema/academics/activities"
import { submissions } from "@workspace/database/schema/academics/submission"
import { Link } from "react-router"

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await requireSession(request)

  const [turma] = await db
    .select()
    .from(classes)
    .where(eq(classes.id, params.id!))

  if (!turma) throw new Response("Turma não encontrada", { status: 404 })

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

  const atividadesComStatus = atividadesList.map((a) => {
    const sub = a.id ? submissaoMap[a.id] : null
    const now = new Date()
    let status: "pendente" | "entregue" | "atrasado" = "pendente"
    if (sub) {
      status = "entregue"
    } else if (a.dueDate && new Date(a.dueDate) < now) {
      status = "atrasado"
    }
    return { ...a, status, nota: sub?.grade ?? null }
  })

  return { turma, atividades: atividadesComStatus }
}

export default function Turma() {
  const { turma, atividades } = useLoaderData<typeof loader>()
  const id = turma.id

  return (
    <main className="min-h-screen space-y-8 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">
          {turma.gradeLevel} {turma.name}
        </h1>
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
          <p className="text-xl font-semibold">
            {atividades.filter((a) => a.status === "entregue").length}
          </p>
          <p className="text-xs text-muted-foreground">Entregues</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xl font-semibold">
            {atividades.filter((a) => a.status === "pendente").length}
          </p>
          <p className="text-xs text-muted-foreground">Pendentes</p>
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

        {atividades.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma atividade disponível.
          </p>
        ) : (
          <div className="space-y-2">
            {atividades.slice(0, 5).map((a) => (
              <Link
                key={a.id}
                to={`/aluno/turma/${id}/atividades/${a.id}`}
                className="block rounded-xl border p-4 transition hover:bg-muted"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{a.name}</p>

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
                  <span className="capitalize">{a.type}</span>
                  <span>
                    Entrega:{" "}
                    {a.dueDate
                      ? new Date(a.dueDate).toLocaleDateString("pt-BR")
                      : "—"}
                  </span>
                </div>

                {a.nota && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Nota: {a.nota}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
