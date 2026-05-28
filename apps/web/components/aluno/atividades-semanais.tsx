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

export function CardAtividade() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Suas Atividades</CardTitle>
        <CardDescription>
          Aqui ficara os dados de Atividades da Semana
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
