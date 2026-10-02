import type { SiteContent } from "@/types"

export const defaultContent: SiteContent = {
  id: 0,
  hero_title: "Direito, Tecnologia e Sociedade: pesquisa para um ambiente digital mais justo.",
  hero_subtitle:
    "Investigação acadêmica rigorosa sobre proteção de dados, relações de consumo e direitos fundamentais na era digital. Publicações em periódicos especializados e participação ativa em grupos de pesquisa.",
  hero_cta_text: "Conhecer as pesquisas",
  hero_cta_link: "#artigos",
  about_title: "Sobre o pesquisador",
  about_bio:
    "Advogado e pesquisador com formação em Direito Civil e especialização em Direito Digital e Proteção de Dados. Minha atuação concentra-se na interseção entre Direito e Tecnologia, investigando como as inovações tecnológicas remodelam as relações de consumo, a privacidade e os direitos fundamentais.\n\nAs pesquisas que desenvolvo buscam contribuir para a construção de um marco regulatório mais equilibrado no ambiente digital, conciliando inovação tecnológica com a proteção efetiva dos direitos dos cidadãos.",
  about_photo_url: "/foto.png",
  about_highlights: [
    "Publicações em periódicos acadêmicos especializados",
    "Pesquisa em Direito Digital, LGPD e Proteção de Dados",
    "Membro de grupos de pesquisa em Direito e Tecnologia",
  ],
  practice_title: "Linhas de Pesquisa",
  practice_subtitle:
    "Áreas de investigação que conectam Direito, Tecnologia e Sociedade.",
  practice_areas: [
    {
      id: 1,
      icon: "shield",
      title: "Proteção de Dados e LGPD",
      description:
        "Aplicação da Lei Geral de Proteção de Dados, validade do consentimento, perfilamento de usuários e efetividade dos direitos dos titulares no ambiente digital.",
      order: 1,
      active: true,
    },
    {
      id: 2,
      icon: "shopping-bag",
      title: "Direito do Consumidor Digital",
      description:
        "Relações de consumo em plataformas digitais, práticas comerciais abusivas, publicidade direcionada por algoritmos e proteção do consumidor em posição de vulnerabilidade.",
      order: 2,
      active: true,
    },
    {
      id: 3,
      icon: "laptop-code",
      title: "Regulação de Tecnologias Emergentes",
      description:
        "Inteligência artificial, responsabilidade civil de plataformas digitais, comércio eletrônico e os desafios regulatórios dos novos modelos de negócio.",
      order: 3,
      active: true,
    },
    {
      id: 4,
      icon: "scale",
      title: "Direitos Fundamentais e Autonomia",
      description:
        "Autonomia da vontade, liberdade de escolha, assimetria informacional e a proteção de direitos fundamentais frente a sistemas preditivos e de perfilamento.",
      order: 4,
      active: true,
    },
  ],
  articles_title: "Publicações e Pesquisas",
  // Sem fallback: artigos vêm exclusivamente do banco. A lista padrão é vazia
  // para que nenhuma pesquisa inventada apareça no site.
  articles: [],
  footer_name: "Ruan Teodoro",
  footer_oab: "OAB/PR 133807",
  footer_email: "contato@ruanteodoro.adv.br",
  footer_privacy_url: "/termos-e-privacidade",
  footer_terms_url: "/termos-e-privacidade",
  header_links: [
    { label: "Pesquisas", href: "#areas", order: 1 },
    { label: "Sobre", href: "#sobre", order: 2 },
    { label: "Publicações", href: "#artigos", order: 3 },
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
