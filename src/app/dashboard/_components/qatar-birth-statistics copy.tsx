"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
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

interface BirthData {
  month: string;
  lqtryyn_ldhkwr_qatari_male: number;
  lqtryyn_lnth_qatari_female: number;
  gyr_lqtryyn_ldhkwr_non_qatari_male: number;
  gyr_lqtryyn_lnth_non_qatari_female: number;
}

export default function QatarBirthStatistics() {
  const [data, setData] = useState<BirthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Qatar Monthly Birth Statistics</CardTitle>
        <CardDescription>Live births by nationality and gender</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="lqtryyn_ldhkwr_qatari_male"
                name="Qatari Male"
                fill="#a61c37"
              />
              <Bar
                dataKey="lqtryyn_lnth_qatari_female"
                name="Qatari Female"
                fill="#a61c37"
              />
              <Bar
                dataKey="gyr_lqtryyn_ldhkwr_non_qatari_male"
                name="Non-Qatari Male"
                fill="#d9ebbb"
              />
              <Bar
                dataKey="gyr_lqtryyn_lnth_non_qatari_female"
                name="Non-Qatari Female"
                fill="#d9ebbb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
