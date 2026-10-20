import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "The NextTechGen Foundation — Pioneering Web, IoT, Robotics, AI & Hardware",
  description:
    "The NextTechGen Foundation: Advancing technological frontiers across 7 core fields — Web Development, Cybersecurity, IoT, Robotics, ML, AI, and Hardware. Bridging software engineering to smart physical systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
