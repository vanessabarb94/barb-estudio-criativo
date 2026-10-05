"use client";

import { useRef } from "react";
import { MICROCOPY } from "@/content/site";
import styles from "./LightboxFrame.module.css";

/**
 * Revision 15: moldura única da visão ampliada — usada por TODAS as
 * galerias do site (Marcas e Apresentações via ProjectGallery, Social
 * Media via SocialShowcase), para que o comportamento seja o mesmo em
 * qualquer categoria.
 *
 * - A arte ocupa o máximo possível sem deformar: a largura é o menor
 *   valor entre a largura disponível e (altura disponível x proporção
 *   da arte). No mobile isso é a largura inteira da tela, borda a borda
 *   — um post 4:5 de Social Media fica do tamanho de um post no feed do
 *   Instagram.
 * - Setas DENTRO da arte (sobrepostas nas laterais), em vez de ao lado
 *   — ao lado, elas roubavam ~120px de largura da imagem no mobile.
 * - Deslizar o dedo para os lados também troca de peça.
 */
export default function LightboxFrame({
  src,
  alt,
  width,
  height,
  onPrev,
  onNext,
  counter,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onPrev?: () => void;
  onNext?: () => void;
  counter?: string;
}) {
  const ratio = width && height ? width / height : 4 / 5;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext?.();
    else onPrev?.();
  }

  return (
    <div
      className={styles.frame}
      style={{ "--ar": ratio } as React.CSSProperties}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={handleTouchEnd}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} className={styles.media} />

      {onPrev && (
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label={MICROCOPY.lightboxPrev}
          onClick={onPrev}
        >
          ←
        </button>
      )}
      {onNext && (
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label={MICROCOPY.lightboxNext}
          onClick={onNext}
        >
          →
        </button>
      )}
      {counter && (
        <span className={styles.counter} aria-hidden="true">
          {counter}
        </span>
      )}
    </div>
  );
}
