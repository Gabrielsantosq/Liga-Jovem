import { Form, redirect, useActionData } from "react-router"
import type { ActionFunctionArgs } from "react-router"
import { auth } from "@workspace/auth"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  if (!name || !email || !password || !role) {
    return { error: "Preencha todos os campos" }
  }

  let authResponse: Response
  try {
    authResponse = await auth.api.signUpEmail({
      body: { name, email, password, role },
      asResponse: true,
    })
  } catch {
    return { error: "Ocorreu um erro. Tente novamente." }
  }

  if (!authResponse.ok) {
    const body = (await authResponse.json()) as { message?: string }
    if (body.message?.toLowerCase().includes("already")) {
      return { error: "Este e-mail já está cadastrado." }
    }
    return { error: "Não foi possível criar a conta. Verifique os dados." }
  }

  const data = (await authResponse.json()) as { user?: { role?: string } }
  const userRole = data.user?.role
  const redirectTo =
    userRole === "teacher" ? "/professor/turmas" : "/aluno/home"

  const headers = new Headers()
  for (const cookie of authResponse.headers.getSetCookie()) {
    headers.append("Set-Cookie", cookie)
  }
  return redirect(redirectTo, { headers })
}

export default function SignupPage() {
  const actionData = useActionData<typeof action>()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form method="post" className="space-y-4 p-6 md:p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="font-sans text-2xl">Criar conta</h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    Insira suas informações
                  </p>
                </div>

                <div className="space-y-1">
                  <label htmlFor="name" className="font-sans text-sm">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="font-sans text-sm">
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
                  <label htmlFor="role" className="font-sans text-sm">
                    Perfil
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="teacher">Professor</option>
                    <option value="student">Aluno</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="font-sans text-sm">
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
                  Criar conta
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <a href="/login" className="underline underline-offset-2">
                    Entrar
                  </a>
                </p>
              </Form>

              <div className="relative hidden bg-muted md:block">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="font-sans text-4xl">Liga Jovem</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
