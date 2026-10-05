import Link from "next/link";
import Image from "next/image";
import { FOOTER, NAV_ITEMS } from "@/content/site";
import styles from "./Footer.module.css";

/**
 * Revision 2: rodapé reestruturado em 3 colunas — nav (esquerda), logo
 * "barb." sem "Estúdio Criativo" (centro, versão creme por ser fundo
 * escuro), frase de impacto (direita). "Contato" nos links de nav vira
 * o CTA de WhatsApp (NAV_ITEMS já traz `external: true` para esse item).
 *
 * Instagram/e-mail só renderizam com valor real configurado — nunca um
 * href="#" fingindo destino. As env vars são opcionais e ficam
 * pendentes de preenchimento pela cliente (ver README/.env.example).
 */
export default function Footer() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const hasChannels = instagramUrl || contactEmail;
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} on-dark textured-dark-bg`}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.nav} aria-label="Navegação do rodapé">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.logoColumn}>
          <Image
            src="/brand/barb-mark-cream.png"
            alt={FOOTER.logoAlt}
            width={210}
            height={49}
            className={styles.logo}
          />
        </div>

        <p className={styles.tagline}>{FOOTER.tagline}</p>
      </div>

      {hasChannels && (
        <div className={`container ${styles.channels}`}>
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
          )}
          {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
        </div>
      )}

      <div className={`container ${styles.bottom}`}>
        {FOOTER.creditPrefix} {year} {FOOTER.creditSuffix}
      </div>
    </footer>
  );
}
