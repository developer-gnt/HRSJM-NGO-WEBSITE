const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "..", "public", "documents");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Brand Colors
const NAVY = rgb(13 / 255, 34 / 255, 56 / 255);
const GOLD = rgb(217 / 255, 119 / 255, 6 / 255);
const GOLD_LIGHT = rgb(254 / 255, 243 / 255, 199 / 255);
const GOLD_BORDER = rgb(245 / 255, 158 / 255, 11 / 255);
const DARK_GRAY = rgb(51 / 255, 65 / 255, 85 / 255);
const LIGHT_SLATE = rgb(100 / 255, 116 / 255, 139 / 255);
const CALLOUT_BG = rgb(254 / 255, 249 / 255, 235 / 255);
const GREEN_BAR = rgb(34 / 255, 197 / 255, 94 / 255);
const BORDER_COLOR = rgb(226 / 255, 232 / 255, 240 / 255);

// Helper to wrap text into lines
function wrapText(text, font, size, maxWidth) {
  if (!text) return [];
  // Clean special characters not supported by WinAnsi
  const clean = text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, " - ")
    .replace(/–/g, " - ")
    .replace(/₹/g, "Rs. ")
    .replace(/•/g, "-")
    .replace(/[^\x00-\x7F]/g, "");

  const words = clean.split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const w of words) {
    const testLine = currentLine ? currentLine + " " + w : w;
    if (font.widthOfTextAtSize(testLine, size) <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = w;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function generateArticlePDF(articleData, outputFileName, customHelplines = []) {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Load and embed banner image
  let embeddedBanner = null;
  if (articleData.bannerImage) {
    const bannerPath = path.join(__dirname, "..", "public", articleData.bannerImage.replace(/^\//, ""));
    if (fs.existsSync(bannerPath)) {
      const bannerBytes = fs.readFileSync(bannerPath);
      try {
        embeddedBanner = await pdfDoc.embedPng(bannerBytes);
      } catch {
        try {
          embeddedBanner = await pdfDoc.embedJpg(bannerBytes);
        } catch (e) {
          console.warn("Could not embed image:", bannerPath, e.message);
        }
      }
    }
  }

  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 48;
  const contentWidth = width - margin * 2;
  let y = height - margin;
  let pageNumber = 1;

  function drawHeader(targetPage, isFirst = false) {
    // Top Gold Accent Bar
    targetPage.drawRectangle({
      x: 0,
      y: height - 5,
      width: width,
      height: 5,
      color: GOLD,
    });

    if (isFirst) {
      targetPage.drawText("HUMAN RIGHTS & SOCIAL JUSTICE MISSION", {
        x: margin,
        y: height - 26,
        size: 8.5,
        font: fontBold,
        color: NAVY,
      });
      targetPage.drawText("OFFICIAL AWARENESS & LEGAL EDUCATION SERIES", {
        x: margin,
        y: height - 37,
        size: 7,
        font: fontRegular,
        color: LIGHT_SLATE,
      });
      targetPage.drawLine({
        start: { x: margin, y: height - 44 },
        end: { x: width - margin, y: height - 44 },
        thickness: 0.75,
        color: BORDER_COLOR,
      });
      y = height - 60;
    } else {
      targetPage.drawText("HRSJM | " + articleData.title.slice(0, 60), {
        x: margin,
        y: height - 22,
        size: 8,
        font: fontBold,
        color: NAVY,
      });
      targetPage.drawLine({
        start: { x: margin, y: height - 28 },
        end: { x: width - margin, y: height - 28 },
        thickness: 0.5,
        color: BORDER_COLOR,
      });
      y = height - 46;
    }
  }

  function drawFooter(targetPage, currentNum) {
    targetPage.drawLine({
      start: { x: margin, y: margin + 14 },
      end: { x: width - margin, y: margin + 14 },
      thickness: 0.5,
      color: BORDER_COLOR,
    });
    targetPage.drawText("Human Rights & Social Justice Mission • www.hrsjm.org • Free Public Legal Resource", {
      x: margin,
      y: margin + 4,
      size: 7.5,
      font: fontRegular,
      color: LIGHT_SLATE,
    });
    targetPage.drawText(`Page ${currentNum}`, {
      x: width - margin - 35,
      y: margin + 4,
      size: 7.5,
      font: fontBold,
      color: NAVY,
    });
  }

  function checkPageBreak(neededHeight = 40) {
    if (y - neededHeight < margin + 35) {
      drawFooter(page, pageNumber);
      page = pdfDoc.addPage([595.28, 841.89]);
      pageNumber++;
      drawHeader(page, false);
    }
  }

  // --- PAGE 1: TITLE & BANNER ---
  drawHeader(page, true);

  // Category Badge
  const catText = articleData.category.toUpperCase();
  const badgeWidth = fontBold.widthOfTextAtSize(catText, 8) + 14;
  page.drawRectangle({
    x: margin,
    y: y - 14,
    width: badgeWidth,
    height: 16,
    color: GOLD_LIGHT,
    borderColor: GOLD_BORDER,
    borderWidth: 0.8,
  });
  page.drawText(catText, {
    x: margin + 7,
    y: y - 11,
    size: 8,
    font: fontBold,
    color: GOLD,
  });
  y -= 26;

  // Title
  const titleLines = wrapText(articleData.title, fontBold, 18, contentWidth);
  for (const tl of titleLines) {
    page.drawText(tl, { x: margin, y, size: 18, font: fontBold, color: NAVY });
    y -= 22;
  }
  y -= 2;

  // Subtitle
  const subLines = wrapText(articleData.subtitle, fontRegular, 9.5, contentWidth);
  for (const sl of subLines) {
    page.drawText(sl, { x: margin, y, size: 9.5, font: fontRegular, color: DARK_GRAY });
    y -= 13;
  }
  y -= 10;

  // Banner Image
  if (embeddedBanner) {
    const bannerMaxHeight = 175;
    const bannerScaled = embeddedBanner.scaleToFit(contentWidth, bannerMaxHeight);
    page.drawImage(embeddedBanner, {
      x: margin,
      y: y - bannerScaled.height,
      width: bannerScaled.width,
      height: bannerScaled.height,
    });
    y -= bannerScaled.height + 14;
  }

  // Summary Callout Box (exact styling from website)
  if (articleData.summaryCallout) {
    const calloutLines = wrapText(articleData.summaryCallout, fontItalic, 9.2, contentWidth - 28);
    const boxHeight = calloutLines.length * 13 + 18;
    checkPageBreak(boxHeight + 10);

    // Box background
    page.drawRectangle({
      x: margin,
      y: y - boxHeight,
      width: contentWidth,
      height: boxHeight,
      color: CALLOUT_BG,
      borderColor: BORDER_COLOR,
      borderWidth: 0.8,
    });

    // Green vertical bar on left (just like web UI)
    page.drawRectangle({
      x: margin,
      y: y - boxHeight,
      width: 4,
      height: boxHeight,
      color: GREEN_BAR,
    });

    let cy = y - 13;
    for (const cl of calloutLines) {
      page.drawText(cl, { x: margin + 14, y: cy, size: 9.2, font: fontItalic, color: DARK_GRAY });
      cy -= 13;
    }
    y -= boxHeight + 16;
  }

  // --- SECTIONS ---
  for (const sec of articleData.sections) {
    checkPageBreak(45);

    // Section Heading
    const headLines = wrapText(sec.heading, fontBold, 12, contentWidth);
    for (const hl of headLines) {
      page.drawText(hl, { x: margin, y, size: 12, font: fontBold, color: NAVY });
      y -= 15;
    }
    y -= 4;

    // Paragraphs
    if (sec.paragraphs) {
      for (const p of sec.paragraphs) {
        const pLines = wrapText(p, fontRegular, 9.2, contentWidth);
        for (const pl of pLines) {
          checkPageBreak(14);
          page.drawText(pl, { x: margin, y, size: 9.2, font: fontRegular, color: DARK_GRAY });
          y -= 13.5;
        }
        y -= 6;
      }
    }

    // Steps / Points
    if (sec.steps && sec.steps.length > 0) {
      for (const s of sec.steps) {
        checkPageBreak(24);

        // Circular number badge
        page.drawCircle({
          x: margin + 8,
          y: y + 2,
          size: 6,
          color: GOLD_LIGHT,
          borderColor: GOLD_BORDER,
          borderWidth: 0.7,
        });
        const numStr = String(s.number);
        page.drawText(numStr, {
          x: margin + 5.5,
          y: y - 1,
          size: 7,
          font: fontBold,
          color: GOLD,
        });

        const stepLines = wrapText(s.text, fontRegular, 9, contentWidth - 26);
        for (let i = 0; i < stepLines.length; i++) {
          if (i > 0) checkPageBreak(13);
          page.drawText(stepLines[i], {
            x: margin + 22,
            y,
            size: 9,
            font: fontRegular,
            color: DARK_GRAY,
          });
          y -= 13;
        }
        y -= 3;
      }
      y -= 6;
    }

    // Testimonials
    if (sec.testimonials && sec.testimonials.length > 0) {
      for (const t of sec.testimonials) {
        const qLines = wrapText(t.quote, fontItalic, 9, contentWidth - 30);
        const cardH = qLines.length * 13 + 30;
        checkPageBreak(cardH + 10);

        page.drawRectangle({
          x: margin,
          y: y - cardH,
          width: contentWidth,
          height: cardH,
          color: rgb(248 / 255, 250 / 255, 252 / 255),
          borderColor: BORDER_COLOR,
          borderWidth: 0.8,
        });

        // Quote icon bar
        page.drawRectangle({
          x: margin,
          y: y - cardH,
          width: 3,
          height: cardH,
          color: GOLD,
        });

        let qy = y - 12;
        for (const ql of qLines) {
          page.drawText(ql, { x: margin + 14, y: qy, size: 9, font: fontItalic, color: DARK_GRAY });
          qy -= 13;
        }

        page.drawText("- " + t.name + " (" + t.role + ")", {
          x: margin + 14,
          y: y - cardH + 8,
          size: 8.5,
          font: fontBold,
          color: NAVY,
        });

        y -= cardH + 12;
      }
    }

    y -= 8;
  }

  // CTA Box at the bottom of the article
  if (articleData.cta) {
    checkPageBreak(55);
    page.drawRectangle({
      x: margin,
      y: y - 48,
      width: contentWidth,
      height: 48,
      color: GOLD_LIGHT,
      borderColor: GOLD_BORDER,
      borderWidth: 1,
    });
    page.drawText(articleData.cta.heading.toUpperCase(), {
      x: margin + 14,
      y: y - 16,
      size: 9.5,
      font: fontBold,
      color: NAVY,
    });
    const ctaLines = wrapText(articleData.cta.description, fontRegular, 8.5, contentWidth - 28);
    let cy = y - 30;
    for (const cl of ctaLines) {
      page.drawText(cl, { x: margin + 14, y: cy, size: 8.5, font: fontRegular, color: DARK_GRAY });
      cy -= 11;
    }
    y -= 58;
  }

  // Key Helplines Box
  if (customHelplines && customHelplines.length > 0) {
    const boxH = customHelplines.length * 14 + 26;
    checkPageBreak(boxH + 10);
    page.drawRectangle({
      x: margin,
      y: y - boxH,
      width: contentWidth,
      height: boxH,
      color: rgb(241 / 255, 245 / 255, 249 / 255),
      borderColor: rgb(203 / 255, 213 / 255, 225 / 255),
      borderWidth: 0.8,
    });
    page.drawText("IMPORTANT HELPLINES & LEGAL AID CONTACTS", {
      x: margin + 12,
      y: y - 14,
      size: 8.5,
      font: fontBold,
      color: NAVY,
    });
    let hy = y - 28;
    for (const h of customHelplines) {
      page.drawText("• " + h, {
        x: margin + 12,
        y: hy,
        size: 8.2,
        font: fontBold,
        color: GOLD,
      });
      hy -= 14;
    }
    y -= boxH + 15;
  }

  // Draw footer on last page
  drawFooter(page, pageNumber);

  const outputPath = path.join(outputDir, outputFileName);
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated: ${outputPath} (${pdfBytes.length} bytes, ${pageNumber} pages)`);
}

module.exports = { generateArticlePDF };
