import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <Analytics />
    </div>
  );
}
