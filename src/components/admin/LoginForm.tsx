"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { login } from "@/app/actions/auth"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {pending ? "Autenticando..." : "Acessar painel"}
    </button>
  )
}

export function LoginForm({ hasError }: { hasError: boolean }) {
  const [remember, setRemember] = useState(true)

  return (
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
          placeholder="seu@email.com"
          className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2.5 text-sm text-white placeholder:text-navy-500 outline-none transition-colors focus:border-navy-400"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-navy-200">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2.5 text-sm text-white placeholder:text-navy-500 outline-none transition-colors focus:border-navy-400"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-200">
        <input
          type="checkbox"
          name="remember"
          value="1"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-navy-950 accent-emerald-600"
        />
        Manter sessão ativa
      </label>

      {hasError && (
        <p className="text-sm text-red-400">Credenciais inválidas. Verifique e tente novamente.</p>
      )}

      <SubmitButton />
    </form>
  )
}
