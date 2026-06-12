import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { attendence } from "@workspace/database/schema/academics/attendence"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(attendence)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { userId, date, status } = body

    if (!date || !status) {
      return Response.json({ error: "date and status are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(attendence)
      .values({ id: crypto.randomUUID(), userId, date: new Date(date), status })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
