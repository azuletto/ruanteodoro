"use client"

import { useRef, useCallback } from "react"
import { renderPreviewInline } from "@/lib/rich-text"

const labelCls = "mb-1 block text-xs font-medium text-slate-600"

const toolbarBtnCls =
  "inline-flex items-center justify-center rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"

// Fonte/padding idênticos no textarea e no overlay pra ficarem alinhados.
const sharedCls =
  "w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words"

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

  // Sincroniza scroll do overlay com o textarea.
  const syncScroll = useCallback(() => {
    const ta = textareaRef.current
    const ov = overlayRef.current
    if (ta && ov) {
      ov.scrollTop = ta.scrollTop
      ov.scrollLeft = ta.scrollLeft
    }
  }, [])

  const wrapSelection = (before: string, after: string) => {
    const el = textareaRef.current
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
    const el = textareaRef.current
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

        {/* Textarea: captura input, texto invisível, cursor visível */}
        <textarea
          ref={textareaRef}
          className={`${sharedCls} relative resize-y border-slate-300 bg-transparent text-transparent caret-slate-800 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200`}
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
