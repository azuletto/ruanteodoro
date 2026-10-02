"use client"

import { useRef } from "react"
import { renderInline } from "@/lib/rich-text"

const inputCls =
  "w-full min-w-0 resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"

const labelCls = "mb-1 block text-xs font-medium text-slate-600"

const toolbarBtnCls =
  "inline-flex items-center justify-center rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"

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
    const replacement = before + selected + after
    const next = value.slice(0, start) + replacement + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, end + before.length)
    })
  }

  const prefixLines = (prefix: string) => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const lines = selected.split("\n")
    const replacement = lines.map((l) => prefix + l).join("\n")
    const next = value.slice(0, start) + replacement + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start, start + replacement.length)
    })
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
        >
          B
        </button>
        <button
          type="button"
          className={`${toolbarBtnCls} italic`}
          onClick={() => wrapSelection("*", "*")}
          aria-label="Itálico"
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
        className={inputCls}
        value={value}
        rows={minRows}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Pré-visualização ao vivo: o mesmo parser usado no site público, então
          o efeito visto aqui é exatamente o que será publicado. */}
      {value.trim() !== "" && (
        <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Pré-visualização
          </p>
          <div className="whitespace-pre-line text-sm leading-relaxed text-slate-800">
            {renderInline(value)}
          </div>
        </div>
      )}
    </div>
  )
}
