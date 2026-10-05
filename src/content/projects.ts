/**
 * Projetos de portfólio.
 *
 * Revision 4: primeira entrega de material real de portfólio da
 * cliente — os 2 placeholders ("Projeto 01"/"Projeto 02") foram
 * substituídos pelos 16 projetos reais abaixo. Caminhos e dimensões de
 * imagem vêm literalmente de
 * `output/2026-10-04-163957/v9/portfolio-manifest.json` (81 arquivos
 * já convertidos para .webp e já salvos em `public/projects/{slug}/`)
 * — nenhuma imagem foi reprocessada ou movida nesta rodada.
 *
 * O que não foi fornecido pela cliente (objetivo de cada projeto,
 * briefing, resultado/métrica) fica deliberadamente fora do dado —
 * nunca preenchido por suposição. `summary` é sempre curto e genérico
 * (identidade/grade/apresentação + nome do cliente), só citando tema
 * ou contexto quando isso veio explicitamente do briefing da revisão
 * (ex.: Festival Agulhas Ativar, parceria com o Estúdio LOOPALHAMA, exclusão
 * da página de orçamento da SpeakUp).
 */

export type MediaType = "image" | "video" | "carousel";

export type ProjectMedia = {
  id: string;
  type: MediaType;
  src?: string;
  poster?: string;
  alt: string;
  width?: number;
  height?: number;
  order: number;
  isPlaceholder: boolean;
  /**
   * Revision 10: itens de um mesmo carrossel (ex. Laços Unidos) compartilham
   * o mesmo `carouselGroup` — a vitrine de Social Media (SocialShowcase)
   * agrupa esses itens num único tile com navegação interna, em vez de um
   * tile por frame.
   */
  carouselGroup?: string;
};

export type Participation =
  | "criação autoral"
  | "criação autoral em parceria com o Estúdio LOOPALHAMA"
  | "adaptação de identidade"
  | "diagramação"
  | "edição"
  | "a definir";

export type ProjectCover = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  /** Categoria real, só atribuída quando o cliente confirmar. Vazio -> filtro oculto. */
  category?: string;
  summary: string;
  participation: Participation;
  cover?: ProjectCover;
  gallery: ProjectMedia[];
  order: number;
  isPlaceholder: boolean;
};

/** Um item de mídia já processado (ver portfolio-manifest.json). */
type MediaSpec = { file: string; width: number; height: number };

/**
 * Monta a galeria de um projeto real a partir do manifesto, gerando um
 * `alt` descritivo por imagem via `altForIndex` (nunca genérico tipo
 * "imagem 1" — ver regra dura do revision-4-brief.md).
 */
function buildGallery(
  slugPrefix: string,
  media: MediaSpec[],
  altForIndex: (index: number, total: number) => string
): ProjectMedia[] {
  return media.map((item, index) => ({
    id: `${slugPrefix}-g${index + 1}`,
    type: "image",
    src: item.file,
    alt: altForIndex(index + 1, media.length),
    width: item.width,
    height: item.height,
    order: index + 1,
    isPlaceholder: false,
  }));
}

/**
 * Revision 10: Social Media ganhou peças reais com tipos mistos (imagem
 * solta, vídeo com poster, frames de carrossel) — `buildGallery` só lida
 * com imagem simples. Cada item aqui já declara seu próprio `type`,
 * `src`/`poster` e `carouselGroup` quando aplicável; `altForIndex` recebe
 * o item inteiro para poder descrever vídeo/carrossel de forma diferente
 * de uma imagem solta.
 */
type MixedMediaSpec = {
  type: MediaType;
  file?: string;
  src?: string;
  poster?: string;
  width: number;
  height: number;
  carouselGroup?: string;
};

