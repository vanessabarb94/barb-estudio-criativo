import type { ReactNode } from "react";
import styles from "./Marquee.module.css";

/**
 * Marquee CSS puro (translateX em loop via @keyframes em globals.css),
 * técnica própria documentada em visual-direction.md — não é réplica
 * confirmada do comportamento do template de referência (mecanismo real
 * não pôde ser verificado pela pesquisa, ver research-brief.md).
 *
 * - Conteúdo duplicado uma vez para loop sem salto; a cópia é
 *   `aria-hidden` (texto/itens decorativos não são lidos duas vezes).
 * - Pausa automática no hover/focus-within (CSS) e animação desligada
 *   com prefers-reduced-motion. Sem botão de pausa visível (pedido da
 *   cliente: no mobile ele cobria o conteúdo).
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
  return (
    <div
      className={`marquee ${styles.wrapper}`}
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <div className="marquee__track" role="group" aria-label={ariaLabel}>
        <div style={{ display: "flex" }}>{children}</div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
