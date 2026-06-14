import { Outlet } from "react-router"
import { TopBarAluno } from "components/compartilhado/navegacao/topBar-aluno"
import { BottomBarAluno } from "components/compartilhado/navegacao/bottomBar-aluno"

export default function LayoutAluno() {
  return (
    <div className="min-h-screen pb-16">
      <TopBarAluno />

      <main>
        <Outlet />
      </main>

      <BottomBarAluno />
    </div>
  )
}
