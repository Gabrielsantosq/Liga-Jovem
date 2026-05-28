import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { TopBar } from "components/top-bar"
import { CardXp } from "components/aluno/card-xp"
import { CardDesempenho } from "components/aluno/card-desempenho"
import { CardAtividade } from "components/aluno/atividades-semanais"
import { Avisos } from "components/aluno/avisos"
import { Disciplina } from "components/aluno/disciplinas"
export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <CardXp />
            <CardDesempenho />
            <CardAtividade />
            <Avisos />
          </div>

          <Disciplina />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
