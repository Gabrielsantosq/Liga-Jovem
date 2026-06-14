import { useLoaderData } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq, count } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classes } from "@workspace/database/schema/academics/classes"
import { activities } from "@workspace/database/schema/academics/activities"
import { classStudents } from "@workspace/database/schema/academics/class_students"
import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)

  const [turma] = await db
    .select()
    .from(classes)
    .where(eq(classes.id, params.id!))

  if (!turma) throw new Response("Turma não encontrada", { status: 404 })

  const atividadesList = await db
    .select()
    .from(activities)
    .where(eq(activities.classId, params.id!))

  const [studentCount] = await db
    .select({ total: count() })
    .from(classStudents)
    .where(eq(classStudents.classId, params.id!))

  return {
    turma,
    atividades: atividadesList,
    totalAlunos: studentCount?.total ?? 0,
  }
}

export default function DetalhesTurma() {
  const { turma, atividades, totalAlunos } = useLoaderData<typeof loader>()
  const id = turma.id

  return (
    <main className="min-h-screen space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">
          {turma.gradeLevel} {turma.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Código da turma: {turma.code}
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-bold">{totalAlunos}</p>
          <p className="text-sm text-muted-foreground">Alunos</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-2xl font-bold">{atividades.length}</p>
          <p className="text-sm text-muted-foreground">Atividades</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Atividades</h2>

          <Button asChild>
            <Link to={`/professor/turmas/${id}/atividades/nova`}>
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
                to={`/professor/turmas/${id}/atividades/${atividade.id}`}
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
                  {atividade.type}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
