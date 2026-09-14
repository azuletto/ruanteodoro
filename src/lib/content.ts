import type { SiteContent } from "@/types"
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

  return merged
}
