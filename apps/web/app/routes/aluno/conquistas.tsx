import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"
import { SidebarAluno } from "components/compartilhado/navegacao/sidebar-aluno"
import { TopBar } from "components/compartilhado/navegacao/top-bar"

export default function Conquistas() {
  return (
    <SidebarProvider>
      <SidebarAluno />
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <TopBar />
        </header>
        <h1>Conquistas</h1>
      </SidebarInset>
    </SidebarProvider>
  )
}
