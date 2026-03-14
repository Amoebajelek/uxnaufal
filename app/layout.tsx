import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naufal Abdussyakur — UI/UX Designer",
  description:
    "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",
  keywords: ["UI/UX Designer", "UX Design", "Product Design", "Bandung"],
  authors: [{ name: "Naufal Abdussyakur" }],
  openGraph: {
    title: "Naufal Abdussyakur — UI/UX Designer",
    description:
      "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable.",
    url: "https://uxnaufal.vercel.app",
    siteName: "uxnaufal",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
