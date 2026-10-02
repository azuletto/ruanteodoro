import type { ReactNode } from "react"

// Parser do subconjunto de formatação usado no admin:
//   **negrito**  → <strong>
//   _itálico_    → <em>
// Retorna elementos React — nunca innerHTML, então não há superfície de XSS.
// Quebras de linha são preservadas como texto (os containers usam
// whitespace-pre-line).
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Ordem importa: negrito primeiro (dois asteriscos), depois itálico (underscore).
  const regex = /\*\*(.+?)\*\*|_([^_]+?)_/g
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      // Negrito — recursão permite itálico dentro de negrito.
      nodes.push(<strong key={key++}>{renderInline(match[1])}</strong>)
    } else if (match[2] !== undefined) {
      // Itálico
      nodes.push(<em key={key++}>{match[2]}</em>)
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

// Remove os marcadores para contextos de texto puro (meta tags).
export function stripRichMarkers(text: string): string {
  return text.replace(/\*{2}([^*]+)\*{2}|_([^_]+)_/g, (_m, bold, italic) => bold ?? italic ?? "")
}
