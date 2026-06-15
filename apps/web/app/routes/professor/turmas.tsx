import { useState } from "react"
import { useNavigate, useLoaderData, useFetcher, redirect } from "react-router"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router"
import { eq, inArray, count } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classes } from "@workspace/database/schema/academics/classes"
import { classStudents } from "@workspace/database/schema/academics/class_students"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await requireSession(request)

  const turmas = await db
    .select()
    .from(classes)
    .where(eq(classes.createdBy, session.user.id))

  const studentCounts =
    turmas.length > 0
      ? await db
          .select({ classId: classStudents.classId, total: count() })
          .from(classStudents)
          .where(
            inArray(
              classStudents.classId,
              turmas.map((t) => t.id)
            )
          )
          .groupBy(classStudents.classId)
      : []

  const countMap = Object.fromEntries(
    studentCounts.map((r) => [r.classId, r.total])
  )

  return { turmas, countMap }
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await requireSession(request)

  const formData = await request.formData()
  const gradeLevel = formData.get("gradeLevel") as string
  const letra = formData.get("letra") as string

  if (!gradeLevel || !letra) {
    return { error: "Preencha todos os campos" }
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  await db.insert(classes).values({
    id: crypto.randomUUID(),
    name: letra,
    gradeLevel,
    shift: "morning",
    code,
    createdBy: session.user.id,
  })

  return redirect("/professor/turmas")
}

export default function TurmasProfessor() {
  const { turmas, countMap } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const isSubmitting = fetcher.state !== "idle"

  return (
    <main className="min-h-screen space-y-6 bg-[#FAF8F4] p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0b4d2b]">Minhas Turmas</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe suas turmas.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0b4d2b] text-white hover:bg-[#083824]">
              + Criar Turma
            </Button>
          </DialogTrigger>

          <DialogContent className="border border-[#E6E2DC] bg-white">
            <DialogHeader>
              <DialogTitle className="text-[#1C1C1C]">Criar Turma</DialogTitle>
            </DialogHeader>

            <fetcher.Form method="post" className="space-y-4">
              <select
                name="gradeLevel"
                className="w-full rounded-md border border-[#E6E2DC] p-2 outline-none focus:border-[#0b4d2b]"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione o ano
                </option>
                <option value="1º Ano">1º Ano</option>
                <option value="2º Ano">2º Ano</option>
                <option value="3º Ano">3º Ano</option>
              </select>

              <select
                name="letra"
                className="w-full rounded-md border border-[#E6E2DC] p-2 outline-none focus:border-[#0b4d2b]"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione a turma
                </option>
                <option value="A">Turma A</option>
                <option value="B">Turma B</option>
                <option value="C">Turma C</option>
              </select>
              {fetcher.data && "error" in fetcher.data && (
                <p className="text-sm text-red-600">{fetcher.data.error}</p>
              )}

              <Button
                className="w-full bg-[#0b4d2b] text-white hover:bg-[#083824]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </fetcher.Form>
          </DialogContent>
        </Dialog>
      </div>

      {turmas.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h2 className="ttext-xl font-semibold text-[#1C1C1C]">
              Você ainda não possui nenhuma turma
            </h2>
            <p className="text-sm text-muted-foreground">
              Crie uma turma para começar a adicionar alunos e atividades.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {turmas.map((turma) => (
            <Card
              key={turma.id}
              className="border border-[#E6E2DC] bg-white shadow-sm transition hover:border-[#F59E0B40] hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-[#0b4d2b]">
                  {turma.gradeLevel} {turma.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {countMap[turma.id] ?? 0} alunos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Código da turma:
                  </p>
                  <p className="ont-semibold tracking-wider text-[#F59E0B]">
                    {turma.code}
                  </p>
                </div>

                <Button
                  className="w-full bg-[#0b4d2b] text-white transition hover:bg-[#083824]"
                  onClick={() => navigate(`/professor/turmas/${turma.id}`)}
                >
                  Entrar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
