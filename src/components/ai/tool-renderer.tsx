import { Weather } from "./weather";
import { NPCStats } from "./npc-stats";
import { StatsChart } from "./stats-chart";
import { WaterConsumption } from "./water-consumption";

type ToolInvocation = {
  toolName: string;
  toolCallId: string;
  state: string;
  result?: any;
};

const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 text-gray-500 animate-pulse">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
    <span>{message}</span>
  </div>
);

const ToolComponents = {
  displayWeather: {
    component: Weather,
    loadingMessage: "Fetching weather data...",
  },
  npcStats: {
    component: NPCStats,
    loadingMessage: "Loading NPC statistics...",
  },
  randomStats: {
    component: StatsChart,
    loadingMessage: "Generating random statistics...",
  },
  waterConsumption: {
    component: WaterConsumption,
    loadingMessage: "Generating water consumption data...",
  },
} as const;

export function ToolRenderer({
  toolInvocation,
}: {
  toolInvocation: ToolInvocation;
}) {
  const { toolName, toolCallId, state, result } = toolInvocation;
  const tool = ToolComponents[toolName as keyof typeof ToolComponents];

  if (!tool) return null;

  if (state === "result") {
    const ToolComponent = tool.component;
    return (
      <div key={toolCallId}>
        <ToolComponent {...result} />
      </div>
    );
  }

  return <LoadingState message={tool.loadingMessage} />;
}
