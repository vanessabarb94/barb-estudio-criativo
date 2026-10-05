"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Entrada discreta (fade/translateY) ao entrar no viewport via
 * IntersectionObserver. Escolha de implementação própria — scroll nativo
 * do navegador, sem scroll hijacking (ver visual-direction.md,
 * Implementation notes). Desabilitada por `prefers-reduced-motion`
 * tanto aqui (JS) quanto em globals.css (CSS), em dupla garantia.
 */
type RevealTag = "div" | "section" | "article" | "figure";

export default function Reveal({
  children,
  as: Component = "div",
  className = "",
}: {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Com prefers-reduced-motion, o conteúdo já nasce visível via OR no
    // className abaixo — nenhum observer é necessário.
    if (reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const isVisible = visible || reducedMotion;

  return (
    <Component
      ref={setRef}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
