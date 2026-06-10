import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Workplace AI Assistant — CAPACITI Workflow AI" },
      { name: "description", content: "Your ChatGPT-style assistant for productivity, communication, planning, meetings and research support." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Help me prepare for my 1:1 with my manager",
  "Summarize this week's deliverables",
  "Draft a polite decline to a meeting invite",
  "How should I prioritize my backlog?",
];

const canned = [
  "Great question. Here's how I'd approach this: start by clarifying the outcome you want, then break it into 2–3 visible milestones this week. I can draft a plan if you'd like.",
  "Based on what you've shared, I'd recommend keeping it short and action-focused. Lead with the outcome, then list 3 next steps with owners and dates.",
  "Here's a structured way to think about it: identify the blocker, list 2 options, pick the one with the highest leverage and lowest risk. Want me to format that as a one-pager?",
];

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm CAPACITI AI — your workplace assistant. Ask me anything about productivity, communication, planning, meetings or research. I'll keep it practical and on-brand." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setTimeout(() => {
      const reply = canned[Math.floor(Math.random() * canned.length)];
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    }, 500);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Workplace AI Assistant"
        title="Your always-on AI teammate"
        description="Get instant help with writing, planning, meetings and decisions. The assistant remembers context within a conversation."
        icon={<Bot className="h-3 w-3" />}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col rounded-2xl border border-border bg-card shadow-soft min-h-[620px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[620px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center ${
                  m.role === "user" ? "bg-coral/15 text-coral" : "gradient-brand text-primary-foreground"
                }`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}>{m.content}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="border-t border-border p-3 flex gap-2"
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your work..." className="flex-1" />
            <Button type="submit" className="bg-primary hover:bg-primary/90"><Send className="h-4 w-4" /></Button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Try asking</div>
            <div className="space-y-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="block w-full text-left text-sm rounded-lg border border-border bg-muted/40 hover:bg-muted hover:border-primary/40 transition-colors px-3 py-2">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl gradient-brand text-primary-foreground p-4 shadow-glow">
            <Badge className="bg-white/15 border-white/20 text-white mb-2">AI safety</Badge>
            <p className="text-xs leading-relaxed text-white/85">
              Don't share confidential data with the assistant. AI responses may be inaccurate — always verify before acting.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
