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

export function Avisos() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Avisos</CardTitle>
        <CardDescription>
          Aqui ficara os dados de Avisos do colegio
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
