import { lazy, Suspense } from "react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/motion";
import { LazyMount, DemoSkeleton } from "@/components/lazy-mount";

/* Code-split each cinematic demo so its (large) scene bundle is only
   fetched when the visitor actually scrolls down to this section. */
const GhlCinematicDemo = lazy(() =>
  import("@/components/ghl-cinematic-demo").then((m) => ({ default: m.GhlCinematicDemo })),
);
const MetaCinematicDemo = lazy(() =>
  import("@/components/meta-cinematic-demo").then((m) => ({ default: m.MetaCinematicDemo })),
);
const JourneyCinematicDemo = lazy(() =>
  import("@/components/journey-cinematic-demo").then((m) => ({ default: m.JourneyCinematicDemo })),
);

/* SYSTEMS & WORKFLOW — See The Systems In Action */
export function DemoVideosSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Systems & Workflow"
        title="See The Systems In Action"
        intro="Cinematic walkthroughs showing how GoHighLevel, Meta Ads and a connected lead journey actually work — from first click to customer."
        align="center"
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <Reveal>
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-foreground">
              GoHighLevel System Walkthrough
            </h3>
            <LazyMount height="340px">
              <Suspense fallback={<DemoSkeleton />}>
                <GhlCinematicDemo />
              </Suspense>
            </LazyMount>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-foreground">
              Meta Ads Campaign Walkthrough
            </h3>
            <LazyMount height="340px">
              <Suspense fallback={<DemoSkeleton />}>
                <MetaCinematicDemo />
              </Suspense>
            </LazyMount>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-foreground">
              Lead-to-Appointment Workflow
            </h3>
            <LazyMount height="340px">
              <Suspense fallback={<DemoSkeleton />}>
                <JourneyCinematicDemo />
              </Suspense>
            </LazyMount>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
