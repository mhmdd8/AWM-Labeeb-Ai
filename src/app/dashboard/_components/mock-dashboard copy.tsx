import {
  Baby,
  Building2,
  Car,
  Heart,
  Ship,
  Building,
  AlertTriangle,
  Navigation,
  StopCircle,
  Camera,
  Users,
} from "lucide-react";
import { StatCard } from "./stat-card";
import { StatValue } from "./stat-value";
import QatarBirthStatistics from "@/app/dashboard/_components/qatar-birth-statistics";
import { MiniChart } from "@/app/dashboard/_components/mini-chart";
import { QatarHeatMap } from "@/components/ai/qatar-heatmap";

export function MockDashboard() {
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
      {/* Marriages & Divorces */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Marriages & Divorces" icon={Heart}>
          <div className="flex justify-between">
            <StatValue value="419" label="Marriages" />
            <StatValue value="182" label="Divorces" />
          </div>
        </StatCard>

        {/* Births & Deaths */}
        <StatCard title="Births & Deaths" icon={Baby}>
          <div className="flex justify-between">
            <StatValue value="2,568" label="Births" />
            <StatValue value="218" label="Deaths" />
          </div>
        </StatCard>

        {/* Building Permits */}
        <StatCard title="Building Permits" icon={Building2}>
          <StatValue value="753" label="Total Building Permits" />
        </StatCard>

        {/* Social Security */}
        <StatCard title="Social Security" icon={Users}>
          <StatValue value="13,995" label="Beneficiaries of Social Security" />
        </StatCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <QatarBirthStatistics />
        <QatarHeatMap
          data={mockWaterData}
          title="Water Consumption by Region"
          valueLabel="Million Liters"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Traffic Accidents Cases */}
        <StatCard title="Traffic Accidents Cases" icon={Car}>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <StatValue value="8" label="Death" />
                <MiniChart data={[4, 6, 8, 5, 7, 8]} />
              </div>
              <div>
                <StatValue value="772" label="Minor" />
                <MiniChart data={[300, 500, 772, 600, 700]} />
              </div>
              <div>
                <StatValue value="42" label="Major" />
                <MiniChart data={[20, 35, 42, 30, 38]} />
              </div>
            </div>
          </div>
        </StatCard>

        {/* Real Estate */}
        <StatCard title="Real Estate" icon={Building}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <StatValue value="324" label="No. of Solid Properties" />
            </div>
            <div className="flex justify-between">
              <StatValue
                value="1,145"
                label="Solid Properties Value (Million QR)"
              />
            </div>
          </div>
        </StatCard>

        {/* Traffic Violation */}
        <StatCard title="Traffic Violation" icon={AlertTriangle}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[#A31C37]" />
                  <span className="text-sm text-muted-foreground">
                    Over Speed (Radar)
                  </span>
                </div>
                <StatValue value="148,020" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <StopCircle className="h-4 w-4 text-[#A31C37]" />
                  <span className="text-sm text-muted-foreground">
                    Passing Traffic Signal
                  </span>
                </div>
                <StatValue value="5,628" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#A31C37]" />
                  <span className="text-sm text-muted-foreground">
                    Guidelines & Alarm Signal
                  </span>
                </div>
                <StatValue value="3,420" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-[#A31C37]" />
                  <span className="text-sm text-muted-foreground">
                    Traffic Movement
                  </span>
                </div>
                <StatValue value="46,580" />
              </div>
            </div>
          </div>
        </StatCard>

        {/* Vessel Movements */}
        <StatCard title="Vessel Movements" icon={Ship}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <StatValue value="354" label="No. of Vessels" />
            </div>
            <div className="flex justify-between">
              <StatValue value="5,659" label="Net Tonnage (Thousand Ton)" />
            </div>
          </div>
        </StatCard>
      </div>
    </div>
  );
}
