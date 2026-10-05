/**
 * Conteúdo editável institucional do site BARB Estúdio Criativo.
 *
 * Fonte de verdade: copy.md (v3), strategy.md (v2) e visual-direction.md (v4)
 * do pipeline opensquad/website-creator. Toda string de copy aqui é literal —
 * não resumir, não reescrever. Trocar texto é editar este arquivo; nenhum
 * componente deve ter copy hardcoded.
 */

import { getWhatsAppLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/whatsapp";

export type NavItem = {
  label: string;
  href: string;
  /** true quando o link sai do site (WhatsApp) — abre em nova aba. */
  external?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Contato", href: getWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE), external: true },
];

export const BRAND = {
  name: "BARB",
  /** Revision 3: header passa a usar a logo real em vez do texto "BARB". */
  logoAlt: "barb.",
  script: "Estúdio Criativo",
};

export const HERO = {
  /** "barb." sem "Estúdio Criativo" — public/brand/barb-mark-{black,cream}.png. */
  logoAlt: "barb.",
  scriptText: "Estúdio Criativo",
  subtextLine1: "ONDE A CRIATIVIDADE",
  subtextLine2: "ENCONTRA PROPÓSITO",
  photoAlt: "Vanessa Santos Barbosa, fundadora da BARB Estúdio Criativo",
};

export const WHAT_I_DO = {
  label: "O QUE FAÇO",
  body:
    "Toda marca tem uma essência. Meu trabalho é transformá-la em presença, com design, conteúdo e experiências visuais que conectam o que você faz à forma como o mundo percebe você.",
  ctaLabel: "Vamos criar juntos",
  ctaHref: getWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE),
};

export const CONCEPTUAL_STRIP_TEXT =
  "DA ESSÊNCIA À PRESENÇA ● CRIATIVIDADE COM PROPÓSITO ●";

export type Service = {
  index: string;
  slug: string;
  title: string;
  isScript: boolean;
  description: string;
};

/**
 * Revision 4: "Edição de Vídeos" deixa de existir como item isolado —
 * o conceito foi incorporado à descrição de "Social Media" (que também
 * passa a usar fonte script, igual "Website Design"). Novo serviço
 * "Personalizados em Geral" adicionado (cartão de visita, impressos
 * etc.) — copy nova, ajustável, não veio literal da cliente.
 *
 * Revision 5: a Revision 4 deixou "Website Design" e "Social Media" os
 * dois em fonte script, um atrás do outro — a cliente não quer dois
 * itens em script seguidos. Padrão alternado restaurado: normal,
 * script, normal, normal, script, normal. "Social Media" volta para
 * normal/sans (a descrição sobre vídeo continua valendo); "Personalizados
 * em Geral" passa a usar script, fechando o padrão alternado em 2 itens
 * script no total. "Website Design" não muda (script desde a Revision 4).
 */
export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "criacao-e-manutencao-de-marcas",
    title: "CRIAÇÃO E MANUTENÇÃO DE MARCAS",
    isScript: false,
    description:
      "Identidades visuais e desdobramentos que traduzem a essência da sua marca e mantêm sua comunicação consistente em cada ponto de contato.",
  },
  {
    index: "02",
    slug: "website-design",
    title: "Website Design",
    isScript: true,
    description:
      "Websites que unem identidade, clareza e uma experiência intuitiva para apresentar sua marca e facilitar o próximo passo de quem chega até ela.",
  },
  {
    index: "03",
    slug: "social-media",
    title: "Social Media",
    isScript: false,
    description:
      "Planejamento e criação de conteúdo visual — incluindo fotos, vídeos e edição — para construir uma presença coerente, relevante e reconhecível nas redes sociais.",
  },
  {
    index: "04",
    slug: "apresentacoes-profissionais",
    title: "APRESENTAÇÕES PROFISSIONAIS",
    isScript: false,
    description:
      "Apresentações institucionais, comerciais e autorais que organizam ideias e dão força à sua mensagem, com clareza e cuidado visual.",
  },
  {
    index: "05",
    slug: "personalizados-em-geral",
    title: "Personalizados em Geral",
    // Revision 10: a cliente reverteu — script era pra ser só "Website
    // Design". Personalizados volta a ser normal/sans.
    isScript: false,
    description:
      "Cartões de visita, papelaria e materiais impressos que levam a identidade da sua marca para além da tela, com o mesmo cuidado visual de cada projeto.",
  },
  {
    index: "06",
    slug: "storymaker-eventos",
    title: "STORYMAKER EVENTOS",
    isScript: false,
    description:
      "Cobertura criativa em tempo real para manter os stories atualizados durante o seu evento. Registros dos momentos importantes, bastidores e detalhes, com edição ágil e publicação alinhada à identidade da marca — para aproximar quem acompanha e levar a experiência além do presencial.",
  },
];

