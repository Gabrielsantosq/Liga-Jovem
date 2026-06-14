import { db } from "@/.server/db"
import { users } from "@workspace/database/schema/academics/users"

type SessionUser = { id: string; name: string; email: string; role?: string | null }

export async function ensureAcademicUser(sessionUser: SessionUser) {
  const role =
    sessionUser.role === "teacher"
      ? ("teacher" as const)
      : ("student" as const)

  await db
    .insert(users)
    .values({
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      password: "auth-managed",
      role,
    })
    .onConflictDoNothing()
}
