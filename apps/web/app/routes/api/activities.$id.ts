import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { activities } from "@workspace/database/schema/academics/activities"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [record] = await db.select().from(activities).where(eq(activities.id, params.id!))
  if (!record) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: record })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { classId, userId, topicId, name, description, type, difficulty, score, dueDate, status } = body

    const [record] = await db
      .update(activities)
      .set({
        classId,
        userId,
        topicId,
        name,
        description,
        type,
        difficulty,
        score,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
        updatedAt: new Date(),
      })
      .where(eq(activities.id, params.id!))
      .returning()

    if (!record) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: record })
  }

  if (request.method === "DELETE") {
    await db.delete(activities).where(eq(activities.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
