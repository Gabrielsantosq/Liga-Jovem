import { useLoaderData } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classStudents } from "@workspace/database/schema/academics/class_students"
import { classes } from "@workspace/database/schema/academics/classes"
import { Plus } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await requireSession(request)

  const turmas = await db
    .select({
      id: classes.id,
      gradeLevel: classes.gradeLevel,
      name: classes.name,
    })
    .from(classStudents)
    .innerJoin(classes, eq(classStudents.classId, classes.id))
    .where(eq(classStudents.studentId, session.user.id))

  return { turmas }
}

export default function HomeAluno() {
  const { turmas } = useLoaderData<typeof loader>()

  return (
    <main className="fflex min-h-screen flex-col bg-[#FAF8F4] px-6 py-8">
      <div className="mb-8">
        <h1 className="font-sans text-3xl text-[#0b4d2b]">Minhas Turmas</h1>
        <p className="text-[#64748B]">Visualize e acesse suas turmas.</p>
      </div>

      {turmas.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h2 className="font-sans text-xl text-[#0b4d2b]">
              Você ainda não faz parte de nenhuma turma
            </h2>
            <p className="text-sm text-[#64748B]">
              Entre em uma turma utilizando um código fornecido pelo professor.
            </p>
          </div>

          <Button
            asChild
            className="bg-[#F59E0B] text-white hover:bg-[#D97706]"
          >
            <Link to="/aluno/entrar-turma">
              <Plus className="mr-2 h-4 w-4" />
              Entrar em uma turma
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {turmas.map((turma) => (
            <Link
              key={turma.id}
              to={`/aluno/turma/${turma.id}`}
              className="block rounded-2xl border border-[#E6E2DC] bg-white p-5 shadow-sm transition hover:border-[#BFDBFE] hover:bg-[#F8FAFC] hover:shadow-md"
            >
              <h2 className="font-sans text-[#0b4d2b]">
                {turma.gradeLevel} {turma.name}
              </h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Toque para acessar a turma
              </p>
            </Link>
          ))}

          <Button
            asChild
            className="bg-[#ff6b00] text-white hover:bg-[#D97706]"
          >
            <Link to="/aluno/entrar-turma">
              <Plus className="mr-2 h-4 w-4" />
              Entrar em outra turma
            </Link>
          </Button>
        </div>
      )}
    </main>
  )
}
