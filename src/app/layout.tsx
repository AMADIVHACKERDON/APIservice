import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Created with Next.js and TypeScript",
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
