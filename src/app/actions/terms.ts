"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/security"

// Salvamento atômico via RPC save_terms (migration 004): o delete + insert +
// versionamento rodam numa única transação no banco. Se qualquer passo
// falhar, nada é aplicado — a tabela nunca fica vazia por falha parcial.
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

  let parsed: { title: string; content: string }[]
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { error: "Dados inválidos." }
  }

  if (!Array.isArray(parsed)) {
    return { error: "Dados inválidos." }
  }

  const sections = parsed.map((s) => ({
    title: String(s?.title ?? ""),
    content: String(s?.content ?? ""),
  }))

  const { error } = await supabase.rpc("save_terms", {
    sections,
    changed_by: user.id,
  })

  if (error) {
    return { error: "Falha ao salvar termos: " + error.message }
  }

  revalidatePath("/")
  revalidatePath("/termos-e-privacidade")
  return { success: true }
}
