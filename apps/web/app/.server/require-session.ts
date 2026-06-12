import { auth } from "@workspace/auth"

export async function requireSession(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    throw Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  return session
}
