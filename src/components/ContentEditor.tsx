"use client"

import { useState, useTransition, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ExternalLink,
  GripVertical,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  X,
} from "lucide-react"
import { saveContent } from "@/app/actions/content"
import { saveTerms } from "@/app/actions/terms"
import { logout } from "@/app/actions/auth"
import { SiteIcon, AVAILABLE_ICONS } from "@/lib/icons"
import { RichTextField } from "@/components/admin/RichTextField"
import { PhotoUploader } from "@/components/admin/PhotoUploader"
import type {
  Differential,
  FaqItem,
  HeaderLink,
  PracticeArea,
  SiteContent,
  TermsSection,
} from "@/types"

const SECTION_LABELS: Record<string, string> = {
  areas: "Áreas de Atuação",
  sobre: "Sobre",
  diferenciais: "Diferenciais",
  faq: "FAQ",
}

const SECTION_COLORS: Record<string, string> = {
  areas: "bg-navy-600",
  sobre: "bg-slate-400",
  diferenciais: "bg-navy-400",
  faq: "bg-slate-300",
}

const inputCls =
  "w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"

const labelCls = "mb-1 block text-xs font-medium text-slate-600"

const cardCls =
  "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"

const smallBtnCls =
  "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"

const addBtnCls =
  "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:border-navy-400 hover:text-navy-700"

function Field({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
  rows?: number
}) {
  return (
    <div className="min-w-0">
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          className={`${inputCls} resize-y`}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

function moveItem<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir
  if (target < 0 || target >= arr.length) return arr
  const next = [...arr]
  const tmp = next[index]
  next[index] = next[target]
  next[target] = tmp
  return next
}

function SectionCard({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className={cardCls}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-navy-900">{title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-4">{children}</div>
      )}
    </section>
  )
}

function PreviewBox({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        Pré-visualização
      </p>
      {children}
    </div>
  )
}

function MiniHero() {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <div className="h-2 w-2/3 rounded-full bg-slate-300" />
      <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
      <div className="mt-0.5 h-3 w-12 rounded bg-slate-300" />
    </div>
  )
}

function MiniAreas() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start gap-1 rounded border border-slate-200 bg-white p-1"
        >
          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300" />
          <div className="flex-1 space-y-0.5">
            <div className="h-1 w-3/4 rounded-full bg-slate-300" />
            <div className="h-1 w-full rounded-full bg-slate-200" />
            <div className="h-1 w-2/3 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

function MiniSobre() {
  return (
    <div className="flex items-start gap-1.5">
      <div className="h-11 w-1/3 shrink-0 rounded bg-slate-300" />
      <div className="flex-1 space-y-1 pt-0.5">
        <div className="h-1.5 w-1/2 rounded-full bg-slate-300" />
        <div className="h-1 w-full rounded-full bg-slate-200" />
        <div className="h-1 w-full rounded-full bg-slate-200" />
        <div className="h-1 w-3/4 rounded-full bg-slate-200" />
      </div>
    </div>
  )
}

function MiniDiferenciais() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="space-y-0.5 rounded border border-slate-200 bg-white p-1"
        >
          <div className="h-1 w-2/3 rounded-full bg-slate-300" />
          <div className="h-1 w-full rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  )
}

function MiniFaq() {
  return (
    <div className="space-y-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-1 rounded border border-slate-200 bg-white px-1 py-0.5"
        >
          <div className="h-1 flex-1 rounded-full bg-slate-200" />
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
        </div>
      ))}
    </div>
  )
}

const MINI_SECTIONS: Record<string, ReactNode> = {
  areas: <MiniAreas />,
  sobre: <MiniSobre />,
  diferenciais: <MiniDiferenciais />,
  faq: <MiniFaq />,
}

