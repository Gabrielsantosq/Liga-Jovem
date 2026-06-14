import { useState } from "react"
import { useNavigate, useParams } from "react-router"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

export default function CriarAtividade() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [materia, setMateria] = useState("")
  const [dataEntrega, setDataEntrega] = useState("")
  const [descricao, setDescricao] = useState("")

  function criarAtividade() {
    if (!titulo || !materia || !dataEntrega || !descricao) {
      return
    }

    navigate(`/professor/turmas/${id}`)
  }

  return (
    <main className="min-h-screen space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Nova atividade</h1>

        <p className="text-sm text-muted-foreground">
          Crie uma atividade para os alunos da turma.
        </p>
      </header>

      <section className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>

          <Input
            placeholder="Ex: Lista de Frações"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Matéria</label>

          <Input
            placeholder="Ex: Matemática"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Data de entrega</label>

          <Input
            type="date"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descrição</label>

          <textarea
            className="min-h-40 w-full rounded-md border bg-background p-3"
            placeholder="Descreva a atividade..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={criarAtividade}>
          Criar atividade
        </Button>
      </section>
    </main>
  )
}
