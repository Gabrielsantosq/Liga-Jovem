import { Form, redirect, useActionData } from "react-router"
import type { ActionFunctionArgs } from "react-router"
import { auth } from "@workspace/auth"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email e senha são obrigatórios" }
  }

  let authResponse: Response
  try {
    authResponse = await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
    })
  } catch {
    return { error: "Ocorreu um erro. Tente novamente." }
  }

  if (!authResponse.ok) {
    return { error: "Email ou senha incorretos" }
  }

  const data = (await authResponse.json()) as { user?: { role?: string } }
  const role = data.user?.role
  const redirectTo = role === "teacher" ? "/professor/turmas" : "/aluno/home"

  const headers = new Headers()
  for (const cookie of authResponse.headers.getSetCookie()) {
    headers.append("Set-Cookie", cookie)
  }
  return redirect(redirectTo, { headers })
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form method="post" className="p-6 md:p-8 space-y-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Entre na sua conta
                  </p>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                {actionData?.error && (
                  <p className="text-center text-sm text-red-600">
                    {actionData.error}
                  </p>
                )}

                <Button type="submit" className="w-full">
                  Entrar
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <a href="/sign-up" className="underline underline-offset-2">
                    Criar conta
                  </a>
                </p>
              </Form>

              <div className="relative hidden bg-muted md:block">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="text-4xl font-bold">Liga Jovem</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
