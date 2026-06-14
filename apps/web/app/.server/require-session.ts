import { redirect } from "react-router"
import { auth } from "@workspace/auth"

export async function requireSession(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    const accept = request.headers.get("Accept") ?? ""
    if (accept.includes("text/html")) {
      throw redirect("/login")
    }
    throw Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  return session
}
