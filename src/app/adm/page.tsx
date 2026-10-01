import { redirect } from "next/navigation"
import { Scale } from "lucide-react"
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
    <div className="scroll-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4 py-12">
      {/* Fundo: gradiente em camadas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-navy-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -right-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/10 blur-3xl"
      />

      {/* Marca d'água: balança da justiça desfocada */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Scale
          strokeWidth={0.75}
          className="h-[46rem] w-[46rem] text-white/[0.06] blur-[1.5px]"
        />
      </div>

      {/* Card branco */}
      <div className="relative w-full max-w-sm">
        <div className="animate-rise rounded-3xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(13,27,48,0.5),0_32px_70px_-20px_rgba(13,27,48,0.55)] sm:p-10 sm:pt-12">
          {/* Emblema */}
          <div className="mx-auto -mt-16 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 shadow-lg shadow-navy-950/40 ring-4 ring-white sm:-mt-20">
            <Scale className="h-9 w-9 text-emerald-400" strokeWidth={1.5} />
          </div>

          <h1 className="text-center font-display text-2xl font-bold text-navy-950">
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
