import { newsArticlesData } from "../src/data/newsDetailData";
// @ts-ignore
import { generateArticlePDF } from "./articlePdfGenerator";

async function main() {
  console.log("Starting generation of 6 rich article PDF guides with exact matching card titles...");

  // 1. Citizen Rights Handbook (Card 1)
  const citizenArticle = newsArticlesData["strengthening-fundamental-rights-in-a-changing-india"];
  if (citizenArticle) {
    await generateArticlePDF(
      {
        ...citizenArticle,
        title: "Citizen Rights Handbook",
        subtitle:
          "Strengthening Fundamental Rights, Civil Liberties, Police Interaction Protections & Constitutional Safeguards in India",
        category: "Citizen Rights & Protection",
      },
      "citizen-rights-handbook.pdf",
      [
        "National Legal Services Authority (NALSA): 15100 (Toll-Free, 24x7)",
        "National Human Rights Commission (NHRC): 14433",
        "Supreme Court Legal Services Committee: 011-23388313",
        "National Emergency Number: 112",
      ]
    );
  }

  // 2. Women's Rights Guide (Card 2)
  const womensArticle = newsArticlesData["womens-rights-progress-and-the-road-ahead"];
  if (womensArticle) {
    await generateArticlePDF(
      {
        ...womensArticle,
        title: "Women's Rights Guide",
        subtitle:
          "Progress, Legal Protections, Domestic Violence Safeguards, Workplace Safety (POSH), and the Road Ahead",
        category: "Women's Rights & Empowerment",
      },
      "womens-rights-guide.pdf",
      [
        "National Women Helpline: 181 (Toll-Free, 24x7)",
        "National Commission for Women (NCW): 7827170170",
        "Free Legal Aid for Women (NALSA): 15100 (24x7)",
        "National Emergency Helpline: 112",
      ]
    );
  }

  // 3. Child Protection Guide (Card 3)
  const childArticle = newsArticlesData["child-rights-building-a-safer-and-brighter-future"];
  if (childArticle) {
    await generateArticlePDF(
      {
        ...childArticle,
        title: "Child Protection Guide",
        subtitle:
          "Building a Safer and Brighter Future - Comprehensive Rights, POCSO Safeguards & Child Welfare in India",
        category: "Child Rights & Protection",
      },
      "child-protection-guide.pdf",
      [
        "Childline India Helpline: 1098 (Toll-Free, 24x7)",
        "National Commission for Protection of Child Rights (NCPCR): 011-23478200",
        "POCSO Complaint Portal (POCSO e-Box): ncpcr.gov.in",
        "Emergency Assistance: 112",
      ]
    );
  }

  // 4. RTI Application Guide (Card 4)
  const rtiArticle = newsArticlesData["understanding-your-right-to-information-rti"];
  if (rtiArticle) {
    await generateArticlePDF(
      {
        ...rtiArticle,
        title: "RTI Application Guide",
        subtitle:
          "Understanding and Exercising Your Right to Information (RTI): Complete Filing Process, Appeals & Legal Remedies",
        category: "Legal Insights & RTI",
      },
      "rti-application-guide.pdf",
      [
        "Central RTI Online Portal: rtionline.gov.in",
        "Central Information Commission (CIC): 011-26183996",
        "HRSJM Legal RTI Guidance Desk: rti-help@hrsjm.org",
      ]
    );
  }

  // 5. Legal Aid Contacts Guide (Card 5)
  const legalAidArticle = newsArticlesData["hrsjm-community-outreach-program-in-maharashtra"];
  if (legalAidArticle) {
    await generateArticlePDF(
      {
        ...legalAidArticle,
        title: "Legal Aid Contacts Guide",
        subtitle:
          "HRSJM Community Outreach, Free Legal Representation Directory, District Legal Clinics & Support Helplines Across India",
        category: "Legal Aid & Citizen Support",
      },
      "legal-aid-contacts-guide.pdf",
      [
        "National Legal Services Authority (NALSA): 15100 (24x7 Free Legal Aid)",
        "District Legal Services Authority (DLSA) - Available at every District Court",
        "One Stop Centre (Sakhi) for Women in Distress",
        "HRSJM Legal Aid Help Desk: legal-aid@hrsjm.org",
      ]
    );
  }

  // 6. Right to Education Guide (Card 6)
  const educationArticle = newsArticlesData["how-a-small-step-in-education-changed-a-community"];
  if (educationArticle) {
    await generateArticlePDF(
      {
        ...educationArticle,
        title: "Right to Education Guide",
        subtitle:
          "Community Education Empowerment, RTE Act Provisions, 25% EWS Quota & Inclusive Learning Initiatives in India",
        category: "Education & Children's Rights",
      },
      "right-to-education-guide.pdf",
      [
        "NCPCR RTE Division: 011-23478200",
        "Childline Education Assistance: 1098 (Toll-Free)",
        "HRSJM Education Support Initiative: education@hrsjm.org",
      ]
    );
  }

  console.log("All 6 article PDF guides generated successfully with exact matching titles!");
}

main().catch(console.error);
