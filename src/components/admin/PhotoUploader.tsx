"use client"

import { useCallback, useState } from "react"
import Cropper from "react-easy-crop"
import type { Area, Point } from "react-easy-crop"
import { ImagePlus, RotateCcw, User, X } from "lucide-react"

type Filters = {
  brightness: number
  contrast: number
  saturation: number
  grayscale: number
  blur: number
}

const DEFAULT_FILTERS: Filters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  blur: 0,
}

function filterCss(f: Filters) {
  return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) grayscale(${f.grayscale}%) blur(${f.blur}px)`
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", reject)
    img.src = url
  })
}

function getRadianAngle(deg: number) {
  return (deg * Math.PI) / 180
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  filters: Filters
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  const rotRad = getRadianAngle(rotation)
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const out = document.createElement("canvas")
  const outCtx = out.getContext("2d")
  if (!outCtx) return ""

  const size = 800
  out.width = size
  out.height = size
  outCtx.filter = filterCss(filters)
  outCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  )

  return out.toDataURL("image/jpeg", 0.88)
}

const sliderCls = "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-navy-700"
const sliderLabelCls = "mb-1 flex items-center justify-between text-xs font-medium text-slate-600"

export function PhotoUploader({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [src, setSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [cropArea, setCropArea] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setSrc(String(reader.result))
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setRotation(0)
      setFilters(DEFAULT_FILTERS)
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const onCropComplete = useCallback((_: Area, area: Area) => {
    setCropArea(area)
  }, [])

  const setFilter = (key: keyof Filters, v: number) =>
    setFilters((f) => ({ ...f, [key]: v }))

  const apply = async () => {
    if (!src || !cropArea) return
    setProcessing(true)
    try {
      const dataUrl = await getCroppedImg(src, cropArea, rotation, filters)
      if (dataUrl) onChange(dataUrl)
      setSrc(null)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          {value ? (
            <img
              src={value}
              alt="Foto do advogado"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <User className="h-8 w-8" />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col items-start gap-1.5">
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-navy-400 hover:text-navy-700">
            <ImagePlus className="h-4 w-4" />
            Enviar foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("/foto.png")}
              className="text-xs text-slate-500 transition hover:text-red-600"
            >
              Remover foto enviada
            </button>
          )}
        </div>
      </div>

      {src && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-semibold text-navy-900">
                Ajustar foto
              </h2>
              <button
                type="button"
                onClick={() => setSrc(null)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative h-64 w-full bg-slate-900 sm:h-80">
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                style={{ mediaStyle: { filter: filterCss(filters) } }}
              />
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <div className={sliderLabelCls}>
                  <span>Zoom</span>
                  <span>{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className={sliderCls}
                />
              </div>
              <div>
                <div className={sliderLabelCls}>
                  <span>Rotação</span>
                  <span>{Math.round(rotation)}°</span>
                </div>
                <input
                  type="range"
                  min={-180}
                  max={180}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className={sliderCls}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <div className={sliderLabelCls}>
                    <span>Brilho</span>
                    <span>{filters.brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={150}
                    value={filters.brightness}
                    onChange={(e) => setFilter("brightness", Number(e.target.value))}
                    className={sliderCls}
                  />
                </div>
                <div>
                  <div className={sliderLabelCls}>
                    <span>Contraste</span>
                    <span>{filters.contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={150}
                    value={filters.contrast}
                    onChange={(e) => setFilter("contrast", Number(e.target.value))}
                    className={sliderCls}
                  />
                </div>
                <div>
                  <div className={sliderLabelCls}>
                    <span>Saturação</span>
                    <span>{filters.saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={filters.saturation}
                    onChange={(e) => setFilter("saturation", Number(e.target.value))}
                    className={sliderCls}
                  />
                </div>
                <div>
                  <div className={sliderLabelCls}>
                    <span>Desfoque</span>
                    <span>{filters.blur}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={8}
                    step={0.5}
                    value={filters.blur}
                    onChange={(e) => setFilter("blur", Number(e.target.value))}
                    className={sliderCls}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={filters.grayscale === 100}
                  onChange={(e) => setFilter("grayscale", e.target.checked ? 100 : 0)}
                  className="h-4 w-4 rounded border-slate-300 accent-navy-700"
                />
                Preto e branco
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setFilters(DEFAULT_FILTERS)
                  setRotation(0)
                  setZoom(1)
                  setCrop({ x: 0, y: 0 })
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Resetar ajustes
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSrc(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={apply}
                  disabled={processing}
                  className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing ? "Aplicando..." : "Aplicar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
