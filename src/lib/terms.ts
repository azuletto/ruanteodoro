import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { TermsSection } from "@/types"

// Leitura das seções de termos, ordenadas.
// Não é uma server action (não vive em arquivo "use server"): é usada
// diretamente por páginas server (termos e dashboard admin).
export async function getTerms(): Promise<TermsSection[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("terms_sections")
    .select("*")
    .order("section_order", { ascending: true })

  if (error || !data) {
    return []
  }

  return data as TermsSection[]
}
