import { getSiteContent } from "@/lib/content"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { PracticeAreas } from "@/components/landing/PracticeAreas"
import { About } from "@/components/landing/About"
import { Differentials } from "@/components/landing/Differentials"
import { Faq } from "@/components/landing/Faq"
import { Footer } from "@/components/landing/Footer"
import { Reveal } from "@/components/landing/Reveal"

export default async function Home() {
  const content = await getSiteContent()

  const sections: Record<string, React.ReactNode> = {
    areas: <PracticeAreas key="areas" content={content} />,
    sobre: <About key="sobre" content={content} />,
    diferenciais: <Differentials key="diferenciais" content={content} />,
    faq: <Faq key="faq" content={content} />,
  }

  const animations = content.section_animations ?? {}

  return (
    <>
      <Header links={content.header_links} />
      <main>
        <Hero content={content} />
        {content.section_order.map((key, i) =>
          sections[key] ? (
            <Reveal
              key={key}
              animation={(animations[key] as "none" | "fade-up" | "fade-in" | "scale-in") ?? "fade-up"}
              delay={i * 80}
              disabled={content.disable_animations ?? false}
            >
              {sections[key]}
            </Reveal>
          ) : null
        )}
      </main>
      <Footer content={content} />
    </>
  )
}
