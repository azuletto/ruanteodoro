"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { HeaderLink } from "@/types"
import { isSafeUrl } from "@/lib/security"

export function Header({ links }: { links: HeaderLink[] }) {
  const [open, setOpen] = useState(false)
  const sorted = [...links]
    .filter((l) => isSafeUrl(l.href))
    .sort((a, b) => a.order - b.order)

  return (
    <header className="sticky top-[-1px] z-50 -mb-px pt-[1px] bg-navy-900 shadow-sm shadow-navy-950/20">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Ruan Teodoro Advocacia">
          <Image
            src="/banner.svg"
            alt="Ruan Teodoro Advocacia"
            width={180}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {sorted.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy-900 md:hidden">
          {sorted.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-navy-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
