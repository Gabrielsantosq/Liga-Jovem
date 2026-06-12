import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classes } from "@workspace/database/schema/academics/classes"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select().from(classes)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { schoolId, schoolYearId, name, gradeLevel, shift } = body

    if (!schoolId || !schoolYearId || !name || !gradeLevel || !shift) {
      return Response.json({ error: "schoolId, schoolYearId, name, gradeLevel and shift are required" }, { status: 400 })
    }

    const [cls] = await db
      .insert(classes)
      .values({ id: crypto.randomUUID(), schoolId, schoolYearId, name, gradeLevel, shift })
      .returning()

    return Response.json({ data: cls }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
