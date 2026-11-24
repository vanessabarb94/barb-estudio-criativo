"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Revision 17 (desempenho): vídeo curto, mudo e em loop (ex. post
 * animado da IAM & Co.) que só é baixado quando chega perto da tela e
 * pausa quando sai dela. Antes, o vídeo era baixado inteiro assim que a
 * página abria, mesmo com o card fora da tela. Até tocar, mostra o
 * poster. Com "reduzir movimento" ligado no sistema, fica só no poster.
 */
export default function LazyLoopVideo({
  src,
  poster,
  label,
  width,
  height,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldLoad = visible && !reducedMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldLoad) {
      el.play().catch(() => {
        /* autoplay bloqueado: o poster continua visível */
      });
    } else {
      el.pause();
    }
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      className={className}
      // `src` só é definido quando o vídeo está perto da tela.
      src={shouldLoad ? src : undefined}
      poster={poster}
      aria-label={label}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
