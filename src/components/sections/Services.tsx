import Link from "next/link";
import { SERVICES, SERVICES_CTA_LABEL } from "@/content/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Reveal from "@/components/ui/Reveal";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section
      id="servicos"
      className={`${styles.section} on-dark section-radius-top textured-dark-bg`}
      aria-label="Serviços"
    >
      <div className="container">
        {SERVICES.map((service) => (
          <Reveal key={service.slug} as="article" className={styles.row}>
            <span className={styles.index} aria-hidden="true">
              [{service.index}]
            </span>
            <div className={styles.titleGroup}>
              <h3 className={service.isScript ? styles.titleScript : styles.title}>
                {service.title}
              </h3>
              <p className={styles.description}>{service.description}</p>
              <Link
                href={getWhatsAppLink(
                  `Olá! Vim pelo site da BARB e quero conversar sobre o serviço de ${service.title}.`
                )}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.cta}
              >
                {SERVICES_CTA_LABEL}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
