const path = require("path");
const { createGuidePDF } = require("./pdfGenerator");

const outDir = path.join(__dirname, "..", "public", "documents");

async function main() {
  console.log("Generating 6 comprehensive rights guide PDFs...");

  // 1. Citizen Rights Handbook
  await createGuidePDF({
    title: "Citizen Rights Handbook (India)",
    category: "Fundamental & Civil Rights",
    subtitle: "A comprehensive citizen handbook on constitutional rights, personal liberty, equality before the law, police encounter protections, and access to justice under the Constitution of India.",
    sections: [
      {
        heading: "1. Constitutional Framework of Fundamental Rights",
        paragraphs: [
          "Part III of the Constitution of India (Articles 12 to 35) guarantees six fundamental rights to every individual and citizen. These guarantees represent the supreme law of the land and restrict arbitrary state action.",
        ],
        points: [
          "Right to Equality (Articles 14-18): Guarantees equality before the law and equal protection of laws. Outlaws discrimination based on religion, race, caste, sex or place of birth.",
          "Right to Freedom (Articles 19-22): Protects freedom of speech, peaceful assembly, movement, trade, and personal liberty (Article 21).",
          "Right against Exploitation (Articles 23-24): Prohibits human trafficking, forced labour (begar), and employment of children in hazardous industries.",
          "Right to Freedom of Religion (Articles 25-28): Freedom of conscience, practice, propagation, and management of religious affairs.",
          "Cultural & Educational Rights (Articles 29-30): Safeguards minority languages, scripts, cultures, and rights to establish educational institutions.",
          "Right to Constitutional Remedies (Article 32): The right to approach the Supreme Court directly for enforcement of fundamental rights through writs (Habeas Corpus, Mandamus, Quo Warranto, Certiorari, Prohibition).",
        ],
      },
      {
        heading: "2. Your Rights During Police Interaction & Arrest",
        paragraphs: [
          "The Supreme Court of India in D.K. Basu v. State of West Bengal laid down mandatory guidelines that every police officer must follow during arrest and interrogation:",
        ],
        points: [
          "Identification: The arresting officer must wear clear identification, name tag, and designation.",
          "Arrest Memo: Police must prepare a formal arrest memo at the time of arrest signed by at least one witness (family member or respectable local resident) and counter-signed by the arrestee.",
          "Informing Family: The arrestee has the absolute right to have a relative or friend informed of their arrest and place of detention within 8 to 12 hours.",
          "Right to Legal Representation: You have the right to consult and be represented by an advocate of your choice during interrogation (Section 41D, CrPC).",
          "Medical Examination: A full medical examination must be conducted every 48 hours during custody.",
          "Production Before Magistrate: Every arrested person must be produced before the nearest judicial magistrate within 24 hours of arrest, excluding travel time (Article 22(2)).",
        ],
      },
      {
        heading: "3. Special Protections for Women and Minors",
        paragraphs: [
          "The law provides special safeguards to prevent harassment of vulnerable citizens:",
        ],
        points: [
          "Arrest of Women: No woman can be arrested after sunset and before sunrise except in extraordinary circumstances with prior written permission of the Judicial Magistrate.",
          "Female Officer Presence: Female arrestees must only be handled, searched, and escorted by female police officers with strict regard to decency.",
          "Interrogation Location: Women and children below 15 years cannot be summoned to police stations for questioning; they must be interviewed at their place of residence.",
        ],
      },
      {
        heading: "4. Access to Free Legal Services",
        paragraphs: [
          "Under the Legal Services Authorities Act, 1987, free legal aid is a statutory right for women, children, members of SC/ST communities, industrial workers, victims of trafficking, and citizens with low annual income.",
        ],
        points: [
          "Free Lawyer: A government-paid panel advocate is appointed to handle your civil or criminal court proceedings.",
          "Zero Court Fees: All court fees, typing expenses, process fees, and certified copy charges are borne by the Legal Services Authority.",
        ],
      },
    ],
    callouts: [
      "No citizen can be detained beyond 24 hours without an order from a judicial magistrate. If detained unlawfully, immediate relief can be sought via Habeas Corpus.",
    ],
    helplines: [
      "National Legal Services Authority (NALSA): 15100 (24x7 Free Legal Aid)",
      "National Human Rights Commission (NHRC): 14433",
      "National Emergency Number: 112",
    ],
    outputPath: path.join(outDir, "citizen-rights-handbook.pdf"),
  });

  // 2. Women's Rights Guide
  await createGuidePDF({
    title: "Women's Rights & Legal Protections Guide",
    category: "Women's Rights & Empowerment",
    subtitle: "A practical legal reference guide on rights against domestic violence, workplace safety, equal remuneration, property inheritance, maternity benefits, and emergency legal remedies in India.",
    sections: [
      {
        heading: "1. Protection of Women from Domestic Violence Act, 2005 (PWDVA)",
        paragraphs: [
          "The PWDVA provides civil and criminal protection to wives, live-in partners, mothers, and sisters against physical, emotional, sexual, and economic abuse in a shared household.",
        ],
        points: [
          "Right to Reside: A woman cannot be evicted from the shared household, regardless of whether she has title or ownership rights.",
          "Protection Orders: Magistrates can issue restraining orders forbidding the abuser from committing violence or contacting the victim.",
          "Monetary Relief & Maintenance: Covers medical expenses, loss of earnings, child maintenance, and restoration of streedhan.",
          "Custody & Shelter: Temporary custody of children and immediate access to safe shelter homes through Protection Officers and One-Stop Centres (Sakhi).",
        ],
      },
      {
        heading: "2. Workplace Safety — The POSH Act, 2013",
        paragraphs: [
          "The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act mandates a safe and dignified work environment across public and private sectors.",
        ],
        points: [
          "Mandatory Internal Committee (IC): Every workplace with 10 or more employees must constitute an IC headed by a senior female employee with at least 50% women members and an external NGO specialist.",
          "Local Complaints Committee (LCC): In unorganized sectors or establishments with fewer than 10 workers, complaints are handled by District Officer-appointed LCCs.",
          "Filing Timeline: Written complaints can be submitted within 3 months (extendable to 6 months) from the incident.",
          "Non-Retaliation Guarantee: Employees cannot be demoted, victimized, or terminated for lodging complaints under POSH.",
        ],
      },
      {
        heading: "3. Maternity Benefits & Equal Remuneration",
        paragraphs: [
          "Economic independence and reproductive health are protected by statutory labor laws:",
        ],
        points: [
          "Maternity Benefit Act (Amended): 26 weeks of fully paid maternity leave for female employees in establishments with 10+ employees.",
          "Mandatory Crèche Facility: Mandatory day-care creche facility for companies with 50 or more workers with 4 daily visits allowed.",
          "Equal Remuneration Act, 1976: Mandates equal wages for equal work without gender discrimination in hiring, promotions, or pay scales.",
        ],
      },
      {
        heading: "4. Property & Inheritance Rights",
        paragraphs: [
          "The Hindu Succession (Amendment) Act, 2005 confers equal coparcenary rights to daughters in ancestral property with identical rights, duties, and liabilities as sons.",
        ],
        points: [
          "Equal Share: Daughters have an absolute right by birth to equal shares in ancestral agricultural and residential properties.",
          "Streedhan Ownership: All gifts, jewelry, cash, and assets given before, during, or after marriage remain the exclusive property of the woman.",
        ],
      },
    ],
    callouts: [
      "Any woman facing abuse or harassment can call 181 immediately. Protection Officers are legally bound to file a Domestic Incident Report without any delay.",
    ],
    helplines: [
      "National Women Helpline: 181 (Toll-Free, 24x7)",
      "National Commission for Women (NCW) Helpline: 7827170170",
      "Police Emergency Services: 112",
    ],
    outputPath: path.join(outDir, "womens-rights-guide.pdf"),
  });

  // 3. Child Protection Guide
  await createGuidePDF({
    title: "Child Protection & Rights Handbook",
    category: "Children's Rights & Safeguards",
    subtitle: "A comprehensive guide on child safety laws, prevention of child abuse (POCSO Act), right to free education, eradication of child labour, and child helpline emergency mechanisms.",
    sections: [
      {
        heading: "1. The POCSO Act, 2012 — Protection Against Abuse",
        paragraphs: [
          "The Protection of Children from Sexual Offences (POCSO) Act is a gender-neutral legislation protecting all individuals below 18 years from sexual harassment, assault, and exploitation.",
        ],
        points: [
          "Mandatory Reporting (Section 19): Any person who has knowledge of abuse (including teachers, doctors, and neighbors) must report it. Failure to report is punishable by law.",
          "Child-Friendly Inquiries: Statements must be recorded at the child's home or a child-friendly venue by female police officers in plain clothes.",
          "Strict Identity Privacy: Media and public are strictly barred from publishing any photo, school name, address, or details disclosing the child's identity.",
          "Special Fast-Track Courts: Cases must be tried in dedicated Special POCSO Courts within one year from taking cognizance.",
        ],
      },
      {
        heading: "2. Elimination of Child Labour",
        paragraphs: [
          "The Child and Adolescent Labour (Prohibition and Regulation) Act prohibits the employment of children below 14 years in all occupations and processes.",
        ],
        points: [
          "Complete Ban: Children below 14 years cannot be employed anywhere except helping non-hazardous family enterprises after school hours.",
          "Adolescent Restrictions: Adolescents (14 to 18 years) are strictly prohibited from working in hazardous industries, mines, factories, and inflammable substances.",
          "Employer Penalties: Violators face stringent imprisonment of up to 2 years and hefty financial penalties credited to the Child Rehabilitation Fund.",
        ],
      },
      {
        heading: "3. Juvenile Justice (Care & Protection) Act, 2015",
        paragraphs: [
          "Governs child protection institutions, orphanages, adoption procedures, and rehabilitation of children in conflict with the law.",
        ],
        points: [
          "Child Welfare Committees (CWC): District-level quasi-judicial bodies authorized to order shelter, rehabilitation, and medical care for abandoned or vulnerable children.",
          "Juvenile Justice Boards (JJB): Specialized benches handling children in conflict with law focusing on reformation rather than punishment.",
        ],
      },
    ],
    callouts: [
      "If you see a child in distress, begging, out of school, or facing physical abuse, call Childline 1098 immediately. The helpline operates 24x7 across all districts.",
    ],
    helplines: [
      "National Child Helpline: 1098 (Toll-Free, 24x7)",
      "National Commission for Protection of Child Rights (NCPCR): 011-23478200",
      "Emergency Police Assistance: 112",
    ],
    outputPath: path.join(outDir, "child-protection-guide.pdf"),
  });

  // 4. RTI Application Guide
  await createGuidePDF({
    title: "Right to Information (RTI) Application Guide",
    category: "Legal Insights & Governance",
    subtitle: "A practical step-by-step citizen handbook on filing Right to Information applications, fee rules, drafting effective queries, 30-day deadlines, and appeal mechanisms in India.",
    sections: [
      {
        heading: "1. Powers Under the RTI Act, 2005",
        paragraphs: [
          "The RTI Act empowers every Indian citizen to request public records from government departments, local municipal corporations, public sector banks, state universities, and government-aided NGOs.",
        ],
        points: [
          "Inspect Works and Records: You can inspect official files, records, vouchers, municipal construction sites, and extract certified samples of materials.",
          "No Reason Required: Citizens are not required to provide any explanation or motive for seeking information (Section 6(2)).",
          "Nominal Fee: Standard application fee is just Rs. 10. Citizens below the poverty line (BPL) are fully exempt from all fees upon attaching a BPL card copy.",
        ],
      },
      {
        heading: "2. How to Draft an Effective RTI Application",
        paragraphs: [
          "Clarity and specificity are critical when framing your questions to avoid unnecessary delays or denials:",
        ],
        points: [
          "Addressed to PIO: Address your application to 'The Public Information Officer (PIO)', specifying the exact department and office.",
          "Specific Questions: Ask for existing records (e.g., 'Certified copy of tender sanction', 'Daily progress muster roll'). Do not ask for opinions, legal advice, or hypothetical 'Why' questions.",
          "Submission Modes: Submit online via rtionline.gov.in (for central ministries) or state portals, or offline via speed post with an Indian Postal Order (IPO).",
        ],
      },
      {
        heading: "3. Mandatory Response Timelines",
        paragraphs: [
          "Public authorities are legally bound to deliver replies within strict statutory time limits:",
        ],
        points: [
          "Standard Timeline: 30 days from receipt of application.",
          "Life & Liberty Cases: 48 hours if information concerns an individual's life or physical freedom.",
          "Department Transfers: 5 additional days if transferred to another public authority under Section 6(3).",
        ],
      },
      {
        heading: "4. What to Do If Information is Denied or Delayed",
        paragraphs: [
          "If the PIO fails to reply within 30 days, demands excessive fees, or provides misleading data, you hold two levels of statutory appeals:",
        ],
        points: [
          "First Appeal (Section 19(1)): File with the First Appellate Authority (FAA) within 30 days of deadline expiry or receipt of unsatisfactory reply. FAA must decide within 30-45 days.",
          "Second Appeal (Section 19(3)): File with the Central Information Commission (CIC) or State Information Commission (SIC) within 90 days. The Commission can levy a penalty of Rs. 250 per day (up to Rs. 25,000) directly on erring officers.",
        ],
      },
    ],
    callouts: [
      "Always retain a copy of your RTI application along with the postal dispatch receipt and tracking delivery printout as legal evidence for appeals.",
    ],
    helplines: [
      "Central RTI Online Portal: rtionline.gov.in",
      "Central Information Commission (CIC): 011-26183996",
      "HRSJM Legal RTI Help Desk: rti-help@hrsjm.org",
    ],
    outputPath: path.join(outDir, "rti-application-guide.pdf"),
  });

  // 5. Legal Aid Contacts & Directory
  await createGuidePDF({
    title: "Legal Aid Directory & Helpline Guide",
    category: "Legal Aid & Citizen Support",
    subtitle: "Complete institutional contact directory and practical handbook for accessing free legal aid, legal representation, district legal clinics, and emergency helplines across India.",
    sections: [
      {
        heading: "1. Free Legal Representation Framework",
        paragraphs: [
          "Under Article 39A of the Constitution and Section 12 of the Legal Services Authorities Act, 1987, access to justice is guaranteed to disadvantaged citizens through structured state bodies:",
        ],
        points: [
          "NALSA (National Level): Apex policy body headed by the Chief Justice of India formulating legal aid schemes.",
          "State Legal Services Authority (SLSA): Operates in High Courts across all states coordinating state legal aid programs.",
          "District Legal Services Authority (DLSA): Operates in every District Court complex providing free advocates and mediation.",
          "Taluka Legal Services Committees: Located at sub-divisional and tehsil court complexes for grassroots reach.",
        ],
      },
      {
        heading: "2. Eligibility for Free Legal Aid (Section 12)",
        paragraphs: [
          "You are entitled to 100% free legal services and court defense if you belong to any of these categories:",
        ],
        points: [
          "All women and children (regardless of financial standing).",
          "Members of Scheduled Castes (SC) and Scheduled Tribes (ST).",
          "Industrial workers and laborers.",
          "Persons with disabilities or mental illnesses.",
          "Victims of human trafficking or beggar systems.",
          "Victims of mass disasters, ethnic violence, floods, or earthquakes.",
          "Persons in custody or protective custody homes.",
          "Citizens whose annual income falls below the prescribed state statutory threshold (typically Rs. 3,00,000 per annum).",
        ],
      },
      {
        heading: "3. Services Provided Free of Charge",
        paragraphs: [
          "Legal aid covers all aspects of legal representation without any financial burden on the applicant:",
        ],
        points: [
          "Court Representation: Appointment of experienced advocates to argue your cases in Civil, Criminal, Family, and High Courts.",
          "Expenses Covered: Payment of all court fees, process fees, paper costs, drafting charges, and witness expenses.",
          "Lok Adalats: Fast, consensual, and final resolution of property, bank loan, accident claims, and matrimonial disputes with zero court fee.",
        ],
      },
    ],
    callouts: [
      "To apply for free legal aid, visit the Front Office of your District Court DLSA or dial the national toll-free number 15100 anytime.",
    ],
    helplines: [
      "National Legal Services Authority (NALSA): 15100 (Toll-Free, 24x7)",
      "National Women Helpline: 181",
      "Senior Citizen National Helpline: 14567",
      "Cyber Crime Reporting Helpline: 1930",
    ],
    outputPath: path.join(outDir, "legal-aid-contacts-guide.pdf"),
  });

  // 6. Right to Education (RTE) Guide
  await createGuidePDF({
    title: "Right to Education (RTE) Handbook",
    category: "Education Rights & Welfare",
    subtitle: "A practical guide to the Right of Children to Free and Compulsory Education Act (RTE 2009), Article 21A, 25% quota in private schools, and student protection rules in India.",
    sections: [
      {
        heading: "1. Constitutional Mandate — Article 21A",
        paragraphs: [
          "Article 21A of the Constitution of India guarantees free and compulsory elementary education to all children aged 6 to 14 years as a fundamental right enforceable in court.",
        ],
        points: [
          "Free Education: No child can be charged any tuition fee, capitation fee, uniform charges, or book fees that prevents completion of elementary schooling (Classes 1 to 8).",
          "Compulsory Admission: Government and local civic bodies are legally obligated to provide a neighborhood school within 1 km for primary and 3 km for upper primary classes.",
          "No Screening or Interviews: Schools cannot conduct any entrance examination, interview, or screening of children or parents for admission.",
        ],
      },
      {
        heading: "2. The 25% Private School Quota (Section 12(1)(c))",
        paragraphs: [
          "Under Section 12(1)(c) of the RTE Act, private unaided schools must reserve at least 25% of their entry-level seats for underprivileged children:",
        ],
        points: [
          "Eligible Groups: Children belonging to Economically Weaker Sections (EWS) and Disadvantaged Groups (SC, ST, OBC, disabled children, and orphans).",
          "Zero Fee for Parents: The government reimburses the school directly; private schools cannot collect any hidden fee from eligible families.",
          "Online Centralized Portals: Most state governments conduct transparent digital lotteries for RTE admissions every academic year.",
        ],
      },
      {
        heading: "3. Safeguards Within Schools",
        paragraphs: [
          "The RTE Act strictly mandates student safety and dignity within educational premises:",
        ],
        points: [
          "Complete Ban on Corporal Punishment: Section 17 strictly outlaws physical punishment and mental harassment. Violators face disciplinary dismissal and criminal action.",
          "No Detention Rule: Continuous and Comprehensive Evaluation (CCE) ensures students are nurtured and given remedial coaching rather than failed and dropped out.",
          "Basic Infrastructure Standards: Every school must maintain separate functioning toilets for boys and girls, safe drinking water, barrier-free access, and a playground.",
        ],
      },
      {
        heading: "4. Grievance Redressal Mechanisms",
        paragraphs: [
          "If a school denies admission, demands donation, or discriminates against a student, parents can file complaints:",
        ],
        points: [
          "School Management Committee (SMC): 75% of SMC members are parents who monitor teacher attendance and fund usage.",
          "Block Education Officer (BEO) & District Education Officer (DEO): Direct appellate authority for admission disputes.",
          "State Commission for Protection of Child Rights (SCPCR): Quasi-judicial authority monitoring RTE violations and issuing binding directions.",
        ],
      },
    ],
    callouts: [
      "Any demand for donation or capitation fee by a school is illegal under Section 13 and attracts a fine of up to 10 times the capitation fee charged.",
    ],
    helplines: [
      "National Commission for Protection of Child Rights: 011-23478200",
      "Childline India: 1098 (Toll-Free, 24x7)",
      "HRSJM Education Support Desk: education@hrsjm.org",
    ],
    outputPath: path.join(outDir, "right-to-education-guide.pdf"),
  });

  console.log("All 6 rights guide PDFs generated successfully!");
}

main().catch(console.error);