export const SERVICES_CTA_LABEL = "Conversar sobre este serviço";

/**
 * "Conheça mais de mim" — antes "Trabalhos recentes" (2 cards de
 * projeto). Revision 2: muda de propósito, passa a ser uma seção de
 * transição pessoal (teaser que puxa para "Sobre mim", logo depois).
 * Fundo = 2 fotos da Vanessa full-bleed, split 50/50 (fallback
 * tipográfico enquanto as fotos reais não chegam). Copy sobreposta usa
 * o mesmo texto de ABOUT.label ("POR TRÁS DA BARB"). O link para
 * /portfolio permanece, discreto, para não perder a rota de descoberta
 * do portfólio completo a partir da home.
 */
export const MEET_ME = {
  sectionLabel: "Conheça mais de mim",
  // Revision 6 tinha trocado "BARB" pela logo real; Revision 7 reverte
  // a pedido da cliente — volta a ser texto tipográfico mesmo.
  teaserText: "POR TRÁS DA BARB",
  photoAlt: "Vanessa Santos Barbosa — bastidores de trabalho",
  ctaLabel: "Ver portfólio completo",
  ctaHref: "/portfolio",
};

/**
 * Revision 4: nova seção "Portfólio" na home, entre Serviços e
 * "Conheça mais de mim" — primeiro material real de portfólio da
 * cliente (16 projetos). 3 blocos, um por categoria que já tem
 * material (Personalizados em Geral é um serviço novo, ainda sem
 * exemplos). Cada bloco mostra 3 projetos (ordem alfabética, já que a
 * cliente ainda não definiu destaque) + link para /portfolio filtrado
 * pela categoria. `category` aqui precisa bater com `Project.category`
 * em content/projects.ts (usado também como valor do query param
 * ?categoria= já existente em /portfolio).
 *
 * Revision 5: a cliente pediu para a prévia da home mostrar só o bloco
 * de Marcas (Social Media e Apresentações continuam existindo
 * normalmente em /portfolio, só saem desta prévia). Ordem dos 3
 * projetos deixa de ser alfabética e passa a ser a ordem explícita
 * pedida pela cliente — Nathan Oliveira, Vitória Nalevaiko, Nayara
 * Rocha (marca) — porque as capas de Nathan Oliveira e Nayara Rocha são
 * mais escuras/pretas e a de Vitória Nalevaiko (mais clara) fica no
 * meio para separar visualmente as duas mais escuras.
 */
export type PortfolioPreviewBlock = {
  title: string;
  category: string;
  projectSlugs: string[];
};

export const PORTFOLIO_PREVIEW_SECTION = {
  label: "Portfólio",
  moreLabel: "Ver mais projetos",
};

export const PORTFOLIO_PREVIEW_BLOCKS: PortfolioPreviewBlock[] = [
  {
    title: "Marcas",
    category: "marcas",
    // Revision 10: ordem pedida pela cliente — Vitória no meio para
    // separar as capas mais escuras (Fetcherz e Nayara Rocha).
    projectSlugs: ["fetcherz", "vitoria-nalevaiko", "nayara-rocha-marca"],
  },
  {
    title: "Social Media",
    category: "social",
    // Revision 10: ordem pedida pela cliente.
    projectSlugs: ["iam", "growth-solutions", "lacos-unidos"],
  },
  {
    title: "Apresentações",
    category: "apresentacoes",
    projectSlugs: ["amanda-ferraz", "anne-galante", "coritiba-futsal"],
  },
];

/**
 * Revision 5: `/portfolio` passa a agrupar os projetos por categoria em
 * blocos (Marcas / Social Media / Apresentações), cada um com um CTA de
 * contato ao final — rótulo de exibição de cada `Project.category`.
 */
export const PORTFOLIO_CATEGORY_LABELS: Record<string, string> = {
  marcas: "Marcas",
  social: "Social Media",
  apresentacoes: "Apresentações",
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
  isPlaceholder: boolean;
  publishable: boolean;
};

export const TESTIMONIALS_SECTION = {
  label: "DEPOIMENTOS",
  title: "CRIATIVIDADE QUE DEIXA MARCA.",
  support:
    "Cada projeto é uma troca. Cada entrega, uma história construída em conjunto.",
  placeholderNotice: "Exemplo fictício para visualização do layout.",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "A apresentação ganhou clareza, personalidade e um cuidado visual que fez toda a diferença na forma de contar nossa história.",
    author: "Cliente exemplo 01",
    context: "Apresentações profissionais",
    isPlaceholder: true,
    publishable: false,
  },
  {
    id: "t2",
    quote:
      "O trabalho trouxe unidade à comunicação e traduziu a essência da marca em cada detalhe.",
    author: "Cliente exemplo 02",
    context: "Design e social media",
    isPlaceholder: true,
    publishable: false,
  },
];

