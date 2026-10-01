import type { Article, SiteContent } from "@/types"
import { defaultContent } from "./default-content"

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) {
    return defaultContent
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
    return defaultContent
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
  const VALID_SECTIONS = ["areas", "sobre", "artigos"]
  const rawOrder = Array.isArray(merged.section_order)
    ? (merged.section_order as string[])
    : []
  const kept = rawOrder.filter((s) => VALID_SECTIONS.includes(s))
  const missing = VALID_SECTIONS.filter((s) => !kept.includes(s))
  merged.section_order = [...kept, ...missing]

  // Carregar artigos da tabela separada
  const { data: articlesData } = await supabase
    .from("articles")
    .select("*")
    .eq("active", true)
    .order("article_order", { ascending: true })

  if (articlesData && articlesData.length > 0) {
    merged.articles = articlesData as Article[]
  }

  return merged
}
