import Image from "next/image";
import { HERO } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import styles from "./Hero.module.css";

/**
 * Camadas (trás -> frente), conforme visual-direction.md:
 * (1) fotografia full-bleed com scrim — Revision 5: `vanessa-hero.webp`
 *     religada (foto real da cliente, antes pendente; ver
 *     website-package.md).
 * (2) logo "barb." (public/brand/barb-mark-cream.png — versão creme,
 *     melhor contraste sobre a foto; Revision 2 substitui o "BARB"
 *     tipográfico via CSS por esta imagem real).
 * (3) elipse preta com contorno claro, script "Estúdio Criativo",
 *     sobrepondo levemente a parte de baixo da logo (margin-top
 *     negativo). Revision 5: a elipse ganha uma animação contínua de 3
 *     combinações de cor (ver Hero.module.css, `.ellipse`), desativada
 *     por `prefers-reduced-motion`.
 * (4) subtexto, CAPS LOCK, quebrado em 2 linhas.
 *
 * Revision 7: conteúdo principal ganha entrada com fade via Reveal —
 * mesmo mecanismo de scroll-reveal já usado no resto do site; como a
 * Hero já está visível no carregamento da página, o efeito dispara
 * como um fade-in de entrada. Respeita prefers-reduced-motion
 * (conteúdo nasce visível, sem animação).
 *
 * Revision 9: logo+oval e subtexto ganham cada um seu próprio Reveal
 * (em vez de 1 único bloco) para um fade up escalonado — o subtexto
 * entra com um pequeno atraso (`.subtextReveal`, ver Hero.module.css)
 * depois da marca, em vez de tudo aparecer no mesmo instante.
 */
export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-label="Início">
      <div className={styles.photoLayer}>
        <Image
          src="/images/vanessa-hero.webp"
          alt={HERO.photoAlt}
          width={2400}
          height={1351}
          priority
          sizes="100vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <Reveal className={styles.brandGroup}>
          <Image
            src="/brand/barb-mark-cream.png"
            alt={HERO.logoAlt}
            width={630}
            height={147}
            priority
            className={styles.logo}
          />
          <div className={styles.ellipse}>
            <span className={styles.ellipseLight} aria-hidden="true" />
            <span className={styles.ellipseTexture} aria-hidden="true" />
            <span className={styles.script}>{HERO.scriptText}</span>
          </div>
        </Reveal>
        <Reveal className={styles.subtextReveal}>
          <p className={styles.subtext}>
            <span>{HERO.subtextLine1}</span>
            <span>{HERO.subtextLine2}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
