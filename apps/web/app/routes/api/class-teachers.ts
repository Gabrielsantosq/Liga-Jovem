import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classTeachers } from "@workspace/database/schema/academics/class_teachers"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(classTeachers)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { classId, teacherId, subjectId } = body

    if (!classId || !teacherId || !subjectId) {
      return Response.json({ error: "classId, teacherId and subjectId are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(classTeachers)
      .values({ id: crypto.randomUUID(), classId, teacherId, subjectId })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
