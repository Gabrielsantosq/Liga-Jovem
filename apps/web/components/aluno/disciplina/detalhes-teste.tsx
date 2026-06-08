type Atividade = {
  id: number
  nome: string
  titulo: string
  status: "pendente" | "concluido"
}

const atividades = [
  {
    id: 1,
    nome: "matematica",
    titulo: "Lista",
    status: "pendente",
  },
  {
    id: 2,
    nome: "Fisica",
    titulo: "Trabalho",
    status: "pendente",
  },
]

export function ListaAtividade() {
  const AtividadePendente = atividades.filter((m) => m.status === "pendente")

  const AtividadesConcluidas = atividades.filter(
    (atividades) => atividades.status === "concluida"
  )

  return (
    <div>
      {AtividadePendente.map((atividade) => (
        <div>
          <span>{atividade.titulo}</span>
        </div>
      ))}
    </div>
  )
}
