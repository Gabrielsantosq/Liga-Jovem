import { redirect } from "react-router"
import type { ActionFunctionArgs } from "react-router"
import { auth } from "@workspace/auth"

export async function action({ request }: ActionFunctionArgs) {
  const response = await auth.api.signOut({
    headers: request.headers,
    asResponse: true,
  })

  const headers = new Headers()
  for (const cookie of response.headers.getSetCookie()) {
    headers.append("Set-Cookie", cookie)
  }
  headers.set("Location", "/login")

  return new Response(null, { status: 302, headers })
}
