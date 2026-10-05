import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/content/site";
import { isPreviewMode } from "@/lib/preview";
import Reveal from "@/components/ui/Reveal";
import ProvisionalBadge from "@/components/ui/ProvisionalBadge";
import styles from "./Testimonials.module.css";

/**
 * Os 2 depoimentos atuais são 100% fictícios (isPlaceholder: true,
 * publishable: false). Em produção (modo preview desligado), a seção
 * inteira fica oculta até existir ao menos um depoimento real e
 * publicável. Em preview, aparecem com aviso visível.
 */
export default function Testimonials() {
  const preview = isPreviewMode();
  const publishable = TESTIMONIALS.filter((t) => t.publishable);
  const visibleTestimonials = publishable.length > 0 ? publishable : preview ? TESTIMONIALS : [];

  if (visibleTestimonials.length === 0) return null;

  return (
    <section className={`container ${styles.section}`} aria-label="Depoimentos">
      <Reveal>
        <span className={styles.label}>{TESTIMONIALS_SECTION.label}</span>
        <h2 className={styles.title}>{TESTIMONIALS_SECTION.title}</h2>
        <p className={styles.support}>{TESTIMONIALS_SECTION.support}</p>
      </Reveal>

      <div className={styles.grid}>
        {visibleTestimonials.map((testimonial) => (
          <Reveal key={testimonial.id} as="figure" className={styles.card}>
            {testimonial.isPlaceholder && !testimonial.publishable && (
              <span className={styles.badge}>
                <ProvisionalBadge label={TESTIMONIALS_SECTION.placeholderNotice} />
              </span>
            )}
            <blockquote className={styles.quote}>“{testimonial.quote}”</blockquote>
            <figcaption className={styles.author}>
              {testimonial.author} · {testimonial.context}
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
