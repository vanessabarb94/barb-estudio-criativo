"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/content/projects";
import { MICROCOPY } from "@/content/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import ProvisionalBadge from "@/components/ui/ProvisionalBadge";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import SocialShowcase from "./SocialShowcase";
import styles from "./CategoryBlock.module.css";

/**
 * Revision 5: `/portfolio` passa a agrupar os projetos por categoria em
 * blocos (Marcas / Social Media / Apresentações), cada um com um CTA de
 * contato ao final (não só um CTA geral no fim da página inteira).
 *
 * Cards de Social Media abrem a vitrine DIRETAMENTE (1 clique) em vez de
 * navegar para /portfolio/[slug] primeiro. A rota /portfolio/[slug]
 * desses projetos continua funcionando normalmente para quem acessar o
 * link direto. Cards de Marcas e Apresentações continuam navegando para
 * /portfolio/[slug] normalmente.
 *
 * Revision 9: a prévia de Portfólio na home (Portfolio.tsx) passa a
 * reaproveitar este mesmo componente (em vez de duplicar a lógica do
 * clique único) — garante que o comportamento de Social Media funcione
 * igual nos dois lugares. `moreHref`/`moreLabel` (opcionais) adicionam
 * o link "Ver mais projetos" no cabeçalho do bloco, usado só na home.
 *
 * `compact`: a prévia da home sempre mostra exatamente 3 projetos por
 * bloco e precisa deles em 1 única fileira de 3 colunas; o grid padrão
 * de /portfolio (2 colunas, pensado para listas maiores) ficaria 2+1.
 *
 * Revision 10: o clique num card de Social Media deixou de abrir um
 * lightbox que ciclava entre a CAPA de projetos diferentes — agora abre
 * `SocialShowcase`, uma vitrine em tela cheia (fundo branco) com a
 * grade COMPLETA de peças daquele projeto (imagens, vídeo com play,
 * carrossel com navegação lateral). Ver SocialShowcase.tsx.
 *
 * Revision 11: `hideCta` esconde o CTA de contato individual do bloco —
 * usado pela prévia da home, que passa a ter só 1 CTA centralizado ao
 * final de toda a seção (ver Portfolio.tsx). Em /portfolio (listagem
 * completa), `hideCta` fica de fora e cada bloco mantém o próprio CTA.
 */
export default function CategoryBlock({
  category,
  title,
  projects,
  preview,
  moreHref,
  moreLabel,
  compact,
  hideCta,
}: {
  category: string;
  title: string;
  projects: Project[];
  preview: boolean;
  moreHref?: string;
  moreLabel?: string;
  compact?: boolean;
  hideCta?: boolean;
}) {
  const isSocial = category === "social";
  const router = useRouter();
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  function openAt(index: number) {
    activeTriggerRef.current = triggerRefs.current[index] ?? null;
    setOpenProjectIndex(index);
  }

  const openProject = openProjectIndex !== null ? projects[openProjectIndex] : null;
  const ctaHref = getWhatsAppLink(
    `Olá! Vim pelo site da BARB e quero conversar sobre um projeto de ${title}.`
  );

  return (
    <div className={styles.block} aria-label={title}>
      <div className={styles.blockHeader}>
        <h2 className={styles.blockTitle}>{title}</h2>
        {moreHref && moreLabel && (
          <Link href={moreHref} className={styles.moreLink}>
            {moreLabel}
          </Link>
        )}
      </div>

      <div className={`${styles.grid} ${compact ? styles.gridCompact : ""}`}>
        {projects.map((project, index) =>
          isSocial ? (
            <button
              key={project.slug}
              ref={(el) => {
                triggerRefs.current[index] = el;
              }}
              type="button"
              className={`${styles.card} ${styles.cardButton}`}
              onClick={() => openAt(index)}
            >
              <div className={`${styles.cardMedia} ${styles.cardMediaSocial}`}>
                {project.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                  />
                ) : (
                  <PlaceholderMedia text={project.title} />
                )}
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardTitle}>{project.title}</span>
                {preview && project.isPlaceholder && <ProvisionalBadge />}
              </div>
            </button>
          ) : (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className={styles.card}>
              <div className={styles.cardMedia}>
                {project.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                  />
                ) : (
                  <PlaceholderMedia text={project.title} />
                )}
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardTitle}>{project.title}</span>
                {preview && project.isPlaceholder && <ProvisionalBadge />}
              </div>
            </Link>
          )
        )}
      </div>

      {!hideCta && (
        <div className={styles.ctaRow}>
          <Link href={ctaHref} target="_blank" rel="noreferrer noopener" className={styles.contactCta}>
            {MICROCOPY.finalCtaLabel}
          </Link>
        </div>
      )}

      {isSocial && openProject && (
        <SocialShowcase
          project={openProject}
          // Revision 11: fechar a vitrine leva pra seção Portfólio da
          // home, não só fecha o overlay no lugar — a cliente quer
          // sempre voltar pra onde estava navegando, em qualquer
          // categoria (Marcas, Social Media ou Apresentações).
          onClose={() => {
            setOpenProjectIndex(null);
            router.push("/#portfolio");
          }}
          returnFocusRef={activeTriggerRef}
        />
      )}
    </div>
  );
}
