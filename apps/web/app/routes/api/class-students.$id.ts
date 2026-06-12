import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { classStudents } from "@workspace/database/schema/academics/class_students"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [record] = await db.select().from(classStudents).where(eq(classStudents.id, params.id!))
  if (!record) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: record })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "DELETE") {
    await db.delete(classStudents).where(eq(classStudents.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
