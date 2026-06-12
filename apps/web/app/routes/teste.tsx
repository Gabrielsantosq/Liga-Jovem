//dado

// mostre

export default function Teste() {
  const atividades = [
    {
      id: 1,
      titulo: "Lista",
      status: "pendente",
    },
    {
      id: 2,
      titulo: "Trabalho",
      status: "Concluido",
    },
  ]

  const Pendentes = atividades.filter(
    (atividade) => atividade.status === "pendente"
  )

  return (
    <div>
      {Pendentes.map((pendente) => (
        <p key={pendente.id}>{pendente.titulo}</p>
      ))}
    </div>
  )
}
