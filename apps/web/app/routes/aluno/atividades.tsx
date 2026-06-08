import { Atividade } from "components/aluno/atividades/atividade"
import { BottomBarAluno } from "components/compartilhado/navegacao/bottomBar-aluno"

import { TopBarAluno } from "components/compartilhado/navegacao/topBar-aluno"

export default function AtividadesPage() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <TopBarAluno />
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
      <BottomBarAluno />
    </div>
  )
}
