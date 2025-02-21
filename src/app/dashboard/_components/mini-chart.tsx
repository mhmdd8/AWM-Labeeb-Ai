"use client";
import { LineChart, Line } from "recharts";

interface MiniChartProps {
  data: number[];
}

export function MiniChart({ data }: MiniChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className="h-12 w-full">
      <LineChart width={200} height={48} data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#E5E7EB"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
}
