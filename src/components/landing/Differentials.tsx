import type { SiteContent } from "@/types"
import { SiteIcon } from "@/lib/icons"

export function Differentials({ content }: { content: SiteContent }) {
  const items = content.differentials
    .filter((item) => item.active)
    .sort((a, b) => a.order - b.order)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="font-display text-center text-3xl font-semibold text-navy-900 sm:text-4xl">
          {content.differentials_title}
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="text-center transition-all duration-200 hover:-translate-y-0.5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-navy-200 text-navy-900">
                <SiteIcon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
