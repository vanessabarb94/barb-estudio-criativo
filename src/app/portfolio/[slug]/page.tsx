import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROJECTS,
  getNextProject,
  getProjectBySlug,
} from "@/content/projects";
import { MICROCOPY } from "@/content/site";
import { isPreviewMode } from "@/lib/preview";
import { getWhatsAppLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/whatsapp";
import ProvisionalBadge from "@/components/ui/ProvisionalBadge";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import styles from "./page.module.css";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description =
    project.summary.length > 155
      ? `${project.summary.slice(0, 152)}...`
      : project.summary;

  return {
    title: `${project.title} | Portfólio BARB Estúdio Criativo`,
    description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextProject = getNextProject(slug);
  const preview = isPreviewMode();

  return (
    <article className={`container ${styles.section}`}>
      {/*
        Revision 11: "Voltar" sobe pro topo da página (logo abaixo do
        header do site), não só no rodapé — a cliente quer que fique
        visível assim que a página abre, sem precisar rolar até o fim.
        Continua levando pra seção Portfólio da home (/#portfolio).
      */}
      <Link href="/#portfolio" className={styles.backLinkTop}>
        {MICROCOPY.backToPortfolio}
      </Link>

      <header className={styles.header}>
        {project.category && <span className={styles.category}>{project.category}</span>}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{project.title}</h1>
          {preview && project.isPlaceholder && <ProvisionalBadge />}
        </div>
        <p className={styles.summary}>{project.summary}</p>
      </header>

      <p className={styles.participation}>
        <span className={styles.participationLabel}>{MICROCOPY.myParticipation}:</span>{" "}
        {project.participation}
      </p>

      <span className={styles.galleryHeading}>Galeria</span>
      <ProjectGallery items={project.gallery} />

      {/*
        Seção "Resultados" omitida inteiramente: não há dado verificável
        para este projeto placeholder. Nunca exibir "Resultados: em
        breve" como se fosse uma seção prometida (ver copy.md).
      */}

      <footer className={styles.footer}>
        <div className={styles.footerNav}>
          {nextProject && (
            <Link href={`/portfolio/${nextProject.slug}`} className={styles.nextLink}>
              {MICROCOPY.nextProject} {nextProject.title}
            </Link>
          )}
        </div>
        <Link
          href={getWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.finalCta}
        >
          {MICROCOPY.finalCtaLabel}
        </Link>
      </footer>
    </article>
  );
}
