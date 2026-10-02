import type { Article, SiteContent } from "@/types"
import { defaultContent } from "./default-content"

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const VALID_SECTIONS = ["areas", "sobre", "artigos"]

// Busca a linha única de site_content e mescla com os defaults (campos NULL
// herdam o valor padrão). Sem artigos — usado por metadados e páginas que
// não precisam deles.
async function fetchMergedContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) {
    return { ...defaultContent, articles: [] }
  }

  const { createClient } = await import("@supabase/supabase-js")
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )

  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .maybeSingle()

  if (error || !data) {
    return { ...defaultContent, articles: [] }
  }

  const merged = { ...defaultContent }
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      ;(merged as Record<string, unknown>)[key] = value
    }
  }

  // Normaliza a ordem das seções: o banco pode guardar a ordem antiga
  // (com "diferenciais"/"faq"), que não existem mais. Mantém só as seções
  // válidas, preservando a ordem customizada, e garante que "artigos"
  // sempre apareça.
  const rawOrder = Array.isArray(merged.section_order)
    ? (merged.section_order as string[])
    : []
  const kept = rawOrder.filter((s) => VALID_SECTIONS.includes(s))
  const missing = VALID_SECTIONS.filter((s) => !kept.includes(s))
  merged.section_order = [...kept, ...missing]

  return merged
}

// Conteúdo completo para a home e o editor: inclui TODOS os artigos
// (ativos e inativos). O filtro de exibição é feito na landing — assim o
// editor sempre carrega a lista completa e desativar um artigo não o apaga.
// Artigos vêm SOMENTE do banco — sem fallback. Se não houver nenhum
// cadastrado, a lista fica vazia e a página mostra o estado vazio.
export async function getSiteContent(): Promise<SiteContent> {
  const merged = await fetchMergedContent()

  if (!isSupabaseConfigured()) {
    return merged
  }

  const { createClient } = await import("@supabase/supabase-js")
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: articlesData } = await supabase
    .from("articles")
    .select("*")
    .order("article_order", { ascending: true })

  merged.articles = (articlesData ?? []) as Article[]

  return merged
}

// Versão leve (sem artigos) para generateMetadata e páginas secundárias.
export async function getSiteMeta(): Promise<SiteContent> {
  return fetchMergedContent()
}
