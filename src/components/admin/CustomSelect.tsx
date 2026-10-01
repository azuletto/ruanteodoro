"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronDown, Check } from "lucide-react"

interface SelectOption {
  value: string
  label: string
}

const MENU_MAX_HEIGHT = 288

// O menu abre via portal em document.body com position:fixed — assim ele
// nunca é cortado pelo overflow dos containers pais (cards, seções, etc.),
// e pode expandir além do elemento. Se não couber embaixo, abre pra cima.
export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  className = "",
}: {
  value: string
  onChange: (v: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<{
    top: number
    left: number
    width: number
    maxHeight: number
  } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  // Recalcula a posição do menu em relação ao gatilho. Retorna false quando o
  // gatilho saiu completamente da viewport (aí o menu deve fechar).
  const updatePosition = (): boolean => {
    const trigger = triggerRef.current
    if (!trigger) return false
    const rect = trigger.getBoundingClientRect()
    // Gatilho totalmente fora da viewport → sem âncora visível, fecha o menu.
    const outOfView =
      rect.bottom < 0 || rect.top > window.innerHeight
    if (outOfView) return false
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    const openUp = spaceBelow < MENU_MAX_HEIGHT + 16 && spaceAbove > spaceBelow
    const available = (openUp ? spaceAbove : spaceBelow) - 12
    const maxHeight = Math.max(120, Math.min(MENU_MAX_HEIGHT, available))
    setMenu({
      top: openUp ? rect.top - maxHeight - 6 : rect.bottom + 6,
      left: rect.left,
      width: Math.max(rect.width, 176),
      maxHeight,
    })
    return true
  }

  useLayoutEffect(() => {
    if (open) updatePosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return

    const onOutside = (e: MouseEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t)) return
      if (menuRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    // Scroll DENTRO do próprio menu não pode fechá-lo (lista com muitas
    // opções). Só reposiciona quando o scroll/resize vem de fora, e fecha
    // apenas se o gatilho sair da viewport.
    const onScroll = (e: Event) => {
      const t = e.target
      if (menuRef.current && t instanceof Node && menuRef.current.contains(t)) return
      if (!updatePosition()) setOpen(false)
    }
    const onResize = () => {
      if (!updatePosition()) setOpen(false)
    }

    document.addEventListener("mousedown", onOutside)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)
    return () => {
      document.removeEventListener("mousedown", onOutside)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-800 transition-colors hover:border-navy-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
      >
        <span className={selected ? "truncate" : "truncate text-slate-400"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        menu &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            style={{
              position: "fixed",
              top: menu.top,
              left: menu.left,
              width: menu.width,
              maxHeight: menu.maxHeight,
              zIndex: 100,
            }}
            className="select-in overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg shadow-navy-950/10"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  opt.value === value
                    ? "bg-navy-50 font-medium text-navy-900"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="w-3.5 shrink-0">
                  {opt.value === value && (
                    <Check className="h-3.5 w-3.5 text-navy-600" />
                  )}
                </span>
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  )
}
