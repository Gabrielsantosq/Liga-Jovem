import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classes } from "@workspace/database/schema/academics/classes"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [cls] = await db.select().from(classes).where(eq(classes.id, params.id!))
  if (!cls) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: cls })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { schoolId, schoolYearId, name, gradeLevel, shift } = body

    const [cls] = await db
      .update(classes)
      .set({ schoolId, schoolYearId, name, gradeLevel, shift, updatedAt: new Date() })
      .where(eq(classes.id, params.id!))
      .returning()

    if (!cls) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: cls })
  }

  if (request.method === "DELETE") {
    await db.delete(classes).where(eq(classes.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
