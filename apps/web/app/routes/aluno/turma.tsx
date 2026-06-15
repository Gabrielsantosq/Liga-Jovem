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
    <main className="min-h-screen space-y-8 bg-[#FAF8F4] px-6 py-8">
      <header className="space-y-1">
        <h1 className="font-sans text-2xl text-[#0b4d2b]">
          {turma.gradeLevel} {turma.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe suas atividades, notas e avisos da turma.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-3">
          <p className="font-sans text-xl text-[#1D4ED8]">
            {atividades.length}
          </p>
          <p className="text-xs text-[#64748B]">Atividades</p>
        </div>

        <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-3">
          <p className="font-sans text-xl text-[#15803D]">
            {atividades.filter((a) => a.status === "entregue").length}
          </p>
          <p className="text-xs text-[#64748B]">Entregues</p>
        </div>

        <div className="rounded-xl border border-[#FED7AA] bg-[#FFF7ED] px-3 py-3">
          <p className="ttext-xl font-sans text-[#EA580C]">
            {atividades.filter((a) => a.status === "pendente").length}
          </p>
          <p className="text-xs">Pendentes</p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-[#0b4d2b]">Atividades recentes</h2>

          <Link
            to={`/aluno/turma/${id}/atividades`}
            className="rounded-lg border border-[#F59E0B] bg-white px-3 py-1 font-sans text-sm text-[#F59E0B] transition hover:bg-[#FFF7ED]"
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
                className="block rounded-2xl border border-[#E6E2DC] bg-white p-4 shadow-sm transition hover:border-[#F59E0B33] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[#0b4d2b]">{a.name}</p>

                  <span
                    className={`rounded-full border px-2 py-1 text-xs ${
                      a.status === "pendente"
                        ? "bg-[#FEF3C7] text-[#D97706]"
                        : a.status === "entregue"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEE2E2] text-[#DC2626]"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span className="text-[#F59E0B] capitalize">{a.type}</span>
                  <span>
                    Entrega:{" "}
                    {a.dueDate
                      ? new Date(a.dueDate).toLocaleDateString("pt-BR")
                      : "—"}
                  </span>
                </div>

                {a.nota && (
                  <p className="mt-2 font-sans text-xs text-[#1D4ED8]">
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
