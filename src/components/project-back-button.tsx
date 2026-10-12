import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

/* Single "Back to Home" button shown on project pages.
   Returns the visitor to exactly where they came from (the page/section they
   clicked the project card on) using browser history. Falls back to the home
   page when there is no previous entry (e.g. direct/shared link). */
export function ProjectBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <Section>
      <Reveal>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </Reveal>
    </Section>
  );
}
