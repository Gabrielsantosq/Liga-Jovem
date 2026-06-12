import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { grades } from "@workspace/database/schema/academics/grades"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [record] = await db.select().from(grades).where(eq(grades.id, params.id!))
  if (!record) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: record })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { submissionId, userId, grade } = body

    const [record] = await db
      .update(grades)
      .set({ submissionId, userId, grade, updatedAt: new Date() })
      .where(eq(grades.id, params.id!))
      .returning()

    if (!record) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: record })
  }

  if (request.method === "DELETE") {
    await db.delete(grades).where(eq(grades.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
