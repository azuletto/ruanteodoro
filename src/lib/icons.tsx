import {
  Eye,
  Globe,
  HandCoins,
  Handshake,
  Laptop,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Zap,
  type LucideIcon,
} from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  "hand-holding-usd": HandCoins,
  scale: Scale,
  "laptop-code": Laptop,
  handshake: Handshake,
  zap: Zap,
  eye: Eye,
  globe: Globe,
  shield: ShieldCheck,
}

export const AVAILABLE_ICONS = Object.keys(ICONS)

export function SiteIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = ICONS[name] ?? ShieldCheck
  return <Icon className={className} aria-hidden />
}
