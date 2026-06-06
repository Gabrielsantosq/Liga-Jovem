import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

import { Atividade } from "components/aluno/atividades/atividade"
import { BottomBar } from "components/compartilhado/navegacao/BottomBar"

import { TopBar } from "components/compartilhado/navegacao/top-bar"

export default function AtividadesPage() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <TopBar />
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Minhas Atividades</h1>

            <p className="text-muted-foreground">
              Acompanhe suas tarefas e prazos.
            </p>
          </div>

          <Atividade />
        </main>
        <BottomBar />
      </SidebarInset>
    </SidebarProvider>
  )
}
