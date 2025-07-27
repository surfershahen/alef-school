import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import FontStyles from "@/components/landing/FontStyles";
import { useEffect } from "react";
import { initializePerformanceTracking } from "@/utils/performance";

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
