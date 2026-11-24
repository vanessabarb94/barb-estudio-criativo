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
  /**
   * Revision 16: vídeo curto sem som que roda sozinho em loop no tile
   * (ex. post animado da IAM & Co.), em vez de mostrar poster + play.
   */
  autoplayLoop?: boolean;
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
  /**
   * Revision 16: capa em vídeo (mudo, em loop) no card do projeto —
   * `cover` continua obrigatório como poster/fallback.
   */
  coverVideo?: string;
  /** Revision 16: link para ver o trabalho funcionando (ex. website). */
  liveUrl?: string;
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
  autoplayLoop?: boolean;
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
    autoplayLoop: item.autoplayLoop,
  }));
}

/* Atalhos para montar grades de Social Media (Revision 16). Todas as
 * peças de feed são 1080x1350 (4:5); posters de reels foram recortados
 * para 4:5 para casar com a grade, o vídeo em si toca inteiro (9:16). */
const post = (file: string): MixedMediaSpec => ({ type: "image", file, width: 1080, height: 1350 });
const carousel = (group: string, files: string[]): MixedMediaSpec[] =>
  files.map((file) => ({ type: "carousel", carouselGroup: group, file, width: 1080, height: 1350 }));
const reel = (src: string, poster: string): MixedMediaSpec => ({
  type: "video",
  src,
  poster,
  width: 1080,
  height: 1350,
});
const seq = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${prefix}-${String(i + 1).padStart(2, "0")}.webp`);

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
 * para Growth, a 5ª pra Laços, a última pra MJ). Nayara
 * Rocha (social) não tinha CAPA VITRINE própria — segue só com as 9
 * peças soltas, já na ordem 1-9 da grade de referência.
 */

/* Revision 16: Gilberto Tesser, Growth Solutions e Nayara Rocha (social)
 * saíram do portfólio a pedido da cliente. Entraram IAM & Co., IANKE e
 * Instituto Escale — ordem de cada grade conferida peça a peça contra os
 * prints de referência enviados pela cliente. */

const I = "/projects/iam-co";
const iamCoGallery = buildMixedGallery(
  "iam-co",
  [
    // Destaque pedido pela cliente: o post animado abre a grade.
    {
      type: "video",
      src: `${I}/post-animado.mp4`,
      poster: `${I}/post-animado-poster.webp`,
      width: 1080,
      height: 1350,
      autoplayLoop: true,
    },
    ...carousel("zara", seq(`${I}/zara`, 8)),
    post(`${I}/in-focus.webp`),
    ...carousel("vogue", seq(`${I}/vogue`, 7)),
    post(`${I}/lets-talk.webp`),
    post(`${I}/we-decode-culture.webp`),
    post(`${I}/why-culture-matters.webp`),
    post(`${I}/point-of-view.webp`),
    post(`${I}/our-method.webp`),
    post(`${I}/what-we-do.webp`),
    post(`${I}/iam-decodes.webp`),
    post(`${I}/consumer.webp`),
    post(`${I}/brand.webp`),
    post(`${I}/clients.webp`),
    post(`${I}/founder.webp`),
    post(`${I}/iam-and-co.webp`),
  ],
  (item, i) =>
    item.type === "video"
      ? "Post animado de social media — IAM & Co."
      : item.carouselGroup
        ? `Carrossel de imprensa — IAM & Co. (${item.carouselGroup === "zara" ? "Zara" : "Vogue"}), frame ${i}`
        : `Social media de cultura, consumo e luxo — IAM & Co., peça ${i}`
);

const K = "/projects/ianke";
const iankeGallery = buildMixedGallery(
  "ianke",
  [
    post(`${K}/black-november-capa.webp`),
    reel(`${K}/reels-kit-viagem.mp4`, `${K}/reels-kit-viagem-poster.webp`),
    ...carousel("lista-dos-sonhos", seq(`${K}/lista-sonhos`, 7)),
    reel(`${K}/reels-hotel.mp4`, `${K}/reels-hotel-poster.webp`),
    post(`${K}/memorias.webp`),
    ...carousel("lugares", seq(`${K}/lugares`, 5)),
    ...carousel("choque-cultural", seq(`${K}/choque-cultural`, 6)),
    reel(`${K}/reels-cruzeiro.mp4`, `${K}/reels-cruzeiro-poster.webp`),
    // Fecha a grade de 9 com o carrossel de Black November (versão feed).
    ...carousel("black-november", seq(`${K}/black-november`, 6)),
  ],
  (item, i) =>
    item.type === "video"
      ? `Reels de social media — IANKE Agência de Viagens, peça ${i}`
      : item.carouselGroup
        ? `Carrossel de social media — IANKE Agência de Viagens, frame ${i}`
        : `Social media — IANKE Agência de Viagens, peça ${i}`
);

const E = "/projects/instituto-escale";
const institutoEscaleGallery = buildMixedGallery(
  "instituto-escale",
  [
    reel(`${E}/reels-1.mp4`, `${E}/reels-1-poster.webp`),
    ...carousel("carrossel", seq(`${E}/carrossel`, 5)),
    reel(`${E}/reels-2.mp4`, `${E}/reels-2-poster.webp`),
    post(`${E}/estatico.webp`),
  ],
  (item, i) =>
    item.type === "video"
      ? `Reels de social media — Instituto Escale, peça ${i}`
      : item.carouselGroup
        ? `Carrossel de social media — Instituto Escale, frame ${i}`
        : `Social media — Instituto Escale, peça ${i}`
);

const L = "/projects/lacos-unidos";
const lacosUnidosGallery = buildMixedGallery(
  "lacos-unidos",
  [
    // Revision 16: posts de novembro entram no topo da grade (mais recentes),
    // na ordem numerada das pastas enviadas pela cliente.
    reel(`${L}/novembro-reels-1.mp4`, `${L}/novembro-reels-1-poster.webp`),
    ...carousel("novembro-desafio", seq(`${L}/novembro-carrossel-a`, 3)),
    post(`${L}/novembro-saudade.webp`),
    ...carousel("novembro-o-que-e", seq(`${L}/novembro-carrossel-b`, 5)),
    reel(`${L}/novembro-reels-2.mp4`, `${L}/novembro-reels-2-poster.webp`),
    post(`${L}/novembro-frase.webp`),
    post(`${L}/novembro-doacoes.webp`),
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

/* ---------- Revision 16: novas marcas (páginas dos PDFs de apresentação) ---------- */

const coralTelemacoBorbaGallery = buildGallery(
  "coral-telemaco-borba",
  Array.from({ length: 11 }, (_, i) => ({
    file: `/projects/coral-telemaco-borba/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 2000,
    height: 1414,
  })),
  (i) => `Identidade visual Coral Municipal de Telêmaco Borba — aplicação ${i}`
);

