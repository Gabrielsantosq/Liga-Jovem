import { Form, redirect, useActionData, useNavigation } from "react-router"
import type { ActionFunctionArgs } from "react-router"
import { eq, and } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { ensureAcademicUser } from "@/.server/ensure-academic-user"
import { classes } from "@workspace/database/schema/academics/classes"
import { classStudents } from "@workspace/database/schema/academics/class_students"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { GraduationCap } from "lucide-react"

export async function action({ request }: ActionFunctionArgs) {
  const session = await requireSession(request)

  const formData = await request.formData()
  const codigo = (formData.get("codigo") as string)?.trim().toUpperCase()

  if (!codigo) {
    return { error: "Digite o código da turma" }
  }

  const [turma] = await db
    .select()
    .from(classes)
    .where(eq(classes.code, codigo))

  if (!turma) {
    return { error: "Código inválido. Verifique com o professor." }
  }

  await ensureAcademicUser(session.user)

  const [jaInscrito] = await db
    .select()
    .from(classStudents)
    .where(
      and(
        eq(classStudents.classId, turma.id),
        eq(classStudents.studentId, session.user.id)
      )
    )

  if (!jaInscrito) {
    await db.insert(classStudents).values({
      id: crypto.randomUUID(),
      classId: turma.id,
      studentId: session.user.id,
    })
  }

  return redirect(`/aluno/turma/${turma.id}`)
}

export default function EntrarTurma() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== "idle"

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#EFF6FF] p-4">
              <GraduationCap className="h-10 w-10 text-[#0B4D2B]" />
            </div>
          </div>

          <div>
            <h1 className="font-sans text-3xl text-[#0B4D2B]">
              Entrar em uma turma
            </h1>
            <p className="mt-2 text-sm text-[#64748B]">
              Digite o código fornecido pelo professor para acessar atividades,
              disciplinas e acompanhar seu desempenho.
            </p>
          </div>
        </div>

        <Form
          method="post"
          className="space-y-4 rounded-2xl border border-[#E6E2DC] bg-white p-6 shadow-sm"
        >
          <Input
            name="codigo"
            placeholder="Ex: ABC123"
            maxLength={6}
            className="h-12 text-center text-lg tracking-widest uppercase"
          />

          {actionData?.error && (
            <p className="text-center text-sm text-red-600">
              {actionData.error}
            </p>
          )}

          <Button
            className="hover:bg-[#D97706]l h-12 w-full bg-[#F59E0B] text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar na turma"}
          </Button>
        </Form>

        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5">
          <h2 className="font-sans text-[#1D4ED8]">Não possui um código?</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            Solicite ao professor responsável o código da turma. Após entrar,
            ela ficará disponível na tela inicial.
          </p>
        </div>
      </div>
    </main>
  )
}
