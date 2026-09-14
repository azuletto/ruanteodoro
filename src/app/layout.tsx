import type { Metadata } from "next"
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
  metadataBase: new URL("https://ruanteodoro.adv.br"),
  title: "Ruan Teodoro | Advocacia que resolve",
  description:
    "Advogado especialista em Direito do Consumidor, Previdenciário, Civil e Digital. Resolvo seu problema com estratégia e sem enrolação. Atendimento 100% online.",
  openGraph: {
    title: "Ruan Teodoro | Advocacia que resolve",
    description:
      "Consumidor lesado, benefício negado, contrato abusivo ou fraude digital? Fale direto com o advogado, sem intermediários.",
    type: "website",
    locale: "pt_BR",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
