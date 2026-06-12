import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { db } from "@/.server/db"
import { requireSession } from "@/.server/require-session"
import { users } from "@workspace/database/schema/academics/users"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSession(request)
  const result = await db.select({ id: users.id, name: users.name, email: users.email, role: users.role, avatar: users.avatar, status: users.status, createdAt: users.createdAt, updatedAt: users.updatedAt }).from(users)
  return Response.json({ data: result })
}

export async function action({ request }: ActionFunctionArgs) {
  await requireSession(request)

  if (request.method === "POST") {
    const body = await request.json()
    const { name, email, password, role, avatar, status } = body

    if (!name || !email || !password || !role) {
      return Response.json({ error: "name, email, password and role are required" }, { status: 400 })
    }

    const [record] = await db
      .insert(users)
      .values({ id: crypto.randomUUID(), name, email, password, role, avatar, status })
      .returning({ id: users.id, name: users.name, email: users.email, role: users.role, avatar: users.avatar, status: users.status, createdAt: users.createdAt, updatedAt: users.updatedAt })

    return Response.json({ data: record }, { status: 201 })
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 })
}
