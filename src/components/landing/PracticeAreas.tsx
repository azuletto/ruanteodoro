import type { SiteContent } from "@/types"
import { SiteIcon } from "@/lib/icons"

export function PracticeAreas({ content }: { content: SiteContent }) {
  const areas = content.practice_areas
    .filter((area) => area.active)
    .sort((a, b) => a.order - b.order)

  return (
    <section id="areas" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="font-display text-center text-3xl font-semibold text-navy-900 sm:text-4xl">
          {content.practice_title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          {content.practice_subtitle}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {areas.map((area) => (
            <article
              key={area.id}
              className="rounded-lg border border-navy-100 bg-navy-50/50 p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-white">
                <SiteIcon name={area.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold text-navy-900">
                {area.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
