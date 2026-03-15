import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";
import { PageTracker } from "@/components/PageTracker";
import "./globals.css";

const BASE_URL  = "https://uxnaufal.vercel.app";
const AUTHOR    = "Naufal Abdussyakur";
const SITE_NAME = "uxnaufal";
const HANDLE    = "@uxnaufal";

// Default OG image — used when no page-level image is set
const DEFAULT_OG = `${BASE_URL}/Thumbnail_Aitiserve.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  `${AUTHOR} — UI/UX Designer`,
    template: `%s — ${SITE_NAME}`,
  },

  description:
    "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",

  keywords: [
    "UI/UX Designer", "UX Design", "Product Design", "Interaction Design",
    "User Research", "Figma", "Design System", "Wireframe", "Prototyping",
    "Bandung", "Indonesia", AUTHOR, SITE_NAME,
  ],

  authors:   [{ name: AUTHOR, url: BASE_URL }],
  creator:   AUTHOR,
  publisher: AUTHOR,
  category:  "Design Portfolio",

  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
      "max-snippet":     -1,
    },
  },

  alternates: { canonical: BASE_URL },

  openGraph: {
    title:       `${AUTHOR} — UI/UX Designer`,
    description: "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",
    url:         BASE_URL,
    siteName:    SITE_NAME,
    locale:      "en_US",
    type:        "website",
    images: [{
      url:    DEFAULT_OG,
      width:  1200,
      height: 630,
      alt:    `${AUTHOR} — UI/UX Designer Portfolio`,
      type:   "image/jpeg",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       `${AUTHOR} — UI/UX Designer`,
    description: "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable.",
    creator:     HANDLE,
    site:        HANDLE,
    images:      [DEFAULT_OG],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
