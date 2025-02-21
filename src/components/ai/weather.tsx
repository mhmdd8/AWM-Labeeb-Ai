import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { LucideIcon } from "lucide-react";

type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

const getWeatherIcon = (weather: string): LucideIcon => {
  const lowercaseWeather = weather.toLowerCase();
  if (lowercaseWeather.includes("sun") || lowercaseWeather.includes("clear"))
    return Sun;
  if (lowercaseWeather.includes("rain")) return CloudRain;
  if (lowercaseWeather.includes("cloud")) return Cloud;
  if (lowercaseWeather.includes("snow")) return CloudSnow;
  if (lowercaseWeather.includes("thunder")) return CloudLightning;
  return Sun; // default
};

const getWeatherColor = (weather: string): string => {
  const lowercaseWeather = weather.toLowerCase();
  if (lowercaseWeather.includes("sun") || lowercaseWeather.includes("clear"))
    return "bg-yellow-100";
  if (lowercaseWeather.includes("rain")) return "bg-blue-100";
  if (lowercaseWeather.includes("cloud")) return "bg-gray-100";
  if (lowercaseWeather.includes("snow")) return "bg-slate-100";
  if (lowercaseWeather.includes("thunder")) return "bg-purple-100";
  return "bg-yellow-100"; // default
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  const WeatherIcon = getWeatherIcon(weather);
  const bgColor = getWeatherColor(weather);

  return (
    <div className={`${bgColor} p-6 rounded-xl w-full`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{location}</h2>
        <WeatherIcon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
      </div>
      <div className="space-y-2">
        <p className="text-gray-700 font-medium">{weather}</p>
        <p className="text-3xl font-bold text-gray-800">{temperature}°C</p>
      </div>
    </div>
  );
};
