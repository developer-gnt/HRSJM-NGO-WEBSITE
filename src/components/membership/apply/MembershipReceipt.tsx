"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Check,
  Calendar,
  User,
  Users,
  FileText,
  AlertTriangle,
  Phone,
  Mail,
  Globe,
  Printer,
  X,
  Clock,
} from "lucide-react";
import styles from "./membershipReceipt.module.css";

export interface MembershipReceiptProps {
  applicationRef: string;
  applicantName: string;
  applicantEmail?: string;
  applicantPhone?: string;
  applicantAddress?: string;
  packageName: string;
  packageFee: string;
  submittedAt: string;
  paymentStatus?: string;
  applicationStatus?: string;
  autoPrint?: boolean;
  onClose?: () => void;
}

export default function MembershipReceipt({
  applicationRef,
  applicantName,
  applicantEmail = "sahil.shaikh@example.com",
  applicantPhone = "+91 9876543210",
  applicantAddress = "Mumbai, Maharashtra, India",
  packageName,
  packageFee,
  submittedAt,
  paymentStatus = "Confirmed Paid",
  applicationStatus = "Applied (Pending Review)",
  autoPrint = false,
  onClose,
}: MembershipReceiptProps) {
  const handlePrint = () => {
    if (typeof window === "undefined") return;

    // Clean up any existing print iframe
    const oldIframe = document.getElementById("receipt-print-frame");
    if (oldIframe) oldIframe.remove();

    // Create an offscreen iframe with standard A4 dimensions (794px x 1123px)
    // NOTE: Do NOT use visibility:hidden or 0x0 width/height, as Chromium ignores hidden iframes in print previews!
    const iframe = document.createElement("iframe");
    iframe.id = "receipt-print-frame";
    iframe.style.position = "fixed";
    iframe.style.left = "-10000px";
    iframe.style.top = "0";
    iframe.style.width = "794px";
    iframe.style.height = "1123px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const cleanFee = packageFee.startsWith("₹") ? packageFee : `₹${packageFee}`;
    const cleanPhone = applicantPhone.startsWith("+") ? applicantPhone : `+91 ${applicantPhone}`;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Membership Receipt - ${applicationRef}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 4mm 6mm !important;
            }
            *, *::before, *::after {
              box-sizing: border-box !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              color: #0f172a !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            }
            .receipt-container {
              position: relative;
              width: 100%;
              max-width: 760px;
              margin: 0 auto;
              background: #ffffff;
              padding: 16px 24px 10px 24px;
              box-sizing: border-box;
              page-break-after: avoid !important;
              page-break-inside: avoid !important;
              break-after: avoid !important;
              break-inside: avoid !important;
            }
            .top-corner {
              position: absolute;
              top: 0;
              right: 0;
              width: 76px;
              height: 76px;
              background: linear-gradient(135deg, #dfa544 0%, #c68a2c 100%);
              clip-path: polygon(100% 0, 0 0, 100% 100%);
            }
            .header-flex {
              display: flex;
              align-items: center;
              gap: 14px;
              margin-bottom: 6px;
            }
            .logo-img {
              width: 56px;
              height: 56px;
              object-fit: contain;
            }
            .org-eng {
              font-size: 15px;
              font-weight: 800;
              color: #0b2545;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              line-height: 1.25;
              margin: 0;
            }
            .org-hin {
              font-size: 13px;
              font-weight: 700;
              color: #334155;
              margin: 2px 0 0 0;
              line-height: 1.3;
            }
            .gold-rule {
              height: 2.5px;
              background: #c68a2c;
              margin: 8px 0 12px 0;
              border: none;
            }
            .title-box {
              text-align: center;
              margin-bottom: 10px;
            }
            .main-title {
              font-size: 20px;
              font-weight: 800;
              letter-spacing: 0.6px;
              margin: 0 0 3px 0;
              text-transform: uppercase;
            }
            .navy-text { color: #0b2545; }
            .gold-text { color: #c68a2c; margin-left: 5px; }
            .sub-title {
              font-size: 11.5px;
              color: #475569;
              line-height: 1.4;
              margin: 0 auto;
              max-width: 600px;
            }
            .success-banner {
              background: #ecfdf5;
              border: 1px solid #a7f3d0;
              border-radius: 6px;
              padding: 7px 12px;
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 10px;
            }
            .check-badge {
              width: 24px;
              height: 24px;
              background: #059669;
              color: #ffffff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              font-size: 13px;
              flex-shrink: 0;
            }
            .success-title {
              font-size: 12px;
              font-weight: 800;
              color: #047857;
              letter-spacing: 0.3px;
              text-transform: uppercase;
              margin: 0 0 1px 0;
            }
            .success-desc {
              font-size: 11px;
              color: #065f46;
              margin: 0;
            }
            .meta-bar {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              padding: 7px 14px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .meta-label {
              font-size: 10.5px;
              color: #64748b;
              font-weight: 600;
              margin-bottom: 2px;
            }
            .meta-ref {
              font-size: 15px;
              font-weight: 800;
              color: #0b2545;
              letter-spacing: 0.5px;
              margin: 0;
            }
            .meta-date {
              font-size: 12.5px;
              font-weight: 700;
              color: #0b2545;
              margin: 0;
            }
            .section-card {
              margin-bottom: 10px;
            }
            .card-header {
              background: #0b2545;
              color: #ffffff;
              padding: 5px 12px;
              border-radius: 4px 4px 0 0;
              font-weight: 700;
              font-size: 12px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .card-body {
              border: 1px solid #e2e8f0;
              border-top: none;
              border-radius: 0 0 4px 4px;
              padding: 2px 12px;
              background: #ffffff;
            }
            .data-row {
              display: flex;
              align-items: center;
              padding: 4px 0;
              border-bottom: 1px solid #f1f5f9;
              font-size: 11.5px;
            }
            .data-row:last-child {
              border-bottom: none;
            }
            .data-label {
              width: 150px;
              flex-shrink: 0;
              color: #475569;
              font-weight: 500;
            }
            .data-colon {
              width: 18px;
              flex-shrink: 0;
              color: #94a3b8;
              font-weight: 600;
            }
            .data-val {
              flex: 1;
              color: #0f172a;
              font-weight: 600;
            }
            .data-val-bold {
              font-weight: 800;
              color: #0b2545;
            }
            .badge-paid {
              display: inline-block;
              background: #dcfce7;
              color: #15803d;
              font-weight: 700;
              font-size: 10.5px;
              padding: 2px 9px;
              border-radius: 12px;
              border: 1px solid #bbf7d0;
            }
            .badge-pending {
              display: inline-block;
              background: #fef3c7;
              color: #b45309;
              font-weight: 700;
              font-size: 10.5px;
              padding: 2px 9px;
              border-radius: 12px;
              border: 1px solid #fde68a;
            }
            .notes-columns {
              display: grid;
              grid-template-columns: 1.15fr 1fr;
              gap: 10px;
              margin-bottom: 10px;
            }
            .steps-box {
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              border-radius: 6px;
              padding: 8px 12px;
            }
            .steps-heading {
              font-size: 11.5px;
              font-weight: 800;
              color: #0b2545;
              margin: 0 0 5px 0;
              letter-spacing: 0.2px;
            }
            .step-entry {
              display: flex;
              align-items: flex-start;
              gap: 7px;
              font-size: 11px;
              color: #334155;
              line-height: 1.35;
              margin-bottom: 4px;
            }
            .step-badge {
              flex-shrink: 0;
              width: 15px;
              height: 15px;
              background: #1e3a8a;
              color: #ffffff;
              border-radius: 50%;
              font-size: 9.5px;
              font-weight: 700;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .caution-box {
              background: #fffbeb;
              border: 1px solid #fde68a;
              border-radius: 6px;
              padding: 8px 12px;
            }
            .caution-heading {
              font-size: 11.5px;
              font-weight: 800;
              color: #b45309;
              margin: 0 0 5px 0;
              letter-spacing: 0.2px;
            }
            .caution-text {
              font-size: 10.5px;
              color: #78350f;
              line-height: 1.4;
              margin: 0;
            }
            .footer-line {
              height: 1.5px;
              background: #c68a2c;
              margin: 8px 0 6px 0;
              border: none;
            }
            .footer-flex {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .brand-left {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .footer-logo {
              width: 36px;
              height: 36px;
              object-fit: contain;
            }
            .footer-org-eng {
              font-size: 10.5px;
              font-weight: 800;
              color: #0b2545;
              line-height: 1.25;
              margin: 0;
            }
            .footer-org-hin {
              font-size: 9.5px;
              font-weight: 700;
              color: #475569;
              margin: 1px 0 0 0;
            }
            .contacts-right {
              display: flex;
              flex-direction: column;
              gap: 2px;
              font-size: 10px;
              color: #334155;
              font-weight: 500;
              text-align: right;
            }
            .bottom-bar {
              background: #0b2545;
              color: #cbd5e1;
              padding: 4px 10px;
              border-radius: 3px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 9.5px;
              margin-top: 6px;
            }
            .bottom-bar-bold {
              font-weight: 600;
              color: #ffffff;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="top-corner"></div>

            <!-- Header -->
            <div class="header-flex">
              <img src="/logo.png" class="logo-img" alt="HRSJM Logo" />
              <div>
                <h1 class="org-eng">Human Rights &amp; Social Justice Mission</h1>
                <p class="org-hin">मानव अधिकार · सामाजिक न्याय</p>
              </div>
            </div>

            <div class="gold-rule"></div>

            <!-- Title -->
            <div class="title-box">
              <h2 class="main-title">
                <span class="navy-text">MEMBERSHIP APPLICATION</span>
                <span class="gold-text">RECEIPT</span>
              </h2>
              <p class="sub-title">
                Thank you for applying to Human Rights &amp; Social Justice Mission (HRSJM).<br/>
                Your application has been received and our team will get in touch with you soon.
              </p>
            </div>

            <!-- Green Banner -->
            <div class="success-banner">
              <div class="check-badge">&#10003;</div>
              <div>
                <div class="success-title">APPLICATION SUBMITTED SUCCESSFULLY</div>
                <div class="success-desc">Your application is received and is under review.</div>
              </div>
            </div>

            <!-- Meta Bar -->
            <div class="meta-bar">
              <div>
                <div class="meta-label">Application Reference No.</div>
                <div class="meta-ref">${applicationRef}</div>
              </div>
              <div style="text-align: right;">
                <div class="meta-label">&#128197; Submitted On</div>
                <div class="meta-date">${formattedDate}</div>
              </div>
            </div>

            <!-- Applicant Details -->
            <div class="section-card">
              <div class="card-header">&#128100; Applicant Details</div>
              <div class="card-body">
                <div class="data-row">
                  <div class="data-label">Full Name</div>
                  <div class="data-colon">:</div>
                  <div class="data-val">${applicantName}</div>
                </div>
                <div class="data-row">
                  <div class="data-label">Email Address</div>
                  <div class="data-colon">:</div>
                  <div class="data-val">${applicantEmail}</div>
                </div>
                <div class="data-row">
                  <div class="data-label">Phone Number</div>
                  <div class="data-colon">:</div>
                  <div class="data-val">${cleanPhone}</div>
                </div>
                <div class="data-row">
                  <div class="data-label">Address</div>
                  <div class="data-colon">:</div>
                  <div class="data-val">${applicantAddress}</div>
                </div>
              </div>
            </div>

            <!-- Membership Details -->
            <div class="section-card">
              <div class="card-header">&#128101; Membership Details</div>
              <div class="card-body">
                <div class="data-row">
                  <div class="data-label">Membership Package</div>
                  <div class="data-colon">:</div>
                  <div class="data-val data-val-bold">${packageName}</div>
                </div>
                <div class="data-row">
                  <div class="data-label">Registration Fee</div>
                  <div class="data-colon">:</div>
                  <div class="data-val data-val-bold">${cleanFee}</div>
                </div>
                <div class="data-row">
                  <div class="data-label">Payment Status</div>
                  <div class="data-colon">:</div>
                  <div class="data-val">
                    <span class="badge-paid">&#10003; ${paymentStatus}</span>
                  </div>
                </div>
                <div class="data-row">
                  <div class="data-label">Application Status</div>
                  <div class="data-colon">:</div>
                  <div class="data-val">
                    <span class="badge-pending">&#9200; ${applicationStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes Grid -->
            <div class="notes-columns">
              <div class="steps-box">
                <div class="steps-heading">&#128196; WHAT HAPPENS NEXT?</div>
                <div class="step-entry">
                  <span class="step-badge">1</span>
                  <span>Our team will review your application details.</span>
                </div>
                <div class="step-entry">
                  <span class="step-badge">2</span>
                  <span>You will be informed about the status via email or phone.</span>
                </div>
                <div class="step-entry">
                  <span class="step-badge">3</span>
                  <span>Keep your application reference number for future communication.</span>
                </div>
              </div>
              <div class="caution-box">
                <div class="caution-heading">&#9888; IMPORTANT NOTE</div>
                <p class="caution-text">
                  This receipt confirms submission of your membership application and fee payment. Final approval is subject to verification by the HRSJM team.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer-line"></div>
            <div class="footer-flex">
              <div class="brand-left">
                <img src="/logo.png" class="footer-logo" alt="HRSJM Logo" />
                <div>
                  <div class="footer-org-eng">HUMAN RIGHTS &amp; SOCIAL JUSTICE MISSION</div>
                  <div class="footer-org-hin">मानव अधिकार · सामाजिक न्याय</div>
                </div>
              </div>
              <div class="contacts-right">
                <div>&#128222; +91 7021057853</div>
                <div>&#9993; info@hrsjm.org</div>
                <div>&#127760; www.hrsjm.org</div>
              </div>
            </div>

            <div class="bottom-bar">
              <span>&copy; 2026 HRSJM. All rights reserved.</span>
              <span class="bottom-bar-bold">Human rights for everyone.</span>
            </div>
          </div>
        </body>
      </html>
    `);
    doc.close();

    // Give browser brief tick to parse HTML and render image, then trigger print
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        window.print();
      }
    }, 280);
  };

  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  // Format date: e.g. "27 Oct 2026, 6:12 pm"
  const formattedDate = (() => {
    try {
      const d = new Date(submittedAt);
      if (isNaN(d.getTime())) return submittedAt;
      const day = d.getDate();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[d.getMonth()];
      const year = d.getFullYear();
      let hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    } catch {
      return submittedAt;
    }
  })();

  const cleanFee = packageFee.startsWith("₹") ? packageFee : `₹${packageFee}`;

  return (
    <div className={styles.receiptModalOverlay} role="dialog" aria-modal="true">
      {/* Top action toolbar for user in browser */}
      <div className={styles.receiptToolbar}>
        <div className={styles.toolbarTitle}>
          <FileText size={18} color="#0B2545" />
          <span>Official Membership Application Receipt</span>
        </div>
        <div className={styles.toolbarActions}>
          <button
            type="button"
            className={styles.btnPrint}
            onClick={handlePrint}
            title="Print or Save as PDF"
          >
            <Printer size={15} />
            <span>Print Receipt</span>
          </button>
          {onClose && (
            <button
              type="button"
              className={styles.btnClose}
              onClick={onClose}
              title="Close Receipt"
            >
              <X size={15} />
              <span>Close</span>
            </button>
          )}
        </div>
      </div>

      {/* The Printable Official Receipt Document */}
      <div id="membership-printable-receipt" className={styles.receiptPaper}>
        {/* Top-Right Decorative Polygon Accent */}
        <div className={styles.topCornerAccent} aria-hidden="true" />

        {/* 1. Brand Header */}
        <div className={styles.receiptHeader}>
          <div className={styles.logoWrap}>
            <Image
              src="/logo.png"
              alt="HRSJM Emblem"
              width={68}
              height={68}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.orgTitles}>
            <h1 className={styles.orgNameEnglish}>
              Human Rights &amp; Social Justice Mission
            </h1>
            <p className={styles.orgNameHindi}>
              मानव अधिकार · सामाजिक न्याय
            </p>
          </div>
        </div>

        {/* Gold Accent Divider */}
        <div className={styles.goldDivider} />

        {/* 2. Receipt Title & Subtitle */}
        <div className={styles.receiptTitleWrap}>
          <h2 className={styles.receiptMainTitle}>
            <span className={styles.titleNavy}>MEMBERSHIP APPLICATION</span>
            <span className={styles.titleGold}>RECEIPT</span>
          </h2>
          <p className={styles.receiptSubtitle}>
            Thank you for applying to Human Rights &amp; Social Justice Mission (HRSJM).
            <br />
            Your application has been received and our team will get in touch with you soon.
          </p>
        </div>

        {/* 3. Success Green Banner */}
        <div className={styles.successBanner}>
          <div className={styles.successCheckIcon}>
            <Check size={18} strokeWidth={3} />
          </div>
          <div className={styles.successTextGroup}>
            <span className={styles.successHeading}>
              APPLICATION SUBMITTED SUCCESSFULLY
            </span>
            <span className={styles.successSubtext}>
              Your application is received and is under review.
            </span>
          </div>
        </div>

        {/* 4. Reference Number & Submitted Date Bar */}
        <div className={styles.metaRow}>
          <div className={styles.metaItemLeft}>
            <span className={styles.metaLabel}>Application Reference No.</span>
            <p className={styles.metaRefValue}>{applicationRef}</p>
          </div>
          <div className={styles.metaItemRight}>
            <div className={styles.calendarIconWrap}>
              <Calendar size={22} strokeWidth={2.2} />
            </div>
            <div className={styles.metaDateGroup}>
              <span className={styles.metaLabel}>Submitted On</span>
              <p className={styles.metaDateValue}>{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* 5. Section: Applicant Details */}
        <div className={styles.detailsCard}>
          <div className={styles.cardHeaderBar}>
            <User size={16} className={styles.headerBarIcon} />
            <span>Applicant Details</span>
          </div>
          <div className={styles.tableBody}>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Full Name</span>
              <span className={styles.rowColon}>:</span>
              <span className={styles.rowValue}>{applicantName}</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Email Address</span>
              <span className={styles.rowColon}>:</span>
              <span className={styles.rowValue}>{applicantEmail}</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Phone Number</span>
              <span className={styles.rowColon}>:</span>
              <span className={styles.rowValue}>
                {applicantPhone.startsWith("+") ? applicantPhone : `+91 ${applicantPhone}`}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Address</span>
              <span className={styles.rowColon}>:</span>
              <span className={styles.rowValue}>{applicantAddress}</span>
            </div>
          </div>
        </div>

        {/* 6. Section: Membership Details */}
        <div className={styles.detailsCard}>
          <div className={styles.cardHeaderBar}>
            <Users size={16} className={styles.headerBarIcon} />
            <span>Membership Details</span>
          </div>
          <div className={styles.tableBody}>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Membership Package</span>
              <span className={styles.rowColon}>:</span>
              <span className={`${styles.rowValue} ${styles.valueBold}`}>
                {packageName}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Registration Fee</span>
              <span className={styles.rowColon}>:</span>
              <span className={`${styles.rowValue} ${styles.valueBold}`}>
                {cleanFee}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Payment Status</span>
              <span className={styles.rowColon}>:</span>
              <div className={styles.rowValue}>
                <span className={styles.badgePaid}>
                  <Check size={13} strokeWidth={3} />
                  <span>{paymentStatus}</span>
                </span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.rowLabel}>Application Status</span>
              <span className={styles.rowColon}>:</span>
              <div className={styles.rowValue}>
                <span className={styles.badgePending}>
                  <Clock size={13} strokeWidth={2.4} />
                  <span>{applicationStatus}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Bottom Next Steps & Note Grid */}
        <div className={styles.notesGrid}>
          {/* Next Steps Box */}
          <div className={styles.nextStepsBox}>
            <h4 className={styles.boxHeaderNavy}>
              <FileText size={16} />
              <span>WHAT HAPPENS NEXT?</span>
            </h4>
            <div className={styles.stepsList}>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>1</span>
                <span>Our team will review your application details.</span>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>2</span>
                <span>You will be informed about the status via email or phone.</span>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>3</span>
                <span>
                  Keep your application reference number for future communication.
                </span>
              </div>
            </div>
          </div>

          {/* Important Note Box */}
          <div className={styles.noteBox}>
            <h4 className={styles.boxHeaderGold}>
              <AlertTriangle size={16} />
              <span>IMPORTANT NOTE</span>
            </h4>
            <p className={styles.noteText}>
              This receipt confirms submission of your membership application and
              fee payment. Final approval is subject to verification by the HRSJM
              team.
            </p>
          </div>
        </div>

        {/* 8. Footer Section */}
        <div className={styles.footerSection}>
          <div className={styles.footerGoldLine} />
          <div className={styles.footerContactsRow}>
            <div className={styles.footerOrgBrand}>
              <Image
                src="/logo.png"
                alt="HRSJM Emblem"
                width={44}
                height={44}
                className={styles.footerLogoImg}
              />
              <div className={styles.footerOrgNames}>
                <span className={styles.footerOrgEng}>
                  HUMAN RIGHTS &amp; SOCIAL JUSTICE MISSION
                </span>
                <span className={styles.footerOrgHin}>
                  मानव अधिकार · सामाजिक न्याय
                </span>
              </div>
            </div>
            <div className={styles.footerContactList}>
              <div className={styles.footerContactItem}>
                <Phone size={13} className={styles.contactIcon} />
                <span>+91 7021057853</span>
              </div>
              <div className={styles.footerContactItem}>
                <Mail size={13} className={styles.contactIcon} />
                <span>info@hrsjm.org</span>
              </div>
              <div className={styles.footerContactItem}>
                <Globe size={13} className={styles.contactIcon} />
                <span>www.hrsjm.org</span>
              </div>
            </div>
          </div>

          {/* Bottom Dark Navy Bar */}
          <div className={styles.footerBottomBar}>
            <span>© 2026 HRSJM. All rights reserved.</span>
            <span className={styles.footerBarRight}>
              Human rights for everyone.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
