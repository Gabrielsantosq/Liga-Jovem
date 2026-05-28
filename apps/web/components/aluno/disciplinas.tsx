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

export function Disciplina() {
  return (
    <Card className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <CardHeader>
        <CardTitle>Avisos</CardTitle>
        <CardDescription>
          Aqui ficara os dados de toda a frequencia nas disciplinas
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
