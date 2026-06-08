import { Card, CardContent } from "@workspace/ui/components/card"

export function CardDesempenho() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-xs text-muted-foreground">Média Geral</p>
          <h2 className="text-xl font-bold">8.7</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <span className="text-muted-foreground">Atividades</span>
          <h2 className="text-xl font-bold">4</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-xs text-muted-foreground">conquistas</p>
          <h2 className="text-xl font-bold">4</h2>
        </CardContent>
      </Card>
    </div>
  )
}
