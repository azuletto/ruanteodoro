"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2, Mail, Lock } from "lucide-react"
import { login } from "@/app/actions/auth"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-navy-800 to-navy-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-navy-700 hover:to-navy-900 hover:shadow-xl hover:shadow-navy-950/40 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {pending ? "Autenticando..." : "Acessar painel"}
    </button>
  )
}

export function LoginForm({ hasError }: { hasError: boolean }) {
  const [remember, setRemember] = useState(true)

  const inputCls =
    "w-full rounded-xl border border-navy-100 bg-navy-50/60 py-2.5 pl-10 pr-3.5 text-sm text-navy-950 placeholder:text-navy-300 outline-none transition-all focus:border-navy-500 focus:bg-white focus:ring-4 focus:ring-navy-500/10"

  return (
    <form action={login} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-800">
          E-mail
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
            aria-hidden
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-800">
          Senha
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
            aria-hidden
          />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={inputCls}
          />
        </div>
      </div>

      <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-navy-700">
        <input
          type="checkbox"
          name="remember"
          value="1"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 rounded border-navy-200 accent-navy-800"
        />
        Manter sessão ativa
      </label>

      {hasError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          Credenciais inválidas. Verifique e tente novamente.
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