const acaliaGallery = buildGallery(
  "acalia",
  Array.from({ length: 6 }, (_, i) => ({
    file: `/projects/acalia/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 2000,
    height: 1512,
  })),
  (i) => `Identidade visual Acália — aplicação ${i}`
);

/* ---------- Revision 16: Personalizados ---------- */

const corrielaGallery = buildGallery(
  "corriela",
  Array.from({ length: 8 }, (_, i) => ({
    file: `/projects/corriela/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 2000,
    height: 1414,
  })),
  (i) => `Caixa personalizada Corriela — imagem ${i}`
);

/* ---------- Revision 16: Storymaker e Edição de Vídeos ----------
 * Vídeos verticais (9:16) comprimidos para web em 720x1280. Abrem na
 * mesma vitrine de Social Media, em grade de tiles 9:16. */

type VideoSpec = { file: string; label: string };

function buildVideoGallery(slug: string, videos: VideoSpec[], altPrefix: string): ProjectMedia[] {
  return videos.map((video, index) => ({
    id: `${slug}-g${index + 1}`,
    type: "video",
    src: `/projects/${slug}/${video.file}.mp4`,
    poster: `/projects/${slug}/${video.file}-poster.webp`,
    alt: `${altPrefix} — ${video.label}`,
    width: 720,
    height: 1280,
    order: index + 1,
    isPlaceholder: false,
  }));
}

const coberturaEventosGallery = buildVideoGallery(
  "cobertura-eventos",
  [
    { file: "melhores-momentos", label: "melhores momentos" },
    { file: "trend", label: "trend" },
    { file: "tbt", label: "TBT" },
    { file: "depoimento-carol", label: "depoimento Carol" },
    { file: "depoimento-fernanda", label: "depoimento Fernanda" },
    { file: "depoimento-jessica", label: "depoimento Jessica" },
    { file: "depoimento-leonardo", label: "depoimento Leonardo" },
    { file: "depoimento-matheus", label: "depoimento Matheus" },
    { file: "depoimento-paulo", label: "depoimento Paulo" },
    { file: "discurso-jucelia", label: "discurso Jucélia" },
  ],
  "Reels de cobertura de evento"
);

