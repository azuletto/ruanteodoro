import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ruanteodoro.vercel.app"),
  title: {
    default: "Ruan Teodoro | Pesquisa em Direito e Tecnologia",
    template: "%s | Ruan Teodoro",
  },
  description:
    "Pesquisa acadêmica em Direito Digital, Proteção de Dados e Direito do Consumidor. Publicações sobre LGPD, perfilamento, publicidade direcionada e direitos fundamentais no ambiente digital.",
  openGraph: {
    title: "Ruan Teodoro | Pesquisa em Direito e Tecnologia",
    description:
      "Investigação acadêmica sobre os impactos da tecnologia nas relações de consumo, proteção de dados e direitos fundamentais. Publicações e pesquisas em revistas especializadas.",
    type: "website",
    locale: "pt_BR",
    siteName: "Ruan Teodoro",
    url: "https://ruanteodoro.vercel.app",
    images: [
      {
        url: "/banner.png",
        width: 2000,
        height: 2000,
        alt: "Ruan Teodoro — Pesquisa em Direito e Tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruan Teodoro | Pesquisa em Direito e Tecnologia",
    description:
      "Investigação acadêmica sobre Direito Digital, Proteção de Dados e Direito do Consumidor. Publicações sobre LGPD e direitos fundamentais no ambiente digital.",
    images: ["/banner.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "2000x2000", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ruan Teodoro",
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
