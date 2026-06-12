import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"

import { Plus } from "lucide-react"

import { CardTurma } from "./card-turma"

type Turma = {
  id: number
  nome: string
  alunos: number
  media: number
}

export function TurmasProfessor() {
  const [turmas, setTurmas] = useState<Turma[]>([
    {
      id: 1,
      nome: "1º Ano A",
      alunos: 28,
      media: 7.8,
    },

    {
      id: 2,
      nome: "2º Ano B",
      alunos: 31,
      media: 6.9,
    },
  ])

  const [ano, setAno] = useState("1")
  const [letra, setLetra] = useState("")

  function criarTurma() {
    if (!/[a-zA-Z]/.test(letra)) return

    const novaTurma: Turma = {
      id: turmas.length + 1,
      nome: `${ano}º Ano ${letra.toUpperCase()}`,
      alunos: 0,
      media: 0,
    }

    setTurmas([...turmas, novaTurma])

    setLetra("")
    setAno("1")
  }

  return (
    <div className="space-y-6 p-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Minhas Turmas</h1>

          <p className="text-muted-foreground">Gerencie suas turmas</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Turma</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Ano</label>

                <select
                  className="w-full rounded-md border p-2"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                >
                  <option value="1">1º Ano</option>
                  <option value="2">2º Ano</option>
                  <option value="3">3º Ano</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Turma</label>

                <Input
                  placeholder="A, B, C..."
                  value={letra}
                  maxLength={1}
                  onChange={(e) => setLetra(e.target.value)}
                />
              </div>

              <Button className="w-full" onClick={criarTurma}>
                Criar turma
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="space-y-4">
        {turmas.map((turma) => (
          <CardTurma key={turma.id} turma={turma} />
        ))}
      </div>
    </div>
  )
}
