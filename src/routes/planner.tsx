import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Sparkles, Calendar, KanbanSquare, Grid3x3, Clock, Flame, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — CAPACITI Workflow AI" },
      { name: "description", content: "Generate a daily schedule, weekly plan, priority matrix and Kanban board from your goals." },
    ],
  }),
  component: PlannerPage,
});

const daily = [
  { time: "08:30", task: "Deep work — Workflow AI v2 spec", tag: "Focus" },
  { time: "10:00", task: "Standup with engineering", tag: "Meeting" },
  { time: "10:30", task: "Review Jordan's onboarding mocks", tag: "Review" },
  { time: "11:30", task: "Draft pilot pricing proposal", tag: "Writing" },
  { time: "13:30", task: "1:1 with Priya", tag: "People" },
  { time: "14:00", task: "Customer call — Acme Corp", tag: "Customer" },
  { time: "15:30", task: "Inbox + Slack triage", tag: "Admin" },
  { time: "16:30", task: "Weekly retro prep", tag: "Planning" },
];

const weekly = [
  { day: "Mon", focus: "Spec lockdown" },
  { day: "Tue", focus: "Pricing review (2pm)" },
  { day: "Wed", focus: "Pilot agreement sent" },
  { day: "Thu", focus: "Design review + QA" },
  { day: "Fri", focus: "Pilot readiness check" },
];

const matrix = {
  do: ["Pilot pricing proposal", "SSO spec review"],
  schedule: ["Onboarding QA pass", "Q4 OKR draft"],
  delegate: ["Update help center articles", "Triage support backlog"],
  drop: ["Recurring 'sync' on Thursdays", "Optional vendor demo"],
};

const kanban = {
  Backlog: ["Refactor analytics module", "Audit RBAC policies"],
  "In progress": ["Workflow AI v2 spec", "Pilot pricing proposal"],
  Review: ["Onboarding flow v3"],
  Done: ["SSO research", "Beta NDA template"],
};

function PlannerPage() {
  const [goals, setGoals] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const plan = () => { setLoading(true); setTimeout(() => { setReady(true); setLoading(false); }, 800); };

  return (
    <PageShell>
      <PageHeader
        eyebrow="AI Task Planner"
        title="Plan your day, week, and priorities"
        description="Tell CAPACITI AI what you're trying to achieve. Get a structured schedule, priority matrix, Kanban board and time-saving recommendations."
        icon={<ListChecks className="h-3 w-3" />}
      />

      <Card className="border-border/60 shadow-soft mb-6">
        <CardContent className="p-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Label htmlFor="goals">Goals & context</Label>
            <Textarea id="goals" rows={3} value={goals} onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Ship pilot beta by end of week, finalize pricing, prep for Tuesday's review."
              className="mt-1.5 resize-none" />
          </div>
          <Button onClick={plan} disabled={loading} className="bg-primary hover:bg-primary/90 shadow-glow md:w-auto">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Plan with AI
          </Button>
        </CardContent>
      </Card>

      {!ready ? (
        <Card className="border-border/60 shadow-soft">
          <CardContent className="flex flex-col items-center justify-center text-center py-24 text-muted-foreground">
            <div className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6" />
            </div>
            <p className="text-sm">Your AI-generated plan will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="day" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="day"><Clock className="h-3.5 w-3.5 mr-1.5" />Daily</TabsTrigger>
            <TabsTrigger value="week"><Calendar className="h-3.5 w-3.5 mr-1.5" />Weekly</TabsTrigger>
            <TabsTrigger value="matrix"><Grid3x3 className="h-3.5 w-3.5 mr-1.5" />Priority</TabsTrigger>
            <TabsTrigger value="kanban"><KanbanSquare className="h-3.5 w-3.5 mr-1.5" />Kanban</TabsTrigger>
            <TabsTrigger value="tips"><Flame className="h-3.5 w-3.5 mr-1.5" />Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="day">
            <Card className="border-border/60 shadow-soft">
              <CardHeader><CardTitle className="text-base">Today's schedule</CardTitle></CardHeader>
              <CardContent className="divide-y divide-border">
                {daily.map((d) => (
                  <div key={d.time} className="flex items-center gap-4 py-3">
                    <div className="w-16 text-sm font-mono text-muted-foreground">{d.time}</div>
                    <div className="flex-1 text-sm">{d.task}</div>
                    <Badge variant="outline" className="text-xs">{d.tag}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week">
            <Card className="border-border/60 shadow-soft">
              <CardHeader><CardTitle className="text-base">This week</CardTitle></CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-5">
                {weekly.map((w) => (
                  <div key={w.day} className="rounded-xl border border-border bg-muted/30 p-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-coral mb-2">{w.day}</div>
                    <div className="text-sm leading-snug">{w.focus}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matrix">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Eisenhower priority matrix</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {([
                  { key: "do", title: "Do now", color: "bg-coral/10 border-coral/30 text-coral" },
                  { key: "schedule", title: "Schedule", color: "bg-primary/10 border-primary/30 text-primary" },
                  { key: "delegate", title: "Delegate", color: "bg-chart-4/15 border-chart-4/30 text-chart-4" },
                  { key: "drop", title: "Drop", color: "bg-muted border-border text-muted-foreground" },
                ] as const).map((q) => (
                  <div key={q.key} className={`rounded-xl border p-4 ${q.color}`}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-3">{q.title}</div>
                    <ul className="space-y-1.5 text-sm text-foreground">
                      {matrix[q.key].map((t) => <li key={t}>• {t}</li>)}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kanban">
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(kanban).map(([col, items]) => (
                <Card key={col} className="border-border/60 shadow-soft">
                  <CardHeader className="pb-3"><CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">{col}</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {items.map((t) => (
                      <div key={t} className="rounded-lg border border-border bg-card p-3 text-sm hover:border-primary/40 transition-colors cursor-grab">
                        {t}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <Card className="border-border/60 shadow-soft">
              <CardHeader><CardTitle className="text-base">Productivity recommendations</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  "Batch all admin tasks to a single 30-minute window after lunch.",
                  "Protect 9–11am for deep work — your focus score peaks here.",
                  "Decline the Thursday 'sync' meeting — its agenda is covered by Slack updates.",
                  "Delegate help center updates to free 1.5h next week.",
                ].map((t) => (
                  <div key={t} className="flex gap-3 rounded-lg border border-border bg-muted/40 p-3">
                    <Sparkles className="h-4 w-4 text-coral mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </PageShell>
  );
}
