"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  HeartHandshake,
  Clock,
} from "lucide-react";
import { maintenanceConfig } from "@/config/maintenance";
import { socialLinks } from "@/config/footer";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./maintenance.module.css";

export default function MaintenancePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshMessage("Checking server status...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className={styles.maintenanceContainer}>
      {/* Ambient warm radial glow */}
      <div className={styles.ambientWarmth} aria-hidden="true" />

      {/* Official Header Bar */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand} aria-label="HRSJM Official Portal">
            <Image
              src="/logo.png"
              alt="HRSJM Official Crest"
              width={48}
              height={40}
              className={styles.logoImage}
              priority
            />
            <div className={styles.brandCopy}>
              <strong className={styles.brandTitle}>HRSJM</strong>
              <small className={styles.brandSubtitle}>
                Human Rights &amp; Social Justice Mission
              </small>
              <span className={styles.brandHindi} lang="hi">
                मानव अधिकार · सामाजिक न्याय
              </span>
            </div>
          </div>

          <div className={styles.headerActions}>
            <a
              href={`tel:${maintenanceConfig.contact.phone}`}
              className={styles.headerHelpline}
              aria-label={`Call Helpline ${maintenanceConfig.contact.phoneDisplay}`}
            >
              <Phone size={14} className={styles.headerHelplineIcon} />
              <span>Helpline: {maintenanceConfig.contact.phoneDisplay}</span>
            </a>

            <div className={styles.statusIndicator} role="status">
              <span className={styles.pulsingDot} aria-hidden="true" />
              <span className={styles.statusBadgeText}>
                {maintenanceConfig.badge}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Announcement Card */}
      <section className={styles.mainContent} aria-labelledby="maintenance-heading">
        <div className={styles.heroCard}>
          <div className={styles.emblemWrapper} aria-hidden="true">
            <Wrench size={38} strokeWidth={1.9} />
          </div>

          <p className={styles.eyebrow}>
            Official System Advisory · आधिकारिक सूचना
          </p>

          <h1 id="maintenance-heading" className={styles.mainHeading}>
            We&apos;ll Be{" "}
            <span className={styles.mainHeadingHighlight}>
              Right Back Shortly
            </span>
          </h1>

          <div className={styles.hindiBadge} lang="hi">
            {maintenanceConfig.hindiTitle}
          </div>

          <p className={styles.description}>
            {maintenanceConfig.description}
          </p>

          {/* Upgrades in Progress Grid */}
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Zap size={22} />
              </div>
              <h2 className={styles.featureTitle}>Platform Speed &amp; Stability</h2>
              <p className={styles.featureDescription}>
                Upgrading server infrastructure to ensure faster response times and reliable 24/7 uptime.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <ShieldCheck size={22} />
              </div>
              <h2 className={styles.featureTitle}>Data Protection &amp; Security</h2>
              <p className={styles.featureDescription}>
                Fortifying grievance submission channels and member records with modern security standards.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <HeartHandshake size={22} />
              </div>
              <h2 className={styles.featureTitle}>Community Services</h2>
              <p className={styles.featureDescription}>
                Streamlining our legal aid assistance, membership registration, and donation workflows.
              </p>
            </div>
          </div>

          {/* Emergency / Immediate Legal Aid Section */}
          <section
            className={styles.emergencySection}
            aria-labelledby="urgent-assistance-title"
          >
            <h2 id="urgent-assistance-title" className={styles.emergencyTitle}>
              Need Immediate Legal Aid or Emergency Assistance?
            </h2>
            <p className={styles.emergencySub}>
              Our frontline team remains available during this scheduled upgrade. If you have an urgent grievance or helpline query, please contact us directly:
            </p>

            <div className={styles.contactCards}>
              <a
                href={`tel:${maintenanceConfig.contact.phone}`}
                className={styles.phoneButton}
                aria-label={`Call Helpline ${maintenanceConfig.contact.phoneDisplay}`}
              >
                <Phone size={16} />
                <span>Call {maintenanceConfig.contact.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${maintenanceConfig.contact.email}`}
                className={styles.emailButton}
                aria-label={`Email ${maintenanceConfig.contact.email}`}
              >
                <Mail size={16} />
                <span>{maintenanceConfig.contact.email}</span>
              </a>

              <span
                className={styles.addressPill}
                title={maintenanceConfig.contact.address}
              >
                <MapPin size={16} />
                <span>Marol Naka, Andheri (E), Mumbai</span>
              </span>
            </div>
          </section>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`${styles.refreshButton} ${
                isRefreshing ? styles.refreshButtonDisabled : ""
              }`}
              aria-label="Refresh page to check if maintenance is complete"
            >
              <RefreshCw
                size={18}
                style={{
                  animation: isRefreshing ? "spin 1s linear infinite" : "none",
                }}
              />
              <span>{isRefreshing ? refreshMessage : "Check Status & Refresh"}</span>
            </button>

            <div className={styles.returnNotice}>
              <Clock size={15} className={styles.returnNoticeIcon} />
              <span>{maintenanceConfig.estimatedReturn}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Official Themed Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTagline}>
            <span>Human Rights</span>
            <span className={styles.taglineSeparator} aria-hidden="true">·</span>
            <span>Dignity</span>
            <span className={styles.taglineSeparator} aria-hidden="true">·</span>
            <span>Justice</span>
            <span className={styles.taglineSeparator} aria-hidden="true">·</span>
            <span>For All</span>
          </div>

          <ul className={styles.socialRow} aria-label="HRSJM Social Media">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={social.placeholder ? (e) => e.preventDefault() : undefined}
                >
                  <Icon name={social.icon as IconName} width={16} height={16} />
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Human Rights &amp; Social Justice Mission (HRSJM). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
