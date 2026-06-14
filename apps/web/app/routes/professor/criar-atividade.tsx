import { useParams, redirect, Form, useNavigation } from "react-router"
import type { ActionFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { ensureAcademicUser } from "@/.server/ensure-academic-user"
import { activities } from "@workspace/database/schema/academics/activities"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await requireSession(request)
  await ensureAcademicUser(session.user)

  const formData = await request.formData()
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const dueDate = formData.get("dueDate") as string
  const type = (formData.get("type") as string) || "assignment"

  if (!name) {
    return { error: "Título é obrigatório" }
  }

  await db.insert(activities).values({
    id: crypto.randomUUID(),
    classId: params.id!,
    userId: session.user.id,
    name,
    description: description || null,
    type,
    dueDate: dueDate ? new Date(dueDate) : null,
    status: "active",
  })

  return redirect(`/professor/turmas/${params.id}`)
}

export default function CriarAtividade() {
  const { id } = useParams()
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== "idle"

  return (
    <main className="min-h-screen space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Nova atividade</h1>
        <p className="text-sm text-muted-foreground">
          Crie uma atividade para os alunos da turma.
        </p>
      </header>

      <Form method="post" className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input name="name" placeholder="Ex: Lista de Frações" required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tipo</label>
          <select
            name="type"
            className="w-full rounded-md border bg-background p-2"
            defaultValue="assignment"
          >
            <option value="assignment">Tarefa</option>
            <option value="quiz">Quiz</option>
            <option value="discussion">Discussão</option>
            <option value="lecture">Aula</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Data de entrega</label>
          <Input type="date" name="dueDate" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            name="description"
            className="min-h-40 w-full rounded-md border bg-background p-3"
            placeholder="Descreva a atividade..."
          />
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar atividade"}
        </Button>
      </Form>
    </main>
  )
}
