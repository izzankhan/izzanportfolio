import { motion } from "framer-motion";

/* Real GoHighLevel proof — realistic screenshot previews.
   Mirrors the implementation section used by the Salon, Real Estate
   and Accounting projects for visual consistency. */
export function DentalGhlProof() {
  const cards = [
    {
      title: "Workflow Builder",
      desc: "Visual trigger & multi-step follow-up automation builder.",
      img: "https://vibe.filesafe.space/1790832248517648215/assets/7add1638-9116-404c-97af-a3f8eb6c7964.png",
    },
    {
      title: "CRM Opportunity Pipeline",
      desc: "Kanban pipeline tracking patients from New Lead to Completed.",
      img: "https://vibe.filesafe.space/1790832248517648215/assets/4296cfaf-6a4f-4664-a669-b09b546f3f0c.png",
    },
    {
      title: "Lead Capture & Funnel Builder",
      desc: "Custom appointment form wired directly into automated sequences.",
      img: "https://vibe.filesafe.space/1790832248517648215/assets/5304491c-f874-44db-9a0f-1df262016353.png",
    },
    {
      title: "Appointment Calendar",
      desc: "Online calendar sync with automatic SMS & email reminders.",
      img: "https://vibe.filesafe.space/1790832248517648215/assets/b1b8060c-b47a-4dfc-aede-e6326b4759a4.png",
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08 }}
          className="glass group overflow-hidden rounded-2xl p-4 transition-all hover:border-glow-gold/40"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-background/60">
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>
          <div className="mt-3.5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">{c.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.desc}</p>
            </div>
            <span className="shrink-0 rounded-full bg-glow-gold/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-glow-gold">
              Implementation
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
