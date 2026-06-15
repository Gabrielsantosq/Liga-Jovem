import { Form } from "react-router"
import { Separator } from "@workspace/ui/components/separator"
import { LogOut } from "lucide-react"
import { AvatarProfessor } from "../avatar/avatar-professor"

export function TopBarProfessor() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#334155] bg-[#1E293B] px-6">
      <div className="flex items-center gap-4">
        <img
          src="/components/compartilhado/avatar/elo.png"
          alt="logo"
          className="h-10 w-10 object-contain"
        />

        <h1 className="font-sans text-xl text-white">Professor</h1>
      </div>

      <div className="flex items-center gap-3">
        <AvatarProfessor />
        <Form method="post" action="/sign-out">
          <button
            type="submit"
            className="flex items-center gap-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </Form>
      </div>
    </header>
  )
}
