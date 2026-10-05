import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, BRAND } from "@/content/site";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const [left, right] = [NAV_ITEMS.slice(0, 3), NAV_ITEMS.slice(3)];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <nav className={styles.navGroup} aria-label="Navegação principal — início">
          {left.map((item) => (
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

        <Link href="/#home" className={styles.brand} aria-label={BRAND.logoAlt}>
          <Image
            src="/brand/barb-mark-black.png"
            alt={BRAND.logoAlt}
            width={120}
            height={28}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.navGroup} aria-label="Navegação principal — contato">
          {right.map((item) => (
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

        <MobileMenu />
      </div>
    </header>
  );
}
