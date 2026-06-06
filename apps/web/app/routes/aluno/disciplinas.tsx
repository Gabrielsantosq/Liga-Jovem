import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"

import { DisciplinaDetalhes } from "components/aluno/disciplina/detalhe-disciplina"
import { BottomBar } from "components/compartilhado/navegacao/BottomBar"

import { TopBar } from "components/compartilhado/navegacao/top-bar"
export default function Disciplinas() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <TopBar />
        </header>
        <main>
          <div>
            <DisciplinaDetalhes />
          </div>
        </main>
        <BottomBar />
      </SidebarInset>
    </SidebarProvider>
  )
}
