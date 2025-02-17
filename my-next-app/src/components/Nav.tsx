import { ChartColumn } from "lucide-react";

export default function Nav() {
  return (
    <nav className="bg-rose-900 border-b p-4 h-auto">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-2 gap-2">
          <ChartColumn className="w-2 h-2 text-gray-100" />
          <h1 className="text-xl font-bold text-gray-100">Dashboard</h1>
        </div>
      </div>
    </nav>
  );
}
