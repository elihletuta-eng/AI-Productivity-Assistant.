import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Eye, Lock, UserCheck, Sparkles, FileWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — CAPACITI Workflow AI" },
      { name: "description", content: "How CAPACITI uses AI responsibly: transparency, privacy, accuracy limits, human review and confidence indicators." },
    ],
  }),
  component: ResponsibleAIPage,
});

const principles = [
  {
    icon: AlertTriangle,
    title: "AI may be inaccurate",
    desc: "Outputs can sound confident but still be wrong. Treat AI as a thoughtful junior teammate — useful, but never the final word.",
    color: "border-warning/30 bg-warning/5 text-warning",
  },
  {
    icon: UserCheck,
    title: "Human review is required",
    desc: "Before sending an email, publishing a summary or acting on a recommendation, a person must review and approve.",
    color: "border-primary/30 bg-primary/5 text-primary",
  },
  {
    icon: FileWarning,
    title: "Verify important information",
    desc: "For numbers, citations, legal or compliance content, always cross-check against an authoritative source.",
    color: "border-coral/30 bg-coral/5 text-coral",
  },
  {
    icon: Lock,
    title: "Never upload confidential data",
    desc: "Don't paste customer PII, secrets, legal documents or anything you couldn't share publicly. Your workspace admin can restrict sensitive flows.",
    color: "border-destructive/30 bg-destructive/5 text-destructive",
  },
  {
    icon: ShieldCheck,
    title: "AI is not professional advice",
    desc: "CAPACITI AI is not a lawyer, accountant, doctor or HR professional. For regulated decisions, consult a qualified human.",
    color: "border-primary/30 bg-primary/5 text-primary",
  },
  {
    icon: Eye,
    title: "Transparency by default",
    desc: "Every AI output shows a confidence indicator and a reason. You can always ask 'why' and audit how the assistant reached its answer.",
    color: "border-success/30 bg-success/5 text-success",
  },
];

function ResponsibleAIPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Responsible AI"
        title="AI you can trust at work"
        description="CAPACITI is built on principles that protect your privacy, support human judgment, and make AI outputs transparent and verifiable."
        icon={<ShieldCheck className="h-3 w-3" />}
      />

      <Card className="mb-8 border-border/60 shadow-soft overflow-hidden">
        <div className="gradient-navy text-primary-foreground p-6 md:p-8">
          <Badge className="bg-white/15 text-white border-white/20 mb-3">Our commitment</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Augment people. Respect privacy. Stay honest.</h2>
          <p className="text-white/80 max-w-2xl text-sm md:text-base">
            CAPACITI Workflow AI is designed to save you time — not to replace your judgment. Every feature on
            this platform follows the principles below.
          </p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {principles.map((p) => (
          <Card key={p.title} className={`border shadow-soft ${p.color.replace(/text-\S+/, "")}`}>
            <CardContent className="p-5 flex gap-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}>
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-coral" /> AI confidence indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Every AI output across CAPACITI carries a confidence score. Use it to decide how much review the output needs.
            </p>
            {[
              { range: "90–100%", label: "High confidence", desc: "Likely accurate. Light review.", value: 95, color: "[&>div]:bg-success" },
              { range: "70–89%", label: "Moderate confidence", desc: "Review carefully before acting.", value: 80, color: "[&>div]:bg-primary" },
              { range: "Below 70%", label: "Low confidence", desc: "Treat as a draft. Verify thoroughly.", value: 55, color: "[&>div]:bg-coral" },
            ].map((c) => (
              <div key={c.range} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.label} <span className="text-muted-foreground font-normal">· {c.range}</span></span>
                </div>
                <Progress value={c.value} className={c.color} />
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Privacy & data handling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="font-semibold mb-1">What we don't do</div>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• We don't train foundation models on your data.</li>
                <li>• We don't sell your data to anyone, ever.</li>
                <li>• We don't share content across workspaces.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="font-semibold mb-1">What you control</div>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Delete any AI conversation or output at any time.</li>
                <li>• Restrict sensitive flows at the workspace level.</li>
                <li>• Export your data on request.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-coral/30 bg-coral/5 p-3 text-xs">
              <strong className="text-coral">Reminder:</strong> Don't paste customer PII, passwords, contracts or anything confidential into AI prompts.
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
