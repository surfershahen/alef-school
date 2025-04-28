import React from "react";

export default function FontStyles() {
  return (
    <style>{`
      @font-face {
        font-family: "Almoni";
        src: url("https://fonts.cdnfonts.com/css/almoni-dl") format("woff2");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: "Ishmael";
        src: url("https://fonts.cdnfonts.com/css/ishmael") format("woff2");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      .title-font {
        font-family: "Ishmael", sans-serif;
      }

      body,
      p,
      button,
      input,
      textarea,
      .body-font {
        font-family: "Almoni", sans-serif;
      }
    `}</style>
  );
}
