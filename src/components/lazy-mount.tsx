import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Only mount (and therefore load) heavy children once they are near the
 * viewport. Used to defer code-split cinematic demos so the initial page
 * load stays fast — the demo bundle is not even requested until the user
 * scrolls close to it.
 */
export function LazyMount({
  children,
  height = "auto",
  rootMargin = "300px 0px",
}: {
  children: ReactNode;
  height?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return (
    <div ref={ref} style={{ minHeight: show ? undefined : height }} className="w-full">
      {show ? children : null}
    </div>
  );
}

export function DemoSkeleton() {
  return (
    <div className="aspect-video w-full animate-pulse rounded-2xl glass">
      <div className="flex h-full items-center justify-center">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Loading walkthrough…
        </span>
      </div>
    </div>
  );
}
