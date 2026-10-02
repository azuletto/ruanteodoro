"use client"

import { useRef, useState } from "react"
import { ImagePlus, Trash2 } from "lucide-react"
import { uploadSiteImage } from "@/app/actions/uploads"

// Uploader de imagem para artigo. Aceita apenas ARQUIVOS de imagem (nunca uma
// URL de texto) e envia para o Supabase Storage — o banco guarda só a URL
// pública, sem base64 no Postgres.
export function ArticleImageUploader({
  value,
  onChange,
}: {
  value: string | null
  onChange: (v: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setUploadError("Apenas imagens são aceitas.")
      return
    }

    setUploading(true)
    setUploadError(null)
    try {
      const fd = new FormData()
      fd.set("file", file)
      fd.set("folder", "articles")
      const result = await uploadSiteImage(fd)
      if (result.error) {
        setUploadError(result.error)
      } else if (result.url) {
        onChange(result.url)
      }
    } catch {
      setUploadError("Falha inesperada no upload. Tente novamente.")
    } finally {
      setUploading(false)
    }
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
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-navy-400 hover:text-navy-700 disabled:opacity-60"
        >
          <ImagePlus className="h-4 w-4" />
          {uploading ? "Enviando..." : value ? "Trocar imagem" : "Enviar imagem"}
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
        {uploadError && (
          <span className="text-[11px] leading-tight text-red-600">
            {uploadError}
          </span>
        )}
        <span className="text-[11px] leading-tight text-slate-400">
          Use um arquivo de imagem (PNG, JPG, WebP, máx. 8MB). O enquadramento
          é ajustado abaixo.
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
