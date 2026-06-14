import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router"
import { auth } from "@workspace/auth"

export async function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request)
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request)
}
