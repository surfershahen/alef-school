import React from "react";

export default function ScrollToForm({ children, className }) {
  const handleScrollToForm = e => {
    e.preventDefault();
    const formElement = document.getElementById("signup");
    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button onClick={handleScrollToForm} className={className}>
      {children}
    </button>
  );
}
