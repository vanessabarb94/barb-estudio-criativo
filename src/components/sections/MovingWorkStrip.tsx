import Link from "next/link";
import { getProjectsOrdered } from "@/content/projects";
import Marquee from "@/components/ui/Marquee";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import styles from "./MovingWorkStrip.module.css";

/**
 * Faixa de trabalhos em movimento: prova visual das peças da Vanessa.
 *
 * Revision 4: antes, os 2 projetos de portfólio eram placeholders sem
 * mídia real — a faixa listava TODA a galeria de cada projeto (no
 * máximo 6 tiles) como placeholder tipográfico. Com os 16 projetos
 * reais, `flatMap` da galeria inteira geraria 81 tiles, incluindo a
 * mesma legenda repetida 24x seguidas para a apresentação da Amanda
 * Ferraz — visualmente quebrado. A faixa passa a mostrar 1 tile por
 * projeto (a capa, `img-01`), com a imagem real quando existir
 * (`src`) e o fallback tipográfico só para os projetos que ainda não
 * tiverem mídia. Cada tile continua linkando para /portfolio/[slug].
 *
 * Revision 6: a cliente pediu para esta faixa mostrar só peças de
 * identidade de marca — nada de grade de social media nem slide de
 * apresentação. Filtra por `category === "marcas"` além do critério de
 * mídia já existente.
 */
export default function MovingWorkStrip() {
  const items = getProjectsOrdered()
    .filter((project) => project.category === "marcas")
    .filter((project) => project.cover || project.gallery.length > 0)
    .map((project) => ({
      key: project.slug,
      href: `/portfolio/${project.slug}`,
      title: project.title,
      cover: project.cover,
    }));

  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Trabalhos em movimento">
      <Marquee ariaLabel="Peças de portfólio em destaque" durationSeconds={42}>
        {items.map((item) => (
          <Link key={item.key} href={item.href} className={styles.tile}>
            {item.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.cover.src}
                alt={item.cover.alt}
                width={item.cover.width}
                height={item.cover.height}
                className={styles.tileImage}
              />
            ) : (
              <PlaceholderMedia text={item.title} />
            )}
            <span className="visually-hidden">{item.title}</span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
