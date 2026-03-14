import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";
import { PageTracker } from "@/components/PageTracker";
import "./globals.css";

const BASE_URL = "https://uxnaufal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Naufal Abdussyakur — UI/UX Designer",
    template: "%s — uxnaufal",
  },
  description:
    "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",
  keywords: [
    "UI/UX Designer", "UX Design", "Product Design", "Interaction Design",
    "Figma", "User Research", "Bandung", "Indonesia", "Naufal Abdussyakur",
  ],
  authors: [{ name: "Naufal Abdussyakur", url: BASE_URL }],
  creator: "Naufal Abdussyakur",
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Naufal Abdussyakur — UI/UX Designer",
    description:
      "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",
    url: BASE_URL,
    siteName: "uxnaufal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naufal Abdussyakur — UI/UX Designer",
    description:
      "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable.",
    creator: "@uxnaufal",
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
      <body className="antialiased bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <PageTracker />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
