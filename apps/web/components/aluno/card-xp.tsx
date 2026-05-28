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

export function CardXp() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Progressão</CardTitle>
        <CardDescription>
          Aqui ficara os dados de Progressão tipo o xp
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
