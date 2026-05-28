import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"

export function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="h-4" />

        <div>
          <h1 className="text-lg font-semibold">Olá, User</h1>

          <p className="text-sm text-muted-foreground">
            Pronto para mais uma conquista?
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background hover:bg-muted">
          🔔
        </button>

        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background hover:bg-muted">
            U
          </button>
        </div>
      </div>
    </header>
  )
}
