import type { User } from "@supabase/supabase-js"

export function isAdmin(user: User | null): boolean {
  if (!user) return false
  return user.app_metadata?.role === "admin"
}

export function isSafeUrl(url: string): boolean {
  if (!url) return false
  if (url.startsWith("/") && !url.startsWith("//")) return true
  if (url.startsWith("#")) return true
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}
