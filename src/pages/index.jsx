import React from "react";
import { motion } from "framer-motion";

// Import all landing page components
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

export default function LandingPage() {
  return (
    <div
      className="bg-white min-h-screen text-[#1D1D1B] overflow-x-hidden font-almoni"
      dir="rtl"
    >
      <FontStyles />

      <Header />
      <Hero />
      <SignupForm />
      <Features />
      <LearningSteps />
      <WhatsAppTestimonials />
      <Testimonials />
      <Qualifications />
      <FinalCTA />
    </div>
  );
}
