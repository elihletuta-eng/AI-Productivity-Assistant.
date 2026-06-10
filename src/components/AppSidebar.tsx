import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  Calendar,
  ListChecks,
  Search,
  Bot,
  Users,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Intelligence", icon: Calendar },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/employer", label: "Employer Dashboard", icon: Users },
  { to: "/coach", label: "Productivity Coach", icon: Sparkles },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-5 border-b border-sidebar-border">
        <Logo size={28} withText />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-coral"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-xl p-4 bg-sidebar-accent text-sidebar-accent-foreground">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-coral" />
          <span className="text-xs font-semibold uppercase tracking-wider">Pro tip</span>
        </div>
        <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
          Always review AI output. CAPACITI AI augments your work — it doesn't replace judgment.
        </p>
      </div>
    </aside>
  );
}
