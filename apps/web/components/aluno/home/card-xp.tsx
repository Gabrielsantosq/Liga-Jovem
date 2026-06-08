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

const data = {
  user: {
    name: "Joao",
  },
}
export function CardXp() {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold">
              Ola! {data.user.name}
            </CardTitle>

            <CardDescription>Continue evoluindo seus estudos</CardDescription>
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
      </CardContent>
    </Card>
  )
}
