import Image from "next/image";
import Link from "next/link";
import { ABOUT, ABOUT_STRIP_TEXT } from "@/content/site";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import styles from "./About.module.css";

/**
 * Revision 2: "Sobre mim" fica separada da seção de fotos ("Conheça
 * mais de mim", acima) — ver RecentWork.tsx.
 *
 * Antes do texto, uma faixa fina com as mesmas proporções/cores da
 * faixa conceitual do topo (off-white, texto preto, bordas finas
 * pretas — ver ConceptualStrip.module.css), com "por trás da barb"
 * repetido em loop.
 *
 * Decisão registrada (ver website-package.md "Revision 2"): o
 * revision-2-brief.md deixou em aberto se esta faixa deveria ser
 * estática (como a faixa conceitual, que perdeu o loop nesta rodada)
 * ou continuar em loop. Mantive o loop aqui porque a cliente descreveu
 * literalmente "escrito 'por trás da barb' repetidamente" — leitura
 * mais consistente com um marquee do que com um texto estático único.
 *
 * Revision 3: a frase sozinha (uma única cópia) não preenchia a
 * largura da faixa — sobrava vão vazio nas laterais durante o loop.
 * `Marquee` já duplica internamente o que recebe como `children` para
 * o scroll sem salto; aqui repetimos a frase várias vezes DENTRO de
 * cada cópia para que o trecho se repita de ponta a ponta em qualquer
 * largura de viewport, sem vão, em qualquer momento da animação.
 *
 * Depois da faixa: fundo preto, dividido ao meio — texto à esquerda (3
 * parágrafos + assinatura, alinhado à esquerda, mesma margem estreita
 * do resto do site) e foto de fundo + polaroid à direita.
 *
 * Revision 5: fotos reais da cliente no lugar dos fallbacks tipográficos.
 * Metade direita usa `vanessa-about-v2.webp`. A polaroid reaproveitava o
 * arquivo da Hero com zoom no canto do laptop/revistas.
 *
 * Revision 6: a polaroid causava overflow horizontal (scroll lateral
 * indesejado na página) — removida por completo a pedido da cliente.
 * Fica só a foto principal (`vanessa-about-v2.webp`) na metade direita.
 */
const STRIP_REPEAT_COUNT = 14;

export default function About() {
  return (
    <>
      <div className={styles.strip}>
        <Marquee ariaLabel="Por trás da barb" durationSeconds={22}>
          {Array.from({ length: STRIP_REPEAT_COUNT }).map((_, index) => (
            <span key={index} className={styles.stripText} aria-hidden={index > 0}>
              {ABOUT_STRIP_TEXT}
            </span>
          ))}
        </Marquee>
      </div>

      <section
        id="sobre"
        className={`${styles.section} on-dark textured-dark-bg`}
        aria-label="Sobre mim"
      >
        <div className={styles.grid}>
          <Reveal className={styles.textColumn}>
            <h2 className={styles.title}>{ABOUT.title}</h2>
            {ABOUT.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            <p className={styles.signature}>
              {ABOUT.signatureName}
              <span className={styles.signatureRole}>{ABOUT.signatureRole}</span>
            </p>
            <Link
              href={ABOUT.ctaHref}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.cta}
            >
              {ABOUT.ctaLabel}
            </Link>
          </Reveal>

          <Reveal className={styles.photoColumn}>
            <Image
              src="/images/vanessa-about-v2.webp"
              alt={ABOUT.photoAlt}
              width={1800}
              height={1732}
              sizes="(min-width: 768px) 50vw, 100vw"
              className={styles.photo}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
