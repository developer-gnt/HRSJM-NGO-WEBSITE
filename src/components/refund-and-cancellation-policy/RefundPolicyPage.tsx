import Image from "next/image";
import {
  HeartHandshake,
  Users,
  IdCard,
  CalendarCheck,
  CreditCard,
  ReceiptText,
  Headset,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
} from "lucide-react";
import styles from "./refund.module.css";

function GoldBulletIcon() {
  return (
    <svg
      className={styles.bulletIcon}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" stroke="#d9a928" strokeWidth="2.2" />
      <circle cx="10" cy="10" r="3.5" fill="#d9a928" />
    </svg>
  );
}

export default function RefundPolicyPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero Banner: Refund & Cancellation Policy ──────────── */}
      <section
        className={styles.hero}
        aria-label="Refund and Cancellation Policy header"
      >
        <div className={styles.heroBgLayer}>
          <Image
            src="/assets/refund_hero.jpg"
            alt="Hands arranging wooden cubes with donation, community, calendar, and refund symbols"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
          <div className={styles.heroGradientOverlay} aria-hidden="true" />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrowGroup}>
              <span className={styles.heroEyebrow}>LEGAL</span>
              <span className={styles.heroEyebrowUnderline} aria-hidden="true" />
            </div>
            <h1 className={styles.heroHeading}>
              Refund <span className={styles.heroGold}>&amp;</span> Cancellation
              Policy
            </h1>
            <p className={styles.heroText}>
              Understand our policies regarding donations, membership fees,
              cancellations, and refunds.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Introduction: Our Commitment to Transparency ───────── */}
      <section
        className={styles.introSection}
        aria-labelledby="intro-heading"
      >
        <div className={styles.container}>
          <h2 id="intro-heading" className={styles.sectionHeading}>
            Our Commitment to Transparency
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.introCopy}>
            At Human Rights and Social Justice Mission (HRSJM), we value the
            support of our members, donors, and well-wishers who contribute to
            our mission of promoting justice, equality, and human rights. To
            ensure transparency, we have established the following policy
            regarding refunds and cancellations.
          </p>
        </div>
      </section>

      {/* ── 3. Policy Sections 1 to 7 ─────────────────────────────── */}
      <section
        className={styles.policySection}
        aria-label="Policy clauses and terms"
      >
        <div className={styles.container}>
          <div className={styles.cardsList}>
            {/* Section 1: Donations */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-1"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>1</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <HeartHandshake size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-1" className={styles.cardTitle}>
                  Donations
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <strong className={styles.pointSubtitle}>
                      Non-Refundable
                    </strong>
                    <p className={styles.pointText}>
                      All donations made to HRSJM are voluntary and are used to
                      fund our social welfare programs, awareness campaigns, and
                      justice initiatives. Therefore, donations are generally
                      non-refundable once the transaction is completed.
                    </p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <strong className={styles.pointSubtitle}>
                      Error in Donation
                    </strong>
                    <p className={styles.pointText}>
                      If you have made an error in the donation amount or a
                      duplicate transaction has occurred due to a technical
                      glitch, please contact us at{" "}
                      <a href="mailto:enquiry@hrsjm.org">enquiry@hrsjm.org</a>{" "}
                      within 7 days of the transaction. We will review your
                      request and, if verified, process a refund, subject to the
                      deduction of bank processing charges.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 2: Membership Fees */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-2"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>2</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <Users size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-2" className={styles.cardTitle}>
                  Membership Fees
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <strong className={styles.pointSubtitle}>Policy</strong>
                    <p className={styles.pointText}>
                      As per our organizational bylaws, membership fees,
                      including District, State, or National level posts, are paid
                      toward the administrative and operational costs of the
                      Mission.
                    </p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <strong className={styles.pointSubtitle}>
                      No Refund Rule
                    </strong>
                    <p className={styles.pointText}>
                      Once a membership application is submitted and the fee is
                      paid, the amount is non-refundable and non-transferable,
                      regardless of whether the membership is approved,
                      renewed, or terminated.
                    </p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <strong className={styles.pointSubtitle}>Termination</strong>
                    <p className={styles.pointText}>
                      If a membership is terminated due to a violation of
                      HRSJM’s code of conduct or anti-social activities, as
                      outlined in the Joining terms, no refund of the
                      membership fee or any other contribution will be provided.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 3: Membership Cancellation */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-3"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>3</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <IdCard size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-3" className={styles.cardTitle}>
                  Membership Cancellation
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      Members may resign from the organization at any time by
                      submitting a written resignation to the National President
                      or the National Governing Body.
                    </p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      Upon resignation, the member must surrender their Identity
                      Card and official documents to the national administration
                      office.
                    </p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      Cancellation of membership does not entitle the individual
                      to any refund of past subscriptions or fees paid.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 4: Event & Program Fees */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-4"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>4</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <CalendarCheck size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-4" className={styles.cardTitle}>
                  Event &amp; Program Fees
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      If HRSJM organizes a paid workshop, seminar, or event,
                      the cancellation policy for that specific event will be
                      mentioned on the event registration page.
                    </p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      If an event is cancelled by HRSJM due to unforeseen
                      circumstances, a full refund of the registration fee, if
                      any, will be processed to the original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 5: Duplicate Transactions */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-5"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>5</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <CreditCard size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-5" className={styles.cardTitle}>
                  Duplicate Transactions
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      In the event of a technical error where a payment is
                      deducted multiple times, the excess amount will be refunded
                      to the donor or member after verification. It may take 7–10
                      working days for the refund to reflect in your bank account.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 6: Tax Benefits */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-6"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>6</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <ReceiptText size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-6" className={styles.cardTitle}>
                  Tax Benefits
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      If a donation receipt has already been issued and used for
                      tax exemption purposes, for example, under Section 80G of
                      the Income Tax Act, a refund request will not be entertained.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 7: How to Request a Refund */}
            <article
              className={styles.policyCard}
              aria-labelledby="policy-sec-7"
            >
              <div className={styles.cardMeta}>
                <span className={styles.numBadge}>7</span>
                <div className={styles.iconWrap} aria-hidden="true">
                  <Headset size={22} strokeWidth={1.9} />
                </div>
                <h3 id="policy-sec-7" className={styles.cardTitle}>
                  How to Request a Refund
                </h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.bulletItem}>
                  <GoldBulletIcon />
                  <div className={styles.bulletTextGroup}>
                    <p className={styles.pointText}>
                      For any refund-related queries or to report a technical
                      error, please contact us with your transaction details,
                      including the Transaction ID, Date, and Amount.
                    </p>
                  </div>
                </div>

                <div className={styles.contactCardsGrid}>
                  {/* Email */}
                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon} aria-hidden="true">
                      <Mail size={18} strokeWidth={2} />
                    </div>
                    <div className={styles.contactCardBody}>
                      <h4 className={styles.contactCardLabel}>Email</h4>
                      <p className={styles.contactCardText}>
                        <a href="mailto:info@hrsjm.org">info@hrsjm.org</a>
                        <br />
                        <a href="mailto:enquiry@hrsjm.org">enquiry@hrsjm.org</a>
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon} aria-hidden="true">
                      <Phone size={18} strokeWidth={2} />
                    </div>
                    <div className={styles.contactCardBody}>
                      <h4 className={styles.contactCardLabel}>Phone</h4>
                      <p className={styles.contactCardText}>
                        <a href="tel:+917021057853">+91 7021057853</a>
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon} aria-hidden="true">
                      <MapPin size={18} strokeWidth={2} />
                    </div>
                    <div className={styles.contactCardBody}>
                      <h4 className={styles.contactCardLabel}>Address</h4>
                      <p className={styles.contactCardText}>
                        Sir Mathuradas Vasanji Rd, Chimmatpada, Marol Naka,
                        Andheri East, Mumbai, Maharashtra-400059.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ── Important Disclaimer ───────────────────────────────── */}
          <aside
            className={styles.disclaimerCard}
            aria-label="Important Disclaimer"
          >
            <div className={styles.disclaimerIconWrap} aria-hidden="true">
              <AlertCircle size={22} strokeWidth={2.4} />
            </div>
            <div className={styles.disclaimerBody}>
              <h3 className={styles.disclaimerHeading}>Important Disclaimer</h3>
              <p className={styles.disclaimerText}>
                HRSJM reserves the right to modify this policy at any time
                without prior notice. Any changes will be updated on this page.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
