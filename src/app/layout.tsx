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
    default: "Ruan Teodoro | Advocacia que resolve",
    template: "%s | Ruan Teodoro",
  },
  description:
    "Advogado especialista em Direito do Consumidor, Previdenciário, Civil e Digital. Resolvo seu problema com estratégia e sem enrolação. Atendimento 100% online.",
  openGraph: {
    title: "Ruan Teodoro | Advocacia que resolve",
    description:
      "Consumidor lesado, benefício negado, contrato abusivo ou fraude digital? Fale direto com o advogado, sem intermediários.",
    type: "website",
    locale: "pt_BR",
    siteName: "Ruan Teodoro Advocacia",
    url: "https://ruanteodoro.vercel.app",
    images: [
      {
        url: "/banner.png",
        width: 2000,
        height: 2000,
        alt: "Ruan Teodoro Advocacia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruan Teodoro | Advocacia que resolve",
    description:
      "Consumidor lesado, benefício negado, contrato abusivo ou fraude digital? Fale direto com o advogado, sem intermediários.",
    images: ["/banner.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
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
