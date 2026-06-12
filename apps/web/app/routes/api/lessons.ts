import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { lessons } from "@workspace/database/schema/academics/lessons"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(lessons)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { topicId, classId, subjectId, teacherId, name, description } = body

    if (!topicId || !classId || !subjectId || !teacherId || !name) {
      return Response.json({ error: "topicId, classId, subjectId, teacherId and name are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(lessons)
      .values({ id: crypto.randomUUID(), topicId, classId, subjectId, teacherId, name, description })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
