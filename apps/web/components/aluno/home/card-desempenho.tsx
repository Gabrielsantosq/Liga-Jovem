import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { ChartRadialSimple } from "./grafico"

export function CardDesempenho() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Desempenho Escolar</CardTitle>

        <CardDescription>Seu rendimento nas disciplinas</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartRadialSimple />
      </CardContent>
    </Card>
  )
}
