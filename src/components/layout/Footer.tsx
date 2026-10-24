"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactItems, legalLinks, quickLinks, socialLinks, usefulLinks, type FooterLink } from "@/config/footer";
import Icon, { type IconName } from "@/components/ui/Icon";
import Logo from "./Logo";
import { maintenanceConfig } from "@/config/maintenance";
import styles from "./layout.module.css";

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <ul className={styles.footerLinks}>
      {links.map((link) => (
        <li key={link.href + link.label}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (pathname === "/maintenance" || maintenanceConfig.enabled) return;
    const handleScroll = () => setShowBackToTop(window.scrollY > 320);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname === "/maintenance" || maintenanceConfig.enabled) {
    return null;
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <section className={styles.brandColumn} aria-labelledby="footer-brand-heading">
          <h2 id="footer-brand-heading" className={styles.visuallyHidden}>HRSJM</h2>
          <Logo />
          <p>Working for human rights, dignity, equality and social justice for all.</p>
          <ul className={styles.socialLinks} aria-label="Social media">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={`${social.label}${social.placeholder ? " (link pending)" : ""}`}
                  onClick={social.placeholder ? (event) => event.preventDefault() : undefined}
                >
                  <Icon name={social.icon as IconName} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.footerColumn} aria-labelledby="quick-links-heading">
          <h2 id="quick-links-heading">Quick Links</h2>
          <FooterLinks links={quickLinks} />
        </section>

        <section className={styles.footerColumn} aria-labelledby="useful-links-heading">
          <h2 id="useful-links-heading">Useful Links</h2>
          <FooterLinks links={usefulLinks} />
        </section>

        <section className={styles.footerColumn} aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact Us</h2>
          <ul className={styles.contactList}>
            {contactItems.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.tagline} aria-label="HRSJM tagline">
          <span>Human Rights</span>
          <span>Dignity</span>
          <span>Justice</span>
          <span>For All</span>
        </aside>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 HRSJM. All rights reserved.</p>
        <nav aria-label="Legal navigation">
          <ul>
            {legalLinks.map((link) => {
              const cleanHref = link.href.replace(/\/$/, "");
              const cleanPath = pathname?.replace(/\/$/, "");
              const isActive = cleanPath === cleanHref;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive ? styles.legalLinkActive : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          className={`${styles.backToTop} ${showBackToTop ? styles.backToTopVisible : ""}`}
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          Back to Top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
