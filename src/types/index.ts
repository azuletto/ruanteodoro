export interface SiteContent {
  id: number
  hero_title: string
  hero_subtitle: string
  hero_cta_text: string
  hero_cta_link: string

  about_title: string
  about_bio: string
  about_photo_url: string
  about_highlights: string[]

  practice_title: string
  practice_subtitle: string
  practice_areas: PracticeArea[]

  articles_title: string
  articles: Article[]

  footer_name: string
  footer_oab: string
  footer_email: string
  footer_privacy_url: string
  footer_terms_url: string

  header_links: HeaderLink[]
  section_order: string[]
  section_animations: Record<string, string>
  disable_animations: boolean
  meta_title: string
  meta_description: string
  og_image: string

  updated_at: string
}

export interface PracticeArea {
  id: number
  icon: string
  title: string
  description: string
  order: number
  active: boolean
}

export interface Article {
  id: number
  title: string
  summary: string
  content: string
  image_url: string | null
  image_fit: string
  link_url: string | null
  reference: string
  citation: string | null
  published_in: string | null
  year: number | null
  article_order: number
  active: boolean
}

export type ArticleImageFit = "cover-center" | "cover-top" | "cover-bottom" | "contain"

export interface HeaderLink {
  label: string
  href: string
  order: number
}

export interface TermsSection {
  id?: number
  title: string
  content: string
  section_order: number
  updated_at?: string
}
