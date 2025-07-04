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
      <meta http-equiv='refresh' content='0; URL=https://naufalabdussyakur.notion.site/1865d9ae1b9c80a49da5f2858485a6cb'></meta>
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
