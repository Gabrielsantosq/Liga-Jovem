import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { GraduationCap } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
export default function EntrarTurma() {
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState("")

  function entrarNaTurma() {
    if (codigo === "ABC123") {
      navigate("/aluno/turma/1")
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">Entrar em uma turma</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Digite o código fornecido pelo professor para acessar atividades,
              disciplinas e acompanhar seu desempenho.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ex: ABC123"
            maxLength={6}
            className="h-12 text-center text-lg uppercase"
          />

          <Button className="h-12 w-full" onClick={entrarNaTurma}>
            Entrar na turma
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <h2 className="font-medium">Não possui um código?</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Solicite ao professor responsável o código da turma. Após entrar,
            ela ficará disponível na tela inicial.
          </p>
        </div>
      </div>
    </main>
  )
}
