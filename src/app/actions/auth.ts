"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const remember = formData.get("remember") === "1"

  const supabase = await createSupabaseServerClient({ sessionOnly: !remember })
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect("/adm?erro=1")
  }

  redirect("/adm/dashboard")
}

export async function logout() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/adm")
}
