import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Loader2, Lightbulb, Target, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — CAPACITI Workflow AI" },
      { name: "description", content: "Get a structured research brief with summary, insights, recommendations, risks, opportunities and next steps." },
    ],
  }),
  component: ResearchPage,
});

const brief = {
  summary:
    "Enterprise SaaS pricing in 2026 is shifting from per-seat to usage- and outcome-based models. Buyers expect transparent cost predictability and ROI proof within the first 90 days.",
  insights: [
    "Top quartile vendors mix a low entry tier with usage-based expansion",
    "AI features are increasingly priced as add-ons, not bundled",
    "Annual commits with quarterly true-ups are becoming the norm in mid-market",
  ],
  recommendations: [
    "Launch with a clear 3-tier structure: Starter / Growth / Enterprise",
    "Price AI usage separately to protect margin and signal value",
    "Offer a 30-day ROI guarantee for enterprise pilots",
  ],
  risks: [
    "Sticker shock if AI add-on is communicated poorly",
    "Channel partners may resist usage-based comp models",
  ],
  opportunities: [
    "Position 'hours saved' as the headline ROI metric",
    "Capture mid-market with self-serve Growth tier",
  ],
  next: [
    "Validate pricing with 5 design partners next week",
    "Draft a value-based ROI calculator",
    "Brief the sales team on AI add-on messaging",
  ],
};

function ResearchPage() {
  const [q, setQ] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const go = () => { setLoading(true); setTimeout(() => { setReady(true); setLoading(false); }, 900); };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Research Assistant"
        title="Briefings that actually inform decisions"
        description="Ask any business question. CAPACITI AI returns a structured brief — summary, insights, recommendations, risks, opportunities and next steps."
        icon={<Search className="h-3 w-3" />}
      />

      <Card className="border-border/60 shadow-soft mb-6">
        <CardContent className="p-5 flex flex-col md:flex-row gap-3">
          <Input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. How should we price our enterprise AI add-on in 2026?" className="text-base" />
          <Button onClick={go} disabled={loading} className="bg-primary hover:bg-primary/90 shadow-glow md:w-auto">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Run research
          </Button>
        </CardContent>
      </Card>

      {!ready ? (
        <Card className="border-border/60 shadow-soft">
          <CardContent className="flex flex-col items-center justify-center text-center py-24 text-muted-foreground">
            <div className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4">
              <Search className="h-6 w-6" />
            </div>
            <p className="text-sm">Your structured research brief will appear here.</p>
            <p className="text-xs mt-1">Verify important information independently before acting on it.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          <Card className="border-border/60 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Summary</CardTitle>
              <Badge variant="outline" className="text-coral border-coral/30">AI confidence: 81%</Badge>
            </CardHeader>
            <CardContent><p className="text-sm leading-relaxed">{brief.summary}</p></CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Insights", icon: Lightbulb, color: "text-primary", items: brief.insights },
              { title: "Recommendations", icon: Target, color: "text-coral", items: brief.recommendations },
              { title: "Risks", icon: AlertTriangle, color: "text-warning", items: brief.risks },
              { title: "Opportunities", icon: TrendingUp, color: "text-success", items: brief.opportunities },
            ].map((s) => (
              <Card key={s.title} className="border-border/60 shadow-soft">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><s.icon className={`h-4 w-4 ${s.color}`} /> {s.title}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {s.items.map((i) => <li key={i} className="flex gap-2"><span className="text-muted-foreground mt-0.5">•</span>{i}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/60 shadow-soft">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Next steps</CardTitle></CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm list-decimal pl-5">
                {brief.next.map((n) => <li key={n}>{n}</li>)}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </PageShell>
  );
}