function buildMixedGallery(
  slugPrefix: string,
  media: MixedMediaSpec[],
  altFor: (item: MixedMediaSpec, index: number, total: number) => string
): ProjectMedia[] {
  return media.map((item, index) => ({
    id: `${slugPrefix}-g${index + 1}`,
    type: item.type,
    src: item.type === "video" ? item.src : item.file,
    poster: item.poster,
    alt: altFor(item, index + 1, media.length),
    width: item.width,
    height: item.height,
    order: index + 1,
    isPlaceholder: false,
    carouselGroup: item.carouselGroup,
  }));
}

function coverFromGallery(gallery: ProjectMedia[]): ProjectCover | undefined {
  const first = gallery[0];
  if (!first || !first.src || !first.width || !first.height) return undefined;
  return { src: first.src, alt: first.alt, width: first.width, height: first.height };
}

/* ---------- Categoria: Marcas (participação: criação autoral) ---------- */

const fetcherzGallery = buildGallery(
  "fetcherz",
  [
    { file: "/projects/fetcherz/img-01.webp", width: 1774, height: 887 },
    { file: "/projects/fetcherz/img-02.webp", width: 1491, height: 1055 },
    { file: "/projects/fetcherz/img-03.webp", width: 1774, height: 887 },
  ],
  (i) => `Identidade visual Fetcherz — aplicação ${i}`
);

const germantownGallery = buildGallery(
  "germantown",
  [
    { file: "/projects/germantown/img-01.webp", width: 1513, height: 1040 },
    { file: "/projects/germantown/img-02.webp", width: 1513, height: 1040 },
    { file: "/projects/germantown/img-03.webp", width: 1789, height: 879 },
  ],
  (i) => `Identidade visual Germantown — aplicação ${i}`
);

const lahennGallery = buildGallery(
  "lahenn",
  [
    { file: "/projects/lahenn/img-01.webp", width: 1536, height: 1024 },
    { file: "/projects/lahenn/img-02.webp", width: 1774, height: 887 },
    { file: "/projects/lahenn/img-03.webp", width: 1536, height: 1024 },
    { file: "/projects/lahenn/img-04.webp", width: 1536, height: 1024 },
  ],
  (i) => `Identidade visual Lahenn — aplicação ${i}`
);

const nathanOliveiraGallery = buildGallery(
  "nathan-oliveira",
  [
    { file: "/projects/nathan-oliveira/img-01.webp", width: 1672, height: 941 },
    { file: "/projects/nathan-oliveira/img-02.webp", width: 1536, height: 1024 },
    { file: "/projects/nathan-oliveira/img-03.webp", width: 1681, height: 936 },
  ],
  (i) => `Identidade visual Nathan Oliveira — aplicação ${i}`
);

const nayaraRochaMarcaGallery = buildGallery(
  "nayara-rocha-marca",
  [
    { file: "/projects/nayara-rocha-marca/img-01.webp", width: 1536, height: 1024 },
    { file: "/projects/nayara-rocha-marca/img-02.webp", width: 1536, height: 1024 },
    { file: "/projects/nayara-rocha-marca/img-03.webp", width: 1536, height: 1024 },
  ],
  (i) => `Identidade visual da barbearia Nayara Rocha — aplicação ${i}`
);

const vitoriaNalevaikoGallery = buildGallery(
  "vitoria-nalevaiko",
  [
    { file: "/projects/vitoria-nalevaiko/img-01.webp", width: 1374, height: 1145 },
    { file: "/projects/vitoria-nalevaiko/img-02.webp", width: 1874, height: 839 },
    { file: "/projects/vitoria-nalevaiko/img-03.webp", width: 1536, height: 1024 },
    { file: "/projects/vitoria-nalevaiko/img-04.webp", width: 1874, height: 839 },
  ],
  (i) => `Identidade visual Vitória Nalevaiko — aplicação ${i}`
);

