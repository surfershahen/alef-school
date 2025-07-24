import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import FontStyles from "@/components/landing/FontStyles";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Debug logging for analytics
    console.log("Vercel Analytics initialized", {
      environment: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      hostname: window.location.hostname
    });
  }, []);

  return (
    <>
      <FontStyles />
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
    </>
  );
}

export default App;
