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
import { ChartRadialSimple } from "./grafico"

export function CardDesempenho() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Desempenho</CardTitle>
        <CardDescription>
          <ChartRadialSimple />
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
