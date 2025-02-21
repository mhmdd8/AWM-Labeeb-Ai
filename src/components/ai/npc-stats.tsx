import { BarChart, Users, Briefcase, Building } from "lucide-react";
import { LucideIcon } from "lucide-react";

type NPCStatsProps = {
  category?: string;
  description?: string;
  subjects?: string[];
  message: string;
};

const getCategoryIcon = (category?: string): LucideIcon => {
  switch (category?.toLowerCase()) {
    case "population":
      return Users;
    case "social":
      return Briefcase;
    case "economic":
      return BarChart;
    default:
      return Building;
  }
};

const getCategoryColor = (category?: string): string => {
  switch (category?.toLowerCase()) {
    case "population":
      return "bg-blue-100";
    case "social":
      return "bg-green-100";
    case "economic":
      return "bg-orange-100";
    default:
      return "bg-gray-100";
  }
};

export const NPCStats = ({
  category,
  description,
  subjects,
  message,
}: NPCStatsProps) => {
  const CategoryIcon = getCategoryIcon(category);
  const bgColor = getCategoryColor(category);

  return (
    <div className={`${bgColor} p-6 rounded-xl w-full`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {category || "NPC Statistics"}
        </h2>
        <CategoryIcon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
      </div>
      <div className="space-y-4">
        {description && (
          <p className="text-gray-700 font-medium">{description}</p>
        )}
        {subjects && subjects.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600">
              Available Subjects:
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {subjects.map((subject, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 bg-white/50 p-2 rounded"
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        )}
        <a
          href="https://www.npc.qa/en/statistics/pages/subjectdetails.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-gray-600 italic hover:text-gray-800 transition-colors"
        >
          {message}
        </a>
      </div>
    </div>
  );
};
