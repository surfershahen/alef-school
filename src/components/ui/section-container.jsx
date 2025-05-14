import React from "react";
import { cn } from "@/lib/utils";

export function SectionContainer({
  children,
  className,
  id,
  hasDivider = true,
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full px-4 py-16 sm:px-6 sm:py-20",
        hasDivider && "border-t border-gray-100",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
