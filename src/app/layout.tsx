import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter, Marcellus } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
})

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
})

const SITE_URL = "https://ruanteodoro.vercel.app"
const SITE_NAME = "Ruan Teodoro"
const SITE_TITLE = "Ruan Teodoro | Pesquisa em Direito e Tecnologia"
const SITE_DESCRIPTION =
  "Pesquisa acadêmica em Direito Digital, Proteção de Dados e Direito do Consumidor. Publicações sobre LGPD, perfilamento, publicidade direcionada e direitos fundamentais no ambiente digital."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Ruan Teodoro",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Direito Digital",
    "Proteção de Dados",
    "LGPD",
    "Direito do Consumidor",
    "Perfilamento",
    "Publicidade Direcionada",
    "Direitos Fundamentais",
    "Pesquisa Acadêmica",
    "Ruan Teodoro",
  ],
  authors: [{ name: "Ruan Teodoro" }],
  creator: "Ruan Teodoro",
  publisher: "Ruan Teodoro",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/banner.png",
        width: 2000,
        height: 2000,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/banner.png"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-icon",
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-icon",
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/icons/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#0d1b30",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${playfair.variable} ${marcellus.variable}`}>
      <body>{children}</body>
    </html>
  )
}
