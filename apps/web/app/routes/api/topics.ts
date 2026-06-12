import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { topics } from "@workspace/database/schema/academics/topics"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(topics)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { subjectId, name, description, dificultyLevel } = body

    if (!subjectId || !name) {
      return Response.json({ error: "subjectId and name are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(topics)
      .values({ id: crypto.randomUUID(), subjectId, name, description, dificultyLevel })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