/* ---------- Categoria: Social Media (participação: criação autoral) ----------
 * Revision 10: peças reais da pasta AVULSAS/AVULSOS de cada cliente
 * (antes, cada projeto tinha só a grade composta como 1 imagem única).
 *
 * Revision 12: a cliente mandou de volta as grades originais compostas
 * (1 PNG/PDF só, com todas as peças já montadas em grid) como
 * referência de ORDEM — cada peça avulsa precisa aparecer na vitrine
 * na mesma posição em que aparece nessa grade de referência, célula a
 * célula (conferido visualmente, imagem por imagem, nenhuma ordem foi
 * assumida por nome de arquivo). A capa ("CAPA VITRINE") também é uma
 * célula da grade — não fica de fora, entra na posição que ocupa na
 * referência (varia por projeto: é a 1ª peça para Gilberto, mas a 4ª
 * para Growth, a 7ª pra IAM, a 5ª pra Laços, a última pra MJ). Nayara
 * Rocha (social) não tinha CAPA VITRINE própria — segue só com as 9
 * peças soltas, já na ordem 1-9 da grade de referência.
 */

const gilbertoTesserGallery = buildMixedGallery(
  "gilberto-tesser",
  [
    { type: "image" as const, file: "/projects/gilberto-tesser/vitrine.webp", width: 508, height: 508 },
    ...[2, 3, 4, 5, 6].map((n) => ({
      type: "image" as const,
      file: `/projects/gilberto-tesser/gilberto-0${n}.webp`,
      width: 507,
      height: 508,
    })),
  ],
  (_item, i) => `Retrato médico com tipografia editorial — Gilberto Tesser, peça ${i}`
);

const growthSolutionsGallery = buildMixedGallery(
  "growth-solutions",
  [
    { type: "image" as const, file: "/projects/growth-solutions/growth-01-1080x1350.webp", width: 1080, height: 1350 },
    { type: "video" as const, src: "/projects/growth-solutions/video-1.mp4", poster: "/projects/growth-solutions/video-1-poster.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-03-1080x1350.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/vitrine.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-05-1080x1350.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-06-1080x1350.webp", width: 1080, height: 1350 },
    { type: "video" as const, src: "/projects/growth-solutions/video-2.mp4", poster: "/projects/growth-solutions/video-2-poster.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-08-1080x1350.webp", width: 1080, height: 1350 },
    { type: "video" as const, src: "/projects/growth-solutions/video-3.mp4", poster: "/projects/growth-solutions/video-3-poster.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-10-1080x1350.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-11-1080x1350.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/growth-solutions/growth-12-1080x1350.webp", width: 1080, height: 1350 },
  ],
  (item, i) =>
    item.type === "video"
      ? `Vídeo de social media — Growth Solutions, peça ${i}`
      : `Social media — Growth Solutions, peça ${i}`
);

const iamGallery = buildMixedGallery(
  "iam",
  [
    { type: "image" as const, file: "/projects/iam/art-06.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-07.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-08.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-05.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-04.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-03.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/vitrine.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-02.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-01.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-11.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-10.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/iam/art-09.webp", width: 1080, height: 1350 },
  ],
  (_item, i) => `Social media — IAM&Co., peça ${i}`
);

const lacosUnidosGallery = buildMixedGallery(
  "lacos-unidos",
  [
    ...[1, 2, 3, 4, 5].map((n) => ({
      type: "carousel" as const,
      carouselGroup: "carrossel-1",
      file: `/projects/lacos-unidos/carrossel-1-${String(n).padStart(2, "0")}.webp`,
      width: 1080,
      height: 1350,
    })),
    { type: "image" as const, file: "/projects/lacos-unidos/02-voce-sabia-png.webp", width: 1080, height: 1350 },
    ...[1, 2, 3].map((n) => ({
      type: "carousel" as const,
      carouselGroup: "carrossel-2",
      file: `/projects/lacos-unidos/carrossel-2-${String(n).padStart(2, "0")}.webp`,
      width: 1080,
      height: 1350,
    })),
    { type: "image" as const, file: "/projects/lacos-unidos/03-complete-a-frase-png.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/lacos-unidos/vitrine.webp", width: 1080, height: 1350 },
    { type: "image" as const, file: "/projects/lacos-unidos/quadradinhos-que-aquecem-png.webp", width: 1092, height: 1440 },
  ],
  (item, i) =>
    item.carouselGroup
      ? `Carrossel de social media — Laços Unidos (${item.carouselGroup}), frame ${i}`
      : `Social media — Laços Unidos, peça ${i}`
);

