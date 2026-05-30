"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

import { Trophy } from "lucide-react"
export const description = "A radial chart"

const chartData = [
  { materia: "Matematica", desempenho: 275, fill: "#8B5CF6" },
  { materia: "Portugues", desempenho: 200, fill: "#06B6D4" },
  { materia: "Fisica", desempenho: 187, fill: "#F59E0B" },
  { materia: "Historia", desempenho: 173, fill: "#10B981" },
  { materia: "Quimica", desempenho: 90, fill: "#EF4444" },
]

const chartConfig = {
  desempenho: {
    label: "Desempenho",
  },
  matematica: {
    label: "Matematica",
    color: "var(--chart-20)",
  },
  portugues: {
    label: "Portugues",
    color: "var(--chart-2)",
  },
  fisica: {
    label: "Fisica",
    color: "var(--chart-3)",
  },
  historia: {
    label: "Historia",
    color: "var(--chart-4)",
  },
  quimica: {
    label: "Quimica",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartRadialSimple() {
  return (
    <Card className="flex flex-col rounded-3xl">
      <CardHeader className="pb-2">
        <CardTitle>Desempenho Escolar</CardTitle>

        <CardDescription>Seu rendimento por disciplina</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center pb-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={25} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, props) => (
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {props.payload.materia}
                      </span>

                      <span className="text-muted-foreground">
                        Desempenho: {value}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <RadialBar dataKey="desempenho" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Excelente evolução este mês
          <Trophy className="h-4 w-4" />
        </div>

        <p className="text-muted-foreground">
          Continue mantendo sua frequência e atividades em dia.
        </p>
      </CardFooter>
    </Card>
  )
}
