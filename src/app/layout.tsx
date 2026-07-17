// app/layout.tsx
import type { Metadata } from "next";

import "../styles.css";

import { Footer, Navbar } from "@/components/layout";

export const metadata: Metadata = {
  title: "API as a Service",
  description: "Websites directory manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
