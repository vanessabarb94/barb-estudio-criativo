import { CONTACT } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import styles from "./Contact.module.css";

/**
 * Revision 2: formulário de contato removido por completo (nome/
 * telefone, validação, /api/contact, envio de e-mail). No lugar, um
 * CTA forte que leva direto ao WhatsApp da Vanessa — sem campos.
 */
export default function Contact() {
  return (
    <section
      id="contato"
      className={`${styles.section} on-dark textured-dark-bg`}
      aria-label="Contato"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <h2 className={styles.title}>{CONTACT.title}</h2>
          <p className={styles.body}>{CONTACT.body}</p>
          <a
            href={CONTACT.ctaHref}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.cta}
          >
            {CONTACT.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
