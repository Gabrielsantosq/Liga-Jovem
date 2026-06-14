import { useLocation, useParams } from "react-router"
import { AvatarAluno } from "../avatar/avatar-aluno"

export function TopBarAluno() {
  const location = useLocation()
  const { id } = useParams()

  let titulo = "Início"

  if (location.pathname.includes("/atividades")) {
    titulo = "Atividades"
  } else if (location.pathname.includes("/disciplinas")) {
    titulo = "Disciplinas"
  } else if (location.pathname.includes("/turmas")) {
    titulo = `Turma ${id}`
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">{titulo}</h1>
      </div>

      <div className="flex items-center gap-3">
        <AvatarAluno />
      </div>
    </header>
  )
}
