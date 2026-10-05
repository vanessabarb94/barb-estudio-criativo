"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project, ProjectMedia } from "@/content/projects";
import { MICROCOPY } from "@/content/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import LightboxFrame from "@/components/ui/LightboxFrame";
import styles from "./SocialShowcase.module.css";

/**
 * Revision 10: "vitrine" de Social Media — fundo branco, foco só na
 * grade completa das peças do projeto clicado (nunca cicla entre
 * projetos diferentes).
 *
 * Revision 11: a cliente reportou o resto do site "aparecendo atrás" da
 * vitrine — causa raiz: esta vitrine era renderizada como filha de
 * elementos com `transform` (o wrapper `Reveal`, usado por toda a
 * página), e `position: fixed` dentro de um ancestral com `transform`
 * deixa de ser relativo à viewport (vira relativo a esse ancestral,
 * então "cobre a tela toda" só cobre uma caixa menor, revelando o resto
 * da página ao redor). Corrige renderizando via `createPortal` direto
 * em `document.body` — fora de qualquer ancestral transformado — e
 * trava o scroll do `body` enquanto aberta.
 *
 * Também nesta revisão: `onClose` passa a navegar para a seção
 * Portfólio da home (`/#portfolio`), não só fechar a vitrine — ver
 * CategoryBlock.tsx, que fornece esse `onClose`. Dentro da visão
 * ampliada de uma peça, o "✕" fecha só a visão ampliada (volta pra
 * grade, ação reversível) e um link "Voltar à home" separado chama
 * `onClose` diretamente, sem precisar fechar a grade primeiro.
 * Setas de navegação da visão ampliada ficam ao LADO da arte (não
 * embaixo), para ficar óbvio que dá pra passar pro lado.
 *
 * Revision 13: "próxima"/"anterior" na visão ampliada navegava entre
 * FRAMES de um mesmo carrossel antes de chegar ao próximo post — a
 * cliente quer o padrão Instagram: next/prev troca de POST (tile),
 * nunca de frame dentro do carrossel. A navegação agora opera sobre
 * `tiles` (1 posição por post, carrossel incluso) em vez de `sorted`
 * (1 posição por item, que fragmentava cada frame do carrossel em
 * paradas separadas). Abrir um tile de carrossel pela grade mostra o
 * frame que já estava selecionado ali; next/prev para outro post volta
 * ao primeiro frame desse novo post (mesmo comportamento do feed do
 * Instagram).
 *
 * Revision 15: a peça aberta ficava pequena no mobile. A visão ampliada
 * passa a usar LightboxFrame (compartilhado com Marcas/Apresentações):
 * o post ocupa a largura inteira da tela, como no feed do Instagram,
 * com as setas dentro da arte e swipe para trocar de post.
 */

type Tile =
  | { kind: "single"; item: ProjectMedia; sortedIndex: number }
  | { kind: "carousel"; items: ProjectMedia[]; sortedIndexes: number[] };

function buildTiles(sorted: ProjectMedia[]): Tile[] {
  const tiles: Tile[] = [];
  const seenGroups = new Set<string>();
  sorted.forEach((item, index) => {
    if (item.carouselGroup) {
      if (seenGroups.has(item.carouselGroup)) return;
      seenGroups.add(item.carouselGroup);
      const groupItems: ProjectMedia[] = [];
      const groupIndexes: number[] = [];
      sorted.forEach((m, i) => {
        if (m.carouselGroup === item.carouselGroup) {
          groupItems.push(m);
          groupIndexes.push(i);
        }
      });
      tiles.push({ kind: "carousel", items: groupItems, sortedIndexes: groupIndexes });
    } else {
      tiles.push({ kind: "single", item, sortedIndex: index });
    }
  });
  return tiles;
}

