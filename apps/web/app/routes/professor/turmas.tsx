import { useState } from "react"
import { useNavigate } from "react-router"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

type Turma = {
  id: string
  ano: string
  letra: string
  codigo: string
  alunos: string[]
}

export default function TurmasProfessor() {
  const navigate = useNavigate()

  const [turmas, setTurmas] = useState<Turma[]>([
    {
      id: "1",
      ano: "2º Ano",
      letra: "A",
      codigo: "ABC123",
      alunos: ["1", "2", "3"],
    },
  ])

  const [ano, setAno] = useState("")
  const [letra, setLetra] = useState("")
  const [open, setOpen] = useState(false)

  function gerarCodigo() {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  function criarTurma() {
    if (!ano || !letra) return

    const novaTurma: Turma = {
      id: Date.now().toString(),
      ano,
      letra,
      codigo: gerarCodigo(),
      alunos: [],
    }

    setTurmas((prev) => [...prev, novaTurma])

    setAno("")
    setLetra("")
    setOpen(false)
  }

  return (
    <main className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Minhas Turmas</h1>

          <p className="text-muted-foreground">
            Gerencie e acompanhe suas turmas.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Criar Turma</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Turma</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <select
                className="w-full rounded-md border p-2"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              >
                <option value="">Selecione o ano</option>

                <option value="1º Ano">1º Ano</option>
                <option value="2º Ano">2º Ano</option>
                <option value="3º Ano">3º Ano</option>
              </select>

              <select
                className="w-full rounded-md border p-2"
                value={letra}
                onChange={(e) => setLetra(e.target.value)}
              >
                <option value="">Selecione a turma</option>

                <option value="A">Turma A</option>
                <option value="B">Turma B</option>
                <option value="C">Turma C</option>
              </select>

              <Button className="w-full" onClick={criarTurma}>
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {turmas.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold">
              Você ainda não possui nenhuma turma
            </h2>

            <p className="text-sm text-muted-foreground">
              Crie uma turma para começar a adicionar alunos e atividades.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {turmas.map((turma) => (
            <Card key={turma.id}>
              <CardHeader>
                <CardTitle>
                  {turma.ano} {turma.letra}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {turma.alunos.length} alunos
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Código da turma:
                  </p>

                  <p className="font-semibold tracking-wider">{turma.codigo}</p>
                </div>

                <Button
                  className="w-full"
                  onClick={() => navigate(`/professor/turmas/${turma.id}`)}
                >
                  Entrar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
