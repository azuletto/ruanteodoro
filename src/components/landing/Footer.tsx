import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "@/types"

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer id="contato" className="scroll-mt-20 bg-navy-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/banner.svg"
              alt={content.footer_name}
              width={180}
              height={48}
              className="h-10 w-auto"
            />
          </div>

          <ul className="space-y-3 text-sm text-navy-200">
            <li className="flex items-center gap-3">
              <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
              {content.footer_oab}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {content.footer_address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              {content.footer_phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {content.footer_email}
            </li>
          </ul>

          <div className="flex flex-col gap-3 text-sm md:items-end">
            <Link
              href={content.footer_privacy_url}
              className="text-navy-200 transition-colors duration-200 hover:text-white"
            >
              Política de Privacidade
            </Link>
            <Link
              href={content.footer_terms_url}
              className="text-navy-200 transition-colors duration-200 hover:text-white"
            >
              Termos de Uso
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-navy-300">
          <p>{content.footer_copyright}</p>
        </div>
      </div>
    </footer>
  )
}
