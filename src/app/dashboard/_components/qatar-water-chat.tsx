"use client";

import { useEffect, useState } from "react";
import { DropletIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  consumption: {
    label: "Consumption",
    color: "hsl(var(--chart-1))",
  },
  production: {
    label: "Production",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function QatarWaterComparisonChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both datasets
        const [consumptionRes, productionRes] = await Promise.all([
          fetch(
            "https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qatar-monthly-statistics-water-consumption/records?limit=83"
          ),
          fetch(
            "https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qatar-monthly-statistics-total-water-production/records?limit=83"
          ),
        ]);

        const consumptionData = await consumptionRes.json();
        const productionData = await productionRes.json();

        // Merge the data
        const dataMap = new Map();

        consumptionData.results.forEach((record: any) => {
          dataMap.set(record.month, {
            month: record.month,
            consumption: record.sthlk_lmyh_lf_m3_water_consumption_thousand_m3,
            production: 0,
          });
        });

        productionData.results.forEach((record: any) => {
          const existing = dataMap.get(record.month);
          if (existing) {
            existing.production =
              record.jmly_ntj_lmyh_lf_m3_total_water_production_thousand_m3;
          } else {
            dataMap.set(record.month, {
              month: record.month,
              consumption: 0,
              production:
                record.jmly_ntj_lmyh_lf_m3_total_water_production_thousand_m3,
            });
          }
        });

        // Convert to array and sort by date
        const mergedData = Array.from(dataMap.values()).sort(
          (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
        );

        setData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qatar Water Statistics</CardTitle>
        <CardDescription>
          Monthly water consumption and production (thousand m³)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
            height={400}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatNumber}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  valueFormatter={(value) => `${formatNumber(value)} m³`}
                />
              }
            />
            <Area
              dataKey="consumption"
              type="monotone"
              fill="var(--color-consumption)"
              fillOpacity={0.4}
              stroke="var(--color-consumption)"
              stackId="a"
            />
            <Area
              dataKey="production"
              type="monotone"
              fill="var(--color-production)"
              fillOpacity={0.4}
              stroke="var(--color-production)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Water Statistics <DropletIcon className="h-4 w-4" />
            </div> */}
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Data from Qatar Monthly Statistics
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
