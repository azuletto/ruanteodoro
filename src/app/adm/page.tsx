import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { login } from "@/app/actions/auth"

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
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-navy-900 p-8">
        <h1 className="font-display text-2xl font-semibold text-white">
          Painel Administrativo
        </h1>
        <p className="mt-1 text-sm text-navy-300">
          Ruan Teodoro Advocacia
        </p>

        <form action={login} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-navy-200">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2.5 text-sm text-white outline-none focus:border-navy-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-navy-200"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2.5 text-sm text-white outline-none focus:border-navy-400"
            />
          </div>

          {erro && (
            <p className="text-sm text-red-400">
              E-mail ou senha inválidos.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
