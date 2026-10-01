import type { SiteContent } from "@/types"

export const defaultContent: SiteContent = {
  id: 0,
  hero_title: "Pesquisa acadêmica em Direito, Tecnologia e Proteção do Consumidor.",
  hero_subtitle:
    "Investigação rigorosa sobre os impactos da tecnologia nas relações de consumo, proteção de dados e direitos fundamentais. Publicações em revistas especializadas e participação em grupos de pesquisa.",
  hero_cta_text: "Ver pesquisas",
  hero_cta_link: "#artigos",
  about_title: "Sobre o pesquisador",
  about_bio:
    "Advogado e pesquisador com formação em Direito Civil e especialização em Direito Digital e Proteção de Dados. Atuo na interseção entre Direito e Tecnologia, investigando como as inovações tecnológicas impactam as relações de consumo, a privacidade e os direitos fundamentais. Minhas pesquisas buscam contribuir para o desenvolvimento de um marco regulatório mais justo e equilibrado no ambiente digital.",
  about_photo_url: "/foto.png",
  about_highlights: [
    "Publicações em revistas especializadas",
    "Pesquisa em Direito Digital e LGPD",
    "Participação em grupos de pesquisa",
  ],
  practice_title: "Áreas de Pesquisa",
  practice_subtitle:
    "Linhas de investigação que conectam Direito, Tecnologia e Sociedade.",
  practice_areas: [
    {
      id: 1,
      icon: "shield",
      title: "Proteção de Dados e LGPD",
      description:
        "Investigação sobre a aplicação da Lei Geral de Proteção de Dados, consentimento, perfilamento e os direitos dos titulares no ambiente digital.",
      order: 1,
      active: true,
    },
    {
      id: 2,
      icon: "shopping-bag",
      title: "Direito do Consumidor Digital",
      description:
        "Análise das relações de consumo em plataformas digitais, práticas abusivas, publicidade direcionada e a proteção do consumidor vulnerável.",
      order: 2,
      active: true,
    },
    {
      id: 3,
      icon: "laptop-code",
      title: "Direito e Tecnologia",
      description:
        "Estudos sobre regulação de inteligência artificial, responsabilidade civil de plataformas, comércio eletrônico e novos modelos de negócio digitais.",
      order: 3,
      active: true,
    },
    {
      id: 4,
      icon: "scale",
      title: "Direitos Fundamentais",
      description:
        "Pesquisa sobre autonomia, liberdade de escolha, assimetria informacional e a proteção de direitos fundamentais frente a sistemas preditivos.",
      order: 4,
      active: true,
    },
  ],
  differentials_title: "Diferenciais",
  differentials: [],
  articles_title: "Publicações e Pesquisas",
  // Sem fallback: artigos vêm exclusivamente do banco. A lista padrão é vazia
  // para que nenhuma pesquisa inventada apareça no site.
  articles: [],
  faq_title: "",
  faq_items: [],
  footer_name: "Ruan Teodoro",
  footer_oab: "OAB/PR 133807",
  footer_address: "Pesquisa acadêmica em Direito e Tecnologia",
  footer_phone: "",
  footer_email: "contato@ruanteodoro.adv.br",
  footer_whatsapp: "",
  footer_privacy_url: "/termos-e-privacidade",
  footer_terms_url: "/termos-e-privacidade",
  footer_copyright:
    "© 2026 Ruan Teodoro. Todos os direitos reservados.",
  whatsapp_number: "",
  email: "contato@ruanteodoro.adv.br",
  phone: "",
  header_links: [
    { label: "Pesquisas", href: "#areas", order: 1 },
    { label: "Sobre", href: "#sobre", order: 2 },
    { label: "Artigos", href: "#artigos", order: 3 },
  ],
  section_order: ["areas", "sobre", "artigos"],
  section_animations: {
    areas: "fade-up",
    sobre: "none",
    artigos: "fade-up",
  },
  disable_animations: false,
  meta_title: "Ruan Teodoro | Pesquisa em Direito e Tecnologia",
  meta_description:
    "Pesquisa acadêmica em Direito Digital, Proteção de Dados e Direito do Consumidor. Publicações sobre LGPD, perfilamento, publicidade direcionada e direitos fundamentais no ambiente digital.",
  og_image: "/banner.png",
  updated_at: new Date().toISOString(),
}
