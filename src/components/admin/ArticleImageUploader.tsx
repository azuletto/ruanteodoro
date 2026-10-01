"use client"

import { useRef, useState } from "react"
import { ImagePlus, Trash2 } from "lucide-react"

// Uploader de imagem para artigo. Aceita apenas ARQUIVOS de imagem (nunca uma
// URL de texto), evitando o erro de colar um link de página HTML no lugar de
// uma imagem. Gera uma data URL armazenada junto com o artigo.
export function ArticleImageUploader({
  value,
  onChange,
}: {
  value: string | null
  onChange: (v: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [reading, setReading] = useState(false)

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (!file.type.startsWith("image/")) return

    setReading(true)
    const reader = new FileReader()
    reader.onload = () => {
      onChange(String(reader.result))
      setReading(false)
    }
    reader.onerror = () => setReading(false)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex items-center gap-3">
      {/* Preview com lixeira sobreposta para remover */}
      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Imagem do artigo"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remover imagem"
              title="Remover imagem"
              className="absolute right-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-slate-400">Sem imagem</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-1.5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={reading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-navy-400 hover:text-navy-700 disabled:opacity-60"
        >
          <ImagePlus className="h-4 w-4" />
          {reading ? "Carregando..." : value ? "Trocar imagem" : "Enviar imagem"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" />
            Remover imagem
          </button>
        )}
        <span className="text-[11px] leading-tight text-slate-400">
          Use um arquivo de imagem (PNG, JPG, WebP). O enquadramento é ajustado
          abaixo.
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </div>
  )
}
