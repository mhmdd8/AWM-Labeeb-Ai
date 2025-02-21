"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QatarMapPaths } from "./qatar-map-data";

interface RegionData {
  name: string;
  value: number;
}

interface QatarHeatMapProps {
  data: Record<string, RegionData>;
  title?: string;
  valueLabel?: string;
}

const getHeatMapColor = (value: number) => {
  const colors = [
    { threshold: 0, color: "#E3F2FD" }, // < 100 m³/capita
    { threshold: 20, color: "#90CAF9" }, // 100-200 m³/capita
    { threshold: 150, color: "#2196F3" }, // 200-300 m³/capita
    { threshold: 200, color: "#1976D2" }, // 300-400 m³/capita
    { threshold: 400, color: "#0D47A1" }, // > 400 m³/capita
  ];

  const color = colors.reverse().find((c) => value >= c.threshold);
  return color ? color.color : colors[colors.length - 1].color;
};

export function QatarHeatMap({
  data,
  title = "Annual Water Consumption by Region",
  valueLabel = "m³/capita",
}: QatarHeatMapProps) {
  const [activeRegion, setActiveRegion] = React.useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(
    null
  );

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <div className="space-y-4">
        <h2 className="text-md font-medium text-center">{title}</h2>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 290.83 613.034"
            className="w-full h-auto"
            style={{ maxHeight: "400px" }}
          >
            {Object.entries(data).map(([id, region]) => (
              <Popover
                key={id}
                open={selectedRegion === id}
                onOpenChange={(open) => setSelectedRegion(open ? id : null)}
              >
                <PopoverTrigger asChild>
                  <path
                    d={QatarMapPaths[id as keyof typeof QatarMapPaths]}
                    fill={getHeatMapColor(region.value)}
                    stroke="white"
                    strokeWidth="1"
                    className="transition-colors duration-200 cursor-pointer hover:brightness-110 hover:opacity-90"
                    onMouseEnter={() => setActiveRegion(id)}
                    onMouseLeave={() => setActiveRegion(null)}
                    role="button"
                    aria-label={`${region.name}: ${
                      region.value
                    } ${valueLabel.toLowerCase()}`}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{region.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {valueLabel}: {region.value}
                      </p>
                      {/* <p>Area Code: {id}</p> */}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#0D47A1" }}
            />
            <span className="text-xs text-neutral-500">
              Very High (≥ 400 m³/capita)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#1976D2" }}
            />
            <span className="text-xs text-neutral-500">
              High (200-400 m³/capita)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#2196F3" }}
            />
            <span className="text-xs text-neutral-500">
              Medium (150-200 m³/capita)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#90CAF9" }}
            />
            <span className="text-xs text-neutral-500">
              Low (20-150 m³/capita)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#E3F2FD" }}
            />
            <span className="text-xs text-neutral-500">
              Very Low (less than 20 m³/capita)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
