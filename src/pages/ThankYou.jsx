import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getUserInfo } from "@/utils/localStorage";
import { trackPageView } from "@/utils/vercelAnalytics";
import {
  trackMetaPixelPageView,
  trackMetaPixelLead,
  trackMetaPixelFormSubmission,
} from "@/utils/metaPixel";
import {
  trackTikTokPageView,
  trackTikTokCompleteRegistration,
  trackTikTokLeadSubmit,
} from "@/utils/tiktokPixel";

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get name from navigation state or default to empty string
  const name = location.state?.name || "";
  const firstName = name?.split(" ")[0] || "";

  // Retrieve stored user info for Calendly pre-fill
  const { name: storedName, email: storedEmail } = getUserInfo();

  // Calendly base scheduling page (event or landing) – make sure this is correct
  const CALENDLY_BASE_URL = "https://calendly.com/alefschool10"; // <- update if needed

  // Ref that will host the Calendly iframe
  const calendlyContainerRef = useRef(null);

  // Dynamically load Calendly script and initialize widget with pre-filled answers
  useEffect(() => {
    // Track page view
    trackPageView("thank_you_page");
    trackMetaPixelPageView("thank_you_page");
    trackTikTokPageView("thank_you_page");
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "CompleteRegistration");
    }

    // Track Meta Pixel conversion events
    trackMetaPixelLead({ content_name: "exam_completion" });
    trackMetaPixelFormSubmission("exam_completion", {
      content_name: "exam_completion",
      value: 1,
    });
    trackTikTokLeadSubmit({ content_name: "exam_completion" });
    trackTikTokCompleteRegistration({
      content_name: "exam_completion",
      value: 1,
      currency: "USD",
    });

    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";

    const initCalendly = () => {
      if (!window.Calendly || !calendlyContainerRef.current) return;

      // Avoid initializing multiple times (e.g., React StrictMode in dev)
      if (calendlyContainerRef.current.dataset.initialized) return;

      window.Calendly.initInlineWidget({
        url: CALENDLY_BASE_URL,
        parentElement: calendlyContainerRef.current,
        prefill: {
          name: storedName || name || "",
          email: storedEmail || "",
        },
      });

      calendlyContainerRef.current.dataset.initialized = "true";
    };

    if (window.Calendly) {
      initCalendly();
    } else {
      const existingScript = document.querySelector(
        `script[src='${scriptSrc}']`
      );
      if (existingScript) {
        existingScript.addEventListener("load", initCalendly);
      } else {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = initCalendly;
        document.body.appendChild(script);
      }
    }

    // No cleanup required – we want to keep the widget/script across navigations
  }, [CALENDLY_BASE_URL, storedName, storedEmail, name]);

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      dir="rtl"
    >
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-green-100 rounded-full p-6">
            <CheckCircle2 className="text-green-600 h-16 w-16" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          شكراً لك {firstName}!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl mb-6 text-gray-600"
        >
          تم إكمال الاختبار بنجاح
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Phone className="text-[#0188D6] h-6 w-6" />
            <h3 className="font-bold text-lg text-[#0188D6]">الخطوة التالية</h3>
          </div>
          <p className="text-gray-700">
            سيقوم أحد خبرائنا بالاتصال بك خلال الـ 24 ساعة القادمة.
          </p>
        </motion.div>

        {/* Calendly inline scheduling widget */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          {/* Container for Calendly embed – iframe injected by Calendly SDK */}
          <div
            ref={calendlyContainerRef}
            className="rounded-lg shadow-lg"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </motion.div>

        {/* Back to home button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-[#0188D6] hover:bg-[#0165a3] text-white px-6 py-3 rounded-lg text-lg"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
