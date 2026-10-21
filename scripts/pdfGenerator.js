const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "..", "public", "documents");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper colors
const NAVY = rgb(13 / 255, 34 / 255, 56 / 255);
const GOLD = rgb(217 / 255, 119 / 255, 6 / 255);
const DARK_GRAY = rgb(51 / 255, 65 / 255, 85 / 255);
const LIGHT_BG = rgb(248 / 255, 250 / 255, 252 / 255);
const BORDER_COLOR = rgb(226 / 255, 232 / 255, 240 / 255);

async function createGuidePDF({ title, category, subtitle, sections, callouts, helplines, outputPath }) {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 48;
  const contentWidth = width - margin * 2;
  let y = height - margin;

  function checkPageBreak(neededHeight = 40) {
    if (y - neededHeight < margin + 40) {
      drawFooter(page);
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin;
      drawHeader(page, false);
    }
  }

  function drawHeader(targetPage, isFirst = true) {
    // Top Bar
    targetPage.drawRectangle({
      x: 0,
      y: height - 6,
      width: width,
      height: 6,
      color: GOLD,
    });

    if (isFirst) {
      targetPage.drawText("HUMAN RIGHTS & SOCIAL JUSTICE MISSION", {
        x: margin,
        y: height - 28,
        size: 9,
        font: fontBold,
        color: NAVY,
      });
      targetPage.drawText("LEGAL AWARENESS & EMPOWERMENT INITIATIVE • OFFICIAL RESOURCE", {
        x: margin,
        y: height - 40,
        size: 7.5,
        font: fontRegular,
        color: DARK_GRAY,
      });
      targetPage.drawLine({
        start: { x: margin, y: height - 48 },
        end: { x: width - margin, y: height - 48 },
        thickness: 1,
        color: BORDER_COLOR,
      });
      y = height - 68;
    } else {
      targetPage.drawText("HRSJM | " + title, {
        x: margin,
        y: height - 25,
        size: 8,
        font: fontBold,
        color: NAVY,
      });
      targetPage.drawLine({
        start: { x: margin, y: height - 32 },
        end: { x: width - margin, y: height - 32 },
        thickness: 0.5,
        color: BORDER_COLOR,
      });
      y = height - 50;
    }
  }

  function drawFooter(targetPage) {
    targetPage.drawLine({
      start: { x: margin, y: margin + 15 },
      end: { x: width - margin, y: margin + 15 },
      thickness: 0.5,
      color: BORDER_COLOR,
    });
    targetPage.drawText("Published for free public legal literacy by Human Rights & Social Justice Mission • www.hrsjm.org", {
      x: margin,
      y: margin + 4,
      size: 7.5,
      font: fontRegular,
      color: DARK_GRAY,
    });
    targetPage.drawText("Toll-Free Helpline: 1800-HRSJM-HELP", {
      x: width - margin - 150,
      y: margin + 4,
      size: 7.5,
      font: fontBold,
      color: GOLD,
    });
  }

  // Draw first page header
  drawHeader(page, true);

  // Category Badge
  page.drawRectangle({
    x: margin,
    y: y - 16,
    width: fontBold.widthOfTextAtSize(category.toUpperCase(), 8.5) + 16,
    height: 18,
    color: rgb(254 / 255, 243 / 255, 199 / 255),
    borderColor: rgb(250 / 255, 204 / 255, 21 / 255),
    borderWidth: 1,
  });
  page.drawText(category.toUpperCase(), {
    x: margin + 8,
    y: y - 12,
    size: 8.5,
    font: fontBold,
    color: GOLD,
  });
  y -= 32;

  // Title
  page.drawText(title, {
    x: margin,
    y: y - 10,
    size: 20,
    font: fontBold,
    color: NAVY,
  });
  y -= 26;

  // Subtitle / Intro
  const words = subtitle.split(" ");
  let line = "";
  for (const w of words) {
    const testLine = line + (line ? " " : "") + w;
    if (fontRegular.widthOfTextAtSize(testLine, 10) > contentWidth) {
      page.drawText(line, { x: margin, y: y, size: 10, font: fontRegular, color: DARK_GRAY });
      y -= 14;
      line = w;
    } else {
      line = testLine;
    }
  }
  if (line) {
    page.drawText(line, { x: margin, y: y, size: 10, font: fontRegular, color: DARK_GRAY });
    y -= 18;
  }

  y -= 6;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1.5,
    color: GOLD,
  });
  y -= 20;

  // Sections
  for (const sec of sections) {
    checkPageBreak(50);

    // Section Heading
    page.drawText(sec.heading, {
      x: margin,
      y: y,
      size: 13,
      font: fontBold,
      color: NAVY,
    });
    y -= 16;

    // Paragraphs
    for (const p of sec.paragraphs) {
      const pWords = p.split(" ");
      let pLine = "";
      for (const w of pWords) {
        const testPLine = pLine + (pLine ? " " : "") + w;
        if (fontRegular.widthOfTextAtSize(testPLine, 9.5) > contentWidth) {
          checkPageBreak(16);
          page.drawText(pLine, { x: margin, y, size: 9.5, font: fontRegular, color: DARK_GRAY });
          y -= 13.5;
          pLine = w;
        } else {
          pLine = testPLine;
        }
      }
      if (pLine) {
        checkPageBreak(16);
        page.drawText(pLine, { x: margin, y, size: 9.5, font: fontRegular, color: DARK_GRAY });
        y -= 16;
      }
    }

    // Bullet points / steps if any
    if (sec.points && sec.points.length > 0) {
      for (const pt of sec.points) {
        checkPageBreak(24);
        page.drawCircle({
          x: margin + 5,
          y: y + 3,
          size: 2.5,
          color: GOLD,
        });

        const ptWords = pt.split(" ");
        let ptLine = "";
        for (const w of ptWords) {
          const testLine = ptLine + (ptLine ? " " : "") + w;
          if (fontRegular.widthOfTextAtSize(testLine, 9.2) > contentWidth - 18) {
            checkPageBreak(14);
            page.drawText(ptLine, { x: margin + 16, y, size: 9.2, font: fontRegular, color: DARK_GRAY });
            y -= 13;
            ptLine = w;
          } else {
            ptLine = testLine;
          }
        }
        if (ptLine) {
          checkPageBreak(14);
          page.drawText(ptLine, { x: margin + 16, y, size: 9.2, font: fontRegular, color: DARK_GRAY });
          y -= 15;
        }
      }
    }

    y -= 10;
  }

  // Callout Box
  if (callouts && callouts.length > 0) {
    for (const c of callouts) {
      checkPageBreak(65);
      page.drawRectangle({
        x: margin,
        y: y - 50,
        width: contentWidth,
        height: 52,
        color: rgb(254 / 255, 243 / 255, 199 / 255),
        borderColor: GOLD,
        borderWidth: 1,
      });
      page.drawText("IMPORTANT LEGAL NOTICE / KEY TAKEAWAY", {
        x: margin + 14,
        y: y - 16,
        size: 8.5,
        font: fontBold,
        color: NAVY,
      });
      page.drawText(c, {
        x: margin + 14,
        y: y - 32,
        size: 9,
        font: fontRegular,
        color: DARK_GRAY,
      });
      y -= 66;
    }
  }

  // Emergency / Legal Aid Helplines Box
  if (helplines && helplines.length > 0) {
    checkPageBreak(75);
    page.drawRectangle({
      x: margin,
      y: y - 60,
      width: contentWidth,
      height: 60,
      color: rgb(241 / 255, 245 / 255, 249 / 255),
      borderColor: rgb(203 / 255, 213 / 255, 225 / 255),
      borderWidth: 1,
    });
    page.drawText("KEY HELPLINES & INSTITUTIONAL CONTACTS", {
      x: margin + 14,
      y: y - 16,
      size: 9,
      font: fontBold,
      color: NAVY,
    });
    let hx = margin + 14;
    let hy = y - 32;
    for (const h of helplines) {
      page.drawText("• " + h, {
        x: hx,
        y: hy,
        size: 8.5,
        font: fontBold,
        color: GOLD,
      });
      hy -= 14;
    }
    y -= 75;
  }

  // Final page footer
  drawFooter(page);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated: ${outputPath} (${pdfBytes.length} bytes)`);
}

module.exports = { createGuidePDF };
