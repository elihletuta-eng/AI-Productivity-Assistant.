import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Sparkles, Loader2, CheckCircle2, AlertTriangle, Users, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Intelligence — CAPACITI Workflow AI" },
      { name: "description", content: "Turn raw meeting notes into executive summaries, decisions, action items, deadlines, risks and follow-ups." },
    ],
  }),
  component: MeetingsPage,
});

type Summary = {
  executive: string;
  decisions: string[];
  actions: { who: string; what: string; due: string }[];
  risks: string[];
  followUps: string[];
};

const sample: Summary = {
  executive:
    "The team aligned on shipping the Workflow AI v2 beta to 5 pilot customers by month-end. Pricing and onboarding remain the two open risks; both will be reviewed next Tuesday.",
  decisions: [
    "Launch beta with 5 enterprise pilots on Oct 28",
    "Hold pricing public until usage data lands",
    "Promote AI Coach out of preview in Q1",
  ],
  actions: [
    { who: "Alex (PM)", what: "Send pilot agreement template", due: "Wed" },
    { who: "Priya (Eng)", what: "Finalize SSO + audit log spec", due: "Fri" },
    { who: "Jordan (Design)", what: "Onboarding flow v3 mocks", due: "Mon" },
    { who: "Mia (CS)", what: "Schedule pilot kickoff calls", due: "Next week" },
  ],
  risks: [
    "Onboarding flow not yet validated with non-technical users",
    "Pricing model could leak before official launch",
  ],
  followUps: [
    "Pricing review meeting (Tue 2pm)",
    "Pilot readiness check (Fri standup)",
    "Legal sign-off on data processing addendum",
  ],
};

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  const summarize = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(sample);
      setLoading(false);
    }, 900);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Meeting Intelligence"
        title="Turn meetings into action — automatically"
        description="Paste your notes or transcript. CAPACITI AI extracts the executive summary, key decisions, action items with owners, deadlines, risks and follow-ups."
        icon={<Calendar className="h-3 w-3" />}
      />

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card className="border-border/60 shadow-soft h-fit">
          <CardHeader><CardTitle className="text-base">Meeting input</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="notes">Notes or transcript</Label>
              <Textarea id="notes" rows={14} value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste meeting notes, bullet points, or a full transcript here..."
                className="mt-1.5 resize-none" />
            </div>
            <Button onClick={summarize} disabled={loading} className="w-full bg-primary hover:bg-primary/90 shadow-glow">
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Summarize meeting
            </Button>
            <p className="text-xs text-muted-foreground">Tip: AI summaries are best when notes include who spoke and what they said.</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {!result ? (
            <Card className="border-border/60 shadow-soft min-h-[500px]">
              <CardContent className="flex flex-col items-center justify-center text-center py-24 text-muted-foreground">
                <div className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="text-sm">Your structured meeting brief will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-border/60 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Executive Summary</CardTitle>
                  <Badge variant="outline" className="text-coral border-coral/30">AI confidence: 92%</Badge>
                </CardHeader>
                <CardContent><p className="text-sm leading-relaxed text-foreground">{result.executive}</p></CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/60 shadow-soft">
                  <CardHeader><CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Key Decisions</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.decisions.map((d, i) => (
                        <li key={i} className="flex gap-2"><span className="text-success mt-0.5">•</span>{d}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border/60 shadow-soft">
                  <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Risks</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.risks.map((d, i) => (
                        <li key={i} className="flex gap-2"><span className="text-warning mt-0.5">•</span>{d}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/60 shadow-soft">
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Action Items & Responsibilities</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.actions.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <div className="h-8 w-8 rounded-full gradient-brand text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                          {a.who.split(" ")[0][0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{a.what}</div>
                          <div className="text-xs text-muted-foreground">{a.who}</div>
                        </div>
                        <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" />{a.due}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-soft">
                <CardHeader><CardTitle className="text-sm">Follow-Up Recommendations</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {result.followUps.map((d, i) => (
                      <li key={i} className="flex gap-2"><span className="text-coral mt-0.5">→</span>{d}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
