import type { ReactNode } from "react"

// Parser do subconjunto de formatação usado no admin: **negrito** e
// *itálico* (e ***ambos***). Retorna elementos React — nunca innerHTML,
// então não há superfície de XSS: o texto passa pelo escaping normal do
// React. Quebras de linha são preservadas como texto (os containers usam
// whitespace-pre-line).
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /\*\*\*([^*]+)\*\*\*|\*\*(.+?)\*\*|\*([^*]+?)\*/g
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++}>
          <em>{match[1]}</em>
        </strong>
      )
    } else if (match[2] !== undefined) {
      // Recursão permite itálico dentro de negrito.
      nodes.push(<strong key={key++}>{renderInline(match[2])}</strong>)
    } else {
      nodes.push(<em key={key++}>{match[3]}</em>)
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
  return text.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
}
