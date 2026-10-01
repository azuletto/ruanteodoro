import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// sessionOnly=true gera cookies de sessão (sem maxAge), que morrem ao fechar o
// navegador — usado quando "Lembrar de mim" está desmarcado no login.
export async function createSupabaseServerClient(options?: {
  sessionOnly?: boolean
}) {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options: opts }) => {
              if (options?.sessionOnly) {
                // Remove maxAge para virar cookie de sessão.
                const { maxAge, ...rest } = opts
                cookieStore.set(name, value, rest)
              } else {
                cookieStore.set(name, value, opts)
              }
            })
          } catch {}
        },
      },
    }
  )
}
