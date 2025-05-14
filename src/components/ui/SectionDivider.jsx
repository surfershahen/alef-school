import React from "react";

export default function SectionDivider({
  color = "#fff",
  flip = false,
  className = "",
}) {
  return (
    <div className={className} style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", transform: flip ? "scaleY(-1)" : undefined }}
        width="100%"
        height="80"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}
