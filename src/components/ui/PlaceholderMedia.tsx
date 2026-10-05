import styles from "./PlaceholderMedia.module.css";

/**
 * Placeholder editorial tipográfico — nunca um ícone de imagem quebrada,
 * nunca um banco de imagens. Usado sempre que `src` não está definido em
 * projects.ts/site.ts (fotografia e mídia de portfólio ainda não enviadas
 * pela cliente). O texto é decorativo (o alt real já está no elemento
 * que envolve este componente, quando aplicável) — por isso
 * `aria-hidden`.
 */
export default function PlaceholderMedia({
  text,
  tone = "dark",
  className = "",
}: {
  text: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`${styles.placeholder} ${tone === "light" ? styles["placeholder--light"] : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className={styles.label}>{text}</span>
    </div>
  );
}
