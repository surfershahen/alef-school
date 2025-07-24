import { useEffect, useRef } from "react";
import { trackScrollDepth, trackSectionView } from "@/utils/vercelAnalytics";

export const useScrollTracking = (pageName = "unknown") => {
  const scrollDepthTracked = useRef(new Set());
  const sectionObservers = useRef(new Map());
  const sectionStartTimes = useRef(new Map());
  const activeSections = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track scroll depth at 25%, 50%, 75%, 90%, 100%
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !scrollDepthTracked.current.has(milestone)
        ) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone, pageName);
        }
      });
    };

    // Track scroll with throttling
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [pageName]);

  // Section time tracking with Intersection Observer
  useEffect(() => {
    console.log("🚀 Initializing section time tracking...");

    // Define section selectors for landing pages
    const sectionMappings = [
      { selector: '[data-section="hero"]', name: "hero_section" },
      { selector: '[data-section="features"]', name: "features_section" },
      {
        selector: '[data-section="testimonials"]',
        name: "testimonials_section",
      },
      { selector: '[data-section="steps"]', name: "learning_steps_section" },
      { selector: '[data-section="signup"]', name: "signup_form_section" },
      { selector: '[data-section="cta"]', name: "final_cta_section" },
      {
        selector: '[data-section="qualifications"]',
        name: "qualifications_section",
      },
      {
        selector: '[data-section="whatsapp"]',
        name: "whatsapp_testimonials_section",
      },
    ];

    const observers = [];

    const initTracking = () => {
      sectionMappings.forEach(({ selector, name }) => {
        const element = document.querySelector(selector);
        if (element) {
          console.log(`📍 Found section: ${name} - ${selector}`);

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const currentTime = Date.now();

                if (entry.isIntersecting) {
                  // Section became visible
                  if (!activeSections.current.has(name)) {
                    activeSections.current.add(name);
                    sectionStartTimes.current.set(name, currentTime);

                    console.log(`👁️ Section "${name}" entered view`);
                    trackSectionView(`${name}_view_start`, null);
                  }
                } else {
                  // Section left viewport
                  if (activeSections.current.has(name)) {
                    activeSections.current.delete(name);
                    const startTime = sectionStartTimes.current.get(name);

                    if (startTime) {
                      const timeSpent = currentTime - startTime;
                      const timeInSeconds = Math.round(timeSpent / 1000);

                      console.log(
                        `⏱️ Section "${name}" viewed for ${timeInSeconds} seconds`
                      );
                      trackSectionView(`${name}_time_spent`, timeSpent);

                      // Clean up
                      sectionStartTimes.current.delete(name);
                    }
                  }
                }
              });
            },
            {
              threshold: 0.3, // Trigger when 30% of section is visible
              rootMargin: "0px 0px -100px 0px", // Require section to be well into viewport
            }
          );

          observer.observe(element);
          observers.push(observer);
          sectionObservers.current.set(name, observer);
        } else {
          console.warn(`❌ Section not found: ${name} - ${selector}`);
        }
      });
    };

    // Initialize immediately and after a delay for dynamic content
    initTracking();
    const timer = setTimeout(() => {
      console.log("🔄 Re-initializing section tracking after delay...");
      initTracking();
    }, 2000);

    return () => {
      console.log("🧹 Cleaning up section tracking...");
      clearTimeout(timer);

      // Clean up all observers
      observers.forEach((observer) => observer.disconnect());
      sectionObservers.current.forEach((observer) => observer.disconnect());
      sectionObservers.current.clear();
      activeSections.current.clear();
      sectionStartTimes.current.clear();
    };
  }, []);

  return {};
};
