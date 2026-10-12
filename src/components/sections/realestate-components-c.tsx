import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Home,
  MapPin,
  PoundSterling,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RE_QUALIFICATION, RE_PROPERTY_FEATURES } from "./realestate-data";

/* Lead qualification */
export function ReQualification() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const complete = progress >= RE_QUALIFICATION.length;

  useEffect(() => {
    if (!started || complete) return;
    const t = setTimeout(() => setProgress((p) => p + 1), 700);
    return () => clearTimeout(t);
  }, [started, progress, complete]);

  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-glow-gold" />
          <span className="font-mono text-xs text-muted-foreground">qualification.system</span>
        </div>
        <span className="rounded-full bg-glow-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-glow-gold">
          AI Preview
        </span>
      </div>
      <div className="mt-5 space-y-2.5">
        {RE_QUALIFICATION.map((item, i) => {
          const lit = started && progress > i;
          return (
            <motion.div
              key={item.q}
              initial={false}
              animate={{
                opacity: lit ? 1 : 0.4,
                borderColor: lit ? "var(--glow-gold)" : "var(--border)",
              }}
              className="rounded-lg border bg-background/50 px-3.5 py-2.5"
            >
              <p className="text-xs text-muted-foreground">{item.q}</p>
              {lit && (
                <motion.p
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-0.5 text-sm font-semibold text-foreground"
                >
                  {item.a}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-glow-gold-light/40 bg-glow-gold-light/10 px-4 py-3 text-sm font-semibold text-glow-gold-light"
          >
            <CheckCircle2 className="h-4 w-4" />
            Qualification Complete · High Priority — Sample
          </motion.div>
        )}
      </AnimatePresence>
      {!started && (
        <button
          onClick={() => setStarted(true)}
          className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105"
        >
          Start Qualification
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
      <p className="mt-4 text-[10px] text-muted-foreground">
        Featured only — illustrative qualification, not a real AI prediction.
      </p>
    </div>
  );
}

/* Property matching */
export function RePropertyMatch() {
  const [requested, setRequested] = useState(false);
  const [viewed, setViewed] = useState(false);
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-glow-gold" />
          <span className="font-mono text-xs text-muted-foreground">property_match.system</span>
        </div>
        <span className="rounded-full bg-glow-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-glow-gold">
          Sample
        </span>
      </div>
      <div className="mt-5 rounded-xl border border-glow-gold/30 bg-glow-gold/5 p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-glow-gold" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-glow-gold">
            Recommended Property Match
          </span>
        </div>
        <p className="font-display text-base font-bold text-foreground">
          Modern 3-Bedroom Family Home
        </p>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Manchester
          </span>
          <span className="flex items-center gap-1">
            <PoundSterling className="h-3 w-3" /> 450,000
          </span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {RE_PROPERTY_FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background/50 py-2"
            >
              <f.icon className="h-4 w-4 text-glow-gold" />
              <span className="text-[10px] text-muted-foreground">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setViewed((v) => !v)}
            className="rounded-full border border-border bg-background/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {viewed ? "Hide Details" : "View Property"}
          </button>
          <button
            onClick={() => setRequested(true)}
            className="group flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:brightness-105"
          >
            Request Viewing
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <AnimatePresence>
          {viewed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <p>• Bright, open-plan living area with modern kitchen</p>
                <p>• Master bedroom with en-suite bathroom</p>
                <p>• Private rear garden with patio area</p>
                <p>• Off-street parking for two vehicles</p>
                <p>• EPC rating: B · Council tax band: D</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {requested && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 rounded-lg bg-glow-gold/15 px-3 py-2.5 text-xs font-semibold text-glow-gold"
            >
              <CheckCircle2 className="h-4 w-4" />
              Viewing requested — calendar opened below
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Agent notification */
export function ReAgentNotification() {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-glow-gold" />
          <span className="font-mono text-xs text-muted-foreground">agent_notification.system</span>
        </div>
        <span className="rounded-full bg-glow-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-glow-gold">
          Sample
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-5 rounded-xl border border-glow-gold/30 bg-glow-gold/5 p-4"
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-glow-gold" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-glow-gold">
            New Qualified Property Lead
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-glow-gold/20 text-sm font-bold text-glow-gold">
            DC
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Daniel Carter</p>
            <p className="text-xs text-muted-foreground">3-Bedroom Family Home</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5 text-xs">
          {[
            { l: "Budget", v: "£450,000" },
            { l: "Location", v: "Manchester" },
            { l: "Status", v: "Qualified" },
          ].map((r) => (
            <div
              key={r.l}
              className="flex items-center justify-between rounded-md border border-border bg-background/50 px-3 py-2"
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {r.l}
              </span>
              <span className="font-medium text-foreground">{r.v}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="group mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-glow-gold/40 bg-glow-gold/10 py-2.5 text-xs font-semibold text-glow-gold transition-colors hover:bg-glow-gold/20"
        >
          {open ? "Hide Lead" : "Open Lead"}
          <ArrowRight
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              open ? "rotate-90" : "group-hover:translate-x-0.5",
            )}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { l: "Phone", v: "+1 555 010 9876" },
                  { l: "Email", v: "daniel@example.com" },
                  { l: "Source", v: "Property Landing Page" },
                  { l: "Next Action", v: "Schedule Viewing" },
                ].map((r) => (
                  <div
                    key={r.l}
                    className="rounded-md border border-border bg-background/50 px-3 py-2"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {r.l}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-foreground">{r.v}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
