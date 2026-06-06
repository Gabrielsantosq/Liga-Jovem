import { SidebarProvider, SidebarInset } from "@workspace/ui/components/sidebar"
import { BottomBar } from "components/compartilhado/navegacao/BottomBar"

import { TopBar } from "components/compartilhado/navegacao/top-bar"

export default function Conquistas() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <TopBar />
        </header>
        <main>
          <h1>Notas</h1>
        </main>

        <BottomBar />
      </SidebarInset>
    </SidebarProvider>
  )
}
