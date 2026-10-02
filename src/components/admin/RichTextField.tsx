"use client"

import { useRef } from "react"
const labelCls = "mb-1 block text-xs font-medium text-slate-600"

const toolbarBtnCls =
  "inline-flex items-center justify-center rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"

// Textarea simples: mostra a sintaxe crua (**negrito**, _itálico_).
// O site público renderiza formatado via renderInline. Sem overlay, sem
// preview — é assim que editores markdown simples funcionam.
export function RichTextField({
  label,
  value,
  onChange,
  minRows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  minRows?: number
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const wrapSelection = (before: string, after: string) => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const next =
      value.slice(0, start) + before + selected + after + value.slice(end)
    onChange(next)
    // Restaura a seleção depois que o React atualizar o DOM.
    setTimeout(() => {
      el.focus()
      el.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const prefixLines = (prefix: string) => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const lines = selected.split("\n")
    const replacement = lines.map((l) => prefix + l).join("\n")
    const next =
      value.slice(0, start) + replacement + value.slice(end)
    onChange(next)
    setTimeout(() => {
      el.focus()
      el.setSelectionRange(start, start + replacement.length)
    }, 0)
  }

  return (
    <div className="min-w-0">
      <label className={labelCls}>{label}</label>
      <div className="mb-1 flex items-center gap-1">
        <button
          type="button"
          className={toolbarBtnCls}
          onClick={() => wrapSelection("**", "**")}
          aria-label="Negrito"
          title="Negrito: **texto**"
        >
          B
        </button>
        <button
          type="button"
          className={`${toolbarBtnCls} italic`}
          onClick={() => wrapSelection("_", "_")}
          aria-label="Itálico"
          title="Itálico: _texto_"
        >
          I
        </button>
        <button
          type="button"
          className={toolbarBtnCls}
          onClick={() => prefixLines("- ")}
          aria-label="Lista com marcadores"
        >
          •
        </button>
        <button
          type="button"
          className={toolbarBtnCls}
          onClick={() => prefixLines("1. ")}
          aria-label="Lista numerada"
        >
          1.
        </button>
      </div>
      <textarea
        ref={ref}
        className="w-full min-w-0 resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-relaxed text-slate-800 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
        value={value}
        rows={minRows}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      <p className="mt-1 text-[11px] text-slate-400">
        Use **negrito** e _itálico_ — aparecem formatados no site.
      </p>
    </div>
  )
}
