import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../styles.css";
import { Footer, Navbar } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solution Desk — Share problems worth solving",
  description:
    "A collaborative space where real-world problems are shared, discussed, and turned into solutions.",
  openGraph: {
    title: "Solution Desk — Share problems worth solving",
    description:
      "A collaborative space where real-world problems are shared, discussed, and turned into solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solution Desk — Share problems worth solving",
    description:
      "A collaborative space where real-world problems are shared, discussed, and turned into solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
