import { useParams, Link } from "react-router"

type Atividade = {
  id: string
  turmaId: string
  titulo: string
  descricao: string
  materia: string
  dataEntrega: string
  status: "pendente" | "entregue" | "atrasado"
  nota?: number
}

export default function DetalhesAtividade() {
  const { id, atividadeId } = useParams()

  const atividades: Atividade[] = [
    {
      id: "1",
      turmaId: "1",
      titulo: "Lista de Frações",
      descricao:
        "Resolva os exercícios da página 32 até 35. Mostre todo o cálculo.",
      materia: "Matemática",
      dataEntrega: "Amanhã",
      status: "pendente",
      nota: 8.5,
    },
    {
      id: "2",
      turmaId: "1",
      titulo: "Redação Argumentativa",
      descricao:
        "Escreva uma redação sobre tecnologia na educação com mínimo de 20 linhas.",
      materia: "Português",
      dataEntrega: "Sexta-feira",
      status: "entregue",
      nota: 9,
    },
  ]

  const atividade = atividades.find((a) => a.id === atividadeId)

  if (!atividade) {
    return <div className="p-6 text-center">Atividade não encontrada</div>
  }

  function classificarNotas(nota: number) {
    if (nota >= 7) return "Excelente"
    return "Ruim"
  }

  return (
    <main className="min-h-screen space-y-6 px-6 py-8">
      <Link
        to={`/aluno/turma/${id}/atividades`}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        Voltar
      </Link>

      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{atividade.titulo}</h1>

        <p className="text-sm text-muted-foreground">
          {atividade.materia} • Turma {id}
        </p>

        <span
          className={`inline-block rounded-full border px-3 py-1 text-xs ${
            atividade.status === "pendente"
              ? "border-yellow-300 text-yellow-600"
              : atividade.status === "entregue"
                ? "border-green-300 text-green-600"
                : "border-red-300 text-red-600"
          }`}
        >
          {atividade.status}
        </span>
      </header>

      <section className="space-y-2 rounded-xl border p-4">
        <h2 className="font-semibold">Descrição</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {atividade.descricao}
        </p>
      </section>

      <section className="grid grid-cols-2 justify-between gap-2">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Entrega</p>
          <p className="font-semibold">{atividade.dataEntrega}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="font-semibold capitalize">{atividade.status}</p>
        </div>
      </section>
      <div className="rounded-xl border p-4">
        <p className="text-xs text-muted-foreground">Nota</p>
        <p className="font-semibold">
          {atividade.nota ?? "—"}
          {""}
          {atividade.nota !== undefined &&
            ` - ${classificarNotas(atividade.nota)}`}
        </p>
      </div>
    </main>
  )
}
