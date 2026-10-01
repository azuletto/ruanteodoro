"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/security"

interface ArticleInput {
  title: string
  summary: string
  content: string
  image_url: string | null
  link_url: string | null
  reference: string
  citation: string | null
  published_in: string | null
  year: number | null
  active: boolean
}

export async function saveArticles(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Sessão expirada. Faça login novamente." }
  }

  if (!isAdmin(user)) {
    return { error: "Acesso negado." }
  }

  const raw = String(formData.get("articles") ?? "")

  let articles: ArticleInput[]
  try {
    articles = JSON.parse(raw)
  } catch {
    return { error: "Dados inválidos." }
  }

  // Limpa a tabela e reinsere — espelha o padrão usado em saveTerms.
  const { error: deleteError } = await supabase
    .from("articles")
    .delete()
    .neq("id", 0)

  if (deleteError) {
    return { error: "Falha ao salvar artigos: " + deleteError.message }
  }

  if (articles.length > 0) {
    const rows = articles.map((a, i) => ({
      title: a.title,
      summary: a.summary,
      content: a.content,
      image_url: a.image_url,
      link_url: a.link_url,
      reference: a.reference,
      citation: a.citation,
      published_in: a.published_in,
      year: a.year,
      article_order: i,
      active: a.active,
      updated_at: new Date().toISOString(),
    }))

    const { error: insertError } = await supabase
      .from("articles")
      .insert(rows)

    if (insertError) {
      return { error: "Falha ao salvar artigos: " + insertError.message }
    }
  }

  revalidatePath("/")
  return { success: true }
}
