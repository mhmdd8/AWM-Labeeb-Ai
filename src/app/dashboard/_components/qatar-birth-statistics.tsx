"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
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

interface BirthData {
  month: string;
  lqtryyn_ldhkwr_qatari_male: number;
  lqtryyn_lnth_qatari_female: number;
  gyr_lqtryyn_ldhkwr_non_qatari_male: number;
  gyr_lqtryyn_lnth_non_qatari_female: number;
}

const chartConfig = {
  births: {
    label: "Total Births",
  },
  qatari: {
    label: "Qatari",
    color: "hsl(0, 59%, 31%)",
  },
  nonQatari: {
    label: "Non-Qatari",
    color: "hsl(0, 59%, 41%)",
  },
} satisfies ChartConfig;

export default function QatarBirthStatistics() {
  const [data, setData] = useState<BirthData[]>([]);
  const [activeChart, setActiveChart] = React.useState<"qatari" | "nonQatari">(
    "qatari"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processedData = React.useMemo(
    () =>
      data.map((item) => ({
        date: item.month,
        qatari:
          item.lqtryyn_ldhkwr_qatari_male + item.lqtryyn_lnth_qatari_female,
        nonQatari:
          item.gyr_lqtryyn_ldhkwr_non_qatari_male +
          item.gyr_lqtryyn_lnth_non_qatari_female,
      })),
    [data]
  );

  const total = React.useMemo(
    () => ({
      qatari: processedData.reduce((acc, curr) => acc + curr.qatari, 0),
      nonQatari: processedData.reduce((acc, curr) => acc + curr.nonQatari, 0),
    }),
    [processedData]
  );

  useEffect(() => {
    console.log("Fetching data...");
    fetch(
      "https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qatar-monthly-statistics-live-births-by-nationality/records?limit=20"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Raw API response:", responseData);
        if (!responseData.results || !Array.isArray(responseData.results)) {
          throw new Error("Invalid data structure");
        }
        const processedData = responseData.results.map((item: BirthData) => ({
          ...item,
          month: new Date(item.month).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          }),
        }));
        console.log("Processed data:", processedData);
        setData(processedData.reverse());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  console.log("Rendering chart with data:", data);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Birth Statistics</CardTitle>
          <CardDescription>Monthly births by nationality</CardDescription>
        </div>
        <div className="flex">
          {["qatari", "nonQatari"].map((key) => {
            const chart = key as keyof typeof total;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <BarChart
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="births"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