const videosAdsGallery = buildVideoGallery(
  "videos-ads",
  [
    { file: "ads-01", label: "Administração" },
    { file: "ads-02", label: "Gestão Pública" },
    { file: "ads-03", label: "Logística" },
    { file: "ads-04", label: "Papel e Celulose 1" },
    { file: "ads-05", label: "Papel e Celulose 2" },
    { file: "ads-06", label: "Papel e Celulose 3" },
    { file: "ads-07", label: "Recursos Humanos" },
  ],
  "Vídeo gravado para anúncio"
);

/* Revision 18: seção "Reels" — reaproveita os mesmos MP4 já publicados
 * em IANKE e Instituto Escale (nenhum vídeo duplicado), com capas
 * verticais 9:16 próprias para a grade de vídeos. */
const reelsGallery: ProjectMedia[] = [
  {
    src: "/projects/ianke/reels-kit-viagem.mp4",
    poster: "/projects/ianke/reels-kit-viagem-poster-916.webp",
    alt: "Reels Kit de viagem — IANKE Agência de Viagens",
  },
  {
    src: "/projects/instituto-escale/reels-2.mp4",
    poster: "/projects/instituto-escale/reels-2-poster-916.webp",
    alt: "Reels Você resolve a causa ou o sintoma? — Instituto Escale",
  },
].map((video, index) => ({
  id: `reels-g${index + 1}`,
  type: "video" as const,
  ...video,
  width: 720,
  height: 1280,
  order: index + 1,
  isPlaceholder: false,
}));

/* ---------- Revision 16: Websites ---------- */

