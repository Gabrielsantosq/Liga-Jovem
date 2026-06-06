import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { TopBar } from "components/compartilhado/navegacao/top-bar"
import { CardXp } from "components/aluno/home/card-xp"
import { CardDesempenho } from "components/aluno/home/card-desempenho"
import { CardAtividade } from "components/aluno/home/atividades-semanais"

import { BottomBar } from "components/compartilhado/navegacao/BottomBar"

export default function Page() {
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <TopBar />
        </header>
        <main className="pb-20">
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <CardXp />
              <CardDesempenho />
              <CardAtividade />
            </div>
          </div>
        </main>
        <div className="md: hidden"></div>
        <BottomBar />
      </SidebarInset>
    </SidebarProvider>
  )
}
