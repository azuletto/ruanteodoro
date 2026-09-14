"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { SiteContent } from "@/types"

export function Faq({ content }: { content: SiteContent }) {
  const items = content.faq_items
    .filter((item) => item.active)
    .sort((a, b) => a.order - b.order)
  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null)

  return (
    <section className="bg-navy-50">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="font-display text-center text-3xl font-semibold text-navy-900 sm:text-4xl">
          {content.faq_title}
        </h2>

        <div className="mt-12 divide-y divide-navy-100 border-y border-navy-100">
          {items.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 py-5 text-left font-medium text-navy-900 transition-colors duration-200 hover:text-navy-600"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-navy-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
