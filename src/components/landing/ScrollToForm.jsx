import PropTypes from "prop-types";
import { useCallback } from "react";
import { trackCTAButtonClick } from "@/utils/vercelAnalytics";

export default function ScrollToForm({
  children,
  className,
  ctaLocation = "unknown",
  ctaName = "scroll_to_signup",
}) {
  const handleScrollToForm = useCallback(
    (e) => {
      e.preventDefault();

      // Track CTA click with enhanced tracking
      trackCTAButtonClick(ctaName, ctaLocation, "signup_form");

      // Use requestAnimationFrame for smooth scrolling performance
      requestAnimationFrame(() => {
        const formElement = document.getElementById("signup");
        if (formElement) {
          const headerOffset = 64; // px
          const elementPosition =
            formElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          // Use smooth scrolling with optimized behavior
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
            block: "start",
          });
        }
      });
    },
    [ctaLocation, ctaName]
  );

  return (
    <button
      onClick={handleScrollToForm}
      className={`${className} touch-action-manipulation will-change-transform transition-transform duration-150 active:scale-95`}
      type="button"
      aria-label="التمرير إلى نموذج التسجيل"
    >
      {children}
    </button>
  );
}

ScrollToForm.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  ctaLocation: PropTypes.string,
  ctaName: PropTypes.string,
};
