import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { schools } from "@workspace/database/schema/academics/school"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(schools)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { name, logo, timeZone, street, number, complement, city, state, zipCode, country } = body

    if (!name) {
      return Response.json({ error: "name is required" }, { status: 400 })
    }

    const [school] = await db
      .insert(schools)
      .values({ id: crypto.randomUUID(), name, logo, timeZone, street, number, complement, city, state, zipCode, country })
      .returning()

    return Response.json({ data: school }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
