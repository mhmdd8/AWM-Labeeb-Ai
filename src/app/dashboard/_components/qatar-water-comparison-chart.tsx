"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { country: "qatar", consumption: 500, fill: "hsl(210, 70%, 30%)" },
  { country: "uae", consumption: 550, fill: "hsl(210, 70%, 50%)" },
  { country: "ksa", consumption: 350, fill: "hsl(210, 70%, 50%)" },
  // { country: "uk", consumption: 142, fill: "hsl(210, 70%, 60%)" },
  { country: "world", consumption: 150, fill: "hsl(210, 70%, 70%)" },
];
const chartConfig = {
  consumption: {
    label: "Daily Water Consumption",
  },
  qatar: {
    label: "Qatar",
    color: "hsl(210, 70%, 30%)",
  },
  ksa: {
    label: "Saudi Arabia",
    color: "hsl(210, 70%, 50%)",
  },
  uae: {
    label: "UAE",
    color: "hsl(210, 70%, 60%)",
  },
  world: {
    label: "World Average",
    color: "hsl(210, 70%, 70%)",
  },
} satisfies ChartConfig;

export default function QatarWaterConsumptionComparisonChart() {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Qatar Water Consumption Comparison</CardTitle>
        <CardDescription>
          Explore daily water consumption per capita across various countries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="country"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              label={{
                value: "Liters per Day",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="consumption" strokeWidth={2} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <p className="text-sm text-muted-foreground mt-4">
          Qatar has one of the world&apos;s highest per capita consumption rates
          at (500 liters/day).
        </p>
      </CardContent>
    </Card>
  );
}