const thaisNalevaikoGallery = buildGallery(
  "thais-nalevaiko",
  Array.from({ length: 7 }, (_, i) => ({
    file: `/projects/thais-nalevaiko/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 2000,
    height: 1250,
  })),
  (i) => `Website Thais Nalevaiko Arquitetura — tela ${i}`
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

const coritibaFootballGallery = buildGallery(
  "coritiba-football",
  Array.from({ length: 15 }, (_, i) => ({
    file: `/projects/coritiba-football/img-${String(i + 1).padStart(2, "0")}.webp`,
    width: 1680,
    height: 798,
  })),
  (i, total) => `Apresentação Coritiba Football — slide ${String(i).padStart(2, "0")} de ${total}`
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
  // --- Marcas ---
  // Revision 16: Coral Municipal de Telêmaco Borba e Acália entram na
  // frente — são os trabalhos de marca mais recentes.
  {
    slug: "coral-telemaco-borba",
    title: "Coral Municipal de Telêmaco Borba",
    category: "marcas",
    summary: "Identidade visual do Coral Municipal de Telêmaco Borba, com aplicações em uniformes, sinalização e materiais.",
    participation: "criação autoral",
    cover: {
      src: "/projects/coral-telemaco-borba/vitrine.webp",
      alt: "Identidade visual Coral Municipal de Telêmaco Borba — símbolo de notas musicais sobre fundo azul-marinho",
      width: 1600,
      height: 1200,
    },
    gallery: coralTelemacoBorbaGallery,
    order: 1,
    isPlaceholder: false,
  },
  {
    slug: "acalia",
    title: "Acália",
    category: "marcas",
    summary: "Identidade de marca da Acália, com aplicações em roupas, embalagens e papelaria.",
    participation: "criação autoral",
    cover: {
      src: "/projects/acalia/vitrine.webp",
      alt: "Identidade visual Acália — logotipo sobre degradê azul e rosa",
      width: 1419,
      height: 1064,
    },
    gallery: acaliaGallery,
    order: 2,
    isPlaceholder: false,
  },
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
    isPlaceholder: false,
  },

  // --- Social Media ---
  // Revision 16: ordem de destaque pedida pela cliente — IAM & Co.,
  // IANKE e Instituto Escale primeiro.
  {
    slug: "iam-co",
    title: "IAM & Co.",
    category: "social",
    summary: "Social media de cultura, consumo e luxo para a IAM & Co., com carrosséis de imprensa e post animado.",
    participation: "criação autoral",
    cover: {
      src: "/projects/iam-co/post-animado-poster.webp",
      alt: "Social media IAM & Co. — post animado",
      width: 1080,
      height: 1350,
    },
    coverVideo: "/projects/iam-co/post-animado.mp4",
    gallery: iamCoGallery,
    order: 9,
    isPlaceholder: false,
  },
  {
    slug: "ianke",
    title: "IANKE Agência de Viagens",
    category: "social",
    summary: "Social media para a IANKE Agência de Viagens, com reels, carrosséis e campanha de Black November.",
    participation: "criação autoral",
    cover: {
      src: "/projects/ianke/memorias.webp",
      alt: "Social media IANKE — Você cuida das memórias, nós cuidamos dos detalhes",
      width: 1080,
      height: 1350,
    },
    gallery: iankeGallery,
    order: 10,
    isPlaceholder: false,
  },
  {
    slug: "instituto-escale",
    title: "Instituto Escale",
    category: "social",
    summary: "Social media para o Instituto Escale, com reels, carrossel e post estático.",
    participation: "criação autoral",
    cover: {
      src: "/projects/instituto-escale/carrossel-01.webp",
      alt: "Social media Instituto Escale — capa do carrossel Sua equipe resolve a falha",
      width: 1080,
      height: 1350,
    },
    gallery: institutoEscaleGallery,
    order: 11,
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
    order: 12,
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
    order: 13,
    isPlaceholder: false,
  },

  // --- Storymaker e Edição de Vídeos (Revision 16) ---
  {
    slug: "cobertura-eventos",
    title: "Storymaker — Cobertura de Eventos",
    category: "videos",
    summary: "Reels de cobertura de evento: melhores momentos, trends e depoimentos gravados e editados no dia.",
    participation: "criação autoral",
    cover: {
      src: "/projects/cobertura-eventos/vitrine.webp",
      alt: "Reels de cobertura de evento — melhores momentos",
      width: 720,
      height: 900,
    },
    gallery: coberturaEventosGallery,
    order: 14,
    isPlaceholder: false,
  },
  {
    slug: "videos-ads",
    title: "Vídeos para Anúncios",
    category: "videos",
    summary: "Vídeos gravados e editados para campanhas de anúncios (ADS).",
    participation: "criação autoral",
    cover: {
      src: "/projects/videos-ads/vitrine.webp",
      alt: "Vídeo gravado para anúncio",
      width: 720,
      height: 900,
    },
    gallery: videosAdsGallery,
    order: 15,
    isPlaceholder: false,
  },
  {
    slug: "reels",
    title: "Reels",
    category: "videos",
    summary: "Reels gravados e editados para social media: IANKE Agência de Viagens e Instituto Escale.",
    participation: "criação autoral",
    cover: {
      src: "/projects/ianke/reels-kit-viagem-poster.webp",
      alt: "Reels Kit de viagem — IANKE Agência de Viagens",
      width: 1080,
      height: 1350,
    },
    gallery: reelsGallery,
    order: 16,
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
    order: 17,
    isPlaceholder: false,
  },
  {
    slug: "coritiba-football",
    title: "Coritiba Football",
    category: "apresentacoes",
    summary: "Apresentação institucional para o Coritiba Football (Coritiba Foot Ball Club).",
    participation: "criação autoral",
    cover: coverFromGallery(coritibaFootballGallery),
    gallery: coritibaFootballGallery,
    order: 18,
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
    order: 19,
    isPlaceholder: false,
  },

  // --- Websites (Revision 16) ---
  {
    slug: "thais-nalevaiko",
    title: "Thais Nalevaiko Arquitetura",
    category: "websites",
    summary: "Website para o escritório de arquitetura e interiores Thais Nalevaiko, com galeria 3D de projetos e antes e depois interativo.",
    participation: "criação autoral",
    cover: {
      src: "/projects/thais-nalevaiko/vitrine.webp",
      alt: "Website Thais Nalevaiko Arquitetura — tela inicial",
      width: 1600,
      height: 1200,
    },
    liveUrl: "/sites/thais-nalevaiko/index.html",
    gallery: thaisNalevaikoGallery,
    order: 20,
    isPlaceholder: false,
  },

  // --- Personalizados (Revision 16) ---
  {
    slug: "corriela",
    title: "Corriela",
    category: "personalizados",
    summary: "Caixa personalizada para a Corriela: embalagem, papel de seda estampado e mensagens internas.",
    participation: "criação autoral",
    cover: {
      src: "/projects/corriela/vitrine.webp",
      alt: "Caixa personalizada Corriela aberta, com papel floral e selo da marca",
      width: 1335,
      height: 1001,
    },
    gallery: corrielaGallery,
    order: 21,
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
