import { Separator } from "@workspace/ui/components/separator"

import { NotificacoesMenu } from "../notificacoes/notificacoes-menu"
import { AvatarAluno } from "../avatar/avatar-aluno"

export function TopBarAluno() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <Separator />
      </div>

      <div className="flex items-center gap-3">
        <NotificacoesMenu />
        <AvatarAluno />

        <div className="flex items-center gap-3"></div>
      </div>
    </header>
  )
}
