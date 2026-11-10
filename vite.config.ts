// Lovable's TanStack preset supplies the React, Tailwind, TanStack Start and Nitro plugins.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages serves this repository from a subdirectory, not the domain root.
  base: "/portfolio-minimal/",
  tanstackStart: {
    // Generate static HTML so GitHub Pages can host the app without a Node server.
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      failOnError: true,
    },
    // Keep the existing custom SSR server entry for local/other deployments.
    server: { entry: "server" },
  },
});
