import { MessageCircle } from "lucide-react"
import type { SiteContent } from "@/types"
import { isSafeUrl } from "@/lib/security"

export function Hero({ content }: { content: SiteContent }) {
  const ctaHref = isSafeUrl(content.hero_cta_link)
    ? content.hero_cta_link
    : "#contato"

  return (
    <section className="bg-navy-900">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
            {content.hero_title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-navy-200 sm:text-lg">
            {content.hero_subtitle}
          </p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-md bg-emerald-700 px-7 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-emerald-600"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            {content.hero_cta_text}
          </a>
        </div>
      </div>
    </section>
  )
}
