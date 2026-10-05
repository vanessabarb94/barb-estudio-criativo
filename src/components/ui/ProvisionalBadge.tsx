import { MICROCOPY } from "@/content/site";
import styles from "./ProvisionalBadge.module.css";

export default function ProvisionalBadge({ label }: { label?: string }) {
  return <span className={styles.badge}>{label ?? MICROCOPY.provisionalBadge}</span>;
}
