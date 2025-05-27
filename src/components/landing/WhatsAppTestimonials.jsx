import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";

export default function WhatsAppTestimonials() {
  const testimonials = [
    {
      name: "شهادة 1",
      image: "/assets/images/whatsapp/m1.jpg",
    },
    {
      name: "شهادة 2",
      image: "/assets/images/whatsapp/m2.jpg",
    },
    {
      name: "شهادة 3",
      image: "/assets/images/whatsapp/m3.jpg",
    },
    {
      name: "شهادة 4",
      image: "/assets/images/whatsapp/m4.jpg",
    },
    {
      name: "شهادة 5",
      image: "/assets/images/whatsapp/m5.jpg",
    },
    {
      name: "شهادة 6",
      image: "/assets/images/whatsapp/m6.jpg",
    },
    {
      name: "شهادة 7",
      image: "/assets/images/whatsapp/m7.jpg",
    },
    {
      name: "شهادة 8",
      image: "/assets/images/whatsapp/m8.jpg",
    },
    {
      name: "شهادة 9",
      image: "/assets/images/whatsapp/m9.jpg",
    },
    {
      name: "شهادة 10",
      image: "/assets/images/whatsapp/m10.jpg",
    },
    {
      name: "شهادة 11",
      image: "/assets/images/whatsapp/m11.jpg",
    },
    {
      name: "شهادة 12",
      image: "/assets/images/whatsapp/m12.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Longer duration to give people time to read
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold title-font">
            آراء حقيقية من واتساب
          </h2>
          <p className="text-xl text-gray-600 mt-2 body-font">
            صور وتصوير شاشة من محادثات مع طلابنا!
          </p>
        </motion.div>

        <div className="relative max-w-md mx-auto">
          {/* WhatsApp chat UI */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Just show the image */}
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={testimonials[currentIndex].image}
                alt="Student testimonial"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between p-3 bg-white">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex gap-1 items-center">
                {testimonials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-6 bg-[#25D366]"
                        : "w-2 bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
