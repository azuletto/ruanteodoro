import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter, Marcellus } from "next/font/google"
import "./globals.css"
import { getSiteMeta } from "@/lib/content"

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

// Metadados dinâmicos: title/description/OG vêm do conteúdo editável no
// admin (meta_title, meta_description, og_image, footer_name). Nada aqui é
// hardcoded — o que for salvo no painel reflete no <head>.
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteMeta()

  const siteName = content.footer_name
  const title = content.meta_title
  const description = content.meta_description
  const ogImage = content.og_image

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      "Direito Digital",
      "Proteção de Dados",
      "LGPD",
      "Direito do Consumidor",
      "Perfilamento",
      "Publicidade Direcionada",
      "Direitos Fundamentais",
      "Pesquisa Acadêmica",
      siteName,
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName,
      url: SITE_URL,
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
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
      title: siteName,
    },
    formatDetection: {
      telephone: false,
    },
  }
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
