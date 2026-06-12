import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { submissions } from "@workspace/database/schema/academics/submission"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(submissions)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { activityId, userId, status, content, attachmentUrl, grade, feedback } = body

    if (!status) {
      return Response.json({ error: "status is required" }, { status: 400 })
    }

    const [record] = await db
      .insert(submissions)
      .values({ id: crypto.randomUUID(), activityId, userId, status, content, attachmentUrl, grade, feedback })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
