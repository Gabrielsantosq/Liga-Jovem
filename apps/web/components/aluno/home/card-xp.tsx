import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card"

import { Progress } from "@workspace/ui/components/progress"

import { Trophy } from "lucide-react"

export function CardXp() {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Nível 12</CardTitle>

            <CardDescription>Continue evoluindo seus estudos</CardDescription>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500 text-white">
            <Trophy className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>1250 XP</span>
            <span>2000 XP</span>
          </div>

          <Progress value={62} className="h-3 rounded-full" />
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-muted p-3">
          <div>
            <p className="text-sm font-medium">+120 XP hoje</p>

            <p className="text-xs text-muted-foreground">
              Você está indo muito bem 🚀
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
