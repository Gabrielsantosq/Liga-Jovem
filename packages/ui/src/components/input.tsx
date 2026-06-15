import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border border-[#E6E2DC] bg-white px-3 py-2 text-sm",
        "placeholder:text-muted-foreground",
        "transition-colors outline-none",
        "focus:border-[#0b4d2b] focus:ring-2 focus:ring-[#0b4d2b]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
