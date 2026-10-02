"use server"

import { randomUUID } from "crypto"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/security"

const MAX_BYTES = 8 * 1024 * 1024 // 8MB

// Upload de imagem para o bucket "site" do Supabase Storage (migration 004).
// Substitui o armazenamento de data URL base64 dentro do Postgres: o banco
// guarda apenas a URL pública, e o arquivo fica no Storage.
export async function uploadSiteImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
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

  const file = formData.get("file")
  if (!(file instanceof File)) {
    return { error: "Arquivo inválido." }
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Apenas imagens são aceitas." }
  }
  if (file.size > MAX_BYTES) {
    return { error: "Imagem muito grande (máximo 8MB)." }
  }

  const folder = formData.get("folder") === "articles" ? "articles" : "fotos"
  const ext = (file.name.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png"
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from("site")
    .upload(path, file, { contentType: file.type })

  if (error) {
    return { error: "Falha no upload: " + error.message }
  }

  const { data } = supabase.storage.from("site").getPublicUrl(path)
  return { url: data.publicUrl }
}
