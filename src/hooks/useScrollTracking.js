import { useEffect, useRef } from "react";
import { trackScrollDepth, trackSectionView } from "@/utils/vercelAnalytics";

export const useScrollTracking = (pageName = "unknown") => {
  const scrollDepthTracked = useRef(new Set());
  const sectionStartTime = useRef({});

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

  // Function to track section views with Intersection Observer
  const trackSectionVisibility = (sectionName, element) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section became visible
            sectionStartTime.current[sectionName] = Date.now();
            trackSectionView(sectionName);
          } else if (sectionStartTime.current[sectionName]) {
            // Section left viewport
            const timeOnSection =
              Date.now() - sectionStartTime.current[sectionName];
            trackSectionView(sectionName, timeOnSection);
            delete sectionStartTime.current[sectionName];
          }
        });
      },
      { threshold: 0.5 } // Track when 50% of section is visible
    );

    observer.observe(element);

    return () => observer.disconnect();
  };

  return { trackSectionVisibility };
};
