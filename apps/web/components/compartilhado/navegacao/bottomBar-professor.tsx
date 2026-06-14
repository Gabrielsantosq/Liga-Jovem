import { Home, BookOpen, ClipboardList, User, Book } from "lucide-react"
import { Link } from "react-router"

export function BottomBarProfessor() {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t bg-background">
      <div className="flex h-16 items-center justify-around">
        <Link
          to="/professor/turmas"
          className="flex flex-col items-center text-xs"
        >
          <ClipboardList className="h-5 w-5" />
          <span>Turmas</span>
        </Link>
      </div>
    </nav>
  )
}
