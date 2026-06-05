import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"

import { DisciplinaDetalhes } from "components/aluno/disciplina/detalhe-disciplina"
import { SidebarAluno } from "components/compartilhado/navegacao/sidebar-aluno"
import { TopBar } from "components/compartilhado/navegacao/top-bar"
export default function Disciplinas() {
  return (
    <SidebarProvider>
      <SidebarAluno />
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <TopBar />
        </header>
        <div>
          <DisciplinaDetalhes />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
