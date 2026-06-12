import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { schoolYear } from "@workspace/database/schema/academics/school_year"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(schoolYear)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { schoolId, status, startsAt, endsAt } = body

    if (!startsAt || !endsAt) {
      return Response.json({ error: "startsAt and endsAt are required" }, { status: 400 })
    }

    const [year] = await db
      .insert(schoolYear)
      .values({ id: crypto.randomUUID(), schoolId, status, startsAt: new Date(startsAt), endsAt: new Date(endsAt) })
      .returning()

    return Response.json({ data: year }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
