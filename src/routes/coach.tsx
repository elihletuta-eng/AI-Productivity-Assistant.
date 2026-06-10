import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, TrendingUp, AlertTriangle, Clock, MessageSquare, Calendar, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Productivity Coach — CAPACITI Workflow AI" },
      { name: "description", content: "Your personal AI coach analyzes your work patterns and gives you concrete tips to be more productive, healthier and happier." },
    ],
  }),
  component: CoachPage,
});

const coachInsights = [
  { icon: TrendingUp, title: "Productivity tip", text: "Your focus score peaks at 9:30am. Block 9–11am as 'no-meeting' time tomorrow.", tone: "primary" },
  { icon: AlertTriangle, title: "Workload warning", text: "You're tracking 11 hours over your usual weekly load. Consider rescheduling 2 non-urgent tasks.", tone: "warn" },
  { icon: Clock, title: "Time management", text: "You spent 4.2h in meetings yesterday — 38% above baseline. 2 of them had no decisions logged.", tone: "primary" },
  { icon: MessageSquare, title: "Communication", text: "Your last 5 follow-up emails averaged 280 words. Try aiming for under 120 for higher reply rates.", tone: "tip" },
  { icon: Calendar, title: "Meeting efficiency", text: "Convert the Thursday 30-min sync to an async Slack update — saves 2h/month for 6 people.", tone: "tip" },
] as const;

const habits = [
  { name: "Deep work blocks", value: 72 },
  { name: "Meeting hygiene", value: 58 },
  { name: "Response time", value: 84 },
  { name: "Workload balance", value: 46 },
  { name: "AI tool usage", value: 91 },
];

function CoachPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Innovation Feature"
        title="AI Productivity Coach"
        description="A private, AI-powered coach that learns your work patterns and nudges you toward better habits — focus, communication, meetings, workload and wellbeing."
        icon={<Sparkles className="h-3 w-3" />}
      />

      <Card className="mb-6 border-border/60 shadow-soft overflow-hidden">
        <div className="relative gradient-brand p-6 md:p-8 text-primary-foreground">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <Badge className="bg-white/15 text-white border-white/20 mb-3"><Brain className="h-3 w-3 mr-1" /> Weekly coach report</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">You saved <span className="text-coral">7.8 hours</span> this week 👏</h2>
              <p className="text-white/85 text-sm max-w-xl">
                That's 21% better than your 4-week average. Your biggest wins came from AI meeting summaries and the new morning deep-work block.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 min-w-[200px]">
              <div className="text-xs uppercase tracking-wider text-white/60">Wellbeing trend</div>
              <div className="text-3xl font-bold mt-1">Healthy</div>
              <div className="text-xs text-white/70 mt-1">Avg workday: 7h 52m</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {coachInsights.map((i) => (
            <Card key={i.title} className="border-border/60 shadow-soft hover:shadow-glow transition-shadow">
              <CardContent className="p-5 flex gap-4">
                <div className={`h-11 w-11 rounded-xl shrink-0 flex items-center justify-center ${
                  i.tone === "warn" ? "bg-warning/15 text-warning" :
                  i.tone === "tip" ? "bg-coral/10 text-coral" :
                  "bg-primary/10 text-primary"
                }`}>
                  <i.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{i.title}</h3>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">AI suggestion</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{i.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border-border/60 shadow-soft">
            <CardHeader><CardTitle className="text-base">Habit scorecard</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {habits.map((h) => (
                <div key={h.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium">{h.name}</span>
                    <span className="text-muted-foreground">{h.value}</span>
                  </div>
                  <Progress value={h.value} className={h.value < 60 ? "[&>div]:bg-coral" : h.value < 80 ? "[&>div]:bg-warning" : "[&>div]:bg-success"} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-soft">
            <CardHeader><CardTitle className="text-base">This week's micro-goal</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-xl border border-coral/30 bg-coral/5 p-4">
                <p className="text-sm font-medium text-foreground">
                  Decline or async one meeting per day.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Goal: reclaim 2.5h by Friday. CAPACITI will track your progress.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
