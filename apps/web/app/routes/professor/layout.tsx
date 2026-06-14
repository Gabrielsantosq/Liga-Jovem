import { Outlet } from "react-router"
import { TopBarProfessor } from "components/compartilhado/navegacao/topBar-professor"
import { BottomBarProfessor } from "components/compartilhado/navegacao/bottomBar-professor"

export default function LayoutProfessor() {
  return (
    <div className="min-h-screen pb-16">
      <TopBarProfessor />

      <main>
        <Outlet />
      </main>

      <BottomBarProfessor />
    </div>
  )
}
