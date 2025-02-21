interface StatValueProps {
  value: string | number;
  label?: string;
  className?: string;
}

export function StatValue({ value, label, className }: StatValueProps) {
  return (
    <div className="flex flex-col">
      <div className={`text-2xl font-bold text-[#A31C37] ${className}`}>
        {value}
      </div>
      {label && <div className="text-sm text-muted-foreground">{label}</div>}
    </div>
  );
}
