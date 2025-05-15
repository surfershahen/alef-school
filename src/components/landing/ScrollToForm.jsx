import React from "react";

export default function ScrollToForm({ children, className }) {
  const handleScrollToForm = e => {
    e.preventDefault();
    const formElement = document.getElementById("signup");
    if (formElement) {
      const headerOffset = 64; // px
      const elementPosition =
        formElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <button onClick={handleScrollToForm} className={className}>
      {children}
    </button>
  );
}
