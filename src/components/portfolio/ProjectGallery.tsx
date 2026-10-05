"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectMedia } from "@/content/projects";
import { MICROCOPY } from "@/content/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import LightboxFrame from "@/components/ui/LightboxFrame";
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
 *
 * Revision 15: a arte aberta ficava minúscula no mobile (~1/3 da
 * largura). A visão ampliada passa a usar LightboxFrame (arte no
 * tamanho máximo, setas dentro da arte, swipe), o mesmo da vitrine de
 * Social Media. Renderizada via portal em document.body e com o
 * scroll da página travado enquanto aberta.
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
  const isOpen = current !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const hasMany = sorted.length > 1;

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

      {current &&
        createPortal(
          <div
            className={styles.overlay}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpenIndex(null);
            }}
          >
            <div
              ref={dialogRef}
              className={styles.dialog}
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

              <div
                className={styles.stage}
                onClick={(event) => {
                  if (event.target === event.currentTarget) setOpenIndex(null);
                }}
              >
                {current.src ? (
                  <LightboxFrame
                    key={current.id}
                    src={current.src}
                    alt={current.alt}
                    width={current.width}
                    height={current.height}
                    onPrev={hasMany ? () => goTo(-1) : undefined}
                    onNext={hasMany ? () => goTo(1) : undefined}
                    counter={hasMany ? `${(openIndex ?? 0) + 1}/${sorted.length}` : undefined}
                  />
                ) : (
                  <div className={styles.placeholderMedia}>
                    <PlaceholderMedia text={current.alt} />
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
