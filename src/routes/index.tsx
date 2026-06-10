import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Sparkles, Mail, Calendar, ListChecks, Search, Bot, TrendingUp,
  Clock, Brain, Activity, ArrowUpRight, Zap, CheckCircle2, AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CAPACITI Workflow AI" },
      { name: "description", content: "Your AI productivity command center. Track tasks, hours saved, meetings summarized and team activity." },
    ],
  }),
  component: Dashboard,
});

const productivityData = [
  { day: "Mon", score: 72, hours: 4.2 },
  { day: "Tue", score: 78, hours: 5.1 },
  { day: "Wed", score: 85, hours: 6.0 },
  { day: "Thu", score: 81, hours: 5.6 },
  { day: "Fri", score: 90, hours: 7.2 },
  { day: "Sat", score: 65, hours: 2.4 },
  { day: "Sun", score: 60, hours: 1.8 },
];

const workforceData = [
  { team: "Engineering", tasks: 124, automated: 48 },
  { team: "Product", tasks: 86, automated: 31 },
  { team: "Design", tasks: 64, automated: 22 },
  { team: "Sales", tasks: 102, automated: 56 },
  { team: "Ops", tasks: 73, automated: 40 },
];

const stats = [
  { label: "Productivity Score", value: "87", unit: "/100", icon: TrendingUp, delta: "+12%", tone: "primary" as const },
  { label: "Tasks Planned", value: "248", icon: ListChecks, delta: "+34", tone: "default" as const },
  { label: "Hours Saved", value: "32.5", unit: "h", icon: Clock, delta: "this week", tone: "coral" as const },
  { label: "Meetings Summarized", value: "18", icon: Calendar, delta: "+6", tone: "default" as const },
  { label: "Emails Generated", value: "94", icon: Mail, delta: "+22", tone: "default" as const },
  { label: "AI Requests", value: "1,284", icon: Brain, delta: "+18%", tone: "default" as const },
];

const quickActions = [
  { to: "/email", label: "Draft an email", icon: Mail, color: "bg-coral/10 text-coral" },
  { to: "/meetings", label: "Summarize meeting", icon: Calendar, color: "bg-primary/10 text-primary" },
  { to: "/planner", label: "Plan my day", icon: ListChecks, color: "bg-chart-4/15 text-chart-4" },
  { to: "/research", label: "Research a topic", icon: Search, color: "bg-chart-3/15 text-chart-3" },
  { to: "/assistant", label: "Ask AI Assistant", icon: Bot, color: "bg-chart-5/15 text-chart-5" },
];

const recentActivity = [
  { icon: Mail, label: "Generated follow-up email to Acme Corp", time: "2m ago", saved: "8 min" },
  { icon: Calendar, label: "Summarized 'Q4 Strategy Sync' meeting", time: "1h ago", saved: "22 min" },
  { icon: ListChecks, label: "Re-prioritized tomorrow's tasks", time: "3h ago", saved: "12 min" },
  { icon: Search, label: "Research brief: 'Enterprise SaaS pricing'", time: "Yesterday", saved: "1.5 h" },
  { icon: Bot, label: "Asked AI Assistant about budgeting workflow", time: "Yesterday", saved: "15 min" },
];

const insights = [
  { type: "tip", icon: Sparkles, title: "Schedule deep work 9–11am", desc: "Your focus score peaks in the morning." },
  { type: "warn", icon: AlertTriangle, title: "Workload trending high", desc: "You have 14 tasks due this week — consider delegating 2." },
  { type: "win", icon: CheckCircle2, title: "Meeting time down 22%", desc: "AI summaries replaced 4 status syncs this month." },
];

function Dashboard() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl gradient-navy text-primary-foreground shadow-glow mb-8">
        <div className="absolute inset-0 opacity-30" style={{
          background: "radial-gradient(circle at 20% 0%, var(--color-coral), transparent 40%), radial-gradient(circle at 80% 100%, oklch(0.5 0.2 268), transparent 50%)",
        }} />
        <div className="relative grid gap-6 p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-5 max-w-2xl">
            <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20">
              <Sparkles className="h-3 w-3 mr-1" /> CAPACITI Workflow AI
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">
              Work Smarter.<br /><span className="text-coral">Collaborate Better.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Empowering employees and employers with AI tools that simplify communication,
              organize tasks, summarize meetings, automate repetitive work, and improve
              workplace productivity.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
                <Link to="/assistant"><Zap className="h-4 w-4 mr-2" /> Launch AI Assistant</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/5 text-white border-white/25 hover:bg-white/15 hover:text-white">
                <Link to="/planner">Plan my day</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-3 min-w-[260px]">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15">
              <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Today's focus</div>
              <div className="text-2xl font-bold">87<span className="text-white/50 text-lg">/100</span></div>
              <Progress value={87} className="mt-3 bg-white/15 [&>div]:bg-coral" />
              <div className="text-xs text-white/70 mt-2">+12% vs last week</div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15">
              <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Time saved this week</div>
              <div className="text-2xl font-bold">32.5h</div>
              <div className="text-xs text-white/70 mt-2">≈ 4 working days reclaimed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 shadow-soft hover:shadow-glow transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                  s.tone === "coral" ? "bg-coral/10 text-coral" :
                  s.tone === "primary" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
                }`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{s.delta}</span>
              </div>
              <div className="text-2xl font-bold tracking-tight">
                {s.value}<span className="text-sm font-medium text-muted-foreground">{s.unit ?? ""}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card className="mb-8 border-border/60 shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="group rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-glow transition-all p-4 flex flex-col items-start gap-3"
            >
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${a.color}`}>
                <a.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium leading-tight">{a.label}</div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Productivity analytics */}
        <Card className="lg:col-span-2 border-border/60 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Productivity Analytics</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Daily focus score and AI-saved hours</p>
            </div>
            <Badge variant="outline" className="text-coral border-coral/30">+12% WoW</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.28 0.13 268)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.28 0.13 268)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.2 22)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.68 0.2 22)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="score" stroke="oklch(0.28 0.13 268)" strokeWidth={2.5} fill="url(#g1)" />
                  <Area type="monotone" dataKey="hours" stroke="oklch(0.68 0.2 22)" strokeWidth={2.5} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI insights */}
        <Card className="border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-coral" /> AI Workforce Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((i) => (
              <div key={i.title} className="rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    i.type === "warn" ? "bg-warning/15 text-warning" :
                    i.type === "win" ? "bg-success/15 text-success" : "bg-primary/10 text-primary"
                  }`}>
                    <i.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{i.title}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{i.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Workforce chart */}
        <Card className="lg:col-span-2 border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Team Workload & AI Automation</CardTitle>
            <p className="text-xs text-muted-foreground">Tasks completed vs tasks automated by CAPACITI AI</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workforceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="team" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="tasks" fill="oklch(0.28 0.13 268)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="automated" fill="oklch(0.68 0.2 22)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-8 w-8 shrink-0 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm leading-snug truncate">{a.label}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{a.time}</span>
                    <span className="text-coral font-medium">· saved {a.saved}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