export function ContentEditor({
  initialContent,
  initialTerms,
  userEmail,
}: {
  initialContent: SiteContent
  initialTerms: TermsSection[]
  userEmail: string
}) {
  const [draft, setDraft] = useState<SiteContent>(initialContent)
  const [terms, setTerms] = useState<TermsSection[]>(initialTerms)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{
    kind: "success" | "error"
    text: string
  } | null>(null)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const handleSave = () => {
    const formData = new FormData()
    formData.set("content", JSON.stringify(draft))
    const termsFormData = new FormData()
    termsFormData.set(
      "sections",
      JSON.stringify(terms.map((t) => ({ title: t.title, content: t.content })))
    )
    startTransition(async () => {
      const result = await saveContent(formData)
      const termsResult = await saveTerms(termsFormData)
      if ((result && "error" in result) || (termsResult && "error" in termsResult)) {
        setMessage({
          kind: "error",
          text:
            (result && "error" in result ? result.error : undefined) ??
            (termsResult && "error" in termsResult ? termsResult.error : undefined) ??
            "Erro ao salvar",
        })
      } else {
        setMessage({ kind: "success", text: "Conteúdo salvo com sucesso." })
      }
    })
  }

  const handleReset = () => {
    setDraft(initialContent)
    setTerms(initialTerms)
    setShowResetModal(false)
    setMessage(null)
  }

  const moveSection = (index: number, dir: -1 | 1) => {
    const next = moveItem(draft.section_order, index, dir)
    if (next !== draft.section_order) set("section_order", next)
  }

  const updateArea = (i: number, patch: Partial<PracticeArea>) =>
    set(
      "practice_areas",
      draft.practice_areas.map((a, idx) => (idx === i ? { ...a, ...patch } : a))
    )

  const moveArea = (i: number, dir: -1 | 1) =>
    set(
      "practice_areas",
      moveItem(draft.practice_areas, i, dir).map((a, idx) => ({
        ...a,
        order: idx,
      }))
    )

  const addArea = () =>
    set("practice_areas", [
      ...draft.practice_areas,
      {
        id: Date.now(),
        icon: AVAILABLE_ICONS[0],
        title: "",
        description: "",
        order: draft.practice_areas.length,
        active: true,
      },
    ])

  const removeArea = (i: number) =>
    set(
      "practice_areas",
      draft.practice_areas.filter((_, idx) => idx !== i)
    )

  const updateDifferential = (i: number, patch: Partial<Differential>) =>
    set(
      "differentials",
      draft.differentials.map((d, idx) =>
        idx === i ? { ...d, ...patch } : d
      )
    )

  const moveDifferential = (i: number, dir: -1 | 1) =>
    set(
      "differentials",
      moveItem(draft.differentials, i, dir).map((d, idx) => ({
        ...d,
        order: idx,
      }))
    )

  const addDifferential = () =>
    set("differentials", [
      ...draft.differentials,
      {
        id: Date.now(),
        icon: AVAILABLE_ICONS[0],
        title: "",
        description: "",
        order: draft.differentials.length,
        active: true,
      },
    ])

  const removeDifferential = (i: number) =>
    set(
      "differentials",
      draft.differentials.filter((_, idx) => idx !== i)
    )

  const updateFaq = (i: number, patch: Partial<FaqItem>) =>
    set(
      "faq_items",
      draft.faq_items.map((f, idx) => (idx === i ? { ...f, ...patch } : f))
    )

  const moveFaq = (i: number, dir: -1 | 1) =>
    set(
      "faq_items",
      moveItem(draft.faq_items, i, dir).map((f, idx) => ({
        ...f,
        order: idx,
      }))
    )

  const addFaq = () =>
    set("faq_items", [
      ...draft.faq_items,
      {
        id: Date.now(),
        question: "",
        answer: "",
        order: draft.faq_items.length,
        active: true,
      },
    ])

  const removeFaq = (i: number) =>
    set(
      "faq_items",
      draft.faq_items.filter((_, idx) => idx !== i)
    )

  const updateLink = (i: number, patch: Partial<HeaderLink>) =>
    set(
      "header_links",
      draft.header_links.map((l, idx) => (idx === i ? { ...l, ...patch } : l))
    )

  const moveLink = (i: number, dir: -1 | 1) =>
    set(
      "header_links",
      moveItem(draft.header_links, i, dir).map((l, idx) => ({
        ...l,
        order: idx,
      }))
    )

  const addLink = () =>
    set("header_links", [
      ...draft.header_links,
      { label: "", href: "", order: draft.header_links.length },
    ])

  const removeLink = (i: number) =>
    set(
      "header_links",
      draft.header_links.filter((_, idx) => idx !== i)
    )

  const updateHighlight = (i: number, value: string) =>
    set(
      "about_highlights",
      draft.about_highlights.map((h, idx) => (idx === i ? value : h))
    )

  const addHighlight = () =>
    set("about_highlights", [...draft.about_highlights, ""])

  const removeHighlight = (i: number) =>
    set(
      "about_highlights",
      draft.about_highlights.filter((_, idx) => idx !== i)
    )

  const updateTerm = (i: number, patch: Partial<TermsSection>) =>
    setTerms((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)))

  const moveTerm = (i: number, dir: -1 | 1) =>
    setTerms((prev) => moveItem(prev, i, dir))

  const addTerm = () =>
    setTerms((prev) => [
      ...prev,
      { title: "", content: "", section_order: prev.length },
    ])

  const removeTerm = (i: number) =>
    setTerms((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900 shadow-md shadow-navy-950/30">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              {(userEmail[0] ?? "A").toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-white sm:text-base">
                Painel Administrativo
              </h1>
              <p className="truncate text-xs text-navy-300">{userEmail}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-navy-100 transition hover:bg-white/10 sm:text-sm"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              Ver site
            </Link>
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-navy-100 transition hover:bg-white/10 sm:text-sm"
            >
              <RotateCcw className="h-4 w-4 shrink-0" />
              Restaurar
            </button>
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              <Save className="h-4 w-4 shrink-0" />
              {isPending ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() =>
                startTransition(async () => {
                  await logout()
                })
              }
              className="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-navy-200 transition hover:bg-red-500/10 hover:text-red-300"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-4 px-4 py-6">
        {message && (
          <div
            className={
              message.kind === "error"
                ? "rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700"
                : "rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700"
            }
          >
            {message.text}
          </div>
        )}

        <SectionCard title="Configurações Rápidas" defaultOpen>
          <div className="space-y-5">
            <div className="min-w-0">
              <span className={labelCls}>Foto (seção Sobre)</span>
              <PhotoUploader
                value={draft.about_photo_url}
                onChange={(v) => set("about_photo_url", v)}
              />
              {!draft.about_photo_url.startsWith("data:") && (
                <div className="mt-3">
                  <Field
                    label="Ou informe uma URL de imagem"
                    value={draft.about_photo_url}
                    onChange={(v) => set("about_photo_url", v)}
                  />
                </div>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.disable_animations ?? false}
                onChange={(e) => set("disable_animations", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-navy-700"
              />
              Desabilitar animações
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Layout e Ordem" defaultOpen>
          <PreviewBox>
            <div className="max-h-60 overflow-y-auto">
              <div className="mb-1 flex h-5 w-full items-center justify-between rounded bg-navy-900 px-1.5">
                <div className="h-2 w-6 rounded-sm bg-slate-100/80" />
                <div className="flex items-center gap-1">
                  <div className="h-1 w-4 rounded-full bg-slate-300/60" />
                  <div className="h-1 w-4 rounded-full bg-slate-300/60" />
                  <div className="h-1 w-4 rounded-full bg-slate-300/60" />
                </div>
              </div>
              <div>
                <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                  Hero
                </div>
                <MiniHero />
              </div>
              {draft.section_order.map((s) => (
                <div
                  key={s}
                  className={`mt-1.5 border-t border-slate-200 pt-1.5 ${hoveredSection === s ? "rounded ring-1 ring-navy-500 ring-offset-1" : ""}`}
                >
                  <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                    {SECTION_LABELS[s] ?? s}
                  </div>
                  {MINI_SECTIONS[s] ?? (
                    <div className="h-6 rounded bg-slate-200" />
                  )}
                </div>
              ))}
            </div>
          </PreviewBox>
          <ul className="space-y-2">
            {draft.section_order.map((s, i) => (
              <li
                key={s}
                onMouseEnter={() => setHoveredSection(s)}
                onMouseLeave={() => setHoveredSection(null)}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <GripVertical className="h-4 w-4 shrink-0 text-slate-400" />
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${SECTION_COLORS[s] ?? "bg-slate-300"}`}
                />
                <span className="flex-1 truncate text-sm text-slate-700">
                  {SECTION_LABELS[s] ?? s}
                </span>
                <select
                  className="shrink-0 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 transition focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
                  value={(draft.section_animations ?? {})[s] ?? "fade-up"}
                  onChange={(e) =>
                    set("section_animations", {
                      ...(draft.section_animations ?? {}),
                      [s]: e.target.value,
                    })
                  }
                >
                  <option value="none">Sem animação</option>
                  <option value="fade-up">Fade Up</option>
                  <option value="fade-in">Fade In</option>
                  <option value="scale-in">Scale In</option>
                </select>
                <button
                  type="button"
                  className={smallBtnCls}
                  disabled={i === 0}
                  onClick={() => moveSection(i, -1)}
                  aria-label="Mover para cima"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  className={smallBtnCls}
                  disabled={i === draft.section_order.length - 1}
                  onClick={() => moveSection(i, 1)}
                  aria-label="Mover para baixo"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Hero" defaultOpen>
          <PreviewBox>
            <div className="flex h-20 flex-col items-center justify-center gap-1.5">
              <div className="h-2.5 w-2/3 rounded-full bg-slate-300" />
              <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
              <div className="mt-1 h-4 w-16 rounded bg-navy-300" />
            </div>
          </PreviewBox>
          <div className="grid gap-3">
            <Field
              label="Título principal"
              value={draft.hero_title}
              onChange={(v) => set("hero_title", v)}
            />
            <RichTextField
              label="Subtítulo"
              value={draft.hero_subtitle}
              onChange={(v) => set("hero_subtitle", v)}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Texto do botão"
                value={draft.hero_cta_text}
                onChange={(v) => set("hero_cta_text", v)}
              />
              <Field
                label="Link do botão"
                value={draft.hero_cta_link}
                onChange={(v) => set("hero_cta_link", v)}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Sobre">
          <PreviewBox>
            <div className="flex h-16 gap-2">
              <div className="h-full w-1/3 rounded-md bg-slate-300" />
              <div className="flex flex-1 flex-col justify-center gap-1.5">
                <div className="h-2 w-3/4 rounded-full bg-slate-300" />
                <div className="h-1.5 w-full rounded-full bg-slate-200" />
                <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
              </div>
            </div>
          </PreviewBox>
          <div className="grid gap-3">
            <Field
              label="Título da seção"
              value={draft.about_title}
              onChange={(v) => set("about_title", v)}
            />
            <Field
              label="URL da foto"
              value={draft.about_photo_url}
              onChange={(v) => set("about_photo_url", v)}
            />
            <RichTextField
              label="Biografia"
              value={draft.about_bio}
              onChange={(v) => set("about_bio", v)}
              minRows={5}
            />
            <div>
              <span className={labelCls}>Destaques</span>
              <div className="space-y-2">
                {draft.about_highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className={inputCls}
                      value={h}
                      onChange={(e) => updateHighlight(i, e.target.value)}
                    />
                    <button
                      type="button"
                      className={smallBtnCls}
                      onClick={() => removeHighlight(i)}
                      aria-label="Remover destaque"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addHighlight} className={`${addBtnCls} mt-2`}>
                <Plus className="h-4 w-4" />
                Adicionar destaque
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Áreas de Atuação">
          <PreviewBox>
            <div className="grid h-20 grid-cols-2 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-md bg-slate-200" />
              ))}
            </div>
          </PreviewBox>
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Título da seção"
                value={draft.practice_title}
                onChange={(v) => set("practice_title", v)}
              />
              <Field
                label="Subtítulo da seção"
                value={draft.practice_subtitle}
                onChange={(v) => set("practice_subtitle", v)}
              />
            </div>
            <div className="space-y-3">
              {draft.practice_areas.map((area, i) => (
                <div
                  key={area.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <SiteIcon
                      name={area.icon}
                      className="h-5 w-5 shrink-0 text-navy-600"
                    />
                    <select
                      className={inputCls}
                      value={area.icon}
                      onChange={(e) => updateArea(i, { icon: e.target.value })}
                    >
                      {AVAILABLE_ICONS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <div className="ml-auto flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        className={smallBtnCls}
                        disabled={i === 0}
                        onClick={() => moveArea(i, -1)}
                        aria-label="Mover para cima"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className={smallBtnCls}
                        disabled={i === draft.practice_areas.length - 1}
                        onClick={() => moveArea(i, 1)}
                        aria-label="Mover para baixo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className={smallBtnCls}
                        onClick={() => removeArea(i)}
                        aria-label="Remover área"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <Field
                      label="Título"
                      value={area.title}
                      onChange={(v) => updateArea(i, { title: v })}
                    />
                    <RichTextField
                      label="Descrição"
                      value={area.description}
                      onChange={(v) => updateArea(i, { description: v })}
                      minRows={2}
                    />
                  </div>
                  <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={area.active}
                      onChange={(e) => updateArea(i, { active: e.target.checked })}
                      className="h-3.5 w-3.5 rounded border-slate-300"
                    />
                    Ativo
                  </label>
                </div>
              ))}
            </div>
            <button type="button" onClick={addArea} className={addBtnCls}>
              <Plus className="h-4 w-4" />
              Adicionar área
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Diferenciais">
          <PreviewBox>
            <div className="grid h-16 grid-cols-2 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-md bg-slate-200" />
              ))}
            </div>
          </PreviewBox>
          <div className="grid gap-3">
            <Field
              label="Título da seção"
              value={draft.differentials_title}
              onChange={(v) => set("differentials_title", v)}
            />
            <div className="space-y-3">
              {draft.differentials.map((item, i) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <SiteIcon
                      name={item.icon}
                      className="h-5 w-5 shrink-0 text-navy-600"
                    />
                    <select
                      className={inputCls}
                      value={item.icon}
                      onChange={(e) =>
                        updateDifferential(i, { icon: e.target.value })
                      }
                    >
                      {AVAILABLE_ICONS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <div className="ml-auto flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        className={smallBtnCls}
                        disabled={i === 0}
                        onClick={() => moveDifferential(i, -1)}
                        aria-label="Mover para cima"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className={smallBtnCls}
                        disabled={i === draft.differentials.length - 1}
                        onClick={() => moveDifferential(i, 1)}
                        aria-label="Mover para baixo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className={smallBtnCls}
                        onClick={() => removeDifferential(i)}
                        aria-label="Remover diferencial"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <Field
                      label="Título"
                      value={item.title}
                      onChange={(v) => updateDifferential(i, { title: v })}
                    />
                    <RichTextField
                      label="Descrição"
                      value={item.description}
                      onChange={(v) =>
                        updateDifferential(i, { description: v })
                      }
                      minRows={2}
                    />
                  </div>
                  <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={(e) =>
                        updateDifferential(i, { active: e.target.checked })
                      }
                      className="h-3.5 w-3.5 rounded border-slate-300"
                    />
                    Ativo
                  </label>
                </div>
              ))}
            </div>
            <button type="button" onClick={addDifferential} className={addBtnCls}>
              <Plus className="h-4 w-4" />
              Adicionar diferencial
            </button>
          </div>
        </SectionCard>

        <SectionCard title="FAQ">
          <PreviewBox>
            <div className="flex h-16 flex-col justify-center gap-1">
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-200" />
            </div>
          </PreviewBox>
          <div className="grid gap-3">
            <Field
              label="Título da seção"
              value={draft.faq_title}
              onChange={(v) => set("faq_title", v)}
            />
            <div className="space-y-3">
              {draft.faq_items.map((item, i) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1 text-xs font-medium text-slate-500">
                      Pergunta {i + 1}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        className={smallBtnCls}
                        disabled={i === 0}
                        onClick={() => moveFaq(i, -1)}
                        aria-label="Mover para cima"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className={smallBtnCls}
                        disabled={i === draft.faq_items.length - 1}
                        onClick={() => moveFaq(i, 1)}
                        aria-label="Mover para baixo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className={smallBtnCls}
                        onClick={() => removeFaq(i)}
                        aria-label="Remover pergunta"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 grid gap-2">
                    <Field
                      label="Pergunta"
                      value={item.question}
                      onChange={(v) => updateFaq(i, { question: v })}
                    />
                    <RichTextField
                      label="Resposta"
                      value={item.answer}
                      onChange={(v) => updateFaq(i, { answer: v })}
                      minRows={2}
                    />
                  </div>
                  <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={(e) => updateFaq(i, { active: e.target.checked })}
                      className="h-3.5 w-3.5 rounded border-slate-300"
                    />
                    Ativo
                  </label>
                </div>
              ))}
            </div>
            <button type="button" onClick={addFaq} className={addBtnCls}>
              <Plus className="h-4 w-4" />
              Adicionar pergunta
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Contato">
          <PreviewBox>
            <div className="grid h-12 grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md bg-slate-200" />
              ))}
            </div>
          </PreviewBox>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field
              label="WhatsApp"
              value={draft.whatsapp_number}
              onChange={(v) => set("whatsapp_number", v)}
            />
            <Field
              label="Telefone"
              value={draft.phone}
              onChange={(v) => set("phone", v)}
            />
            <Field
              label="E-mail"
              value={draft.email}
              onChange={(v) => set("email", v)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Rodapé">
          <PreviewBox>
            <div className="flex h-12 flex-col justify-center gap-1.5">
              <div className="h-1.5 w-1/2 rounded-full bg-slate-300" />
              <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
              <div className="h-1.5 w-1/3 rounded-full bg-slate-200" />
            </div>
          </PreviewBox>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Nome"
              value={draft.footer_name}
              onChange={(v) => set("footer_name", v)}
            />
            <Field
              label="OAB"
              value={draft.footer_oab}
              onChange={(v) => set("footer_oab", v)}
            />
            <Field
              label="Endereço"
              value={draft.footer_address}
              onChange={(v) => set("footer_address", v)}
            />
            <Field
              label="Telefone"
              value={draft.footer_phone}
              onChange={(v) => set("footer_phone", v)}
            />
            <Field
              label="E-mail"
              value={draft.footer_email}
              onChange={(v) => set("footer_email", v)}
            />
            <Field
              label="WhatsApp"
              value={draft.footer_whatsapp}
              onChange={(v) => set("footer_whatsapp", v)}
            />
            <Field
              label="Link de privacidade"
              value={draft.footer_privacy_url}
              onChange={(v) => set("footer_privacy_url", v)}
            />
            <Field
              label="Link de termos"
              value={draft.footer_terms_url}
              onChange={(v) => set("footer_terms_url", v)}
            />
            <div className="sm:col-span-2">
              <Field
                label="Copyright"
                value={draft.footer_copyright}
                onChange={(v) => set("footer_copyright", v)}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Links do Menu">
          <PreviewBox>
            <div className="flex h-10 items-center gap-1.5">
              <div className="h-1.5 w-10 rounded-full bg-slate-300" />
              <div className="h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="h-1.5 w-8 rounded-full bg-slate-200" />
              <div className="h-1.5 w-12 rounded-full bg-slate-200" />
            </div>
          </PreviewBox>
          <div className="space-y-2">
            {draft.header_links.map((link, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
                  <Field
                    label="Rótulo"
                    value={link.label}
                    onChange={(v) => updateLink(i, { label: v })}
                  />
                  <Field
                    label="URL"
                    value={link.href}
                    onChange={(v) => updateLink(i, { href: v })}
                  />
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    className={smallBtnCls}
                    disabled={i === 0}
                    onClick={() => moveLink(i, -1)}
                    aria-label="Mover para cima"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className={smallBtnCls}
                    disabled={i === draft.header_links.length - 1}
                    onClick={() => moveLink(i, 1)}
                    aria-label="Mover para baixo"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className={smallBtnCls}
                    onClick={() => removeLink(i)}
                    aria-label="Remover link"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addLink} className={`${addBtnCls} mt-3`}>
            <Plus className="h-4 w-4" />
            Adicionar link
          </button>
        </SectionCard>

        <SectionCard title="SEO">
          <PreviewBox>
            <div className="flex h-12 flex-col justify-center gap-1.5">
              <div className="h-2 w-1/2 rounded-full bg-slate-300" />
              <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
            </div>
          </PreviewBox>
          <div className="grid gap-3">
            <Field
              label="Título (meta title)"
              value={draft.meta_title}
              onChange={(v) => set("meta_title", v)}
            />
            <RichTextField
              label="Descrição (meta description)"
              value={draft.meta_description}
              onChange={(v) => set("meta_description", v)}
            />
            <Field
              label="Imagem de compartilhamento (OG image)"
              value={draft.og_image}
              onChange={(v) => set("og_image", v)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Termos de Uso e Política de Privacidade">
          <div className="space-y-3">
            {terms.map((term, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-xs font-medium text-slate-500">
                    Seção {i + 1}
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      className={smallBtnCls}
                      disabled={i === 0}
                      onClick={() => moveTerm(i, -1)}
                      aria-label="Mover para cima"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      className={smallBtnCls}
                      disabled={i === terms.length - 1}
                      onClick={() => moveTerm(i, 1)}
                      aria-label="Mover para baixo"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      className={smallBtnCls}
                      onClick={() => removeTerm(i)}
                      aria-label="Remover seção"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 grid gap-2">
                  <Field
                    label="Título"
                    value={term.title}
                    onChange={(v) => updateTerm(i, { title: v })}
                  />
                  <RichTextField
                    label="Conteúdo"
                    value={term.content}
                    onChange={(v) => updateTerm(i, { content: v })}
                    minRows={4}
                  />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addTerm} className={`${addBtnCls} mt-3`}>
            <Plus className="h-4 w-4" />
            Adicionar seção
          </button>
        </SectionCard>
      </main>

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold text-navy-900">
                Restaurar conteúdo
              </h2>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Tem certeza de que deseja restaurar? Todas as alterações não
              salvas serão descartadas.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold text-navy-900">
                Confirmar alterações?
              </h2>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              As alterações serão salvas e aplicadas ao site.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveModal(false)
                  handleSave()
                }}
                className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-800"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
