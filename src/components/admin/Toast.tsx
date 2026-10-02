"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, AlertCircle, X } from "lucide-react"

export interface ToastMessage {
  kind: "success" | "error"
  text: string
}

const DURATION_MS: Record<ToastMessage["kind"], number> = {
  success: 4000,
  error: 8000,
}

// Toast fixo no topo, estilo sóbrio do painel (sem blur excessivo, borda
// arredondada, transition de cor/transform). Aparece ao salvar e some sozinho
// após alguns segundos; erros duram mais e também podem ser fechados no X.
export function Toast({
  message,
  onDismiss,
}: {
  message: ToastMessage | null
  onDismiss: () => void
}) {
  const [leaving, setLeaving] = useState(false)

  // Reinicia o ciclo sempre que uma nova mensagem chega.
  useEffect(() => {
    if (!message) return
    setLeaving(false)

    const hideTimer = setTimeout(() => setLeaving(true), DURATION_MS[message.kind])
    const removeTimer = setTimeout(onDismiss, DURATION_MS[message.kind] + 250)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [message, onDismiss])

  if (!message) return null

  const isSuccess = message.kind === "success"

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      <div
        role={isSuccess ? "status" : "alert"}
        className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-lg border px-4 py-3 shadow-md transition-all duration-200 ${
          leaving ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        } ${
          isSuccess
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-red-200 bg-red-50 text-red-800"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        ) : (
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        )}
        <p className="text-sm leading-snug">{message.text}</p>
        <button
          type="button"
          onClick={() => setLeaving(true)}
          className="ml-1 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Fechar notificação"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
