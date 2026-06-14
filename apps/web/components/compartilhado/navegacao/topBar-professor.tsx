import { Form } from "react-router"
import { Separator } from "@workspace/ui/components/separator"
import { LogOut } from "lucide-react"
import { AvatarProfessor } from "../avatar/avatar-professor"

export function TopBarProfessor() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <Separator />
      </div>

      <div className="flex items-center gap-3">
        <AvatarProfessor />
        <Form method="post" action="/sign-out">
          <button
            type="submit"
            className="flex items-center gap-1 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </Form>
      </div>
    </header>
  )
}
