// @leadconnector/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only, jsxSource fallback + tailwind config), @tanstack/devtools-vite source injection (data-tsd-source, dev-only),
//     HMR gate/flush, dev-server bridge controls, server diagnostics, lightningcss, and sandbox detection
//     (secure host allowlist, port/strictPort, watch ignores, and HMR overlay policy).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if you needed.
import { defineConfig } from "@leadconnector/vite-tanstack-config";

// Override the Nitro preset to "vercel" so `vite build` emits a deployable
// `.vercel/output/` directory (Vercel Build Output API) when building on
// Vercel. This is safe inside the Vibe sandbox — buildNitroOptions() forces
// cloudflare-module when VIBE_SANDBOX=1 regardless of this value, so the
// preview continues to work unchanged.
const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  // Browser errors stay in the trusted parent-frame console-log flow;
  // do not expose the bridge collector on the public sandbox tunnel.
  devServerBridge: { errorCollector: false },
  // Do not set server.hmr.timeout — Vite 8 deprecated those websocket fields
  // (use server.ws.*). Overlay/host/port are package-owned; default WS timeout is 30s.
  // Use the Vercel Nitro preset when building on Vercel; in the sandbox the
  // package overrides this to cloudflare-module automatically.
  nitro: isVercel ? { preset: "vercel" } : { preset: "cloudflare-module" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});