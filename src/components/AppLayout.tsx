import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, Bell, X, Mail as MailIcon, Building2, BadgeCheck, LogOut, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  LayoutDashboard, Mail, Calendar, ListChecks, Search, Bot, Users, Sparkles, ShieldCheck,
} from "lucide-react";

const currentMember = {
  initials: "AK",
  name: "Amara Khumalo",
  role: "Senior Product Manager",
  email: "amara.khumalo@capaciti.org.za",
  team: "CAPACITI · Workflow AI",
  plan: "Enterprise",
};

const mobileNav = [
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

export function AppLayout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-16 border-b border-border glass flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="lg:hidden"><Logo size={26} withText /></div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full gradient-brand text-primary-foreground text-xs font-semibold">
              AK
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-sidebar text-sidebar-foreground p-4 flex flex-col animate-in slide-in-from-left">
            <div className="flex items-center justify-between mb-4">
              <Logo size={28} withText />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-sidebar-foreground">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-0.5">
              {mobileNav.map(({ to, label, icon: Icon }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
