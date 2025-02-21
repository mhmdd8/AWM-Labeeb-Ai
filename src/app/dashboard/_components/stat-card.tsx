import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  icon: Icon,
  children,
  className,
  iconClassName,
}: StatCardProps) {
  return (
    <Card
      className={`overflow-hidden /md:border-0 rounded-none  ${
        className ?? ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 text-[#A31C37] ${iconClassName ?? ""}`} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
