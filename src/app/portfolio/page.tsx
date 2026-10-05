import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getProjectsOrdered, type Project } from "@/content/projects";
import { PORTFOLIO_CATEGORY_LABELS, PORTFOLIO_PAGE, SEO } from "@/content/site";
import { isPreviewMode } from "@/lib/preview";
import CategoryBlock from "@/components/portfolio/CategoryBlock";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: SEO.portfolio.title,
  description: SEO.portfolio.description,
};

/**
 * Revision 5: a listagem passa a agrupar os projetos por categoria em
 * blocos (Marcas / Social Media / Apresentações, nesta ordem fixa —
 * `getCategories()` segue a ordem de `PROJECTS` em content/projects.ts),
 * cada um com seu próprio CTA de contato ao final (ver CategoryBlock).
 * O filtro por categoria (`?categoria=`) agora restringe quais BLOCOS
 * aparecem, em vez de produzir uma única grade plana sem agrupamento.
 */
export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categories = getCategories();
  const allProjects = getProjectsOrdered();
  const preview = isPreviewMode();

  const activeCategory = categoria && categories.includes(categoria) ? categoria : undefined;
  const visibleCategories = activeCategory ? [activeCategory] : categories;

  const blocks = visibleCategories
    .map((category) => ({
      category,
      title: PORTFOLIO_CATEGORY_LABELS[category] ?? category,
      projects: allProjects.filter((project): project is Project => project.category === category),
    }))
    .filter((block) => block.projects.length > 0);

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{PORTFOLIO_PAGE.title}</h1>
        <p className={styles.subtitle}>{PORTFOLIO_PAGE.subtitle}</p>
      </div>

      {categories.length > 0 && (
        <nav className={styles.filters} aria-label={PORTFOLIO_PAGE.filterLabel}>
          <span className={styles.filterLabel}>{PORTFOLIO_PAGE.filterLabel}</span>
          <Link
            href="/portfolio"
            className={styles.filterLink}
            aria-current={!activeCategory}
          >
            {PORTFOLIO_PAGE.filterAllLabel}
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/portfolio?categoria=${encodeURIComponent(category)}`}
              className={styles.filterLink}
              aria-current={activeCategory === category}
            >
              {PORTFOLIO_CATEGORY_LABELS[category] ?? category}
            </Link>
          ))}
        </nav>
      )}

      {blocks.length === 0 ? (
        <p className={styles.emptyState}>{PORTFOLIO_PAGE.emptyState}</p>
      ) : (
        blocks.map((block) => (
          <CategoryBlock
            key={block.category}
            category={block.category}
            title={block.title}
            projects={block.projects}
            preview={preview}
          />
        ))
      )}
    </section>
  );
}
