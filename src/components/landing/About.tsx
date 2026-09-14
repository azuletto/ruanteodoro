import { Check } from "lucide-react"
import Image from "next/image"
import type { SiteContent } from "@/types"
import { Reveal } from "@/components/landing/Reveal"

export function About({ content }: { content: SiteContent }) {
  return (
    <section id="sobre" className="scroll-mt-20 bg-navy-900">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-28">
        <Reveal animation="scale-in" className="mx-auto w-full max-w-sm">
          <Image
            src={content.about_photo_url}
            alt="Advogado Ruan Teodoro"
            width={400}
            height={500}
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </Reveal>

        <Reveal animation="fade-up" delay={150}>
          <div>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              {content.about_title}
            </h2>
            {content.about_bio.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mt-5 leading-relaxed text-navy-200">
                {paragraph}
              </p>
            ))}

            <ul className="mt-8 space-y-3">
              {content.about_highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-white">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  <span className="text-sm sm:text-base">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
