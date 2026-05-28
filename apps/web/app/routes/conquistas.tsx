import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export default function Conquistas() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <h1>Conquistas</h1>
      </SidebarInset>
    </SidebarProvider>
  )
}
