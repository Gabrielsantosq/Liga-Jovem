import { useLoaderData, Link } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { activities } from "@workspace/database/schema/academics/activities"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)

  const [atividade] = await db
    .select()
    .from(activities)
    .where(eq(activities.id, params.atividadeId!))

  if (!atividade)
    throw new Response("Atividade não encontrada", { status: 404 })

  return { atividade, classId: params.id! }
}

export default function DetalhesAtividadeProfessor() {
  const { atividade, classId } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen space-y-6 bg-[#FAF8F4] px-6 py-8">
      <Link
        to={`/professor/turmas/${classId}/atividades`}
        className="text-sm text-[#0b4d2b] transition-colors hover:text-[#083824]"
      >
        ← Voltar
      </Link>

      <header className="space-y-1">
        <h1 className="font-sans text-2xl text-[#0b4d2b]">{atividade.name}</h1>
        <p className="text-sm text-muted-foreground capitalize">
          {atividade.type}
        </p>
      </header>

      {atividade.description && (
        <section className="space-y-2 rounded-xl border border-[#E6E2DC] bg-white p-4 shadow-sm">
          <h2 className="font-sans text-[#0b4d2b]">Descrição</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {atividade.description}
          </p>
        </section>
      )}

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#E6E2DC] bg-white p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Data de entrega</p>
          <p className="font-sans text-[#1C1C1C]">
            {atividade.dueDate
              ? new Date(atividade.dueDate).toLocaleDateString("pt-BR")
              : "—"}
          </p>
        </div>

        <div className="rounded-xl border border-[#E6E2DC] bg-white p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="font-sans text-[#F59E0B] capitalize">
            {atividade.status ?? "—"}
          </p>
        </div>
      </section>

      {atividade.score && (
        <div className="rounded-xl border border-[#E6E2DC] bg-white p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Pontuação máxima</p>
          <p className="font-sans text-[#0b4d2b]">{atividade.score}</p>
        </div>
      )}
    </main>
  )
}
