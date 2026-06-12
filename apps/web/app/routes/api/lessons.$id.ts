import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { lessons } from "@workspace/database/schema/academics/lessons"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [record] = await db.select().from(lessons).where(eq(lessons.id, params.id!))
  if (!record) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: record })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { topicId, classId, subjectId, teacherId, name, description } = body

    const [record] = await db
      .update(lessons)
      .set({ topicId, classId, subjectId, teacherId, name, description, updatedAt: new Date() })
      .where(eq(lessons.id, params.id!))
      .returning()

    if (!record) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: record })
  }

  if (request.method === "DELETE") {
    await db.delete(lessons).where(eq(lessons.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
