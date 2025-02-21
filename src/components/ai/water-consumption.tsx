"use client";

import * as React from "react";
import { QatarHeatMap } from "./qatar-heatmap";

interface WaterConsumptionProps {
  year: number;
  data: Record<string, { name: string; value: number }>;
}

export function WaterConsumption({ year, data }: WaterConsumptionProps) {
  return (
    <QatarHeatMap
      data={data}
      title={`Qatar Water Consumption ${year}`}
      valueLabel="m³/capita"
    />
  );
}
