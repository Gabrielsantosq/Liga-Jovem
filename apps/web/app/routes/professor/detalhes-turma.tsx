import { Button } from "@workspace/ui/components/button"
import { BottomBarProfessor } from "components/compartilhado/navegacao/bottomBar-professor"
import { TopBarProfessor } from "components/compartilhado/navegacao/topBar-professor"
import { PostagemAtividade } from "components/professor/turmas/detalhes/detalhes"

export default function DetalhesTurma() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <TopBarProfessor />
      </header>

      <main className="p-6">
        <div className="mb-6 grid grid-cols-2">
          <h1 className="text-2xl font-bold">Atividades</h1>
          <Button>Nova atividade</Button>
        </div>
        <div>
          <PostagemAtividade />
        </div>
      </main>

      <BottomBarProfessor />
    </div>
  )
}
