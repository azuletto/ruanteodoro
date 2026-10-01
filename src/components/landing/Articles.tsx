import Image from "next/image"
import { ExternalLink, BookOpen } from "lucide-react"
import type { Article, SiteContent } from "@/types"
import { isSafeUrl } from "@/lib/security"

// Enquadramentos padronizados da imagem do artigo. Todos os cards usam a
// mesma caixa (altura fixa), o que muda é como a imagem preenche/alinha.
const IMAGE_FIT_CLASSES: Record<string, string> = {
  "cover-center": "object-cover object-center",
  "cover-top": "object-cover object-top",
  "cover-bottom": "object-cover object-bottom",
  contain: "object-contain object-center bg-slate-50",
}

function fitClass(article: Article): string {
  return IMAGE_FIT_CLASSES[article.image_fit] ?? IMAGE_FIT_CLASSES["cover-center"]
}

export function Articles({ content }: { content: SiteContent }) {
  const items = content.articles
    .filter((item) => item.active)
    .sort((a, b) => a.article_order - b.article_order)

  return (
    <section id="artigos" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="font-display text-center text-3xl font-semibold text-navy-900 sm:text-4xl">
          {content.articles_title}
        </h2>

        {items.length === 0 ? (
          <p className="mt-14 text-center text-base leading-relaxed text-slate-400">
            Nenhuma publicação cadastrada até o momento.
          </p>
        ) : (
        <div className="mt-14 space-y-10">
          {items.map((article) => {
            const hasImage = Boolean(article.image_url)
            const hasLink = Boolean(article.link_url) && isSafeUrl(article.link_url ?? "")

            return (
              <article
                key={article.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Imagem à esquerda — caixa padronizada, enquadramento por image_fit */}
                  {hasImage && (
                    <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-72 lg:w-80">
                      <Image
                        src={article.image_url!}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className={fitClass(article)}
                      />
                    </div>
                  )}

                  {/* Conteúdo à direita */}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">
                          {article.title}
                        </h3>
                        {article.published_in && (
                          <p className="mt-1 text-sm text-slate-500">
                            {article.published_in}
                            {article.year ? ` (${article.year})` : ""}
                          </p>
                        )}
                      </div>
                      <BookOpen className="h-5 w-5 shrink-0 text-navy-400" aria-hidden />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {article.summary}
                    </p>

                    {/* Referência */}
                    {article.reference && (
                      <p className="mt-4 text-xs leading-relaxed text-slate-400">
                        {article.reference}
                        {article.citation ? ` Citação: ${article.citation}.` : ""}
                      </p>
                    )}

                    {/* Link de acesso */}
                    {hasLink && (
                      <a
                        href={article.link_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-md bg-navy-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-navy-700"
                      >
                        Acessar pesquisa
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        )}
      </div>
    </section>
  )
}
