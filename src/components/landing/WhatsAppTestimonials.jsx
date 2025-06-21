import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { imageTestimonials } from "@/data/testimonials";

export default function WhatsAppTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Debounced navigation functions for better INP
  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    requestAnimationFrame(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % imageTestimonials.length
      );
      setTimeout(() => setIsAnimating(false), 300);
    });
  }, [isAnimating]);

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    requestAnimationFrame(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + imageTestimonials.length) % imageTestimonials.length
      );
      setTimeout(() => setIsAnimating(false), 300);
    });
  }, [isAnimating]);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Longer duration to give people time to read
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  // Preload next image for better performance
  const currentTestimonial = useMemo(
    () => imageTestimonials[currentIndex],
    [currentIndex]
  );
  const nextImageIndex = useMemo(
    () => (currentIndex + 1) % imageTestimonials.length,
    [currentIndex]
  );

  // Handle image load
  const handleImageLoad = useCallback((index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
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
            {/* Fixed aspect ratio container to prevent layout shift */}
            <div className="w-full aspect-[4/3] overflow-hidden relative">
              <img
                src={currentTestimonial.image}
                alt="Student testimonial"
                className="w-full h-full object-cover object-top transition-opacity duration-300"
                onLoad={() => handleImageLoad(currentIndex)}
                loading="lazy"
                decoding="async"
              />

              {/* Loading state */}
              {!loadedImages.has(currentIndex) && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="loading-skeleton w-full h-full"></div>
                </div>
              )}

              {/* Preload next image */}
              <img
                src={imageTestimonials[nextImageIndex].image}
                alt=""
                className="absolute opacity-0 pointer-events-none"
                onLoad={() => handleImageLoad(nextImageIndex)}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between p-3 bg-white">
              <button
                onClick={prevTestimonial}
                disabled={isAnimating}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-all duration-150 touch-action-manipulation will-change-transform active:scale-95"
                aria-label="الشهادة السابقة"
                type="button"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Progress indicators */}
              <div className="flex gap-1 items-center">
                {imageTestimonials.map((_, idx) => (
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
                disabled={isAnimating}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-all duration-150 touch-action-manipulation will-change-transform active:scale-95"
                aria-label="الشهادة التالية"
                type="button"
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
