import * as React from "react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"

const tags = Array.from({ length: 2 }).map(
  (_, i, a) => `Notificações de avisos.`
)

export function Avisos() {
  return (
    <ScrollArea className="rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Avisos</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
