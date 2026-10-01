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
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {pending ? "Autenticando..." : "Acessar painel"}
    </button>
  )
}

// Rótulo flutuante no estilo "outlined": começa dentro do campo (como
// placeholder) e, ao focar/digitar, sobe suavemente até a borda, criando um
// recorte nela (o fundo branco do rótulo abre a linha). Ele se move apenas
// alguns pixels na horizontal — nada de sair voando pra fora.
function FloatingField({
  id,
  name,
  type,
  label,
  autoComplete,
  icon: Icon,
}: {
  id: string
  name: string
  type: string
  label: string
  autoComplete: string
  icon: typeof Mail
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full rounded-xl border border-navy-200 bg-white py-3.5 pl-10 pr-4 text-sm text-navy-950 outline-none transition-all duration-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-500/10"
      />
      <Icon
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300 transition-colors peer-focus:text-navy-600"
        aria-hidden
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 bg-transparent px-1 text-sm text-navy-400 transition-all duration-200
          peer-focus:left-3.5 peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:font-medium peer-focus:text-navy-600
          peer-[:not(:placeholder-shown)]:left-3.5 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-navy-600"
      >
        {label}
      </label>
    </div>
  )
}

export function LoginForm({ hasError }: { hasError: boolean }) {
  const [remember, setRemember] = useState(true)

  return (
    <form action={login} className="mt-8 space-y-6">
      <FloatingField
        id="email"
        name="email"
        type="email"
        label="E-mail"
        autoComplete="email"
        icon={Mail}
      />
      <FloatingField
        id="password"
        name="password"
        type="password"
        label="Senha"
        autoComplete="current-password"
        icon={Lock}
      />

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
