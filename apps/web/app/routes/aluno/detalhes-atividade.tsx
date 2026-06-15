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

  if (!atividade)
    throw new Response("Atividade não encontrada", { status: 404 })

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

  return {
    atividade,
    submissao: submissao ?? null,
    status,
    classId: params.id!,
  }
}

function classificarNota(nota: string) {
  const n = parseFloat(nota)
  if (isNaN(n)) return ""
  return n >= 7 ? "Aprovado" : "Reprovado"
}

export default function DetalhesAtividade() {
  const { atividade, submissao, status, classId } =
    useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen space-y-6 bg-[#FAF8F4] px-6 py-8">
      <Link
        to={`/aluno/turma/${classId}/atividades`}
        className="flex items-center gap-2 text-sm text-[#6B7280] transition-colors hover:text-[#4F46E5]"
      >
        ← Voltar
      </Link>

      <header className="space-y-1">
        <h1 className="font-sans text-3xl text-[#1F2937]">{atividade.name}</h1>

        <p className="text-sm text-[#6B7280] capitalize">
          {atividade.type} • Turma
        </p>

        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            status === "pendente"
              ? "border-yellow-100 text-yellow-700"
              : status === "entregue"
                ? "border-green-100 text-green-700"
                : "border-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </header>

      {atividade.description && (
        <section className="space-y-3 rounded-2xl border border-[#E8E3DA] bg-white p-5 shadow-sm">
          <h2 className="ffont-sans text-lg text-[#1F2937]">Descrição</h2>
          <p className="leading-relaxed text-[#6B7280]">
            {atividade.description}
          </p>
        </section>
      )}

      <section className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-[#DCE7F5] bg-[#EEF5FF] p-5">
          <p className="text-xs text-[#64748B]">Entrega</p>
          <p className="mt-1 font-sans text-lg text-[#1E3A8A]">
            {atividade.dueDate
              ? new Date(atividade.dueDate).toLocaleDateString("pt-BR")
              : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5">
          <p className="text-xs text-[#64748B]">Status</p>
          <p className="mt-1 font-sans text-lg text-[#374151] capitalize">
            {status}
          </p>
        </div>
      </section>

      <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 shadow-sm">
        <p className="text-xs text-[#64748B]">Nota</p>
        <p className="mt-2 font-sans text-lg text-[#1F2937]">
          {submissao?.grade
            ? `${submissao.grade} — ${classificarNota(submissao.grade)}`
            : "—"}
        </p>
      </div>
    </main>
  )
}
