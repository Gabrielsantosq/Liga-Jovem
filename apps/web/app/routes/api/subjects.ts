import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { subject } from "@workspace/database/schema/academics/subject"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(subject)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { name, schoolId, color, icon } = body

    if (!name || !schoolId || !color || !icon) {
      return Response.json({ error: "name, schoolId, color and icon are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(subject)
      .values({ id: crypto.randomUUID(), name, schoolId, color, icon })
      .returning()

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
