"use client";

import { useState, type ReactNode } from "react";
import { MICROCOPY } from "@/content/site";
import styles from "./Marquee.module.css";

/**
 * Marquee CSS puro (translateX em loop via @keyframes em globals.css),
 * técnica própria documentada em visual-direction.md — não é réplica
 * confirmada do comportamento do template de referência (mecanismo real
 * não pôde ser verificado pela pesquisa, ver research-brief.md).
 *
 * - Conteúdo duplicado uma vez para loop sem salto; a cópia é
 *   `aria-hidden` (texto/itens decorativos não são lidos duas vezes).
 * - Pausa automática no hover/focus-within (CSS) + botão de pausa
 *   sempre visível (não só no hover), com `aria-pressed`.
 * - Nunca captura `wheel`/`touchmove`; `overflow-x` fica contido no
 *   próprio componente, nunca no body.
 */
export default function Marquee({
  children,
  ariaLabel,
  durationSeconds = 36,
}: {
  children: ReactNode;
  ariaLabel: string;
  durationSeconds?: number;
}) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={`marquee ${styles.wrapper} ${isPaused ? "is-paused" : ""}`.trim()}
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <button
        type="button"
        className={styles.pauseButton}
        aria-pressed={isPaused}
        onClick={() => setIsPaused((paused) => !paused)}
      >
        {isPaused ? MICROCOPY.resumeMarquee : MICROCOPY.pauseMarquee}
      </button>

      <div className="marquee__track" role="group" aria-label={ariaLabel}>
        <div style={{ display: "flex" }}>{children}</div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
