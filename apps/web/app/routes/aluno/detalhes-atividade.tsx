import { useLoaderData, Link } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq, and } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { activities } from "@workspace/database/schema/academics/activities"
import { submissions } from "@workspace/database/schema/academics/submission"

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await requireSession(request)

  const [atividade] = await db
    .select()
    .from(activities)
    .where(eq(activities.id, params.atividadesId!))

  if (!atividade) throw new Response("Atividade não encontrada", { status: 404 })

  const [submissao] = await db
    .select()
    .from(submissions)
    .where(
      and(
        eq(submissions.activityId, params.atividadesId!),
        eq(submissions.userId, session.user.id)
      )
    )

  const now = new Date()
  let status: "pendente" | "entregue" | "atrasado" = "pendente"
  if (submissao) {
    status = "entregue"
  } else if (atividade.dueDate && new Date(atividade.dueDate) < now) {
    status = "atrasado"
  }

  return { atividade, submissao: submissao ?? null, status, classId: params.id! }
}

function classificarNota(nota: string) {
  const n = parseFloat(nota)
  if (isNaN(n)) return ""
  return n >= 7 ? "Aprovado" : "Reprovado"
}

export default function DetalhesAtividade() {
  const { atividade, submissao, status, classId } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen space-y-6 px-6 py-8">
      <Link
        to={`/aluno/turma/${classId}/atividades`}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        ← Voltar
      </Link>

      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{atividade.name}</h1>

        <p className="text-sm text-muted-foreground capitalize">
          {atividade.type} • Turma
        </p>

        <span
          className={`inline-block rounded-full border px-3 py-1 text-xs ${
            status === "pendente"
              ? "border-yellow-300 text-yellow-600"
              : status === "entregue"
                ? "border-green-300 text-green-600"
                : "border-red-300 text-red-600"
          }`}
        >
          {status}
        </span>
      </header>

      {atividade.description && (
        <section className="space-y-2 rounded-xl border p-4">
          <h2 className="font-semibold">Descrição</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {atividade.description}
          </p>
        </section>
      )}

      <section className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Entrega</p>
          <p className="font-semibold">
            {atividade.dueDate
              ? new Date(atividade.dueDate).toLocaleDateString("pt-BR")
              : "—"}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="font-semibold capitalize">{status}</p>
        </div>
      </section>

      <div className="rounded-xl border p-4">
        <p className="text-xs text-muted-foreground">Nota</p>
        <p className="font-semibold">
          {submissao?.grade
            ? `${submissao.grade} — ${classificarNota(submissao.grade)}`
            : "—"}
        </p>
      </div>
    </main>
  )
}
