import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import FontStyles from "@/components/landing/FontStyles";
import { useEffect } from "react";
import { initializePerformanceTracking } from "@/utils/performance";
import { trackMetaPixelPageView } from "@/utils/metaPixel";
import { trackTikTokPageView } from "@/utils/tiktokPixel";

function App() {
  useEffect(() => {
    // Debug logging for analytics
    console.log("Vercel Analytics initialized", {
      environment: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      hostname: window.location.hostname,
    });

    // Initialize performance tracking for mobile optimization
    initializePerformanceTracking();

    // Track initial page view with Meta Pixel
    trackMetaPixelPageView("app_initialization");
    trackTikTokPageView("app_initialization");
  }, []);

  return (
    <>
      <FontStyles />
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
export default App;
