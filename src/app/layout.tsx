import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolutionDesk — Multipurpose Digital Solutions & Engineering Services",
  description:
    "Discover and request professional digital services: web & mobile development, applied AI, cybersecurity, cloud infrastructure, and technical consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
