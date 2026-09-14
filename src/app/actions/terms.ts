"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/security"

export async function saveTerms(formData: FormData) {
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

  const raw = String(formData.get("sections") ?? "")

  let sections: { title: string; content: string }[]
  try {
    sections = JSON.parse(raw)
  } catch {
    return { error: "Dados inválidos." }
  }

  const { error: deleteError } = await supabase
    .from("terms_sections")
    .delete()
    .neq("id", 0)

  if (deleteError) {
    return { error: "Falha ao salvar: " + deleteError.message }
  }

  if (sections.length > 0) {
    const rows = sections.map((s, i) => ({
      title: s.title,
      content: s.content,
      section_order: i,
      updated_at: new Date().toISOString(),
    }))

    const { error: insertError } = await supabase
      .from("terms_sections")
      .insert(rows)

    if (insertError) {
      return { error: "Falha ao salvar: " + insertError.message }
    }
  }

  await supabase.from("terms_versions").insert({
    sections_snapshot: sections,
    changed_by: user.id,
  })

  revalidatePath("/")
  revalidatePath("/termos-e-privacidade")
  return { success: true }
}

export async function getTerms() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("terms_sections")
    .select("*")
    .order("section_order", { ascending: true })

  if (error || !data) {
    return []
  }

  return data
}
