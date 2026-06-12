import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { eq } from "drizzle-orm"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { users } from "@workspace/database/schema/academics/users"

const safeFields = { id: users.id, name: users.name, email: users.email, role: users.role, avatar: users.avatar, status: users.status, createdAt: users.createdAt, updatedAt: users.updatedAt }

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request)
  const [record] = await db.select(safeFields).from(users).where(eq(users.id, params.id!))
  if (!record) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ data: record })
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "PUT" || request.method === "PATCH") {
    const body = await request.json()
    const { name, email, avatar, status, role } = body

    const [record] = await db
      .update(users)
      .set({ name, email, avatar, status, role, updatedAt: new Date() })
      .where(eq(users.id, params.id!))
      .returning(safeFields)

    if (!record) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json({ data: record })
  }

  if (request.method === "DELETE") {
    await db.delete(users).where(eq(users.id, params.id!))
    return Response.json({ message: "Deleted" })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
