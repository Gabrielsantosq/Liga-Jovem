import { TopBarAluno } from "components/compartilhado/navegacao/topBar-aluno"
import { CardXp } from "components/aluno/home/card-xp"
import { CardDesempenho } from "components/aluno/home/card-desempenho"
import { CardAtividade } from "components/aluno/home/atividades-semanais"

import { BottomBarAluno } from "components/compartilhado/navegacao/bottomBar-aluno"

export default function Page() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <TopBarAluno />
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

      <BottomBarAluno />
    </div>
  )
}
