import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { TopBar } from "components/aluno/top-bar"
import { CardXp } from "components/aluno/home/card-xp"
import { CardDesempenho } from "components/aluno/home/card-desempenho"
import { CardAtividade } from "components/aluno/home/atividades-semanais"
import { Avisos } from "components/aluno/home/avisos"
import { Disciplina } from "components/aluno/home/disciplinas"
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