export default function SocialShowcase({
  project,
  onClose,
  returnFocusRef,
}: {
  project: Project;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  // Nunca renderizada durante SSR (só aparece depois de um clique em
  // estado client-side), então `document` sempre existe aqui — sem
  // precisar do dance de "mounted" via useEffect+setState.

  // Trava o scroll do body enquanto a vitrine está aberta.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const sorted = [...project.gallery].sort((a, b) => a.order - b.order);
  const tiles = buildTiles(sorted);

  // `openTile`: índice em `tiles` (1 posição por post). `frame`: só
  // relevante quando esse tile é um carrossel — qual frame mostrar.
  const [openTile, setOpenTileState] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  const openTileRef = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  function openTileAt(tileIndex: number | null, initialFrame = 0) {
    openTileRef.current = tileIndex;
    setOpenTileState(tileIndex);
    setFrame(initialFrame);
  }

  useFocusTrap({
    isActive: true,
    containerRef: dialogRef,
    onClose: () => {
      if (openTileRef.current !== null) openTileAt(null);
      else onClose();
    },
    returnFocusRef,
  });

  // Vídeo nunca abre a visão ampliada (reproduz inline no próprio tile) —
  // navegação da visão ampliada pula tiles de vídeo, mas respeita a
  // ordem da grade entre os demais POSTS (não frames individuais).
  const openableTileIndexes = tiles
    .map((tile, i) => (tile.kind === "single" && tile.item.type === "video" ? -1 : i))
    .filter((i) => i >= 0);

  function goLightbox(delta: number) {
    if (openTile === null || openableTileIndexes.length === 0) return;
    const pos = openableTileIndexes.indexOf(openTile);
    const nextPos = (pos + delta + openableTileIndexes.length) % openableTileIndexes.length;
    // Troca de post sempre mostra o primeiro frame desse post, igual ao
    // feed do Instagram — não carrega o frame que estava aberto antes.
    openTileAt(openableTileIndexes[nextPos], 0);
  }

  const openTileData = openTile !== null ? tiles[openTile] : null;
  const current =
    openTileData === null
      ? null
      : openTileData.kind === "single"
        ? openTileData.item
        : openTileData.items[frame] ?? openTileData.items[0];

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <div
        ref={dialogRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            {MICROCOPY.backToPortfolio}
          </button>
        </div>

        <div className={styles.grid}>
          {tiles.map((tile, tileIndex) =>
            tile.kind === "single" ? (
              <SingleTile
                key={tile.item.id}
                item={tile.item}
                onOpen={() => {
                  if (tile.item.type !== "video") openTileAt(tileIndex);
                }}
              />
            ) : (
              <CarouselTile
                key={tile.items[0].carouselGroup}
                items={tile.items}
                onOpen={(frameIndex) => openTileAt(tileIndex, frameIndex)}
              />
            )
          )}
        </div>
      </div>

      {current && (
        <div
          className={styles.lightboxOverlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) openTileAt(null);
          }}
        >
          <div
            className={styles.lightboxFigure}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <div className={styles.lightboxControls}>
              <button
                type="button"
                className={styles.lightboxBackHome}
                onClick={onClose}
              >
                {MICROCOPY.backToPortfolio}
              </button>
              <button
                type="button"
                className={styles.closeButton}
                aria-label={MICROCOPY.lightboxClose}
                onClick={() => openTileAt(null)}
              >
                ✕
              </button>
            </div>

            <div
              className={styles.lightboxStage}
              onClick={(event) => {
                if (event.target === event.currentTarget) openTileAt(null);
              }}
            >
              {current.src && (
                <LightboxFrame
                  key={current.id}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  onPrev={openableTileIndexes.length > 1 ? () => goLightbox(-1) : undefined}
                  onNext={openableTileIndexes.length > 1 ? () => goLightbox(1) : undefined}
                  counter={
                    openableTileIndexes.length > 1 && openTile !== null
                      ? `${openableTileIndexes.indexOf(openTile) + 1}/${openableTileIndexes.length}`
                      : undefined
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

function SingleTile({ item, onOpen }: { item: ProjectMedia; onOpen: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (item.type === "video") {
    return (
      <div className={styles.tile}>
        {isPlaying ? (
          <video
            className={styles.tileVideo}
            src={item.src}
            poster={item.poster}
            controls
            preload="none"
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            className={styles.videoPosterButton}
            onClick={() => setIsPlaying(true)}
            aria-label={`${MICROCOPY.videoPlay} — ${item.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.poster} alt={item.alt} width={item.width} height={item.height} />
            <span className={styles.playIcon} aria-hidden="true">
              ▶
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <button type="button" className={styles.tile} onClick={onOpen}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.alt} width={item.width} height={item.height} />
    </button>
  );
}

function CarouselTile({
  items,
  onOpen,
}: {
  items: ProjectMedia[];
  onOpen: (frameIndex: number) => void;
}) {
  const [frame, setFrame] = useState(0);
  const current = items[frame];

  function step(delta: number, event: React.MouseEvent) {
    event.stopPropagation();
    setFrame((f) => (f + delta + items.length) % items.length);
  }

  return (
    <div className={styles.tile}>
      <button
        type="button"
        className={styles.carouselImageButton}
        onClick={() => onOpen(frame)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.src} alt={current.alt} width={current.width} height={current.height} />
      </button>
      {items.length > 1 && (
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselButton}
            aria-label={MICROCOPY.lightboxPrev}
            onClick={(event) => step(-1, event)}
          >
            ←
          </button>
          <span className={styles.carouselCount} aria-hidden="true">
            {frame + 1}/{items.length}
          </span>
          <button
            type="button"
            className={styles.carouselButton}
            aria-label={MICROCOPY.lightboxNext}
            onClick={(event) => step(1, event)}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
