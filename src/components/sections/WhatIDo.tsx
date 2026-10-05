import Link from "next/link";
import { WHAT_I_DO } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import styles from "./WhatIDo.module.css";

export default function WhatIDo() {
  return (
    <section className={`container ${styles.section}`} aria-label="O que faço">
      <Reveal>
        <span className={styles.label}>{WHAT_I_DO.label}</span>
        <p className={styles.body}>{WHAT_I_DO.body}</p>
        <Link
          href={WHAT_I_DO.ctaHref}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.cta}
        >
          {WHAT_I_DO.ctaLabel}
        </Link>
      </Reveal>
    </section>
  );
}
