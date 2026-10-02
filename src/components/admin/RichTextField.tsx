"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { renderPreviewInline } from "@/lib/rich-text"

const labelCls = "mb-1 block text-xs font-medium text-slate-600"

const toolbarBtnCls =
  "inline-flex items-center justify-center rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"

// Fonte/padding idênticos no textarea e no overlay pra ficarem alinhados.
// px-3.5 py-2.5 dá folga suficiente pra não cortar texto na borda.
const sharedCls =
  "w-full min-w-0 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]"

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
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  // Guarda a seleção desejada pra restaurar após re-render.
  const pendingSelection = useRef<{ start: number; end: number } | null>(null)

  // Sincroniza scroll do overlay com o textarea.
  const syncScroll = useCallback(() => {
    const ta = textareaRef.current
    const ov = overlayRef.current
    if (ta && ov) {
      ov.scrollTop = ta.scrollTop
      ov.scrollLeft = ta.scrollLeft
    }
  }, [])

  // Restaura a seleção após o re-render causado por onChange.
  useEffect(() => {
    if (pendingSelection.current) {
      const el = textareaRef.current
      if (el) {
        el.focus()
        el.setSelectionRange(pendingSelection.current.start, pendingSelection.current.end)
      }
      pendingSelection.current = null
    }
  })

  const wrapSelection = (before: string, after: string) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const replacement = before + selected + after
    const next = value.slice(0, start) + replacement + value.slice(end)
    // Guarda a seleção desejada ANTES do onChange causar re-render.
    pendingSelection.current = { start: start + before.length, end: end + before.length }
    onChange(next)
  }

  const prefixLines = (prefix: string) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const lines = selected.split("\n")
    const replacement = lines.map((l) => prefix + l).join("\n")
    const next = value.slice(0, start) + replacement + value.slice(end)
    pendingSelection.current = { start, end: start + replacement.length }
    onChange(next)
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
          onClick={() => wrapSelection("_", "_")}
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

      {/* Container relativo: overlay por baixo, textarea transparente por cima */}
      <div className="relative">
        {/* Overlay: renderiza o texto formatado (marcadores dim, conteúdo bold/italic) */}
        <div
          ref={overlayRef}
          aria-hidden
          className={`${sharedCls} pointer-events-none absolute inset-0 overflow-hidden border-transparent bg-white text-slate-800`}
          style={{ minHeight: `${minRows * 1.625}rem` }}
        >
          {renderPreviewInline(value)}
          {/* Espaço extra pra não cortar a última linha */}
          {"\n"}
        </div>

        {/* Textarea: captura input, texto invisível, cursor visível.
            selection:bg-transparent evita que a seleção do navegador mostre
            o texto original (com marcadores) por cima do overlay. */}
        <textarea
          ref={textareaRef}
          className={`${sharedCls} relative resize-y border-slate-300 bg-transparent text-transparent caret-slate-800 selection:bg-navy-200/40 selection:text-transparent focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200`}
          value={value}
          rows={minRows}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          spellCheck={false}
        />
      </div>
    </div>
  )
}
