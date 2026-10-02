import type { Metadata } from "next"
import Link from "next/link"
import { getSiteMeta } from "@/lib/content"
import { getTerms } from "@/lib/terms"
import { renderInline } from "@/lib/rich-text"

// Título sem o nome no fim: o template do layout já acrescenta "| <nome>".
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteMeta()
  return {
    title: "Termos de Uso e Política de Privacidade",
    description: `Termos de uso e política de privacidade do site ${content.footer_name}, em conformidade com a LGPD (Lei 13.709/2018).`,
  }
}

export default async function TermosPrivacidadePage() {
  const [sections, content] = await Promise.all([getTerms(), getSiteMeta()])

  const lastUpdated =
    sections.length > 0
      ? new Date(
          Math.max(
            ...sections.map((s) => new Date(s.updated_at ?? 0).getTime())
          )
        ).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-navy-900">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-xl font-semibold text-white transition-colors duration-200 hover:text-navy-200"
          >
            {content.footer_name}
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Termos de Uso e Política de Privacidade
        </h1>
        {lastUpdated && (
          <p className="mt-3 text-sm text-slate-500">
            Última atualização: {lastUpdated}
          </p>
        )}

        {sections.length > 0 ? (
          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.id}>
                <h2 className="font-display text-2xl font-semibold text-navy-900">
                  {section.title}
                </h2>
                <div className="mt-4 whitespace-pre-line leading-relaxed text-slate-600">
                  {renderInline(section.content)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="mt-12 leading-relaxed text-slate-500">
            Nenhuma seção de termos cadastrada até o momento.
          </p>
        )}
      </main>

      <footer className="border-t border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
          {content.footer_name} — {content.footer_oab}
        </div>
      </footer>
    </div>
  )
}
