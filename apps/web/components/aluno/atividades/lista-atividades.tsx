type Atividade = {
  id: number
  titulo: string
  disciplina: string
  professor: string
  entrega: string
}

export function ListaAtividades({ atividades }: { atividades: Atividade[] }) {
  return (
    <div className="space-y-4">
      {atividades.map((atividade) => (
        <div key={atividade.id} className="rounded-xl border p-4">
          <h3 className="font-semibold">{atividade.titulo}</h3>

          <p className="text-sm text-muted-foreground">
            {atividade.disciplina} • Prof. {atividade.professor}
          </p>

          <p className="text-xs text-muted-foreground">
            Entrega: {atividade.entrega}
          </p>
        </div>
      ))}
    </div>
  )
}
