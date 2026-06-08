import { BottomBarAluno } from "components/compartilhado/navegacao/bottomBar-aluno"

import { TopBarAluno } from "components/compartilhado/navegacao/topBar-aluno"

export default function Conquistas() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <TopBarAluno />
      </header>
      <main>
        <h1>Notas</h1>
      </main>

      <BottomBarAluno />
    </div>
  )
}
