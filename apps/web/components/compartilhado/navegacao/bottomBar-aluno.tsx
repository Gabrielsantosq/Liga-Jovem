import { Home, ClipboardList } from "lucide-react"
import { Link, useParams } from "react-router"

export function BottomBarAluno() {
  const { id } = useParams()

  return (
    <nav className="fixed right-0 bottom-0 left-0 border-t bg-background">
      <div className="flex h-16 items-center justify-around">
        <Link to="/aluno/home" className="flex flex-col items-center text-xs">
          <Home className="h-5 w-5" />
          <span>Início</span>
        </Link>

        <Link
          to={id ? `/aluno/turma/${id}/atividades` : "/aluno/entrar-turma"}
          className="flex flex-col items-center text-xs"
        >
          <ClipboardList className="h-5 w-5" />
          <span>Atividades</span>
        </Link>
      </div>
    </nav>
  )
}
