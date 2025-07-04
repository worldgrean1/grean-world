import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import "@/styles/grid-pattern.css"
import "@/styles/layout.css"
import "@/styles/animations.css"
import ClientLayout from "./client-layout"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

// Enhanced metadata with better SEO
export const metadata: Metadata = {
  title: {
    default: "GREAN WORLD Energy Technology",
    template: "%s | GREAN WORLD Energy Technology",
  },
  description:
    "Leading provider of sustainable energy solutions in Ethiopia. Specializing in solar power systems, energy storage, and smart grid technology for a greener future.",
  keywords: [
    "solar energy",
    "renewable energy",
    "energy storage",
    "smart grid",
    "sustainable technology",
    "Ethiopia energy",
    "solar panels",
    "inverters",
    "battery systems",
  ],
  authors: [{ name: "GREAN WORLD Energy Technology PLC" }],
  creator: "GREAN WORLD Energy Technology PLC",
  publisher: "GREAN WORLD Energy Technology PLC",
  generator: "Next.js",
  applicationName: "GREAN WORLD Energy Technology",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3DD56D" },
    { media: "(prefers-color-scheme: dark)", color: "#2bb757" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greanworld.com",
    siteName: "GREAN WORLD Energy Technology",
    title: "GREAN WORLD Energy Technology - Sustainable Energy Solutions",
    description:
      "Leading provider of sustainable energy solutions in Ethiopia. Solar power, energy storage, and smart grid technology.",
    images: [
      {
        url: "/images/grean-logo-icon.png",
        width: 1200,
        height: 630,
        alt: "GREAN WORLD Energy Technology Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GreanWorld",
    creator: "@GreanWorld",
    title: "GREAN WORLD Energy Technology - Sustainable Energy Solutions",
    description:
      "Leading provider of sustainable energy solutions in Ethiopia. Solar power, energy storage, and smart grid technology.",
    images: ["/images/grean-logo-icon.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/images/grean-logo-icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/images/grean-logo-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
}

/**
 * Root layout component with enhanced error handling and performance optimizations
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for potential external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Optimize resource loading */}
        <link rel="preload" href="/fonts/digital-7.mono.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <ClientLayout>{children}</ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  )
}
