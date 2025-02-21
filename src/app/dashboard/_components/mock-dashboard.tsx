import {
  Baby,
  Building2,
  Car,
  Heart,
  TrendingUp,
  TrendingDown,
  Building,
  AlertTriangle,
  Navigation,
  StopCircle,
  Camera,
  Users,
  Ship,
  ChartBar,
} from "lucide-react";
import { StatCard } from "./stat-card";
import { StatValue } from "./stat-value";
import QatarBirthStatistics from "@/app/dashboard/_components/qatar-birth-statistics";
import { MiniChart } from "@/app/dashboard/_components/mini-chart";
import { QatarHeatMap } from "@/components/ai/qatar-heatmap";
import QatarWaterComparisonChart from "@/app/dashboard/_components/qatar-water-chat";
import QatarWaterConsumptionComparisonChart from "@/app/dashboard/_components/qatar-water-comparison-chart";

export function MockDashboard() {
  const waterUsageData = [
    {
      name: "Industrial",
      value: 27.048, // millions m³
      icon: Building2,
      trend: "+4.2%",
    },
    {
      name: "Residential",
      value: 24.472,
      icon: Building,
      trend: "+3.8%",
    },
    {
      name: "Agriculture",
      value: 8.372,
      icon: Navigation,
      trend: "+2.1%",
    },
    {
      name: "Commercial",
      value: 4.508,
      icon: Building,
      trend: "+3.4%",
    },
  ];

  const mockWaterData = {
    "QA-DA": { name: "Ad Dawhah", value: 175 },
    "QA-RA": { name: "Ar Rayyan", value: 95 },
    "QA-WA": { name: "Al Wakrah", value: 75 },
    "QA-ZA": { name: "Al Daayen", value: 45 },
    "QA-KH": { name: "Al Khor", value: 35 },
    "QA-US": { name: "Umm Salal", value: 35 },
    "QA-SH": { name: "Al Shahaniya", value: 20 },
    "QA-MS": { name: "Madinat ash Shamal", value: 15 },
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Population"
          // className="bg-yellow-50"
          icon={Users}
        >
          <div className="flex justify-between">
            <StatValue value="3,071,539" label="2025 Projection" />
          </div>
        </StatCard>

        <StatCard title="Growth Rate" className="/bg-green-50" icon={Building2}>
          <div className="flex justify-between">
            <StatValue value="1.0%" label="Annual Population Growth" />
            <StatValue value="4.33%" label="Water Demand Growth" />
          </div>
        </StatCard>

        <StatCard
          title="Water Production"
          className="bg-blue-50"
          icon={TrendingUp}
        >
          <div className="flex justify-between">
            <StatValue value="54.02M" label="m³ (Nov 2024)" />
          </div>
        </StatCard>

        <StatCard
          title="Water Consumption"
          className="bg-red-50"
          icon={TrendingDown}
        >
          <div className="flex justify-between">
            <StatValue value="64.4M" label="m³/month (2025 avg)" />
          </div>
        </StatCard>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard title="2030 Projections" icon={AlertTriangle}>
          <div className="flex justify-between">
            <StatValue value="106.2M" label="Average m³/month Water Demand" />
          </div>
        </StatCard>
        <div className="md:col-span-3">
          <StatCard title="Water Consumption Trends" icon={ChartBar}>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <StatValue value="64.4M" label="2025" />
                  <MiniChart data={[45.2, 52.8, 58.6, 61.2, 64.4]} />
                </div>
                <div>
                  <StatValue value="81.1M" label="2027" />
                  <MiniChart data={[64.4, 72.7, 81.1, 89.5, 97.8]} />
                </div>
                <div>
                  <StatValue value="106.2M" label="2030" />
                  <MiniChart data={[81.1, 89.5, 97.8, 106.2]} />
                </div>
              </div>
            </div>
          </StatCard>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatCard title="Water Usage by Sector" icon={Ship}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {waterUsageData.map((sector) => (
                <div key={sector.name}>
                  <div className="flex items-center gap-2">
                    <sector.icon className="h-4 w-4 text-[#A31C37]" />
                    <span className="text-sm text-muted-foreground">
                      {sector.name}
                    </span>
                  </div>
                  <StatValue
                    value={`${sector.value}M`}
                    label={`${sector.trend} YoY`}
                  />
                </div>
              ))}
            </div>
          </div>
        </StatCard>
        <QatarHeatMap
          data={mockWaterData}
          title="Monthly Water Consumption by Region"
          valueLabel="Cubic Meters"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <QatarWaterComparisonChart />
        <QatarWaterConsumptionComparisonChart />
      </div>

      <QatarBirthStatistics />
    </div>
  );
}
