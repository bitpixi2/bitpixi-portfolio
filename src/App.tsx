import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Work from "./pages/Work";
import CaseStudyVirtualWorlds from "./pages/CaseStudyVirtualWorlds";
import CaseStudyGfycat from "./pages/CaseStudyGfycat";
import CaseStudyMeitu from "./pages/CaseStudyMeitu";
import HireMe from "./pages/HireMe";
import Resume from "./pages/Resume";
import Links from "./pages/Links";
import Hobby from "./pages/Hobby";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/virtual-worlds" element={<CaseStudyVirtualWorlds />} />
      <Route path="/work/gfycat" element={<CaseStudyGfycat />} />
      <Route path="/work/meitu" element={<CaseStudyMeitu />} />
      <Route path="/about" element={<HireMe />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/hire-me" element={<HireMe />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/links" element={<Links />} />
      <Route path="/hobby" element={<Hobby />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
