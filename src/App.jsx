import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import FontStyles from "@/components/landing/FontStyles";

function App() {
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
