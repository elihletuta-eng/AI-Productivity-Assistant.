import { createFileRoute } from "@tanstack/react-router";
import { Users, TrendingUp, AlertTriangle, Sparkles, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, RadialBarChart, RadialBar, Legend } from "recharts";

export const Route = createFileRoute("/employer")({
  head: () => ({
    meta: [
      { title: "Employer Dashboard — CAPACITI Workflow AI" },
      { name: "description", content: "Team productivity overview, workload distribution, deadlines, activity insights and AI recommendations." },
    ],
  }),
  component: EmployerPage,
});

const team = [
  { name: "Alex Khumalo", role: "PM", load: 82, focus: 88, status: "On track" },
  { name: "Priya Naidoo", role: "Engineering", load: 96, focus: 74, status: "Overloaded" },
  { name: "Jordan Smith", role: "Design", load: 64, focus: 91, status: "Healthy" },
  { name: "Mia Roberts", role: "Customer Success", load: 78, focus: 80, status: "On track" },
  { name: "Sam Patel", role: "Operations", load: 55, focus: 70, status: "Capacity" },
];

const workload = [
  { team: "Engineering", load: 96 },
  { team: "Product", load: 78 },
  { team: "Design", load: 64 },
  { team: "Sales", load: 88 },
  { team: "Ops", load: 55 },
];

const radial = [
  { name: "Engaged", value: 84, fill: "oklch(0.28 0.13 268)" },
  { name: "At risk", value: 12, fill: "oklch(0.78 0.16 75)" },
  { name: "Burnout flag", value: 4, fill: "oklch(0.68 0.2 22)" },
];

const deadlines = [
  { task: "Pilot agreement sent", owner: "Alex K.", due: "Wed", risk: "low" },
  { task: "SSO + audit log spec", owner: "Priya N.", due: "Fri", risk: "high" },
  { task: "Onboarding flow v3", owner: "Jordan S.", due: "Mon", risk: "medium" },
  { task: "Pilot kickoff calls", owner: "Mia R.", due: "Next week", risk: "low" },
];

const recommendations = [
  { title: "Rebalance Engineering load", desc: "Priya is at 96% capacity. Reassign 2 backlog items to Sam or push the audit log spec by a week.", tone: "warn" as const },
  { title: "Promote async standups", desc: "Replace daily 30-min standups with async updates — saves the team ≈ 12.5h/week.", tone: "tip" as const },
  { title: "Recognize Design", desc: "Jordan has the highest focus score this quarter. A quick shoutout boosts retention signal.", tone: "win" as const },
];

function EmployerPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Employer Dashboard"
        title="See how your team really works"
        description="Live productivity, workload, deadline risk, and AI-generated recommendations to help your people do their best work — without burnout."
        icon={<Users className="h-3 w-3" />}
      />

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Team productivity", value: "84%", delta: "+6%", icon: TrendingUp, color: "bg-primary/10 text-primary" },
          { label: "Hours saved by AI", value: "142h", delta: "this month", icon: Clock, color: "bg-coral/10 text-coral" },
          { label: "Active members", value: "37", delta: "/ 40", icon: Users, color: "bg-chart-4/15 text-chart-4" },
          { label: "Burnout risk flags", value: "2", delta: "needs review", icon: AlertTriangle, color: "bg-warning/15 text-warning" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.delta}</span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Workload by team</CardTitle>
            <p className="text-xs text-muted-foreground">Capacity used this week</p>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="team" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="load" fill="oklch(0.28 0.13 268)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4 text-coral" /> Team engagement</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="40%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border/60 shadow-soft">
          <CardHeader><CardTitle className="text-base">Team members</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {team.map((m) => (
                <div key={m.name} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full gradient-brand text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {m.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{m.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{m.role}</div>
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Load</span>
                      <span className="font-medium">{m.load}%</span>
                    </div>
                    <Progress value={m.load} className={m.load > 90 ? "[&>div]:bg-coral" : ""} />
                  </div>
                  <div className="col-span-3 text-right">
                    <Badge variant="outline" className={
                      m.status === "Overloaded" ? "text-coral border-coral/30" :
                      m.status === "Healthy" ? "text-success border-success/30" :
                      "text-muted-foreground"
                    }>{m.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft">
          <CardHeader><CardTitle className="text-base">Upcoming deadlines</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.task} className="rounded-xl border border-border bg-muted/40 p-3">
                <div className="text-sm font-medium leading-snug">{d.task}</div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-muted-foreground">{d.owner}</span>
                  <Badge variant="outline" className={`text-xs ${
                    d.risk === "high" ? "text-coral border-coral/30" :
                    d.risk === "medium" ? "text-warning border-warning/30" :
                    "text-success border-success/30"
                  }`}>{d.due}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-coral" /> AI recommendations for managers</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {recommendations.map((r) => (
              <div key={r.title} className={`rounded-xl border p-4 ${
                r.tone === "warn" ? "border-warning/30 bg-warning/5" :
                r.tone === "win" ? "border-success/30 bg-success/5" :
                "border-primary/30 bg-primary/5"
              }`}>
                <div className="text-sm font-semibold mb-1">{r.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
