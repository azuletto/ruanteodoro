import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { LoginForm } from "@/components/admin/LoginForm"

export const metadata = { title: "Admin | Ruan Teodoro" }

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/adm/dashboard")
  }

  const { erro } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-navy-900 p-8 shadow-xl shadow-navy-950/50">
        <h1 className="font-display text-2xl font-bold text-white">
          Painel Administrativo
        </h1>
        <p className="mt-1 text-sm text-navy-300">
          Gestão de conteúdo do site
        </p>

        <LoginForm hasError={Boolean(erro)} />
      </div>
    </div>
  )
}
