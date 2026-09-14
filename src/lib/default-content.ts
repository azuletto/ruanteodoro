import type { SiteContent } from "@/types"

export const defaultContent: SiteContent = {
  id: 0,
  hero_title: "Seu problema tem solução. E eu encontro o caminho jurídico para resolver.",
  hero_subtitle:
    "Consumidor lesado, benefício negado, contrato abusivo ou fraude digital? Resolvemos com estratégia e confiança.",
  hero_cta_text: "Fale direto com o advogado",
  hero_cta_link:
    "https://wa.me/554396509772?text=Ol%C3%A1%20Sr.%20Ruan%2C%20preciso%20de%20ajuda%20com%20um%20problema%20jur%C3%ADdico.",
  about_title: "Quem está do seu lado",
  about_bio:
    "Cada causa recebe acompanhamento próximo do início ao fim, com atenção integral a todos os detalhes do caso. Minha formação une o Direito Civil tradicional à realidade de hoje, incluindo tecnologia e proteção ao consumidor. Isso me ajuda a entender desde um contrato simples até problemas com golpes digitais, buscando sempre o melhor caminho para cada situação.",
  about_photo_url: "/foto.png",
  about_highlights: [
    "Resposta em até 24h, sem intermediários",
    "Honorários transparentes desde o primeiro contato",
    "Estratégia explicada em linguagem que você entende",
  ],
  practice_title: "Principais Áreas de Atuação",
  practice_subtitle:
    "Cada área exige um olhar específico. Aqui, você encontra profundidade técnica e resultado prático.",
  practice_areas: [
    {
      id: 1,
      icon: "shopping-bag",
      title: "Direito do Consumidor",
      description:
        "Nome sujo indevidamente? Produto com defeito que a loja não resolve? Cobrança que você nunca fez? Busco reverter a situação e a indenização que você merece.",
      order: 1,
      active: true,
    },
    {
      id: 2,
      icon: "hand-holding-usd",
      title: "Direito Previdenciário",
      description:
        "INSS negou sua aposentadoria? Benefício cortado sem explicação? BPC/LOAS indeferido? Recupero seu direito e os atrasados que o governo deve a você.",
      order: 2,
      active: true,
    },
    {
      id: 3,
      icon: "scale",
      title: "Direito Civil",
      description:
        "Contrato que virou pesadelo? Disputa por herança ou imóvel? Dano moral ou material? Negocio, faço mediação e, se necessário, levo até o juiz com estratégia clara.",
      order: 3,
      active: true,
    },
    {
      id: 4,
      icon: "laptop-code",
      title: "Direito Digital",
      description:
        "Conta hackeada? PIX fraudado? Dados vazados? Golpe em marketplace? Atuo rápido para bloquear danos, rastrear responsáveis e reaver o que foi perdido.",
      order: 4,
      active: true,
    },
  ],
  differentials_title: "Por que me escolher",
  differentials: [
    {
      id: 1,
      icon: "handshake",
      title: "Você fala com o advogado",
      description:
        "Atendimento direto e personalizado. Você conversa com quem realmente entende do seu caso, sem intermediários desnecessários.",
      order: 1,
      active: true,
    },
    {
      id: 2,
      icon: "zap",
      title: "Ação rápida, não burocracia",
      description:
        "Agilidade para resolver o que importa. Foco no resultado prático, sem enrolação ou processos desnecessários.",
      order: 2,
      active: true,
    },
    {
      id: 3,
      icon: "eye",
      title: "Você sabe exatamente o que está acontecendo",
      description:
        "Cada petição, cada decisão, cada prazo. Você recebe atualização direta, sem precisar cobrar informação.",
      order: 3,
      active: true,
    },
    {
      id: 4,
      icon: "globe",
      title: "100% digital quando você precisa",
      description:
        "Atendo de qualquer lugar do Brasil por videochamada, WhatsApp e assinatura eletrônica. Zero deslocamento.",
      order: 4,
      active: true,
    },
  ],
  faq_title: "Perguntas Frequentes",
  faq_items: [
    {
      id: 1,
      question: "Quanto custa a primeira consulta?",
      answer:
        "A análise inicial é gratuita e dura cerca de 30 minutos. Nela, eu avalio se seu caso tem fundamento, explico os caminhos possíveis e apresento os honorários sem surpresas. Se não for viável, eu digo na hora, sem enrolar.",
      order: 1,
      active: true,
    },
    {
      id: 2,
      question: "Posso resolver tudo sem sair de casa?",
      answer:
        "Sim. Reuniões por videochamada, documentos enviados por WhatsApp, contratos assinados digitalmente e acompanhamento do processo em tempo real pelo celular. A maioria dos meus clientes nunca pisou no escritório e não precisou.",
      order: 2,
      active: true,
    },
    {
      id: 3,
      question: "E se eu perder a causa?",
      answer:
        "Antes de aceitar qualquer caso, eu faço uma análise honesta das chances reais. Se o risco for alto demais, eu aviso e sugiro alternativas. Quando aceito, é porque acredito na viabilidade. Os honorários são combinados de forma justa, inclusive com possibilidade de pagamento no êxito em certos casos.",
      order: 3,
      active: true,
    },
  ],
  footer_name: "Ruan Teodoro Advocacia",
  footer_oab: "OAB/PR 133807",
  footer_address: "Atendimento 100% online.",
  footer_phone: "+55 43 9650-9772",
  footer_email: "contato@ruanteodoro.adv.br",
  footer_whatsapp: "554396509772",
  footer_privacy_url: "/termos-e-privacidade",
  footer_terms_url: "/termos-e-privacidade",
  footer_copyright:
    "© 2026 Ruan Teodoro Advocacia. Todos os direitos reservados.",
  whatsapp_number: "554396509772",
  email: "contato@ruanteodoro.adv.br",
  phone: "+55 43 9650-9772",
  header_links: [
    { label: "Atuação", href: "#areas", order: 1 },
    { label: "Sobre", href: "#sobre", order: 2 },
    { label: "Contato", href: "#contato", order: 3 },
  ],
  section_order: ["areas", "sobre", "diferenciais", "faq"],
  section_animations: {
    areas: "fade-up",
    sobre: "none",
    diferenciais: "fade-up",
    faq: "fade-up",
  },
  disable_animations: false,
  meta_title: "Ruan Teodoro | Advocacia que resolve",
  meta_description:
    "Advogado especialista em Direito do Consumidor, Previdenciário, Civil e Digital. Resolvo seu problema com estratégia e sem enrolação. Atendimento 100% online.",
  og_image: "/banner.png",
  updated_at: new Date().toISOString(),
}
