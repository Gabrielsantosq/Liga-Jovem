import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classStudents } from "@workspace/database/schema/academics/class_students"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(classStudents)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { classId, studentId } = body

    if (!classId || !studentId) {
      return Response.json({ error: "classId and studentId are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(classStudents)
      .values({ id: crypto.randomUUID(), classId, studentId })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
