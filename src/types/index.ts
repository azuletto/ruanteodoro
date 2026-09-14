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

  differentials_title: string
  differentials: Differential[]

  faq_title: string
  faq_items: FaqItem[]

  footer_name: string
  footer_oab: string
  footer_address: string
  footer_phone: string
  footer_email: string
  footer_whatsapp: string
  footer_privacy_url: string
  footer_terms_url: string
  footer_copyright: string

  whatsapp_number: string
  email: string
  phone: string

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

export interface Differential {
  id: number
  icon: string
  title: string
  description: string
  order: number
  active: boolean
}

export interface FaqItem {
  id: number
  question: string
  answer: string
  order: number
  active: boolean
}

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
