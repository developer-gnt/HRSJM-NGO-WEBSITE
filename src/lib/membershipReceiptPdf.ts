import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface ReceiptPdfData {
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
}

export async function generateMembershipReceiptPdfBytes(data: ReceiptPdfData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page.getSize();
  const margin = 40;
  const contentWidth = width - margin * 2;

  // Official Brand Palette
  const NAVY = rgb(11 / 255, 37 / 255, 69 / 255);
  const GOLD = rgb(217 / 255, 169 / 255, 40 / 255);
  const SLATE = rgb(71 / 255, 85 / 255, 105 / 255);
  const LIGHT_GRAY = rgb(241 / 255, 245 / 255, 249 / 255);
  const GREEN_BG = rgb(236 / 255, 253 / 255, 245 / 255);
  const GREEN_BORDER = rgb(167 / 255, 243 / 255, 208 / 255);
  const GREEN_TEXT = rgb(22 / 255, 101 / 255, 52 / 255);
  const BORDER_COLOR = rgb(226 / 255, 232 / 255, 240 / 255);

  let y = height;

  // Top decorative Gold Accent Bar
  page.drawRectangle({ x: 0, y: y - 8, width, height: 8, color: GOLD });
  y -= 8;

  // Try embedding logo from /logo.png in browser or environment
  let logoDrawn = false;
  if (typeof window !== "undefined") {
    try {
      const resp = await fetch("/logo.png");
      if (resp.ok) {
        const logoBuffer = await resp.arrayBuffer();
        const logoImg = await pdfDoc.embedPng(logoBuffer);
        const logoDim = logoImg.scale(50 / logoImg.height);
        page.drawImage(logoImg, {
          x: margin,
          y: y - 62,
          width: logoDim.width,
          height: logoDim.height,
        });
        logoDrawn = true;
      }
    } catch {
      // Graceful fallback to text if fetch fails
    }
  }

  const headerX = logoDrawn ? margin + 64 : margin;

  // Header Typography
  page.drawText("HUMAN RIGHTS & SOCIAL JUSTICE MISSION", {
    x: headerX,
    y: y - 28,
    size: 15,
    font: fontBold,
    color: NAVY,
  });

  page.drawText("MANAV ADHIKAR EVAM SAMAJIK NYAY MISSION (NATIONAL HEAD OFFICE)", {
    x: headerX,
    y: y - 42,
    size: 8.5,
    font: fontBold,
    color: SLATE,
  });

  page.drawText("Sir Mathuradas Vasanji Rd, Marol Naka, Andheri East, Mumbai 400059 | Helpline: +91 7021057853", {
    x: headerX,
    y: y - 54,
    size: 7.5,
    font: fontRegular,
    color: SLATE,
  });

  page.drawText("Regd. Under Indian Trusts Act 1882 | NITI Aayog NGO Darpan: MH/2021/0284897 | 80G Certified", {
    x: headerX,
    y: y - 64,
    size: 7.5,
    font: fontRegular,
    color: SLATE,
  });

  y -= 74;

  // Gold Divider Bar
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 2,
    color: GOLD,
  });

  y -= 26;

  // Receipt Document Title
  page.drawText("MEMBERSHIP APPLICATION RECEIPT", {
    x: margin,
    y,
    size: 16,
    font: fontBold,
    color: NAVY,
  });

  page.drawText("Official acknowledgment of verified membership registration & fee transaction", {
    x: margin,
    y: y - 14,
    size: 8.5,
    font: fontRegular,
    color: SLATE,
  });

  y -= 34;

  // Status Banner Box (Green)
  const paymentStatusText = data.paymentStatus || "Confirmed Paid";
  const applicationStatusText = data.applicationStatus || "Applied (Pending Review)";

  page.drawRectangle({
    x: margin,
    y: y - 26,
    width: contentWidth,
    height: 26,
    color: GREEN_BG,
    borderColor: GREEN_BORDER,
    borderWidth: 1,
  });

  page.drawText(
    `APPLICATION STATUS: ${applicationStatusText.toUpperCase()}   |   PAYMENT STATUS: ${paymentStatusText.toUpperCase()}`,
    {
      x: margin + 14,
      y: y - 17,
      size: 8.5,
      font: fontBold,
      color: GREEN_TEXT,
    }
  );

  y -= 44;

  // Table Container
  const tableHeight = 160;
  page.drawRectangle({
    x: margin,
    y: y - tableHeight,
    width: contentWidth,
    height: tableHeight,
    color: rgb(1, 1, 1),
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  });

  // Table Column Headers Banner
  page.drawRectangle({
    x: margin,
    y: y - 24,
    width: contentWidth,
    height: 24,
    color: LIGHT_GRAY,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  });

  page.drawText("APPLICATION & PAYMENT PARTICULARS", {
    x: margin + 12,
    y: y - 16,
    size: 8.5,
    font: fontBold,
    color: NAVY,
  });

  page.drawText("APPLICANT PROFILE DETAILS", {
    x: margin + contentWidth / 2 + 12,
    y: y - 16,
    size: 8.5,
    font: fontBold,
    color: NAVY,
  });

  // Vertical Center Column Divider
  page.drawLine({
    start: { x: margin + contentWidth / 2, y },
    end: { x: margin + contentWidth / 2, y: y - tableHeight },
    thickness: 1,
    color: BORDER_COLOR,
  });

  // Format Date
  let formattedDate = data.submittedAt;
  try {
    const d = new Date(data.submittedAt);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
  } catch {
    // Keep raw string
  }

  const cleanFee = data.packageFee.startsWith("₹")
    ? data.packageFee.replace("₹", "INR ")
    : `INR ${data.packageFee}`;

  // Left particulars
  const leftRows = [
    ["Application Reference:", data.applicationRef],
    ["Membership Package:", data.packageName],
    ["Registration Fee:", cleanFee],
    ["Membership Validity:", "1 Year / As Applicable"],
    ["Payment Mode:", "Online Gateway (Cashfree)"],
    ["Transaction Status:", `Success (${paymentStatusText})`],
  ];

  let leftY = y - 42;
  for (const [label, val] of leftRows) {
    page.drawText(label, { x: margin + 12, y: leftY, size: 8, font: fontRegular, color: SLATE });
    page.drawText(String(val).slice(0, 24), {
      x: margin + 120,
      y: leftY,
      size: 8,
      font: fontBold,
      color: NAVY,
    });
    leftY -= 20;
  }

  // Right particulars
  const rightRows = [
    ["Applicant Name:", data.applicantName || "Registered Member"],
    ["Contact Phone:", data.applicantPhone || "+91 7021057853"],
    ["Contact Email:", data.applicantEmail || "enquiry@hrsjm.org"],
    ["Registered Address:", (data.applicantAddress || "Maharashtra, India").slice(0, 32)],
    ["Submission Date:", formattedDate],
    ["Verification Channel:", "National Governing Body"],
  ];

  let rightY = y - 42;
  for (const [label, val] of rightRows) {
    page.drawText(label, {
      x: margin + contentWidth / 2 + 12,
      y: rightY,
      size: 8,
      font: fontRegular,
      color: SLATE,
    });
    page.drawText(String(val).slice(0, 26), {
      x: margin + contentWidth / 2 + 115,
      y: rightY,
      size: 8,
      font: fontBold,
      color: NAVY,
    });
    rightY -= 20;
  }

  y -= tableHeight + 20;

  // Membership Kit Box (Warm Gold Accents)
  const kitHeight = 96;
  page.drawRectangle({
    x: margin,
    y: y - kitHeight,
    width: contentWidth,
    height: kitHeight,
    color: rgb(254 / 255, 252 / 255, 243 / 255),
    borderColor: rgb(253 / 255, 230 / 255, 138 / 255),
    borderWidth: 1,
  });

  page.drawText("OFFICIAL MEMBERSHIP KIT & ENTITLEMENTS INCLUDED:", {
    x: margin + 14,
    y: y - 18,
    size: 8.5,
    font: fontBold,
    color: rgb(146 / 255, 64 / 255, 14 / 255),
  });

  const kitItems = [
    "• Official Appointment Letter signed by Honorable National President & Governing Body",
    "• Laminated Certificate of Membership with permanent Council Registration ID",
    "• Official Membership Identity Card, Protection Cover, Lanyard & Official Vehicle Sticker",
    "• Authority to represent HRSJM in human rights causes, public grievance redressal & social welfare campaigns",
  ];

  let kitY = y - 34;
  for (const item of kitItems) {
    page.drawText(item, {
      x: margin + 14,
      y: kitY,
      size: 7.5,
      font: fontRegular,
      color: rgb(69 / 255, 26 / 255, 3 / 255),
    });
    kitY -= 14;
  }

  y -= kitHeight + 24;

  // Verification & Legal Notice
  page.drawText("DECLARATION & VERIFICATION NOTICE", {
    x: margin,
    y,
    size: 8.5,
    font: fontBold,
    color: NAVY,
  });

  const notices = [
    "1. This document constitutes valid official proof of application submission and payment acknowledgment.",
    "2. Your submitted application, profile credentials, and KYC documents are under active review by the HRSJM scrutiny team.",
    "3. You will receive an SMS and email notification once your verified ID card and appointment kit are dispatched.",
    "4. For any verification or assistance, quote your Reference ID to the National Helpline: +91 70210 57853 (enquiry@hrsjm.org).",
  ];

  let noticeY = y - 14;
  for (const note of notices) {
    page.drawText(note, { x: margin, y: noticeY, size: 7.5, font: fontRegular, color: SLATE });
    noticeY -= 13;
  }

  // Footer Accent Bar & Copyright
  page.drawRectangle({ x: 0, y: 0, width, height: 6, color: GOLD });
  page.drawText(
    "HUMAN RIGHTS & SOCIAL JUSTICE MISSION • OFFICIAL DIGITAL ACKNOWLEDGMENT • HTTPS://HRSJM.ORG",
    {
      x: margin,
      y: 16,
      size: 7.5,
      font: fontRegular,
      color: SLATE,
    }
  );

  return pdfDoc.save();
}

/**
 * Triggers a direct browser download of the Membership Application Receipt PDF.
 */
export async function downloadMembershipReceiptPdf(data: ReceiptPdfData): Promise<void> {
  const pdfBytes = await generateMembershipReceiptPdfBytes(data);
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const cleanRef = (data.applicationRef || "RECEIPT").replace(/[^a-zA-Z0-9-_]/g, "");

  const a = document.createElement("a");
  a.href = url;
  a.download = `HRSJM-Membership-Receipt-${cleanRef}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

