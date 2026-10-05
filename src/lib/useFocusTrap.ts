"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Prende o foco dentro de `containerRef` enquanto `isActive` for true.
 * Escape chama `onClose`. Ao desativar, o foco retorna ao elemento
 * apontado por `returnFocusRef` (tipicamente o botão que abriu o
 * menu/lightbox) — usado pelo MobileMenu e pelo Lightbox do portfólio.
 */
export function useFocusTrap({
  isActive,
  containerRef,
  onClose,
  returnFocusRef,
}: {
  isActive: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const elementToRestoreFocusTo = returnFocusRef?.current ?? previouslyFocused;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    const focusable = getFocusable();
    (focusable[0] ?? container).focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      elementToRestoreFocusTo?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);
}
