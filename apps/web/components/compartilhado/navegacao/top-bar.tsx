import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"

import { NavUser } from "@workspace/ui/components/nav-user"
import { NotificacoesMenu } from "../notificacoes/notificacoes-menu"

const data = {
  user: {
    name: "Joao",
    email: "",
    avatar: "",
  },
}
export function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="h-4" />
      </div>

      <div className="flex items-center gap-3">
        <NotificacoesMenu />

        <div className="flex items-center gap-3">
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  )
}
