import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import FontStyles from "@/components/landing/FontStyles";

function App() {
  return (
    <>
      <FontStyles />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
