"use client"

import { RadialBar, RadialBarChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

const chartData = [
  {
    materia: "Matemática",
    desempenho: 92,
    fill: "var(--chart-1)",
  },
  {
    materia: "Português",
    desempenho: 85,
    fill: "var(--chart-2)",
  },
  {
    materia: "Física",
    desempenho: 78,
    fill: "var(--chart-3)",
  },
  {
    materia: "História",
    desempenho: 88,
    fill: "var(--chart-4)",
  },
  {
    materia: "Química",
    desempenho: 70,
    fill: "var(--chart-5)",
  },
]

const chartConfig = {
  desempenho: {
    label: "Desempenho",
  },
  matematica: {
    label: "Matemática",
    color: "var(--chart-1)",
  },
  portugues: {
    label: "Português",
    color: "var(--chart-2)",
  },
  fisica: {
    label: "Física",
    color: "var(--chart-3)",
  },
  historia: {
    label: "História",
    color: "var(--chart-4)",
  },
  quimica: {
    label: "Química",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartRadialSimple() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name, item) => [
                `${value}%`,
                item.payload.materia,
              ]}
            />
          }
        />

        <RadialBar dataKey="desempenho" background cornerRadius={12} />
      </RadialBarChart>
    </ChartContainer>
  )
}
