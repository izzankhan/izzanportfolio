import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

/**
 * Premium intro preloader — shows Izzan's portrait in a glowing gold ring
 * with name + positioning for ~4s, then fades out smoothly. Shows once per
 * session. Never shows a blank page: the ring + gradient fallback render
 * immediately, and the portrait crossfades in whenever it finishes decoding.
 */
export function IntroPreloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }
    // Fixed 5s display — does NOT wait on the image, so there is never a
    // blank gap. The portrait crossfades in as soon as it decodes.
    const ms = reduce ? 600 : 5000;
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("intro-seen", "1");
    }, ms);
    return () => clearTimeout(t);
  }, [reduce]);

  // Kick off portrait decode so it can crossfade in during the 4s window.
  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) return;
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = "high";
    img.src = SITE.avatar;
    const finish = () => {
      if (!cancelled) setImgReady(true);
    };
    img.onload = finish;
    img.onerror = finish;
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          aria-hidden="true"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 page-glow opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--glow-gold)_22%,transparent),transparent_70%)] blur-2xl" />

          {/* Portrait in glowing ring */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* rotating gold ring */}
            <motion.div
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, var(--glow-gold) 90deg, transparent 180deg, var(--glow-amber) 270deg, transparent 360deg)",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
            />
            {/* static soft ring */}
            <div className="absolute -inset-1 rounded-full glow-ring opacity-70" />
            {/* portrait — gradient fallback while decoding, crossfade when ready */}
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-glow-gold/40 bg-gradient-to-br from-glow-gold/25 via-card to-glow-amber/20 sm:h-40 sm:w-40">
              <motion.img
                src={SITE.avatar}
                alt="Izzan Khan"
                className="h-full w-full object-cover object-center"
                loading="eager"
                initial={{ opacity: 0 }}
                animate={{ opacity: imgReady ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            <span className="text-gradient">{SITE.name.toUpperCase()}</span>
          </motion.h1>

          {/* Positioning */}
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:text-xs"
          >
            GoHighLevel • Meta Ads • AI Automation
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