/**
 * Faixa fina "por trás da barb", em loop (ver ABOUT_STRIP_TEXT) — mesma
 * frase do label acima, reaproveitada como marquee decorativo entre a
 * seção "Conheça mais de mim" e o bloco de texto "Sobre mim" abaixo.
 */
export const ABOUT_STRIP_TEXT = "POR TRÁS DA BARB ●";

export const ABOUT = {
  label: "POR TRÁS DA BARB",
  title: "UM OLHAR CURIOSO. MUITAS FORMAS DE CRIAR.",
  paragraphs: [
    "Sou Vanessa Santos Barbosa, designer e a mente criativa por trás da BARB. Há 10 anos, construo uma trajetória entre o design, a comunicação e o universo digital — conectando ideias, pessoas e marcas por meio do olhar criativo.",
    "Minha experiência atravessa educação, saúde, moda, bem-estar, esporte e negócios de diferentes segmentos, no Brasil e em projetos para o mercado norte-americano. Entre identidades visuais, campanhas, websites, conteúdos, apresentações e cobertura de eventos, aprendi que cada marca pede uma escuta diferente — e que o bom design começa muito antes de abrir um arquivo.",
    "Sou formada em Publicidade e Propaganda, com pós-graduação em Mídias Digitais. Uma temporada de estudos e trabalho na Austrália ampliou meu repertório e minha maneira de enxergar o mundo. Hoje, reúno essas experiências na BARB: um espaço onde sensibilidade e intenção dão forma a uma presença que faz sentido para cada marca.",
  ],
  signatureName: "Vanessa Santos Barbosa",
  signatureRole: "Designer e fundadora",
  ctaLabel: "Vamos conversar",
  ctaHref: getWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE),
  photoAlt: "Vanessa Santos Barbosa em seu ambiente de trabalho criativo.",};

/**
 * Revision 2: o formulário (nome/telefone, validação, /api/contact) foi
 * removido por completo. No lugar, um CTA forte que leva direto ao
 * WhatsApp — sem campos.
 */
export const CONTACT = {
  title: "VAMOS DAR FORMA À SUA PRÓXIMA IDEIA?",
  body: "Me conte por onde começamos. Vamos conversar pelo WhatsApp sobre o seu projeto.",
  ctaLabel: "Falar no WhatsApp",
  ctaHref: getWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE),
};

/**
 * Revision 2: rodapé em 3 colunas (nav / logo / frase de impacto). A
 * logo usada aqui é a versão "barb." sem "Estúdio Criativo" — por isso
 * não há mais campo `script` para renderizar.
 */
export const FOOTER = {
  logoAlt: "barb.",
  tagline:
    "Da essência à presença. Design e comunicação com criatividade e propósito.",
  creditPrefix: "©",
  creditSuffix: "BARB Estúdio Criativo.",
};

export const MICROCOPY = {
  skipLink: "Pular para o conteúdo",
  menuOpen: "Abrir menu",
  menuClose: "Fechar menu",
  lightboxClose: "Fechar",
  lightboxPrev: "Imagem anterior",
  lightboxNext: "Próxima imagem",
  videoPlay: "Reproduzir vídeo",
  provisionalBadge: "Conteúdo provisório",
  backToPortfolio: "← Voltar ao portfólio",
  nextProject: "Próximo projeto",
  myParticipation: "Minha participação",
  finalCtaLabel: "Vamos criar algo para sua marca?",
};

export const PORTFOLIO_PAGE = {
  title: "Portfólio — BARB Estúdio Criativo",
  subtitle:
    "Trabalhos que traduzem a essência de cada marca em presença visual.",
  filterLabel: "Filtrar por categoria",
  filterAllLabel: "Todos",
  emptyState: "Novos trabalhos em breve.",
};

export const SEO = {
  home: {
    title: "BARB Estúdio Criativo | Design, Websites e Social Media",
    description:
      "Design com propósito para marcas que querem construir presença. Identidade visual, websites, social media, vídeos, apresentações e storiemaker para eventos com Vanessa Santos Barbosa.",
  },
  portfolio: {
    title: "Portfólio | BARB Estúdio Criativo",
    description:
      "Trabalhos de identidade visual, websites, social media e vídeo assinados por Vanessa Santos Barbosa, fundadora da BARB Estúdio Criativo.",
  },
};
