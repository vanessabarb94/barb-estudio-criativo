import Image from "next/image";
import Link from "next/link";
import { MEET_ME } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import styles from "./RecentWork.module.css";

/**
 * "Conheça mais de mim" — Revision 2 repagina por completo o que antes
 * era "Trabalhos recentes" (2 cards de projeto lado a lado). Novo
 * propósito: seção de transição pessoal, teaser que puxa para "Sobre
 * mim" logo depois — não mais destaque de portfólio.
 *
 * Revision 5: a cliente só enviou 1 foto nomeada para esta seção
 * (`vanessa-por-tras-da-barb.webp`) — tentativa inicial usava a mesma
 * foto espelhada nas 2 metades (split 50/50).
 *
 * Revision 6: a cliente pediu para simplificar — 1 única foto
 * full-bleed, sem divisão nem espelhamento. O "BARB" dentro do texto
 * virou a logo real nessa rodada.
 *
 * Revision 7: a cliente reverteu — "BARB" volta a ser texto
 * tipográfico mesmo, sem a logo.
 *
 * Os 2 projetos placeholder saem desta seção da home — continuam
 * existindo em /portfolio e /portfolio/[slug]. Um link discreto "Ver
 * portfólio completo" preserva a rota de descoberta a partir da home.
 *
 * Revision 4: a nova seção "Portfólio" (clara, off-white) passa a vir
 * imediatamente antes desta seção escura. `section-radius-top` (mesma
 * classe utilitária usada em Services) arredonda os cantos superiores
 * para manter o mesmo efeito de "cartão escuro" flutuando sobre o
 * fundo claro, já usado em todas as outras transições claro->escuro
 * do site.
 */
export default function RecentWork() {
  return (
    <section
      className={`${styles.section} section-radius-top`}
      aria-label={MEET_ME.sectionLabel}
    >
      <div className={styles.photoLayer}>
        <Image
          src="/images/vanessa-por-tras-da-barb.webp"
          alt={MEET_ME.photoAlt}
          width={2000}
          height={1126}
          sizes="100vw"
          className={styles.media}
        />
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <Reveal>
          <p className={styles.teaser}>{MEET_ME.teaserText}</p>
        </Reveal>
        <Link href={MEET_ME.ctaHref} className={styles.ctaLink}>
          {MEET_ME.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
