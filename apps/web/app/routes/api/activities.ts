import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { activities } from "@workspace/database/schema/academics/activities"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(activities)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const {
      classId,
      userId,
      topicId,
      name,
      description,
      type,
      difficulty,
      score,
      dueDate,
      status,
    } = body

    if (!name || !type) {
      return Response.json(
        { error: "name and type are required" },
        { status: 400 }
      )
    }

    const [record] = await db
      .insert(activities)
      .values({
        id: crypto.randomUUID(),
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
      })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
