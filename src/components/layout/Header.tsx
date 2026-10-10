"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  primaryNavigation,
  secondaryNavigation,
  mainNavigation,
  type NavigationItem,
} from "@/config/navigation";
import Icon from "@/components/ui/Icon";
import Logo from "./Logo";
import { maintenanceConfig } from "@/config/maintenance";
import styles from "./layout.module.css";

interface HeaderProps {
  className?: string;
}

function isActiveRoute(pathname: string, item: NavigationItem): boolean {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavList({
  items,
  pathname,
  linkClassName,
  onNavigate,
}: {
  items: NavigationItem[];
  pathname: string;
  linkClassName: string;
  onNavigate?: () => void;
}) {
  return (
    <ul>
      {items.map((item) => {
        const active = isActiveRoute(pathname, item);
        return (
          <li key={item.href}>
            <Link
              className={`${linkClassName} ${active ? styles.active : ""}`}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname === "/maintenance" || maintenanceConfig.enabled) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  if (pathname === "/maintenance" || maintenanceConfig.enabled) {
    return null;
  }

  const closeMenu = () => setIsMenuOpen(false);

  const headerClassName = [styles.header, isScrolled ? styles.scrolled : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <div className={styles.headerInner}>
        <div className={styles.topRow}>
          <div className={styles.topRowInner}>
            <Logo onNavigate={closeMenu} />

            <nav className={styles.primaryNav} aria-label="Primary navigation">
              <NavList items={primaryNavigation} pathname={pathname} linkClassName={styles.navLink} />
            </nav>

            <div className={styles.headerActions}>
              <button className={styles.searchButton} type="button" aria-label="Search">
                <Icon name="search" />
              </button>
              <Link className={styles.donateButton} href="/donation">
                <span>Donate Now</span>
                <Icon name="arrow" />
              </Link>
            </div>

            <button
              className={styles.menuButton}
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <Icon name={isMenuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.secondaryRow}>
        <nav className={styles.secondaryNav} aria-label="Secondary navigation">
          <NavList items={secondaryNavigation} pathname={pathname} linkClassName={styles.navLinkSecondary} />
        </nav>
      </div>

      <div className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ""}`}>
        <nav id="mobile-navigation" aria-label="Mobile navigation">
          <ul>
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className={`${styles.mobileNavLink} ${isActiveRoute(pathname, item) ? styles.active : ""}`}
                  href={item.href}
                  aria-current={isActiveRoute(pathname, item) ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className={styles.mobileDonateButton} href="/donation" onClick={closeMenu}>
            Donate Now <Icon name="arrow" />
          </Link>
        </nav>
      </div>
    </header>
  );
}