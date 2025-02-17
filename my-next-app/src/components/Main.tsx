"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Nav from "./Nav";
import Footer from "./ui/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PopulationData {
  month: string;
  year: string;
  less_than_15: number;
  age_15_24: number;
  age_25_64: number;
  more_than_65: number;
  total_population: number;
}

export default function Main() {
  const [monthlyData, setMonthlyData] = useState<PopulationData[]>([]);
  const [yearlyData, setYearlyData] = useState<Record<string, PopulationData>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qatar-monthly-statistics-population-by-age-group/records?limit=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        if (result && result.results) {
          let yearlyAggregated: Record<string, PopulationData> = {};

          const formattedData = result.results.map((item: any) => {
            const year = item["month"]?.split("-")[0] || "Unknown Year";
            const lessThan15 = item["ql_mn_15_less_than_15"] || 0;
            const age15_24 = item["15_24"] || 0;
            const age25_64 = item["25_64"] || 0;
            const moreThan65 = item["65_f_kthr_more_than_65"] || 0;
            const totalPopulation =
              lessThan15 + age15_24 + age25_64 + moreThan65;

            if (!yearlyAggregated[year]) {
              yearlyAggregated[year] = {
                month: year,
                year,
                less_than_15: 0,
                age_15_24: 0,
                age_25_64: 0,
                more_than_65: 0,
                total_population: 0,
              };
            }

            yearlyAggregated[year].less_than_15 += lessThan15;
            yearlyAggregated[year].age_15_24 += age15_24;
            yearlyAggregated[year].age_25_64 += age25_64;
            yearlyAggregated[year].more_than_65 += moreThan65;
            yearlyAggregated[year].total_population += totalPopulation;

            return {
              month: item["month"] || "Unknown Month",
              year,
              less_than_15: lessThan15,
              age_15_24: age15_24,
              age_25_64: age25_64,
              more_than_65: moreThan65,
              total_population: totalPopulation,
            };
          });

          setMonthlyData(formattedData.reverse());
          setYearlyData(yearlyAggregated);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading data...</p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      </div>
    );
  }

  const months = monthlyData.map((item) => item.month);
  const totalPopulationData = monthlyData.map((item) => item.total_population);
  const latestData = monthlyData[monthlyData.length - 1] || {};

  const years = Object.keys(yearlyData);
  const yearlyTotalPopulations = years.map(
    (year) => yearlyData[year].total_population
  );

  // Yearly Total Population Chart
  const yearlyBarChartData = {
    labels: years,
    datasets: [
      {
        label: "Total Population",
        data: yearlyTotalPopulations,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  // Monthly Age Group Trends
  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: "Under 15",
        data: monthlyData.map((item) => item.less_than_15),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Age 15-24",
        data: monthlyData.map((item) => item.age_15_24),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  // Area Chart for Total Population (Monthly)
  const areaChartData = {
    labels: months,
    datasets: [
      {
        label: "Total Population",
        data: totalPopulationData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true, // ✅ Enables the area fill
      },
    ],
  };

  // Latest Age Distribution
  const pieChartData = {
    labels: ["Under 15", "15-24", "25-64", "65+"],
    datasets: [
      {
        data: [
          latestData.less_than_15 || 0,
          latestData.age_15_24 || 0,
          latestData.age_25_64 || 0,
          latestData.more_than_65 || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-200">
        <Card className="shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Yearly Total Population
            </CardTitle>
            <CardDescription>2018 - 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={yearlyBarChartData} />
          </CardContent>
        </Card>
        <Card className="shadow-sm col-span-1 sm:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Monthly Population Trends by Age Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Latest Age Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={pieChartData} />
          </CardContent>
        </Card>
        <Card className="shadow-sm col-span-1 sm:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Total Population (Area Chart)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={areaChartData} />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
