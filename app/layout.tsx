import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={interTight.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
