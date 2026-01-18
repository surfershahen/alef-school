import React from "react";

// This component doesn't render anything visible
// It just adds global styles to the document
export default function FontStyles() {
  return (
    <style jsx global>{`
      /* Apply title font to all h1, h2, h3 elements */
      h1,
      h2,
      h3,
      .title-font {
        font-family: "Droid Arabic Kufi", sans-serif;
        font-weight: 800;
        font-size: 24px;
        line-height: 1.3;
      }

      /* Apply body font to all paragraphs and default text */
      p,
      body,
      .body-font {
        font-family: "Droid Arabic Kufi", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
      }

      /* Responsive adjustments */
      @media (min-width: 640px) {
        h1, h2, h3, .title-font {
          font-size: 30px;
        }
        p, body, .body-font {
          font-size: 18px;
        }
      }

      @media (min-width: 1024px) {
        h1, h2, h3, .title-font {
          font-size: 34px;
        }
        p, body, .body-font {
          font-size: 20px;
        }
      }
    `}</style>
  );
}
