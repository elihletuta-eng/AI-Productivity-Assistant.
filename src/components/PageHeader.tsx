import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
      <div className="space-y-2">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral">
            {icon}
            {eyebrow}
            <ChevronRight className="h-3 w-3" />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