const mjGallery = buildMixedGallery(
  "mj",
  [
    ...Array.from({ length: 8 }, (_, i) => ({
      type: "image" as const,
      file: `/projects/mj/img-${String(i + 1).padStart(2, "0")}.webp`,
      width: 1080,
      height: 1350,
    })),
    { type: "image" as const, file: "/projects/mj/vitrine.webp", width: 1080, height: 1350 },
  ],
  (_item, i) => `Social media de interiores de luxo — MJ, peça ${i}`
);

const nayaraRochaSocialGallery = buildMixedGallery(
  "nayara-rocha-social",
  Array.from({ length: 9 }, (_, i) => ({
    type: "image" as const,
    file: `/projects/nayara-rocha-social/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 1080,
    height: 1350,
  })),
  (_item, i) => `Social media da barbearia Nayara Rocha, peça ${i}`
);

/* ---------- Categoria: Apresentações ---------- */

const amandaFerrazGallery = buildGallery(
  "amanda-ferraz",
  Array.from({ length: 24 }, (_, i) => ({
    file: `/projects/amanda-ferraz/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 1177,
    height: 840,
  })),
  (i, total) => `Apresentação Amanda Ferraz — slide ${String(i).padStart(2, "0")} de ${total}`
);

const anneGalanteGallery = buildGallery(
  "anne-galante",
  Array.from({ length: 16 }, (_, i) => ({
    file: `/projects/anne-galante/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 1177,
    height: 840,
  })),
  (i, total) =>
    `Apresentação do Festival Agulhas Ativar (Anne Galante) — slide ${String(i).padStart(2, "0")} de ${total}`
);

const coritibaFutsalGallery = buildGallery(
  "coritiba-futsal",
  Array.from({ length: 15 }, (_, i) => ({
    file: `/projects/coritiba-futsal/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 1680,
    height: 798,
  })),
  (i, total) => `Apresentação Coritiba Futsal — slide ${String(i).padStart(2, "0")} de ${total}`
);

