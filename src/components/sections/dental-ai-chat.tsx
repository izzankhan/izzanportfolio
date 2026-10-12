import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_CHAT } from "./dental-data";

/* AI chat — extracted to keep dental-components.tsx focused.
   Buttons are wired: "Request Appointment" smooth-scrolls to the CRM section,
   "Ask Another Question" toggles an extra AI reply. */
export function AiChat() {
  const [extra, setExtra] = useState(false);
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-glow-gold" />
          <span className="font-mono text-xs text-muted-foreground">ai_assistant.system</span>
        </div>
        <span className="rounded-full bg-glow-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-glow-gold">
          AI Preview
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {AI_CHAT.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={cn("flex", m.from === "patient" ? "justify-start" : "justify-end")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                m.from === "patient"
                  ? "rounded-bl-sm border border-border bg-background/60 text-foreground"
                  : "rounded-br-sm bg-glow-gold/15 text-foreground",
              )}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {extra && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-glow-gold/15 px-4 py-2.5 text-sm text-foreground">
                Of course — would you prefer a morning or afternoon slot for your consultation?
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href="#system"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("system")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-105"
        >
          Request Appointment
        </a>
        <button
          onClick={() => setExtra((v) => !v)}
          className="rounded-full border border-border bg-background/40 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
        >
          {extra ? "Hide" : "Ask Another Question"}
        </button>
      </div>
      <p className="mt-4 text-[10px] text-muted-foreground">
        Sample conversation — illustrative interaction, not a live AI system.
      </p>
    </div>
  );
}
