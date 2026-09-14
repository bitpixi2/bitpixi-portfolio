/**
 * Prerender entry point for vite-prerender-plugin.
 * Only used during the production build to generate static HTML snapshots.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "./App.tsx";
import { blogPosts } from "./data/blogPosts";

const PRERENDER_ROUTES = [
  "/",
  "/work",
  "/work/virtual-worlds",
  "/work/gfycat",
  "/work/meitu",
  "/about",
  "/resume",
  "/testimonials",
  "/blog",
  "/hire-me",
  "/links",
  "/hobby",
  "/404",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export async function prerender(data: { url: string }) {
  const url = data?.url ?? "/";
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  // GitHub Pages serves files directly, so every public route needs its own HTML.
  return { html, links: new Set(PRERENDER_ROUTES) };
}

export const routes = PRERENDER_ROUTES;
