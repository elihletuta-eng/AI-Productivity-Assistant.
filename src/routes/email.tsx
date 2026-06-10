import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Copy, Star, Save, FileDown, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — CAPACITI Workflow AI" },
      { name: "description", content: "Generate professional emails in seconds with Formal, Friendly, Persuasive, Apologetic and Follow-Up tones." },
    ],
  }),
  component: EmailPage,
});

const tones = ["Formal", "Friendly", "Persuasive", "Apologetic", "Follow-Up"] as const;
type Tone = typeof tones[number];

const samples: Record<Tone, (ctx: string, recipient: string) => string> = {
  Formal: (ctx, r) => `Subject: Following up on ${ctx || "our recent discussion"}

Dear ${r || "Recipient"},

I hope this message finds you well. I am writing to follow up on ${ctx || "our recent conversation"} and to outline the next steps we discussed.

Based on our exchange, I would like to propose the following:
  • A brief alignment call to confirm priorities
  • A shared document detailing scope and deliverables
  • A target date for the next milestone

Please let me know a time that works for you in the coming week. I appreciate your continued partnership.

Kind regards,
[Your name]`,
  Friendly: (ctx, r) => `Subject: Quick check-in 👋

Hey ${r || "there"},

Hope your week is off to a great start! Just wanted to circle back on ${ctx || "the thing we chatted about"} — wondering if there's anything I can help unblock on my end?

Happy to jump on a quick call, or keep it async if that's easier. Whatever works for you!

Cheers,
[Your name]`,
  Persuasive: (ctx, r) => `Subject: A 15-minute idea worth exploring

Hi ${r || "there"},

I've been thinking about ${ctx || "our shared challenge"}, and I believe there's a meaningful opportunity worth a closer look.

Here's why it matters:
  • Measurable impact in the next quarter
  • Low lift for your team — most of the work is on ours
  • Strong precedent: similar moves delivered 20–30% gains for peers

Could I have 15 minutes this week to walk you through it? I'm confident you'll find it worth your time.

Best,
[Your name]`,
  Apologetic: (ctx, r) => `Subject: My apologies regarding ${ctx || "our last exchange"}

Dear ${r || "Recipient"},

I want to sincerely apologize for ${ctx || "the inconvenience caused"}. I take full responsibility, and I understand the impact this may have had on you and your team.

Here is what I am doing to make it right:
  • Immediate corrective action on the issue
  • A clear plan to prevent recurrence
  • A direct line to me for any follow-up

Thank you for your patience and for giving me the opportunity to address this. Please don't hesitate to reach out directly.

With sincere regards,
[Your name]`,
  "Follow-Up": (ctx, r) => `Subject: Following up on ${ctx || "our conversation"}

Hi ${r || "there"},

Wanted to gently follow up on ${ctx || "the discussion we had"} — I know inboxes get busy, so no rush at all.

Whenever you have a moment, a quick yes/no or a redirect to the right person would be incredibly helpful.

Thanks so much,
[Your name]`,
};

function EmailPage() {
  const [tone, setTone] = useState<Tone>("Formal");
  const [recipient, setRecipient] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(samples[tone](context, recipient));
      setLoading(false);
      toast.success(`${tone} email drafted`);
    }, 700);
  };

  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied to clipboard"); };
  const save = () => toast.success("Saved to your drafts");
  const exportPdf = () => toast.success("PDF export queued");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Smart Email Generator"
        title="Draft the perfect email — in seconds"
        description="Pick a tone, add context, and CAPACITI AI writes a polished, on-brand message you can edit and send."
        icon={<Mail className="h-3 w-3" />}
      />

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card className="border-border/60 shadow-soft h-fit">
          <CardHeader>
            <CardTitle className="text-base">Compose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Tone</Label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      tone === t
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-card text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >{t}</button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" placeholder="e.g. Sarah" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="context">What's it about?</Label>
              <Textarea id="context" rows={5} placeholder="e.g. the Q4 budget review we discussed last Tuesday"
                value={context} onChange={(e) => setContext(e.target.value)} className="mt-1.5 resize-none" />
            </div>

            <Button onClick={generate} disabled={loading} className="w-full bg-primary hover:bg-primary/90 shadow-glow">
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Generate email
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft min-h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Draft</CardTitle>
              {output && <Badge variant="outline" className="text-coral border-coral/30">AI confidence: 94%</Badge>}
            </div>
            {output && (
              <div className="flex gap-1.5">
                <Button size="sm" variant="ghost" onClick={() => setFavorite((f) => !f)}>
                  <Star className={`h-4 w-4 ${favorite ? "fill-coral text-coral" : ""}`} />
                </Button>
                <Button size="sm" variant="ghost" onClick={copy}><Copy className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={save}><Save className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={exportPdf}><FileDown className="h-4 w-4" /></Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {output ? (
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground bg-muted/40 rounded-xl p-5 border border-border">{output}</pre>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground">
                <div className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <p className="text-sm">Your AI-drafted email will appear here.</p>
                <p className="text-xs mt-1">Always review before sending.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
