import PropTypes from "prop-types";
import { useCallback } from "react";

export default function ScrollToForm({ children, className }) {
  const handleScrollToForm = useCallback((e) => {
    e.preventDefault();

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
  }, []);

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
};
