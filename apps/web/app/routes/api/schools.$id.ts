import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { schools } from "@workspace/database/schema/academics/school"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [school] = await db.select().from(schools).where(eq(schools.id, params.id!))
  if (!school) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: school })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { name, logo, timeZone, street, number, complement, city, state, zipCode, country } = body

    const [school] = await db
      .update(schools)
      .set({ name, logo, timeZone, street, number, complement, city, state, zipCode, country, updatedAt: new Date() })
      .where(eq(schools.id, params.id!))
      .returning()

    if (!school) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: school })
  }

  if (request.method === "DELETE") {
    await db.delete(schools).where(eq(schools.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
