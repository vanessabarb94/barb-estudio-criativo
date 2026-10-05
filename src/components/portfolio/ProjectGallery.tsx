"use client";

import { useRef, useState } from "react";
import type { ProjectMedia } from "@/content/projects";
import { MICROCOPY } from "@/content/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import styles from "./ProjectGallery.module.css";

/**
 * Lightbox: overlay escuro, imagem central sem deformação
 * (object-fit: contain), setas de navegação, botão fechar. Fecha por
 * Escape, clique no backdrop ou botão; foco preso dentro enquanto
 * aberto (useFocusTrap) e devolvido ao thumbnail de origem ao fechar.
 *
 * Revision 12: setas de navegação ao LADO da imagem (não embaixo) —
 * mesmo padrão adotado na vitrine de Social Media (SocialShowcase),
 * agora consistente nas 3 categorias (Marcas, Social Media,
 * Apresentações), a pedido da cliente.
 */
export default function ProjectGallery({ items }: { items: ProjectMedia[] }) {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  useFocusTrap({
    isActive: openIndex !== null,
    containerRef: dialogRef,
    onClose: () => setOpenIndex(null),
    returnFocusRef: activeTriggerRef,
  });

  function openAt(index: number) {
    activeTriggerRef.current = triggerRefs.current[index] ?? null;
    setOpenIndex(index);
  }

  function goTo(delta: number) {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + sorted.length) % sorted.length;
    });
  }

  const current = openIndex !== null ? sorted[openIndex] : null;

  return (
    <>
      <div className={styles.grid}>
        {sorted.map((media, index) => (
          <button
            key={media.id}
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            type="button"
            className={styles.thumbButton}
            onClick={() => openAt(index)}
          >
            {media.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.src} alt={media.alt} width={media.width} height={media.height} />
            ) : (
              <PlaceholderMedia text={media.alt} />
            )}
          </button>
        ))}
      </div>

      {current && (
        <div
          className={styles.overlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpenIndex(null);
          }}
        >
          <div
            ref={dialogRef}
            className={styles.figure}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.closeButton}
                aria-label={MICROCOPY.lightboxClose}
                onClick={() => setOpenIndex(null)}
              >
                ✕
              </button>
            </div>

            <div className={styles.stage}>
              {sorted.length > 1 && (
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.navButtonLeft}`}
                  aria-label={MICROCOPY.lightboxPrev}
                  onClick={() => goTo(-1)}
                >
                  ←
                </button>
              )}

              {current.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  className={styles.media}
                />
              ) : (
                <div className={styles.placeholderMedia}>
                  <PlaceholderMedia text={current.alt} />
                </div>
              )}

              {sorted.length > 1 && (
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.navButtonRight}`}
                  aria-label={MICROCOPY.lightboxNext}
                  onClick={() => goTo(1)}
                >
                  →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
