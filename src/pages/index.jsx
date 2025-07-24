// Import all landing page components
import { useEffect } from "react";
import FontStyles from "@/components/landing/FontStyles";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SignupForm from "@/components/landing/SignupForm";
import Features from "@/components/landing/Features";
import LearningSteps from "@/components/landing/LearningSteps";
import Testimonials from "@/components/landing/Testimonials";
import WhatsAppTestimonials from "@/components/landing/WhatsAppTestimonials";
import Qualifications from "@/components/landing/Qualifications";
import FinalCTA from "@/components/landing/FinalCTA";
import { initializeUrlTracking } from "@/utils/urlTracking";
import { trackPageView } from "@/utils/vercelAnalytics";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function LandingPage() {
  // Initialize scroll tracking with enhanced section timing (this automatically handles section tracking)
  useScrollTracking("landing_page");

  // Initialize URL tracking on page load
  useEffect(() => {
    initializeUrlTracking();
    trackPageView("landing_page");
  }, []);

  return (
    <div
      className="bg-white min-h-screen text-[#1D1D1B] overflow-x-hidden font-almoni"
      dir="rtl"
    >
      <FontStyles />
      <Header />

      {/* Add data-section attributes for precise tracking */}
      <section data-section="hero">
        <Hero />
      </section>

      <section data-section="signup">
        <SignupForm />
      </section>

      <section data-section="features">
        <Features />
      </section>

      <section data-section="steps">
        <LearningSteps />
      </section>

      <section data-section="testimonials">
        <Testimonials />
      </section>

      <section data-section="whatsapp">
        <WhatsAppTestimonials />
      </section>

      <section data-section="qualifications">
        <Qualifications />
      </section>

      <section data-section="cta">
        <FinalCTA />
      </section>
    </div>
  );
}
