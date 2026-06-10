import type { ReactNode } from "react";
import { AppLayout } from "@/components/AppLayout";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">{children}</div>
    </AppLayout>
  );
}
