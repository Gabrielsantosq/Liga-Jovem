import { Bell } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { notificacoes } from "./notificacoes"

export function NotificacoesMenu() {
  const naoLidas = notificacoes.filter((n) => !n.lida).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <Bell className="h-5 w-5" />

          {naoLidas > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {naoLidas}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        {notificacoes.map((notificacao) => (
          <div key={notificacao.id} className="border-b p-3">
            <p className="font-medium">{notificacao.titulo}</p>

            <p className="text-sm text-muted-foreground">
              {notificacao.descricao}
            </p>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
