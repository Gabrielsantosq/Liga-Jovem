import {
  Home,
  BookOpen,
  ClipboardList,
  Trophy,
  User,
  BookmarkCheckIcon,
} from "lucide-react"
import { Link } from "react-router"

export function BottomBarAluno() {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t bg-background">
      <div className="flex h-16 items-center justify-around">
        <Link to="/home" className="flex flex-col items-center text-xs">
          <Home className="h-5 w-5" />
          <span>Início</span>
        </Link>

        <Link to="/disciplinas" className="flex flex-col items-center text-xs">
          <BookOpen className="h-5 w-5" />
          <span>Matérias</span>
        </Link>

        <Link
          to="/minhas-atividades"
          className="flex flex-col items-center text-xs"
        >
          <ClipboardList className="h-5 w-5" />
          <span>Tarefas</span>
        </Link>

        <Link to="" className="flex flex-col items-center text-xs">
          <User className="h-5 w-5" />
          <span>Perfil</span>
        </Link>
      </div>
    </nav>
  )
}
