"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/security"

// Único ponto de escrita do site_content. Só campos que têm consumo real no
// site entram aqui — campos removidos da UI não ficam mais gravando valores
// fantasmas no banco.
const ALLOWED_FIELDS = [
  "hero_title", "hero_subtitle", "hero_cta_text", "hero_cta_link",
  "about_title", "about_bio", "about_photo_url", "about_highlights",
  "practice_title", "practice_subtitle", "practice_areas",
  "articles_title",
  "footer_name", "footer_oab", "footer_email",
  "footer_privacy_url", "footer_terms_url",
  "header_links", "section_order", "section_animations",
  "disable_animations",
  "meta_title", "meta_description", "og_image",
]

export async function saveContent(formData: FormData) {
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

  const raw = String(formData.get("content") ?? "")

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { error: "Dados inválidos." }
  }

  const content: Record<string, unknown> = {}
  for (const key of ALLOWED_FIELDS) {
    if (key in parsed) {
      content[key] = parsed[key]
    }
  }

  const { error } = await supabase
    .from("site_content")
    .upsert({ ...content, id: 1, updated_at: new Date().toISOString() })

  if (error) {
    return { error: "Falha ao salvar conteúdo: " + error.message }
  }

  revalidatePath("/")
  revalidatePath("/termos-e-privacidade")
  return { success: true }
}