const speakupGallery = buildGallery(
  "speakup",
  Array.from({ length: 5 }, (_, i) => ({
    file: `/projects/speakup/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 2000,
    height: 1125,
  })),
  (i, total) => `Apresentação SpeakUp — slide ${String(i).padStart(2, "0")} de ${total}`
);

export const PROJECTS: Project[] = [
  // --- Marcas (ordem alfabética) ---
  {
    slug: "fetcherz",
    title: "Fetcherz",
    category: "marcas",
    summary: "Identidade de marca aplicada a produto e materiais da Fetcherz.",
    participation: "criação autoral",
    // Revision 10: capa oficial "PRINCIPAL-VITRINE" enviada pela
    // cliente — substitui a capa recortada da Revision 7. Vale em
    // todo lugar que usa `cover` (faixa de trabalhos, prévia da home,
    // /portfolio). Galeria completa do projeto continua com as fotos
    // originais.
    cover: {
      src: "/projects/fetcherz/vitrine.webp",
      alt: "Identidade visual Fetcherz — logotipo sobre fundo azul-marinho",
      width: 1491,
      height: 1055,
    },
    gallery: fetcherzGallery,
    order: 1,
    isPlaceholder: false,
  },
  {
    slug: "germantown",
    title: "Germantown",
    category: "marcas",
    summary: "Identidade de marca aplicada a produto e materiais da Germantown.",
    participation: "criação autoral",
    // Revision 10: capa oficial "PRINCIPAL-VITRINE" enviada pela cliente.
    cover: {
      src: "/projects/germantown/vitrine.webp",
      alt: "Identidade visual Germantown — logotipo sobre foto de ambiente",
      width: 2400,
      height: 1697,
    },
    gallery: germantownGallery,
    order: 2,
    isPlaceholder: false,
  },
  {
    slug: "lahenn",
    title: "Lahenn",
    category: "marcas",
    summary: "Identidade de marca aplicada a produto e materiais da Lahenn.",
    participation: "criação autoral",
    // Revision 10: capa oficial "PRINCIPAL-VITRINE" enviada pela cliente.
    cover: {
      src: "/projects/lahenn/vitrine.webp",
      alt: "Identidade visual Lahenn — logotipo sobre foto de praia",
      width: 1466,
      height: 1073,
    },
    gallery: lahennGallery,
    order: 3,
    isPlaceholder: false,
  },
  {
    slug: "nathan-oliveira",
    title: "Nathan Oliveira",
    category: "marcas",
    summary: "Identidade de marca aplicada a produto e materiais de Nathan Oliveira.",
    participation: "criação autoral",
    // Revision 10: capa oficial "PRINCIPAL-VITRINE" enviada pela cliente.
    cover: {
      src: "/projects/nathan-oliveira/vitrine.webp",
      alt: "Identidade visual Nathan Oliveira — logotipo dourado sobre fundo escuro",
      width: 1465,
      height: 1073,
    },
    gallery: nathanOliveiraGallery,
    order: 4,
    isPlaceholder: false,
  },
  {
    slug: "nayara-rocha-marca",
    title: "Nayara Rocha",
    category: "marcas",
    summary: "Identidade de marca aplicada a produto e materiais da barbearia Nayara Rocha.",
    participation: "criação autoral",
    cover: coverFromGallery(nayaraRochaMarcaGallery),
    gallery: nayaraRochaMarcaGallery,
    order: 5,
    isPlaceholder: false,
  },
  {
    slug: "vitoria-nalevaiko",
    title: "Vitória Nalevaiko",
    category: "marcas",
    summary: "Identidade de marca aplicada a produto e materiais de Vitória Nalevaiko.",
    participation: "criação autoral",
    // Revision 7: capa trocada a pedido da cliente — retrato com o
    // logotipo em coral sobreposto. Galeria completa do projeto
    // continua com as fotos originais.
    cover: {
      src: "/projects/vitoria-nalevaiko/cover.webp",
      alt: "Identidade visual Vitória Nalevaiko — retrato com logotipo em coral",
      width: 1122,
      height: 1402,
    },
    gallery: vitoriaNalevaikoGallery,
    order: 6,
    isPlaceholder: false,
  },

  // --- Social Media (ordem alfabética) ---
  {
    slug: "gilberto-tesser",
    title: "Gilberto Tesser",
    category: "social",
    summary: "Social media para Gilberto Tesser.",
    participation: "criação autoral",
    // Revision 10: capa oficial "CAPA VITRINE" enviada pela cliente —
    // uma única arte de vitrine, em vez da grade composta anterior.
    cover: {
      src: "/projects/gilberto-tesser/vitrine.webp",
      alt: "Social media Gilberto Tesser — retrato médico com tipografia editorial",
      width: 508,
      height: 508,
    },
    gallery: gilbertoTesserGallery,
    order: 7,
    isPlaceholder: false,
  },
  {
    slug: "growth-solutions",
    title: "Growth Solutions",
    category: "social",
    summary: "Social media para Growth Solutions, incluindo peças em vídeo.",
    participation: "criação autoral",
    cover: {
      src: "/projects/growth-solutions/vitrine.webp",
      alt: "Social media Growth Solutions — arte de vitrine",
      width: 1080,
      height: 1350,
    },
    gallery: growthSolutionsGallery,
    order: 8,
    isPlaceholder: false,
  },
  {
    slug: "iam",
    title: "IAM&Co.",
    category: "social",
    summary: "Social media para IAM&Co.",
    participation: "criação autoral",
    cover: {
      src: "/projects/iam/vitrine.webp",
      alt: "Social media IAM&Co. — arte de vitrine",
      width: 1080,
      height: 1350,
    },
    gallery: iamGallery,
    order: 9,
    isPlaceholder: false,
  },
  {
    slug: "lacos-unidos",
    title: "Laços Unidos",
    category: "social",
    summary: "Social media para Laços Unidos, incluindo carrosséis.",
    participation: "criação autoral",
    cover: {
      src: "/projects/lacos-unidos/vitrine.webp",
      alt: "Social media Laços Unidos — arte de vitrine",
      width: 1080,
      height: 1350,
    },
    gallery: lacosUnidosGallery,
    order: 10,
    isPlaceholder: false,
  },
  {
    slug: "mj",
    title: "MJ",
    category: "social",
    summary: "Social media de interiores de luxo para MJ.",
    participation: "criação autoral",
    cover: {
      src: "/projects/mj/vitrine.webp",
      alt: "Social media MJ — arte de vitrine",
      width: 1080,
      height: 1350,
    },
    gallery: mjGallery,
    order: 11,
    isPlaceholder: false,
  },
  {
    slug: "nayara-rocha-social",
    title: "Nayara Rocha",
    category: "social",
    summary: "Grade de social media para a barbearia Nayara Rocha.",
    participation: "criação autoral",
    cover: coverFromGallery(nayaraRochaSocialGallery),
    gallery: nayaraRochaSocialGallery,
    order: 12,
    isPlaceholder: false,
  },

  // --- Apresentações (ordem alfabética) ---
  {
    slug: "amanda-ferraz",
    title: "Amanda Ferraz",
    category: "apresentacoes",
    summary: "Apresentação profissional desenvolvida para Amanda Ferraz.",
    // Instrução direta da cliente: não pode parecer trabalho 100% solo
    // da BARB — citar explicitamente a parceria com o Estúdio LOOPALHAMA.
    participation: "criação autoral em parceria com o Estúdio LOOPALHAMA",
    cover: coverFromGallery(amandaFerrazGallery),
    gallery: amandaFerrazGallery,
    order: 13,
    isPlaceholder: false,
  },
  {
    slug: "anne-galante",
    title: "Anne Galante",
    category: "apresentacoes",
    summary: "Apresentação para o Festival Agulhas Ativar, de Anne Galante.",
    participation: "criação autoral",
    cover: coverFromGallery(anneGalanteGallery),
    gallery: anneGalanteGallery,
    order: 14,
    isPlaceholder: false,
  },
  {
    slug: "coritiba-futsal",
    title: "Coritiba Futsal",
    category: "apresentacoes",
    summary: "Apresentação institucional para o Coritiba Futsal (Coritiba Foot Ball Club).",
    participation: "criação autoral",
    cover: coverFromGallery(coritibaFutsalGallery),
    gallery: coritibaFutsalGallery,
    order: 15,
    isPlaceholder: false,
  },
  {
    slug: "speakup",
    title: "SpeakUp",
    category: "apresentacoes",
    // Galeria com só 5 slides: a página de orçamento (tabela de preços
    // Flex/Premium/Express) foi removida do material publicado a
    // pedido da cliente — ver nota em website-package.md (Revision 4).
    summary: "Apresentação comercial da marca SpeakUp, de Teacher Vanessa.",
    participation: "criação autoral",
    cover: coverFromGallery(speakupGallery),
    gallery: speakupGallery,
    order: 16,
    isPlaceholder: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectsOrdered(): Project[] {
  return [...PROJECTS].sort((a, b) => a.order - b.order);
}

export function getNextProject(currentSlug: string): Project | undefined {
  const ordered = getProjectsOrdered();
  const index = ordered.findIndex((project) => project.slug === currentSlug);
  if (index === -1) return undefined;
  return ordered[(index + 1) % ordered.length];
}

export function getCategories(): string[] {
  const categories = PROJECTS.map((project) => project.category).filter(
    (category): category is string => Boolean(category)
  );
  return Array.from(new Set(categories));
}
