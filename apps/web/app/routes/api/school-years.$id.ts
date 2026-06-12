import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { schoolYear } from "@workspace/database/schema/academics/school_year"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [year] = await db.select().from(schoolYear).where(eq(schoolYear.id, params.id!))
  if (!year) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: year })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { schoolId, status, startsAt, endsAt } = body

    const [year] = await db
      .update(schoolYear)
      .set({
        schoolId,
        status,
        startsAt: startsAt ? new Date(startsAt) : undefined,
        endsAt: endsAt ? new Date(endsAt) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(schoolYear.id, params.id!))
      .returning()

    if (!year) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: year })
  }

  if (request.method === "DELETE") {
    await db.delete(schoolYear).where(eq(schoolYear.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
