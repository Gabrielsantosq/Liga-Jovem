import { BottomBarProfessor } from "components/compartilhado/navegacao/bottomBar-professor"
import { TopBarProfessor } from "components/compartilhado/navegacao/topBar-professor"
import { PainelProfessor } from "components/professor/dashboard/painel"
import { PainelAtividade } from "components/professor/dashboard/painel-atividade"

export default function Dashboard() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <TopBarProfessor />
      </header>

      <main className="space-y-6 p-6 pb-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Ola, Professor!</h1>
          <p className="text-muted-foreground">Aqui esta o seu resumo</p>
        </div>
        <div>
          <PainelProfessor />
          <PainelAtividade />
        </div>
      </main>

      <BottomBarProfessor />
    </div>
  )
}
