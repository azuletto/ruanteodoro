import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getSiteContent } from "@/lib/content"
import { getTerms } from "@/app/actions/terms"
import { ContentEditor } from "@/components/ContentEditor"
import { isAdmin } from "@/lib/security"

export const metadata = { title: "Conteúdo | Admin" }

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdmin(user)) {
    redirect("/adm")
  }

  const content = await getSiteContent()

  let terms: Awaited<ReturnType<typeof getTerms>> = []
  try {
    terms = await getTerms()
  } catch {
    terms = []
  }

  return (
    <ContentEditor
      initialContent={content}
      initialTerms={terms}
      userEmail={user.email ?? ""}
    />
  )
}
