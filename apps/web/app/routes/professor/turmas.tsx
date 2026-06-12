import { BottomBarProfessor } from "components/compartilhado/navegacao/bottomBar-professor"
import { TopBarProfessor } from "components/compartilhado/navegacao/topBar-professor"
import { TurmasProfessor } from "components/professor/turmas/turmas-professor"

export default function Turmas() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <TopBarProfessor />
      </header>
      <main>
        <TurmasProfessor />
      </main>
      <BottomBarProfessor />
    </div>
  )
}
