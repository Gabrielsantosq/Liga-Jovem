import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { grades } from "@workspace/database/schema/academics/grades"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(grades)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { submissionId, userId, grade } = body

    if (!grade) {
      return Response.json({ error: "grade is required" }, { status: 400 })
    }

    const [record] = await db
      .insert(grades)
      .values({ id: crypto.randomUUID(), submissionId, userId, grade })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
