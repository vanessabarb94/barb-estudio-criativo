import Link from "next/link";
import { getProjectBySlug, type Project } from "@/content/projects";
import { MICROCOPY, PORTFOLIO_PREVIEW_BLOCKS, PORTFOLIO_PREVIEW_SECTION } from "@/content/site";
import { getWhatsAppLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/whatsapp";
import Reveal from "@/components/ui/Reveal";
import CategoryBlock from "@/components/portfolio/CategoryBlock";
import styles from "./Portfolio.module.css";

/**
 * Revision 4: nova seção "Portfólio" na home, entre Serviços e
 * "Conheça mais de mim" — primeiro material real de portfólio (16
 * projetos). 3 blocos (Marcas / Social Media / Apresentações), cada um
 * com prévia de 3 projetos (capa = img-01 do projeto) + link "Ver mais
 * projetos" para /portfolio já filtrado pela categoria.
 *
 * Revision 5: bloco reduzido só a Marcas (depois revertido, ver abaixo).
 *
 * Revision 6: a cliente pediu de volta as 3 categorias (Marcas, Social
 * Media, Apresentações), como na revision 4.
 *
 * Revision 9: em vez de duplicar a lógica de card/lightbox aqui, a
 * prévia passa a reaproveitar o componente `CategoryBlock` (o mesmo
 * usado em /portfolio) — garante que o clique único em Social Media
 * (abre o lightbox direto, sem passar por /portfolio/[slug] primeiro)
 * funcione igual nos dois lugares, em vez de precisar implementar a
 * mesma lógica duas vezes. `moreHref`/`moreLabel` adicionam o link "Ver
 * mais projetos" no cabeçalho do bloco.
 *
 * Revision 11:
 * - `id="portfolio"` nesta section — os botões "Voltar" das páginas de
 *   projeto (/portfolio/[slug]) e da vitrine de Social Media agora
 *   trazem a pessoa de volta pra cá (`/#portfolio`), não para a lista
 *   completa em /portfolio — assim ela continua navegando pelos outros
 *   projetos a partir de onde estava, sem a navegação "truncada".
 * - Os 3 blocos não têm mais CTA de contato individual na home
 *   (`hideCta`) — fica só 1 CTA centralizado ao final da seção inteira,
 *   depois do bloco de Apresentações. Em /portfolio (página completa),
 *   cada bloco continua com o próprio CTA.
 */
export default function Portfolio() {
  const blocks = PORTFOLIO_PREVIEW_BLOCKS.map((block) => ({
    ...block,
    projects: block.projectSlugs
      .map((slug) => getProjectBySlug(slug))
      .filter((project): project is Project => Boolean(project)),
  })).filter((block) => block.projects.length > 0);

  if (blocks.length === 0) return null;

  return (
    <section
      id="portfolio"
      className={`container ${styles.section}`}
      aria-label={PORTFOLIO_PREVIEW_SECTION.label}
    >
      <Reveal>
        <h2 className={styles.title}>{PORTFOLIO_PREVIEW_SECTION.label}</h2>
      </Reveal>

      {blocks.map((block) => (
        <Reveal key={block.category} as="article">
          <CategoryBlock
            category={block.category}
            title={block.title}
            projects={block.projects}
            preview
            compact
            hideCta
            moreHref={`/portfolio?categoria=${encodeURIComponent(block.category)}`}
            moreLabel={PORTFOLIO_PREVIEW_SECTION.moreLabel}
          />
        </Reveal>
      ))}

      <Reveal className={styles.sectionCta}>
        <Link
          href={getWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.contactCta}
        >
          {MICROCOPY.finalCtaLabel}
        </Link>
      </Reveal>
    </section>
  );
}
