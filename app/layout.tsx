import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "uxnaufal",
  description: "Professional UI/UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interTight.className}>
        <>
          <Analytics />
          {children}
        </>
      </body>
    </html>
  );
}
