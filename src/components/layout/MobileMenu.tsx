"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, MICROCOPY } from "@/content/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import styles from "./MobileMenu.module.css";
import headerStyles from "./Header.module.css";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useFocusTrap({
    isActive: isOpen,
    containerRef: panelRef,
    onClose: () => setIsOpen(false),
    returnFocusRef: buttonRef,
  });

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={headerStyles.menuButton}
        aria-expanded={isOpen}
        aria-controls="menu-mobile"
        aria-label={isOpen ? MICROCOPY.menuClose : MICROCOPY.menuOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? MICROCOPY.menuClose : MICROCOPY.menuOpen}
      </button>

      {isOpen && (
        <div
          id="menu-mobile"
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label={MICROCOPY.menuOpen}
        >
          <nav aria-label="Navegação principal">
            <ul className={styles.list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.link}
                    onClick={() => setIsOpen(false)}
                    {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            {MICROCOPY.menuClose}
          </button>
        </div>
      )}
    </>
  );
}
