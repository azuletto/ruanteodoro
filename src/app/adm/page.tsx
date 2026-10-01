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
    <div className="scroll-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4 py-16">
      {/* Fundo limpo com leve profundidade, sem elementos decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
      />

      {/* Card branco */}
      <div className="relative w-full max-w-sm">
        <div className="animate-rise rounded-3xl bg-white px-8 pb-8 pt-10 shadow-[0_10px_40px_-10px_rgba(13,27,48,0.5),0_32px_70px_-20px_rgba(13,27,48,0.55)] sm:px-10 sm:pb-10 sm:pt-12">
          <h1 className="text-center font-title text-3xl text-navy-950">
            Painel Administrativo
          </h1>
          <p className="mt-1 text-center text-sm text-navy-400">
            Gestão de conteúdo do site
          </p>

          <LoginForm hasError={Boolean(erro)} />
        </div>

        <p className="mt-6 text-center text-xs text-navy-300/70">
          © {new Date().getFullYear()} Ruan Teodoro · Acesso restrito
        </p>
      </div>
    </div>
  )
}
