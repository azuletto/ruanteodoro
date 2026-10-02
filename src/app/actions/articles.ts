"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/security"

interface ArticleInput {
  title: string
  summary: string
  content: string
  image_url: string | null
  image_fit: string
  link_url: string | null
  reference: string
  citation: string | null
  published_in: string | null
  year: number | null
  active: boolean
}

// Salvamento atômico via RPC save_articles (migration 004). Delete + insert
// numa transação só — artigos nunca somem por falha parcial, e desativar um
// artigo o mantém salvo (o filtro é só de exibição na landing).
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

  if (!Array.isArray(articles)) {
    return { error: "Dados inválidos." }
  }

  const { error } = await supabase.rpc("save_articles", { articles })

  if (error) {
    return { error: "Falha ao salvar artigos: " + error.message }
  }

  revalidatePath("/")
  return { success: true }
}
