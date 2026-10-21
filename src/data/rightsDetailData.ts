export interface KeyRightItem {
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
}

export interface LawItem {
  title: string;
  badge?: string;
  year?: string;
  description: string;
  keyProvisions: string[];
}

export interface CaseLawItem {
  caseName: string;
  court: string;
  year: string;
  summary: string;
  impact: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ResourceItem {
  label: string;
  type: "guide" | "link" | "organization" | "case" | "helpline" | "material";
  description?: string;
  link?: string;
}

export interface RightsCategoryDetail {
  slug: string;
  title: string;
  highlightWord: string;
  prefixWord?: string;
  heroSubtitle: string;
  heroImage: string;
  heroBgImage?: string;
  
  // Section 1: Overview
  overview: {
    heading: string;
    description1: string;
    description2: string;
    quote: string;
    image: string;
    extendedPoints: string[];
  };

  // Section 2: Key Rights
  keyRights: {
    eyebrow: string;
    heading: string;
    isArticleStyle?: boolean;
    items: KeyRightItem[];
    quoteCard: {
      quote: string;
      source: string;
      iconType?: string;
      image?: string;
    };
  };

  // Section 3: Important Laws & Documents
  laws: {
    eyebrow: string;
    heading: string;
    items: LawItem[];
    centerImage: string;
    sideCard: {
      title: string;
      description: string;
      items: Array<{ label: string; icon: string }>;
    };
  };

  // Section 4: Landmark Cases & Examples
  cases: {
    eyebrow: string;
    heading: string;
    items: CaseLawItem[];
  };

  // Section 5: FAQs & Resources
  faqsSection: {
    eyebrow: string;
    heading: string;
    items: FaqItem[];
    centerImage: string;
    centerQuote: string;
    resources: {
      title: string;
      items: ResourceItem[];
    };
  };

  // Section 6: CTA Banner
  cta: {
    heading: string;
    description: string;
  };
}

export const rightsDetailData: Record<string, RightsCategoryDetail> = {
  "womens-rights": {
    slug: "womens-rights",
    title: "Women’s Rights",
    highlightWord: "Rights",
    prefixWord: "Women’s",
    heroSubtitle:
      "Every woman has the right to live with dignity, safety, equality and freedom. Know about your rights, the laws that protect you, and how to seek support.",
    heroImage: "/images/rights/womens-rights-hero.jpg",
    heroBgImage: "/images/rights/womens-rights-hero-bg.png",
    overview: {
      heading: "What are Women’s Rights?",
      description1:
        "Women's rights are human rights. They ensure that every woman can live with dignity, freedom, equality and safety in all areas of life — at home, at work, in education, in public spaces and in society. These rights protect women from discrimination, violence and exploitation, and promote equal opportunities for growth and participation.",
      description2:
        "Under Article 15(3) of the Constitution of India, the state is empowered to make special affirmative provisions for women. A comprehensive legal architecture safeguards women from domestic violence, workplace harassment, wage disparities, and dowry offences.",
      quote: "“Empowered women empower families, communities and nations. Gender equality is not just a goal, it is a fundamental right.”",
      image: "/images/rights/womens-rights-collage.png",
      extendedPoints: [
        "Universal equality before the law and non-discrimination under Articles 14 and 15.",
        "Zero tolerance towards workplace sexual harassment under the POSH Act, 2013.",
        "Protection from physical, emotional, and economic abuse under the Domestic Violence Act, 2005.",
        "Equal inheritance and coparcenary rights in ancestral property under Hindu Succession (Amendment) Act, 2005."
      ]
    },
    keyRights: {
      eyebrow: "KEY WOMEN'S RIGHTS",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Equality", icon: "users", description: "Equal treatment under the law without discrimination." },
        { title: "Right to Dignity", icon: "heart", description: "Live with dignity, free from violence, harassment and exploitation." },
        { title: "Right to Education", icon: "graduationCap", description: "Equal access to quality education at all levels." },
        { title: "Right to Work", icon: "briefcase", description: "Equal employment opportunities and safe working conditions." },
        { title: "Right to Health", icon: "shieldCheck", description: "Access to healthcare, including reproductive and maternal health." },
        { title: "Right to Safety", icon: "shield", description: "Protection from domestic violence, sexual harassment and all forms of abuse." },
        { title: "Right to Property", icon: "home", description: "Equal rights in property and inheritance." },
        { title: "Right to Participation", icon: "usersRound", description: "Equal participation in political, social and economic life." }
      ],
      quoteCard: {
        quote: "“A safe, equal and empowered society begins with respecting women’s rights.”",
        source: "— Gender Equality Principle",
        iconType: "shield",
        image: "/images/rights/womens-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws for Women’s Rights",
      centerImage: "/images/rights/womens-rights-laws.png",
      items: [
        {
          title: "Constitution of India (Equality and Non-Discrimination)",
          year: "1950",
          badge: "Constitutional Basis",
          description: "Articles 14, 15(1), 15(3), 16, 21, and 39(d) guaranteeing gender equality and equal pay.",
          keyProvisions: [
            "Empowers state to make special provisions in favour of women.",
            "Mandates equal pay for equal work for both men and women."
          ]
        },
        {
          title: "The Protection of Women from Domestic Violence Act, 2005",
          year: "2005",
          badge: "PWDVA",
          description: "Provides civil remedies including protection orders, residence orders, and monetary relief.",
          keyProvisions: [
            "Right to reside in shared household regardless of legal ownership.",
            "Immediate restraining orders against abusive partners or in-laws."
          ]
        },
        {
          title: "The Sexual Harassment of Women at Workplace Act, 2013",
          year: "2013",
          badge: "POSH Act",
          description: "Mandates prevention, prohibition, and redressal of workplace sexual harassment.",
          keyProvisions: [
            "Mandatory Internal Complaints Committee (ICC) in every firm with 10+ employees.",
            "Confidential, time-bound inquiry within 90 days."
          ]
        },
        {
          title: "The Dowry Prohibition Act, 1961",
          year: "1961",
          badge: "Anti-Dowry",
          description: "Prohibits the giving or taking of dowry with strict criminal punishment.",
          keyProvisions: [
            "Cognizable offence penalizing demanding or abetting dowry payments."
          ]
        },
        {
          title: "The Prohibition of Child Marriage Act, 2006",
          year: "2006",
          badge: "Child Marriage",
          description: "Enforces minimum marriage age of 18 for women and 21 for men.",
          keyProvisions: [
            "Declares child marriage voidable and penalizes adult perpetrators."
          ]
        },
        {
          title: "The Maternity Benefit Act, 1961",
          year: "1961 / 2017",
          badge: "Workplace Rights",
          description: "26 weeks of paid maternity leave, creche facilities, and job protection.",
          keyProvisions: [
            "Bars dismissal or discharge of women during pregnancy and maternity."
          ]
        },
        {
          title: "The Medical Termination of Pregnancy Act, 1971",
          year: "1971 / 2021",
          badge: "Reproductive Choice",
          description: "Ensures legal and safe access to abortion services up to 24 weeks.",
          keyProvisions: [
            "Affirms reproductive autonomy and access to certified medical practitioners."
          ]
        },
        {
          title: "The Protection of Children from Sexual Offences (POCSO) Act, 2012",
          year: "2012",
          badge: "Child Safety",
          description: "Protects girl children below 18 years from sexual harassment, assault, and exploitation.",
          keyProvisions: [
            "Child-friendly special courts and non-disclosure of victim identity."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Key themes and support areas for women's empowerment.",
        items: [
          { label: "Domestic Violence & Support", icon: "home" },
          { label: "Sexual Harassment at Workplace", icon: "briefcase" },
          { label: "Dowry and Harassment", icon: "shield" },
          { label: "Child Marriage", icon: "users" },
          { label: "Maternal Rights", icon: "heart" },
          { label: "Property and Inheritance", icon: "landmark" },
          { label: "Legal Aid and Counseling", icon: "scale" },
          { label: "Women's Helplines", icon: "phone" },
          { label: "Government Schemes", icon: "building2" },
          { label: "Case Studies and Judgments", icon: "bookOpen" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Judgments for Women’s Rights",
      items: [
        {
          caseName: "Vishaka v. State of Rajasthan (1997)",
          court: "Supreme Court of India",
          year: "1997",
          summary: "Laid down the historic 'Vishaka Guidelines' to prevent sexual harassment at workplace, which later formed the basis of the POSH Act 2013.",
          impact: "Mandated every employer to create formal grievance mechanisms and safe working environments."
        },
        {
          caseName: "Shayara Bano v. Union of India (2017)",
          court: "Supreme Court of India (5-Judge Bench)",
          year: "2017",
          summary: "Declared the practice of instantaneous Triple Talaq (Talaq-e-Biddat) unconstitutional and void under Article 14.",
          impact: "Affirmed gender justice, dignity, and equality for Muslim women under Indian constitutional law."
        },
        {
          caseName: "Vineeta Sharma v. Rakesh Sharma (2020)",
          court: "Supreme Court of India",
          year: "2020",
          summary: "Held that daughters have equal coparcenary rights in Hindu undivided ancestral property by birth, even if the father died before the 2005 amendment.",
          impact: "Eliminated patriarchal property inheritance hurdles for Indian women nationwide."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Women’s Rights",
      centerImage: "/images/rights/womens-rights-faq.png",
      centerQuote: "“Stronger Women Stronger Societies”",
      items: [
        {
          question: "What are women’s rights?",
          answer: "Women's rights are basic human rights guaranteeing every woman freedom from violence, equality in employment, reproductive autonomy, property rights, and fair participation in social and political life."
        },
        {
          question: "How can I file a complaint for domestic violence?",
          answer: "You can approach a local Protection Officer, lodge a complaint with the Magistrate under Section 12 of the PWDVA, call women helpline 1091 or 181, or reach out to HRSJM legal aid desk for immediate legal intervention."
        },
        {
          question: "What is the law for workplace sexual harassment?",
          answer: "The POSH Act 2013 mandates that every establishment with 10 or more workers must have an Internal Complaints Committee (ICC). Complaints must be resolved within 90 days with strict confidentiality."
        },
        {
          question: "What legal age is required for marriage?",
          answer: "Under the Prohibition of Child Marriage Act, the legal age for marriage is 18 years for women and 21 years for men. Any marriage below this age is illegal and actionable."
        },
        {
          question: "What rights do women have in property and inheritance?",
          answer: "Daughters have equal coparcenary rights by birth in ancestral property under the Hindu Succession Act (Amendment) 2005. Under civil and personal laws, wives and mothers also have defined maintenance and inheritance shares."
        },
        {
          question: "Where can I get legal help and support?",
          answer: "Free legal representation is provided through the District Legal Services Authority (DLSA), One Stop Centres (Sakhi), and HRSJM's dedicated women legal aid clinic."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "National Commission for Women", type: "organization" },
          { label: "State Women's Commission", type: "organization" },
          { label: "Women Helpline (181)", type: "helpline" },
          { label: "One Stop Centre (Sakhi)", type: "organization" },
          { label: "Legal Aid Services (NALSA)", type: "helpline" },
          { label: "Government Schemes for Women", type: "link" },
          { label: "Awareness Materials (PDF)", type: "material" },
          { label: "NGOs and Support Organizations", type: "organization" },
          { label: "Case Studies", type: "case" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Support Women’s Rights, Build a Safer India",
      description: "Awareness, legal support and community action can create a more equal and just society for every woman."
    }
  },

  "childrens-rights": {
    slug: "childrens-rights",
    title: "Children’s Rights",
    highlightWord: "Rights",
    prefixWord: "Children’s",
    heroSubtitle:
      "Every child has the right to survival, development, protection and participation. Know about children's rights, the laws that protect them, and how to seek support.",
    heroImage: "/images/rights/childrens-rights-hero.jpg",
    heroBgImage: "/images/rights/childrens-rights-hero-bg.png",
    overview: {
      heading: "What are Children’s Rights?",
      description1:
        "Children's rights are the basic human rights that ensure every child can grow up in a safe, healthy, and supportive environment. These rights protect children from abuse, exploitation, discrimination and neglect, and ensure access to education, healthcare, nutrition and a dignified life. Every child, regardless of their background, has the right to survival, development, protection and participation.",
      description2:
        "India's constitutional mandate under Article 21A, Article 24, and Article 39 guarantees compulsory education and prohibits hazardous child labour, supported by specialized bodies like NCPCR.",
      quote: "“Every child deserves a safe childhood, a fair chance and a brighter tomorrow. Protecting children’s rights builds a stronger, more compassionate and just society.”",
      image: "/images/rights/childrens-rights-collage.png",
      extendedPoints: [
        "Free and compulsory education guaranteed from ages 6 to 14 under Article 21A.",
        "Total prohibition of child employment under 14 years under Child Labour Act.",
        "Strict criminal penalties and child-friendly trial procedures under POCSO Act, 2012.",
        "Care and rehabilitation through Child Welfare Committees (CWC) under Juvenile Justice Act."
      ]
    },
    keyRights: {
      eyebrow: "KEY CHILDREN’S RIGHTS",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Survival", icon: "heart", description: "Access to basic needs like food, shelter and healthcare." },
        { title: "Right to Education", icon: "graduationCap", description: "Quality and inclusive education for every child." },
        { title: "Right to Protection", icon: "shield", description: "Protection from abuse, exploitation, violence and neglect." },
        { title: "Right to Health", icon: "shieldCheck", description: "Access to healthcare, nutrition and mental well-being." },
        { title: "Right to Equality", icon: "users", description: "No discrimination based on caste, religion, gender or disability." },
        { title: "Right to Participation", icon: "message", description: "To express their views in matters that affect them." },
        { title: "Right to a Safe and Nurturing Home", icon: "home", description: "Care, love and a safe environment to grow." },
        { title: "Right to be Free from Child Labour", icon: "briefcase", description: "Protection from hazardous work and exploitation." }
      ],
      quoteCard: {
        quote: "“Invest in children today for a brighter, safer and more equal tomorrow.”",
        source: "— Child Rights Charter",
        iconType: "shield",
        image: "/images/rights/childrens-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws for Children’s Rights",
      centerImage: "/images/rights/childrens-rights-laws.png",
      items: [
        {
          title: "The Constitution of India (Articles 21, 21A, 24, 39, 45)",
          year: "1950 / 2002",
          badge: "Constitutional Core",
          description: "Constitutional protections mandating elementary education and banning child exploitation.",
          keyProvisions: [
            "Article 21A: Fundamental right to free and compulsory education.",
            "Article 24: Prohibition of child employment in factories and mines."
          ]
        },
        {
          title: "The Right of Children to Free and Compulsory Education Act, 2009",
          year: "2009",
          badge: "RTE Act",
          description: "Guarantees free elementary education with 25% quota in private schools.",
          keyProvisions: [
            "Prohibits capitation fees, screening tests, and corporal punishment."
          ]
        },
        {
          title: "The Juvenile Justice (Care and Protection of Children) Act, 2015",
          year: "2015",
          badge: "JJ Act",
          description: "Apex statutory code for children in conflict with law and children needing care.",
          keyProvisions: [
            "Establishes Child Welfare Committees (CWC) as guardians for vulnerable children."
          ]
        },
        {
          title: "The Protection of Children from Sexual Offences (POCSO) Act, 2012",
          year: "2012",
          badge: "POCSO Act",
          description: "Stringent penal provisions protecting minors below 18 years from abuse.",
          keyProvisions: [
            "Special POCSO courts, child-friendly recording of statements, and mandatory reporting."
          ]
        },
        {
          title: "The Child Labour (Prohibition and Regulation) Act, 1986",
          year: "1986 / 2016",
          badge: "Child Labour Ban",
          description: "Bans employment of children below 14 in all commercial establishments.",
          keyProvisions: [
            "Cognizable criminal offence with strict penalties on employers."
          ]
        },
        {
          title: "The Prohibition of Child Marriage Act, 2006",
          year: "2006",
          badge: "Anti-Child Marriage",
          description: "Prevents solemnization of child marriages with penal sanctions.",
          keyProvisions: [
            "Empowers Child Marriage Prohibition Officers to issue injunctions."
          ]
        },
        {
          title: "The National Food Security Act, 2013",
          year: "2013",
          badge: "Child Nutrition",
          description: "Guarantees hot cooked mid-day meals in all elementary schools.",
          keyProvisions: [
            "Nutritional support to children up to 14 years through Anganwadis and schools."
          ]
        },
        {
          title: "The National Policy for Children, 2013",
          year: "2013",
          badge: "National Policy",
          description: "Universal framework identifying priority areas: survival, health, education, and protection.",
          keyProvisions: [
            "Affirms child rights as universal, indivisible, and interrelated."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Essential areas of child welfare and legal protection in India.",
        items: [
          { label: "Child Abuse and Protection", icon: "shield" },
          { label: "Child Labour", icon: "briefcase" },
          { label: "Child Marriage", icon: "users" },
          { label: "Education and School Safety", icon: "graduationCap" },
          { label: "Health and Nutrition", icon: "heart" },
          { label: "Adoption and Foster Care", icon: "home" },
          { label: "Children with Disabilities", icon: "usersRound" },
          { label: "Juvenile Justice System", icon: "scale" },
          { label: "Online Safety and Cyber Protection", icon: "shieldCheck" },
          { label: "Special Protection for Vulnerable Children", icon: "landmark" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Milestone Rulings in Child Rights",
      items: [
        {
          caseName: "M.C. Mehta v. State of Tamil Nadu (1996)",
          court: "Supreme Court of India",
          year: "1996",
          summary: "Directed the abolition of child labour in the hazardous match and fireworks factories of Sivakasi, establishing the Child Labour Rehabilitation-cum-Welfare Fund.",
          impact: "Mandated employers to pay fines per child employed and directed state governments to provide adult employment to affected families."
        },
        {
          caseName: "Bachpan Bachao Andolan v. Union of India (2011)",
          court: "Supreme Court of India",
          year: "2011",
          summary: "Mandated registration of FIRs immediately upon report of missing children, treating all missing children as potential victims of trafficking until proven otherwise.",
          impact: "Established the national tracking portal TrackChild and strengthened anti-human trafficking units."
        },
        {
          caseName: "Independent Thought v. Union of India (2017)",
          court: "Supreme Court of India",
          year: "2017",
          summary: "Read down Exception 2 to Section 375 of IPC, holding that sexual intercourse with a minor wife below 18 years is rape.",
          impact: "Closed a dangerous legal loophole, protecting underage brides from statutory marital sexual abuse."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Children’s Rights",
      centerImage: "/images/rights/childrens-rights-faq.png",
      centerQuote: "“Safe Children Stronger Communities Brighter Futures.”",
      items: [
        {
          question: "What are children’s rights?",
          answer: "Children's rights are basic human rights guaranteeing every boy and girl the right to survive, grow, learn, play, and be protected from violence, abuse, and hazardous exploitation."
        },
        {
          question: "What is the age considered as a child in India?",
          answer: "Under the POCSO Act and Juvenile Justice Act, a child is defined as any person below the age of 18 years. For free and compulsory elementary education under Article 21A, the primary age group is 6 to 14 years."
        },
        {
          question: "What can I do if I see child abuse or neglect?",
          answer: "Immediately dial Childline 1098 or police 112. Under Section 19 of the POCSO Act, any person having knowledge of child abuse has a mandatory legal obligation to report it."
        },
        {
          question: "Is child labour illegal in India?",
          answer: "Yes. Employing a child below 14 years in any occupation or process is a cognizable criminal offence punishable with imprisonment up to 2 years and heavy fines under the Child Labour Amendment Act."
        },
        {
          question: "What is the POCSO Act?",
          answer: "The Protection of Children from Sexual Offences (POCSO) Act 2012 is a stringent law specifically designed to protect children from sexual assault, harassment, and pornography, providing child-friendly judicial procedures."
        },
        {
          question: "How can I ensure my child's right to education?",
          answer: "Every child aged 6–14 can get free admission into neighborhood government schools or under the 25% EWS quota in private unaided schools under Section 12(1)(c) of the RTE Act."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Ministry of Women and Child Development", type: "organization" },
          { label: "National Commission for Protection of Child Rights (NCPCR)", type: "organization" },
          { label: "Childline 1098 (24x7 Help)", type: "helpline" },
          { label: "POCSO e-Box (Report Online)", type: "link" },
          { label: "Juvenile Justice Services", type: "organization" },
          { label: "National Child Labour Project (NCLP)", type: "link" },
          { label: "Educational Resources and Guides", type: "guide" },
          { label: "NGOs and Support Organizations", type: "organization" },
          { label: "Case Studies and Judgments", type: "case" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Let's Protect Our Children, Build a Better India",
      description: "Join hands to support children's rights, create safe communities, and give every child the opportunity to learn, grow and thrive."
    }
  },

  "labour-rights": {
    slug: "labour-rights",
    title: "Labour Rights",
    highlightWord: "Rights",
    prefixWord: "Labour",
    heroSubtitle:
      "Every worker has the right to fair wages, safe working conditions, social security and dignity at work. Know about your labour rights, the laws that protect you, and how to seek support.",
    heroImage: "/images/rights/labour-rights-hero.jpg",
    heroBgImage: "/images/rights/labour-rights-hero-bg.png",
    overview: {
      heading: "What are Labour Rights?",
      description1:
        "Labour rights are the rights of all workers to fair wages, safe and healthy working conditions, reasonable working hours, social security, equal treatment and freedom to form unions. These rights protect workers in organized and unorganized sectors and ensure dignity, safety and justice at the workplace.",
      description2:
        "In India, constitutional directives under Articles 39, 41, 42, and 43 mandate living wages, maternity relief, and humane conditions. The modern Labour Codes consolidate dozens of central laws into unified statutory protections.",
      quote: "“Decent work is not a privilege, but a right for every worker. Fair wages, safe workplaces and dignity at work build a stronger and more equal society.”",
      image: "/images/rights/labour-rights-collage.png",
      extendedPoints: [
        "Constitutional mandate under Article 43 for a living wage and decent standard of life.",
        "Universal minimum wages guaranteed across all sectors under Code on Wages, 2019.",
        "Social security, PF, and medical insurance coverage under Code on Social Security, 2020.",
        "Stringent safety standards and compensation for workplace injuries under Occupational Safety Code."
      ]
    },
    keyRights: {
      eyebrow: "KEY LABOUR RIGHTS",
      heading: "Core Labour Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Fair Wages", icon: "scale", description: "Timely and fair payment for work done." },
        { title: "Right to Safe Working Conditions", icon: "shield", description: "Safe, healthy and hazard-free workplaces." },
        { title: "Right to Reasonable Working Hours", icon: "clock", description: "Regulated working hours and rest periods." },
        { title: "Right to Form Unions", icon: "users", description: "Freedom to form and join trade unions." },
        { title: "Right to Equality", icon: "scale", description: "Equal treatment without discrimination." },
        { title: "Right to Social Security", icon: "heart", description: "Access to benefits like PF, ESI, maternity and other welfare schemes." },
        { title: "Right to Protection from Exploitation", icon: "shieldCheck", description: "Protection from child labour, bonded labour and forced labour." },
        { title: "Right to Grievance Redressal", icon: "briefcase", description: "Access to legal remedies and labour authorities." }
      ],
      quoteCard: {
        quote: "“Respect Labour. Build a Fairer India for Every Worker.”",
        source: "— Worker Dignity Charter",
        iconType: "shield",
        image: "/images/rights/labour-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Labour Laws",
      centerImage: "/images/rights/labour-rights-laws.png",
      items: [
        {
          title: "The Code on Wages, 2019",
          year: "2019",
          badge: "Wages",
          description: "Universalizes minimum wage standards and prohibits gender wage discrimination.",
          keyProvisions: [
            "Applies to all establishments in organized and informal sectors.",
            "Fixes national floor wages below which state wages cannot fall."
          ]
        },
        {
          title: "The Industrial Relations Code, 2020",
          year: "2020",
          badge: "Trade Unions",
          description: "Governs trade union recognition and speedy settlement of industrial disputes.",
          keyProvisions: [
            "Requires mandatory 14-day conciliation notice prior to strikes."
          ]
        },
        {
          title: "The Code on Social Security, 2020",
          year: "2020",
          badge: "Social Protection",
          description: "Brings gig, platform, and unorganized workers under social security umbrella.",
          keyProvisions: [
            "Aadhaar-linked universal account numbers (UAN) for provident fund and health insurance."
          ]
        },
        {
          title: "The Occupational Safety, Health and Working Conditions Code, 2020",
          year: "2020",
          badge: "Workplace Safety",
          description: "Standardizes safety protocols, ventilation, and emergency preparedness.",
          keyProvisions: [
            "Mandatory annual health check-ups and travel allowances for inter-state workers."
          ]
        },
        {
          title: "The Minimum Wages Act, 1948",
          year: "1948",
          badge: "Historical Statute",
          description: "Foundational act setting minimum wage thresholds across scheduled employments.",
          keyProvisions: [
            "Penalizes employers paying below state notified minimum wage rates."
          ]
        },
        {
          title: "The Payment of Gratuity Act, 1972",
          year: "1972",
          badge: "Gratuity",
          description: "Statutory lump-sum retirement benefit for continuous service of 5 years.",
          keyProvisions: [
            "Payable upon retirement, resignation, death, or disablement."
          ]
        },
        {
          title: "The Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
          year: "1952",
          badge: "EPF",
          description: "Contributory retirement savings and pension scheme (EPFO).",
          keyProvisions: [
            "Mandatory for all commercial units with 20 or more employees."
          ]
        },
        {
          title: "The Employees' State Insurance Act, 1948",
          year: "1948",
          badge: "ESIC",
          description: "Comprehensive medical and cash benefit scheme for industrial workers and dependents.",
          keyProvisions: [
            "Covers sickness, maternity, temporary and permanent disablement."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Key themes in labour welfare and industrial relations in India.",
        items: [
          { label: "Minimum Wages", icon: "scale" },
          { label: "Working Hours and Overtime", icon: "clock" },
          { label: "Workplace Safety and Health", icon: "shield" },
          { label: "Contract and Gig Workers", icon: "users" },
          { label: "Migrant Workers", icon: "usersRound" },
          { label: "Child Labour", icon: "briefcase" },
          { label: "Bonded Labour", icon: "shieldCheck" },
          { label: "Maternity Benefits", icon: "heart" },
          { label: "Social Security (PF, ESI)", icon: "landmark" },
          { label: "Grievance Redressal", icon: "fileText" },
          { label: "Labour Courts and Tribunals", icon: "gavel" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Historic Industrial & Labour Judgments",
      items: [
        {
          caseName: "People's Union for Democratic Rights v. Union of India (Asiad Workers Case, 1982)",
          court: "Supreme Court of India",
          year: "1982",
          summary: "Held that paying less than the minimum wage amounts to 'forced labour' prohibited under Article 23 of the Constitution.",
          impact: "Established that economic necessity compelling a person to accept sub-minimum wages violates constitutional dignity."
        },
        {
          caseName: "Bandhua Mukti Morcha v. Union of India (1984)",
          court: "Supreme Court of India",
          year: "1984",
          summary: "Landmark public interest litigation freeing thousands of bonded stone quarry workers in Haryana.",
          impact: "Mandated state governments to identify, release, and actively rehabilitate bonded and contract labourers."
        },
        {
          caseName: "State of Punjab v. Jagjit Singh (2016)",
          court: "Supreme Court of India",
          year: "2016",
          summary: "Ruled that temporary, contractual, and ad-hoc employees are entitled to 'Equal Pay for Equal Work' on par with regular permanent employees.",
          impact: "Eliminated arbitrary wage disparities for lakhs of contractual government workers across India."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Labour Rights",
      centerImage: "/images/rights/labour-rights-faq.png",
      centerQuote: "“Safe Workers Strong Nation Better Tomorrow.”",
      items: [
        {
          question: "What are labour rights?",
          answer: "Labour rights are statutory and constitutional entitlements that ensure workers receive fair remuneration, safe working environments, social security benefits, and freedom from arbitrary exploitation."
        },
        {
          question: "What is the minimum wage in India?",
          answer: "Minimum wages are revised periodically by Central and State governments based on skill level (unskilled, semi-skilled, skilled, highly skilled) and geographic zone. Paying below this rate is a criminal offence."
        },
        {
          question: "Can a company make me work more than 8 hours a day?",
          answer: "The standard working day is 8 hours (48 hours per week). Any additional work constitutes overtime and must be compensated at double the normal rate of wages under the Factories Act."
        },
        {
          question: "What should I do if I am not paid on time?",
          answer: "Under the Code on Wages, wages must be paid before the expiry of the 7th or 10th day after the wage period. You can file a claim before the Labour Inspector or Conciliation Officer."
        },
        {
          question: "Can I be terminated without notice?",
          answer: "No. Employees who have completed one year of continuous service are entitled to 30 days' written notice or pay in lieu thereof, alongside retrenchment compensation."
        },
        {
          question: "Where can I file a complaint for labour law violations?",
          answer: "Complaints can be lodged with the Office of the Labour Commissioner, through the Shram Suvidha portal, or with HRSJM's worker defense legal team."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Ministry of Labour & Employment", type: "organization" },
          { label: "Labour Commissioner (State-wise)", type: "organization" },
          { label: "EPFO (Employees' Provident Fund)", type: "link" },
          { label: "ESIC (Employees' State Insurance)", type: "link" },
          { label: "Labour Law Guides & Brochures", type: "guide" },
          { label: "Legal Aid Services (NALSA)", type: "helpline" },
          { label: "Labour Courts & Tribunals", type: "organization" },
          { label: "Helplines for Labour Complaints", type: "helpline" },
          { label: "Awareness Videos", type: "material" },
          { label: "Case Studies and Judgments", type: "case" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Support Workers’ Rights, Build a Fairer and Stronger India",
      description: "Awareness, legal support and community action can ensure dignity, safety and justice for every worker."
    }
  },

  "senior-citizen-rights": {
    slug: "senior-citizen-rights",
    title: "Senior Citizen Rights",
    highlightWord: "Rights",
    prefixWord: "Senior Citizen",
    heroSubtitle:
      "Every senior citizen has the right to live with dignity, security, healthcare, financial protection and respect. Know about your rights, the laws that protect you, and how to seek support.",
    heroImage: "/images/rights/senior-citizen-rights-hero.jpg",
    heroBgImage: "/images/rights/senior-citizen-rights-hero-bg.png",
    overview: {
      heading: "What are Senior Citizen Rights?",
      description1:
        "Senior citizen rights ensure that older persons can live with dignity, security, good health, financial stability and respect. These rights protect them from neglect, abuse and exploitation, and provide access to healthcare, social security, maintenance, and a safe and supportive environment. Every senior citizen deserves care, respect and the opportunity to live an independent and fulfilling life.",
      description2:
        "Under the Maintenance and Welfare of Parents and Senior Citizens Act 2007, adult children and heirs have a legally binding obligation to maintain elderly parents, enforced through speedy Maintenance Tribunals.",
      quote: "“Our elders have built our society with their hard work and sacrifices. Respecting, protecting and caring for senior citizens is not just a responsibility, but a duty of every individual and the society as a whole.”",
      image: "/images/rights/senior-citizen-rights-collage.png",
      extendedPoints: [
        "Enforceable maintenance claims up to Rs. 10,000/month through Maintenance Tribunals.",
        "Revocation of property gift deeds if children fail to care for elderly parents.",
        "Priority healthcare, geriatric beds, and medical concessions in public hospitals.",
        "National Elderline Helpline 14567 providing rescue, counseling, and legal support."
      ]
    },
    keyRights: {
      eyebrow: "KEY SENIOR CITIZEN RIGHTS",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Dignity and Respect", icon: "heart", description: "Live with dignity, honour and social inclusion." },
        { title: "Right to Healthcare", icon: "shieldCheck", description: "Access to affordable and quality healthcare services." },
        { title: "Right to Financial Security", icon: "landmark", description: "Pension, savings and protection from financial exploitation." },
        { title: "Right to Maintenance", icon: "home", description: "Children and relatives are legally responsible for their care." },
        { title: "Right to Protection from Abuse", icon: "shield", description: "Protection from physical, emotional, financial and property abuse." },
        { title: "Right to Legal Support", icon: "scale", description: "Access to legal remedies and grievance redressal mechanisms." },
        { title: "Right to Social Security", icon: "users", description: "Access to government welfare schemes and social security benefits." },
        { title: "Right to Participation", icon: "usersRound", description: "To remain active in family, community and society." }
      ],
      quoteCard: {
        quote: "“Respect our elders today for a stronger, more compassionate tomorrow.”",
        source: "— Senior Citizens Dignity Charter",
        iconType: "heart",
        image: "/images/rights/senior-citizen-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws for Senior Citizens",
      centerImage: "/images/rights/senior-citizen-rights-laws.png",
      items: [
        {
          title: "The Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
          year: "2007",
          badge: "Apex Statute",
          description: "Mandates maintenance from children and heirs with summary tribunal proceedings.",
          keyProvisions: [
            "Section 23: Voids property transfers if children fail to maintain parents.",
            "Section 24: Penalizes abandonment of senior citizens with imprisonment."
          ]
        },
        {
          title: "The National Policy for Older Persons, 1999",
          year: "1999",
          badge: "National Policy",
          description: "Establishes government duties regarding pensions, shelter, and geriatric care.",
          keyProvisions: [
            "Promotes construction of old age homes in every district."
          ]
        },
        {
          title: "The Rights of Persons with Disabilities Act, 2016",
          year: "2016",
          badge: "Accessibility",
          description: "Protects aging citizens with mobility, hearing, visual, or cognitive impairments.",
          keyProvisions: [
            "Mandates barrier-free access in all public buildings and transport."
          ]
        },
        {
          title: "The Mental Healthcare Act, 2017",
          year: "2017",
          badge: "Healthcare",
          description: "Protects mental health rights and dignity of elderly citizens suffering from dementia.",
          keyProvisions: [
            "Right to access mental healthcare facilities without cruelty or isolation."
          ]
        },
        {
          title: "The Indian Penal Code (provisions on abuse and exploitation)",
          year: "Penal Law",
          badge: "Criminal Sanction",
          description: "Criminal provisions against cheating, forgery of wills, and criminal intimidation of elders.",
          keyProvisions: [
            "Penalizes financial fraud and property grabbing targeting senior citizens."
          ]
        },
        {
          title: "The Code of Criminal Procedure (CrPC)",
          year: "1973",
          badge: "Section 125",
          description: "Section 125 allows elderly parents to claim monthly maintenance from children.",
          keyProvisions: [
            "Applicable across all religions and personal laws."
          ]
        },
        {
          title: "Various State Government Schemes and Policies",
          year: "State-wise",
          badge: "Welfare Schemes",
          description: "Old age pensions, subsidised bus passes, dedicated hospital counters, and pilgrim travel.",
          keyProvisions: [
            "Financial security and recreational support for low-income elders."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Priority areas of elder care and legal advocacy.",
        items: [
          { label: "Elder Abuse and Neglect", icon: "shield" },
          { label: "Healthcare for Senior Citizens", icon: "heart" },
          { label: "Pension and Social Security", icon: "landmark" },
          { label: "Maintenance and Inheritance", icon: "home" },
          { label: "Senior Citizen Helplines", icon: "phone" },
          { label: "Housing and Shelter", icon: "building2" },
          { label: "Legal Aid and Support", icon: "scale" },
          { label: "Mental Health and Well-being", icon: "sun" },
          { label: "Mobility and Accessibility", icon: "usersRound" },
          { label: "Government Schemes", icon: "fileText" },
          { label: "Case Studies and Judgments", icon: "gavel" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Elder Rights Judgments",
      items: [
        {
          caseName: "S. Vanitha v. Deputy Commissioner, Bengaluru (2020)",
          court: "Supreme Court of India",
          year: "2020",
          summary: "Clarified the harmonious balance between the Senior Citizens Act and the Domestic Violence Act, upholding elderly parents' right to live peacefully in their home.",
          impact: "Affirmed that the Senior Citizens Act provides summary eviction powers to protect elders from harassment."
        },
        {
          caseName: "Ashwani Kumar v. Union of India (2018)",
          court: "Supreme Court of India",
          year: "2018",
          summary: "Directed all state governments to establish old age homes in every district and ensure adequate pensions and geriatric healthcare for senior citizens.",
          impact: "Recognized the right of senior citizens to live with dignity and social security as a constitutional right under Article 21."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Senior Citizen Rights",
      centerImage: "/images/rights/senior-citizen-rights-faq.png",
      centerQuote: "“Caring for our elders creates a kinder, stronger and more humane society.”",
      items: [
        {
          question: "What are the rights of senior citizens?",
          answer: "Senior citizens have the right to live with dignity, receive healthcare, claim maintenance from adult children, be protected from physical/financial abuse, and receive statutory welfare pensions."
        },
        {
          question: "Who is considered a senior citizen in India?",
          answer: "Under the Maintenance and Welfare of Parents and Senior Citizens Act 2007, any citizen of India who has attained the age of 60 years or above is legally defined as a senior citizen."
        },
        {
          question: "Can senior citizens claim maintenance from their children?",
          answer: "Yes. Under Section 4 of the Act, parents and senior citizens who cannot maintain themselves from their own earning or property can apply to the Maintenance Tribunal for monthly maintenance from adult children."
        },
        {
          question: "What should I do if I face abuse or neglect?",
          answer: "You can call the National Elderline at 14567, file an application before the Sub-Divisional Magistrate (Maintenance Tribunal), or contact HRSJM's elder support cell for swift rescue and legal assistance."
        },
        {
          question: "What healthcare benefits are available for senior citizens?",
          answer: "Public hospitals provide separate OPD queues, dedicated geriatric beds, free diagnostics, and subsidised medications under the National Programme for Health Care of the Elderly (NPHCE)."
        },
        {
          question: "Where can I get legal help and support?",
          answer: "District Legal Services Authorities (DLSA) provide free legal aid to senior citizens across India. HRSJM also runs free legal counseling clinics specifically for elderly individuals."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Ministry of Social Justice & Empowerment", type: "organization" },
          { label: "National Programme for Health Care of the Elderly (NPHCE)", type: "link" },
          { label: "Elderline (14567)", type: "helpline" },
          { label: "State Senior Citizen Helplines", type: "helpline" },
          { label: "Legal Aid Services (NALSA)", type: "helpline" },
          { label: "HelpAge India", type: "organization" },
          { label: "National Institute of Social Defence", type: "organization" },
          { label: "Government Schemes (Integrated Programme for Older Persons)", type: "link" },
          { label: "Awareness Materials and Guides", type: "guide" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Let’s Respect, Support and Care for Our Senior Citizens",
      description: "Awareness, legal support and community action can ensure a safer, healthier and more dignified life for our elders."
    }
  },

  "human-rights": {
    slug: "human-rights",
    title: "Human Rights",
    highlightWord: "Rights",
    prefixWord: "Human",
    heroSubtitle:
      "Every individual has inherent rights and freedoms regardless of nationality, gender, religion or any other status. Learn about your human rights and how to protect them.",
    heroImage: "/images/rights/human-rights-hero.jpg",
    heroBgImage: "/images/rights/human-rights-hero-bg.png",
    overview: {
      heading: "What are Human Rights?",
      description1:
        "Human rights are basic rights and freedoms that belong to every person, simply because they are human. These rights are universal, inalienable, and apply to all, regardless of nationality, gender, religion, caste, language or any other status.",
      description2:
        "They encompass civil, political, economic, social and cultural guarantees — from the right to life and liberty to the right to food, education, work, and healthcare. In India, human rights principles are firmly enshrined in our Constitution and protected by statutory bodies like the National Human Rights Commission (NHRC).",
      quote: "“Human rights are not a privilege, but a right for every human being.”",
      image: "/images/rights/human-rights-collage.png",
      extendedPoints: [
        "Inherent to every human being from birth without distinction.",
        "Protected internationally by the UN Universal Declaration of Human Rights (1948).",
        "Enforceable in India through constitutional writs and statutory commissions.",
        "Guaranteed equally without prejudice to race, caste, sex, religion, or place of birth."
      ]
    },
    keyRights: {
      eyebrow: "KEY HUMAN RIGHTS",
      heading: "Core Human Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Life and Dignity", icon: "heart", description: "Every human being has the inherent right to live with peace, bodily autonomy, and human dignity." },
        { title: "Equality and Non-Discrimination", icon: "users", description: "Fair treatment before the law with absolute prohibition against caste, gender, and racial discrimination." },
        { title: "Freedom and Security", icon: "shield", description: "Protection from arbitrary arrest, unlawful detention, physical violence, and state coercion." },
        { title: "Freedom of Expression", icon: "message", description: "The freedom to hold opinions, receive information, and express ideas through speech, writing, and art." },
        { title: "Freedom of Religion", icon: "sun", description: "Unfettered right to profess, practice, and propagate one's religious or philosophical beliefs freely." },
        { title: "Right to Participate in Public Life", icon: "usersRound", description: "Equal rights to vote, stand for election, and actively shape civic and political governance." },
        { title: "Right to Work", icon: "briefcase", description: "Fair wages, humane working conditions, equal pay for equal work, and protection against forced labor." },
        { title: "Right to Education", icon: "graduationCap", description: "Universal access to free, compulsory elementary education and lifelong vocational learning." },
        { title: "Right to Health", icon: "shieldCheck", description: "Access to timely, acceptable, and affordable healthcare of appropriate quality for all individuals." },
        { title: "Right to Adequate Standard of Living", icon: "home", description: "Sufficient food, clean water, adequate shelter, clothing, and continuous improvement of living conditions." },
      ],
      quoteCard: {
        quote: "“All human beings are born free and equal in dignity and rights.”",
        source: "— Universal Declaration of Human Rights (UDHR)",
        iconType: "un",
        image: "/images/rights/human-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key International and National Laws",
      centerImage: "/images/rights/human-rights-laws.png",
      items: [
        {
          title: "Universal Declaration of Human Rights (UDHR)",
          year: "1948",
          badge: "UN Landmark",
          description: "The global milestone document proclaiming 30 inalienable rights to which everyone is entitled.",
          keyProvisions: [
            "Adopted by the United Nations General Assembly in Paris on 10 December 1948.",
            "Recognizes inherent dignity and equal, inalienable rights as the foundation of freedom and peace.",
            "Prohibits torture, slavery, arbitrary arrest, and inhuman punishment worldwide."
          ]
        },
        {
          title: "International Covenants on Human Rights",
          year: "1966",
          badge: "ICCPR & ICESCR",
          description: "Binding multilateral treaties protecting civil, political, economic, social, and cultural rights.",
          keyProvisions: [
            "International Covenant on Civil and Political Rights (ICCPR) ratified by India in 1979.",
            "International Covenant on Economic, Social and Cultural Rights (ICESCR).",
            "Monitored by international treaty bodies and periodic universal reviews."
          ]
        },
        {
          title: "National Human Rights Commission Act, 1993",
          year: "1993",
          badge: "Indian Legislation",
          description: "The Protection of Human Rights Act establishing the NHRC and State Human Rights Commissions.",
          keyProvisions: [
            "Empowers NHRC to investigate human rights violations and negligence by public servants.",
            "Power of a civil court to summon witnesses, examine documents, and recommend prosecution.",
            "Directs interim monetary compensation to victims of custodial torture or rights violations."
          ]
        },
        {
          title: "Protection from Discrimination Laws",
          year: "Constitutional",
          badge: "Articles 14, 15, 17",
          description: "Constitutional and statutory statutes penalizing discrimination and untouchability in India.",
          keyProvisions: [
            "Protection of Civil Rights Act, 1955 prohibiting practice of untouchability.",
            "SC & ST (Prevention of Atrocities) Act, 1989 ensuring stringent deterrence.",
            "Equal Remuneration Act, 1976 mandating gender wage parity across industries."
          ]
        },
        {
          title: "Other Relevant Acts and Policies",
          year: "Comprehensive",
          badge: "Welfare & Justice",
          description: "Specialized statutory protections for women, children, workers, disabled, and senior citizens.",
          keyProvisions: [
            "Rights of Persons with Disabilities Act, 2016 ensuring accessibility and reasonable accommodation.",
            "Mental Healthcare Act, 2017 recognizing the right to mental health with full dignity.",
            "Legal Services Authorities Act, 1987 offering free legal aid to vulnerable citizens."
          ]
        }
      ],
      sideCard: {
        title: "INDIA'S COMMITMENT",
        description: "India is a signatory to major international human rights instruments and has a strong constitutional framework to protect and promote human rights for all.",
        items: [
          { label: "Constitutional Protection", icon: "bookOpen" },
          { label: "National Human Rights Commission", icon: "building2" },
          { label: "Legal Remedies & Writs", icon: "scale" },
          { label: "Judicial Support & Public Interest Litigation", icon: "landmark" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Human Rights Judgments",
      items: [
        {
          caseName: "Maneka Gandhi v. Union of India (1978)",
          court: "Supreme Court of India",
          year: "1978",
          summary: "The Supreme Court radically expanded Article 21, establishing that any procedure depriving life or personal liberty must be 'just, fair, and reasonable', not merely lawful.",
          impact: "Transformed Indian jurisprudence by incorporating the principle of natural justice into fundamental rights."
        },
        {
          caseName: "D.K. Basu v. State of West Bengal (1997)",
          court: "Supreme Court of India",
          year: "1997",
          summary: "Laid down mandatory guidelines for police during arrest and detention to prevent custodial torture and deaths.",
          impact: "Mandated informing relatives of arrest, medical examination every 48 hours, and displaying police officer badges."
        },
        {
          caseName: "PUCL v. Union of India (Right to Food Case, 2001)",
          court: "Supreme Court of India",
          year: "2001",
          summary: "Recognized the Right to Food as an integral part of the Right to Life under Article 21.",
          impact: "Converted welfare schemes into legally enforceable entitlements, leading directly to the National Food Security Act, 2013."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Human Rights",
      centerImage: "/images/rights/human-rights-faq.png",
      centerQuote: "“Together we can build a fairer and more just society.”",
      items: [
        {
          question: "What are human rights?",
          answer: "Human rights are basic rights and freedoms that belong to every person, simply because they are human. These rights are universal, inalienable, and apply to all, regardless of nationality, gender, religion, caste, language or any other status."
        },
        {
          question: "Who is entitled to human rights?",
          answer: "Every single human being is entitled to human rights without any discrimination. They belong equally to children, women, men, indigenous people, minorities, disabled persons, refugees, and prisoners alike."
        },
        {
          question: "Can human rights be restricted?",
          answer: "Most human rights are qualified, meaning governments may restrict them only under strictly defined legal circumstances — such as maintaining public health during pandemics, national security, or preventing crime. However, absolute rights like the prohibition of torture, slavery, and arbitrary deprivation of life can never be suspended."
        },
        {
          question: "What can I do if my rights are violated?",
          answer: "You have multiple avenues of recourse: 1) File a complaint with the National or State Human Rights Commission (NHRC/SHRC); 2) Approach the High Court under Article 226 or the Supreme Court under Article 32; 3) Contact HRSJM legal aid desk for free legal representation and guidance."
        },
        {
          question: "How can I file a complaint?",
          answer: "You can file a complaint directly on our website through the 'File a Complaint' portal, call our dedicated helpline at +91 98765 43210, or visit any of our regional legal aid centers across India. Our legal advocacy team will evaluate your case confidentially within 48 hours."
        }
      ],
      resources: {
        title: "RESOURCES",
        items: [
          { label: "Download Guides & Brochures", type: "guide" },
          { label: "Important Links", type: "link" },
          { label: "Human Rights Organizations", type: "organization" },
          { label: "Case Studies", type: "case" },
          { label: "Helplines & Support Services", type: "helpline" },
          { label: "Educational Materials", type: "material" }
        ]
      }
    },
    cta: {
      heading: "Be A Part of the Change",
      description: "Support human rights awareness, education and advocacy. Together we can create a more equal and just society."
    }
  },

  "fundamental-rights": {
    slug: "fundamental-rights",
    title: "Fundamental Rights",
    highlightWord: "Rights",
    prefixWord: "Fundamental",
    heroSubtitle:
      "The Fundamental Rights are guaranteed by the Constitution of India to ensure freedom, equality, justice and dignity for every citizen.",
    heroImage: "/images/rights/fundamental-rights-hero.jpg",
    heroBgImage: "/images/rights/fundamental-rights-hero-bg.png",
    overview: {
      heading: "What are Fundamental Rights?",
      description1:
        "Fundamental Rights are basic human rights guaranteed by the Constitution of India to every citizen. These rights ensure freedom, equality, dignity and justice, and protect individuals from arbitrary action by the State. They are essential for a democratic and just society.",
      description2:
        "Enshrined in Part III of the Constitution (Articles 12 to 35), these rights are justiciable — meaning citizens can directly petition the High Courts (Article 226) or the Supreme Court of India (Article 32) when their fundamental rights are infringed.",
      quote: "“Fundamental Rights are the soul of our Constitution and the foundation of a free, just and equal India.”",
      image: "/images/rights/fundamental-rights-collage.png",
      extendedPoints: [
        "Enshrined in Part III (Articles 12 to 35) of the Constitution of India.",
        "Justiciable and enforceable against state actions under Article 32 & 226.",
        "Guarantees six broad categories of fundamental civil and political liberties.",
        "Subject only to reasonable restrictions defined explicitly in the Constitution."
      ]
    },
    keyRights: {
      eyebrow: "SIX FUNDAMENTAL RIGHTS",
      heading: "Types of Fundamental Rights",
      isArticleStyle: true,
      items: [
        {
          title: "Right to Equality",
          subtitle: "Articles 14–18",
          description: "Ensures equality before law and equal protection of laws for all citizens.",
          icon: "users"
        },
        {
          title: "Right to Freedom",
          subtitle: "Articles 19–22",
          description: "Guarantees freedom of speech, expression, movement, residence, profession and protection in certain cases.",
          icon: "bird"
        },
        {
          title: "Right against Exploitation",
          subtitle: "Articles 23–24",
          description: "Prohibits human trafficking, forced labour and child labour.",
          icon: "handsHelping"
        },
        {
          title: "Right to Freedom of Religion",
          subtitle: "Articles 25–28",
          description: "Guarantees freedom to practice, profess and propagate any religion.",
          icon: "namaste"
        },
        {
          title: "Cultural and Educational Rights",
          subtitle: "Articles 29–30",
          description: "Protects the rights of minorities to conserve their culture and establish educational institutions.",
          icon: "graduationCap"
        },
        {
          title: "Right to Constitutional Remedies",
          subtitle: "Article 32",
          description: "Allows citizens to move the Supreme Court for the enforcement of Fundamental Rights.",
          icon: "gavel"
        }
      ],
      quoteCard: {
        quote: "“A Constitution is only as strong as the rights it guarantees to its people.”",
        source: "— Constitutional Philosophy of India",
        iconType: "constitution",
        image: "/images/rights/fundamental-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT ARTICLES",
      heading: "Key Constitutional Articles",
      centerImage: "/images/rights/fundamental-rights-laws.png",
      items: [
        {
          title: "Article 14 - Right to Equality",
          year: "Part III",
          badge: "Rule of Law",
          description: "Equality before law and equal protection of the laws within the territory of India.",
          keyProvisions: [
            "Prohibits the State from denying equal treatment to any person.",
            "Permits reasonable classification based on intelligible differentia."
          ]
        },
        {
          title: "Article 19 - Right to Freedom",
          year: "Part III",
          badge: "Six Freedoms",
          description: "Protection of speech, assembly, association, movement, residence, and profession.",
          keyProvisions: [
            "Article 19(1)(a): Freedom of speech and expression.",
            "Article 19(1)(b): Freedom to assemble peacefully without arms."
          ]
        },
        {
          title: "Article 21 - Right to Life and Personal Liberty",
          year: "Part III",
          badge: "Cornerstone Right",
          description: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
          keyProvisions: [
            "Expanded to include Right to Clean Environment, Right to Health, and Right to Shelter.",
            "Incorporates Right to Privacy under Justice K.S. Puttaswamy judgment (2017)."
          ]
        },
        {
          title: "Article 25 - Freedom of Religion",
          year: "Part III",
          badge: "Conscience & Faith",
          description: "Freedom of conscience and free profession, practice and propagation of religion.",
          keyProvisions: [
            "Subject to public order, morality, and health provisions."
          ]
        },
        {
          title: "Article 29 - Cultural and Educational Rights",
          year: "Part III",
          badge: "Minority Safeguards",
          description: "Protection of distinct language, script, and culture of minority groups.",
          keyProvisions: [
            "Any section of citizens with distinct language has the right to conserve it."
          ]
        },
        {
          title: "Article 32 - Right to Constitutional Remedies",
          year: "Part III",
          badge: "Heart of Constitution",
          description: "Remedies for enforcement of rights conferred by Part III via Supreme Court writs.",
          keyProvisions: [
            "Empowers Supreme Court to issue writs including Habeas Corpus, Mandamus, Certiorari, and Quo Warranto."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Explore interconnected constitutional rights and legal safeguards that shape our democracy.",
        items: [
          { label: "Equality and Non-Discrimination", icon: "scale" },
          { label: "Freedom of Speech and Expression", icon: "megaphone" },
          { label: "Right to Life and Dignity", icon: "heart" },
          { label: "Freedom of Religion", icon: "sun" },
          { label: "Minority Rights", icon: "users" },
          { label: "Education Rights", icon: "graduationCap" },
          { label: "Constitutional Remedies", icon: "gavel" },
          { label: "Landmark Judgments", icon: "bookOpen" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Constitutional Rulings",
      items: [
        {
          caseName: "Kesavananda Bharati v. State of Kerala (1973)",
          court: "Supreme Court of India (13-Judge Bench)",
          year: "1973",
          summary: "Established the legendary 'Basic Structure Doctrine', holding that Parliament cannot alter or destroy the core identity of the Constitution.",
          impact: "Protected Fundamental Rights and judicial review from arbitrary constitutional amendments."
        },
        {
          caseName: "Justice K.S. Puttaswamy v. Union of India (2017)",
          court: "Supreme Court of India (9-Judge Bench)",
          year: "2017",
          summary: "Unanimously affirmed that the Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty under Article 21.",
          impact: "Revolutionized digital data privacy, informational autonomy, and personal dignity safeguards across India."
        },
        {
          caseName: "Navtej Singh Johar v. Union of India (2018)",
          court: "Supreme Court of India (5-Judge Bench)",
          year: "2018",
          summary: "Decriminalized consensual adult relationships by striking down Section 377 of the IPC as violative of Articles 14, 15, 19, and 21.",
          impact: "Affirmed equal constitutional rights, bodily autonomy, and non-discrimination for LGBTQ+ citizens."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Fundamental Rights",
      centerImage: "/images/rights/fundamental-rights-faq.png",
      centerQuote: "“Rights empower people and build a stronger, more inclusive India.”",
      items: [
        {
          question: "What are fundamental rights?",
          answer: "Fundamental Rights are basic human rights guaranteed by the Constitution of India to every citizen. These rights ensure freedom, equality, dignity and justice, and protect individuals from arbitrary action by the State."
        },
        {
          question: "How many fundamental rights are there in India?",
          answer: "There are six fundamental rights recognized by the Indian Constitution: 1) Right to Equality; 2) Right to Freedom; 3) Right against Exploitation; 4) Right to Freedom of Religion; 5) Cultural and Educational Rights; 6) Right to Constitutional Remedies."
        },
        {
          question: "Can fundamental rights be suspended?",
          answer: "During a National Emergency declared under Article 352, rights under Article 19 may be suspended. However, Articles 20 and 21 can never be suspended under any circumstances."
        },
        {
          question: "What is the difference between fundamental rights and legal rights?",
          answer: "Fundamental rights are constitutionally protected and can be directly enforced by moving the Supreme Court under Article 32. Ordinary legal rights are protected by regular statutes."
        },
        {
          question: "How can I approach the Supreme Court for violation of my rights?",
          answer: "Under Article 32, you can file a Writ Petition directly before the Supreme Court of India. You can pray for writs like Habeas Corpus, Mandamus, or Certiorari."
        },
        {
          question: "Are fundamental rights available to non-citizens?",
          answer: "Yes, rights under Articles 14, 20, 21, 22, and 25 apply to all persons on Indian soil. Rights under Articles 15, 16, 19, 29, and 30 are reserved exclusively for Indian citizens."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Constitution of India (PDF)", type: "guide" },
          { label: "Simplified Guide to Fundamental Rights", type: "material" },
          { label: "Landmark Supreme Court Judgments", type: "case" },
          { label: "Legal Aid and Support Services", type: "helpline" },
          { label: "Human Rights Organizations", type: "organization" },
          { label: "Awareness Videos", type: "material" },
          { label: "Case Studies", type: "case" },
          { label: "Helplines & Contact Information", type: "helpline" }
        ]
      }
    },
    cta: {
      heading: "Know Your Rights, Stand for a Better India",
      description: "Awareness, legal support and community action can protect your rights and strengthen democracy for future generations."
    }
  },

  "civil-rights": {
    slug: "civil-rights",
    title: "Civil Rights",
    highlightWord: "Rights",
    prefixWord: "Civil",
    heroSubtitle:
      "Civil rights protect individuals from discrimination and ensure equal opportunities in society. Know about your civil rights and how to protect them.",
    heroImage: "/images/rights/civil-rights-hero.jpg",
    heroBgImage: "/images/rights/civil-rights-hero-bg.png",
    overview: {
      heading: "What are Civil Rights?",
      description1:
        "Civil rights are the rights and freedoms that protect individuals from discrimination and ensure equal treatment under the law irrespective of caste, religion, gender, race, language, or social status. These rights ensure every person can live with dignity, fairness and equal opportunities in all areas of life.",
      description2:
        "They guarantee equal access to public institutions, voting rights, freedom of speech, non-discriminatory public accommodations, and fair trial protections under key statutes like the Protection of Civil Rights Act, 1955.",
      quote: "“Equal rights, equal opportunities and equal respect for every individual build a stronger and fairer society.”",
      image: "/images/rights/civil-rights-collage.png",
      extendedPoints: [
        "Guarantees freedom from discrimination in access to public places and amenities.",
        "Ensures equal participation in civic and democratic institutions.",
        "Backed by the Protection of Civil Rights Act, 1955 and SC/ST Prevention of Atrocities Act, 1989.",
        "Guarantees procedural due process and fair trial protections for all accused persons."
      ]
    },
    keyRights: {
      eyebrow: "KEY CIVIL RIGHTS",
      heading: "Core Civil Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Equality and Non-Discrimination", icon: "users", description: "Universal protection against discrimination in government, commerce, and public life." },
        { title: "Equal Protection Under Law", icon: "landmark", description: "Every individual is entitled to the same legal safeguards and fair treatment." },
        { title: "Right to Public Services", icon: "briefcase", description: "Unrestricted access to schools, healthcare facilities, roads, transport, and community infrastructure." },
        { title: "Right to Freedom of Movement", icon: "usersRound", description: "The freedom to travel, reside, and establish oneself anywhere across the country." },
        { title: "Right to Vote", icon: "fileText", description: "Equal, secret-ballot adult suffrage to elect political representatives." },
        { title: "Freedom of Expression", icon: "message", description: "Unfettered civil dialogue, peaceful assembly, public grievance redressal, and civic petitioning." },
        { title: "Right to Fair Trial", icon: "scale", description: "Presumption of innocence, timely trial, access to legal defense counsel." },
        { title: "Equal Opportunity in Education and Employment", icon: "graduationCap", description: "Prohibition of bias in hiring, fair wages, promotions, and university admissions." }
      ],
      quoteCard: {
        quote: "“Justice is not a privilege for the few, but a right for all.”",
        source: "— Civil Rights Principle",
        iconType: "scales",
        image: "/images/rights/civil-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws Related to Civil Rights",
      centerImage: "/images/rights/civil-rights-laws.png",
      items: [
        {
          title: "Constitution of India (Fundamental Rights & Equality Provisions)",
          year: "1950",
          badge: "Articles 14–18",
          description: "Constitutional guarantees of equality before law and abolition of untouchability.",
          keyProvisions: [
            "Article 15: Prohibits discrimination in public accommodations.",
            "Article 17: Abolishes untouchability in all forms."
          ]
        },
        {
          title: "The Protection of Civil Rights Act, 1955",
          year: "1955",
          badge: "Central Legislation",
          description: "Prescribes penalties for the enforcement of any disability arising out of untouchability.",
          keyProvisions: [
            "Penalizes refusal of admission to hospitals, educational institutions, or hostels."
          ]
        },
        {
          title: "The Right to Information Act, 2005",
          year: "2005",
          badge: "Civic Empowerment",
          description: "Empowers citizens to inspect public works and obtain records from all public authorities.",
          keyProvisions: [
            "Mandates response within 30 days of application."
          ]
        },
        {
          title: "The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989",
          year: "1989",
          badge: "Special Statute",
          description: "Stringent penal legislation preventing atrocities against Scheduled Castes and Scheduled Tribes.",
          keyProvisions: [
            "Designates Special Courts and Special Public Prosecutors for speedy trials."
          ]
        },
        {
          title: "Other Relevant Acts and Government Policies",
          year: "Comprehensive",
          badge: "Civic Protection",
          description: "Whistleblower Protection Act, Legal Aid Act, and public services guarantee legislation.",
          keyProvisions: [
            "Ensures time-bound delivery of essential government services."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Key civic themes and areas of public interest advocacy handled by HRSJM.",
        items: [
          { label: "Equality and Non-Discrimination", icon: "scale" },
          { label: "Access to Justice", icon: "gavel" },
          { label: "Police and Public Services", icon: "shield" },
          { label: "Voting Rights", icon: "fileText" },
          { label: "Legal Aid and Support", icon: "heart" },
          { label: "Case Studies and Judgments", icon: "bookOpen" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Civil Rights Decisions",
      items: [
        {
          caseName: "State of Madras v. Champakam Dorairajan (1951)",
          court: "Supreme Court of India",
          year: "1951",
          summary: "Led to the historic First Constitutional Amendment adding Article 15(4) allowing special affirmative action provisions for socially and educationally backward classes.",
          impact: "Laid the legal bedrock for caste equality and reservations in Indian education and employment."
        },
        {
          caseName: "Indra Sawhney v. Union of India (1992)",
          court: "Supreme Court of India (9-Judge Bench)",
          year: "1992",
          summary: "Upheld 27% reservation for Other Backward Classes (OBCs) while enforcing a 50% cap on total reservations and introducing the creamy layer exclusion.",
          impact: "Defined the constitutional framework of substantive equality versus formal equality in India."
        },
        {
          caseName: "PUCL v. Union of India (Right to Food & NOTA, 2013)",
          court: "Supreme Court of India",
          year: "2013",
          summary: "Directed the Election Commission of India to introduce the 'None of the Above' (NOTA) option on electronic voting machines.",
          impact: "Strengthened voters' democratic right to register civic dissent and reject candidates in elections."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Civil Rights",
      centerImage: "/images/rights/civil-rights-faq.png",
      centerQuote: "“A fair society is possible when every individual has equal rights and opportunities.”",
      items: [
        {
          question: "What are civil rights?",
          answer: "Civil rights are legal entitlements that protect citizens against unequal treatment, discrimination, or infringement of their personal liberties by government institutions, private entities, or other individuals based on characteristics like caste, race, religion, or gender."
        },
        {
          question: "How do civil rights protect me?",
          answer: "They ensure you have equal access to jobs, housing, public facilities, education, justice, and the ballot box. If anyone denies you services or discriminates against you because of your identity, civil rights legislation provides civil remedies and criminal penalties."
        },
        {
          question: "What is the difference between civil rights and fundamental rights?",
          answer: "Fundamental rights are constitutional guarantees in Part III of the Constitution that restrict state action. Civil rights encompass these constitutional guarantees plus dozens of statutory laws (like the Protection of Civil Rights Act, RTI Act, etc.) that apply to both government and private individuals."
        },
        {
          question: "What can I do if my civil rights are violated?",
          answer: "1) Register a First Information Report (FIR) at the local police station under applicable special acts; 2) Lodge a formal complaint with the National/State Human Rights or SC/ST/OBC Commission; 3) Contact HRSJM for free legal counsel and advocacy support."
        },
        {
          question: "Where can I get legal help?",
          answer: "HRSJM provides free legal counseling, guidance, and representation through our network of volunteer advocates. You can also approach the District Legal Services Authority (DLSA) in your district court complex."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Download Guides & Brochures", type: "guide" },
          { label: "Government Portals", type: "link" },
          { label: "Legal Aid Services", type: "helpline" },
          { label: "Human Rights Organizations", type: "organization" },
          { label: "Case Studies", type: "case" },
          { label: "Awareness Videos", type: "material" },
          { label: "Helplines & Support Services", type: "helpline" }
        ]
      }
    },
    cta: {
      heading: "Stand for Equal Rights",
      description: "Support civil rights awareness, legal aid and advocacy. Together we can build a fairer and more inclusive society."
    }
  },

  "civil-liberties": {
    slug: "civil-liberties",
    title: "Civil Liberties",
    highlightWord: "Liberties",
    prefixWord: "Civil",
    heroSubtitle:
      "Civil liberties protect the essential freedoms and individual choices that allow people to live with dignity, safety and autonomy. They safeguard personal liberty, privacy, movement, association and other freedoms that are vital for a democratic society.",
    heroImage: "/images/rights/civil-liberties-hero.jpg",
    heroBgImage: "/images/rights/civil-liberties-hero-bg.png",
    overview: {
      heading: "What are Civil Liberties?",
      description1:
        "Civil liberties are fundamental freedoms and rights that protect individuals from arbitrary interference by the State and ensure autonomy in personal life. These liberties allow people to live freely, make personal choices, move, associate, and participate in society without unreasonable restrictions, while respecting the rights of others and the law.",
      description2:
        "They encompass bodily autonomy, privacy, freedom of peaceful assembly without weapons (Article 19(1)(b)), protection against unlawful arrest (Article 22), the writ of Habeas Corpus, and the freedom of movement throughout the nation.",
      quote: "“Civil liberties give people the space to think, choose, express and live freely. A society that protects civil liberties builds a stronger, fairer and more democratic India.”",
      image: "/images/rights/civil-liberties-collage.png",
      extendedPoints: [
        "Fundamental Right to Privacy recognized under the landmark Puttaswamy judgment.",
        "Protection against unlawful detention through the constitutional writ of Habeas Corpus.",
        "Right to assemble peacefully and conduct peaceful demonstrations under Article 19(1)(b).",
        "Mandatory magistrate production within 24 hours of arrest under Article 22(2)."
      ]
    },
    keyRights: {
      eyebrow: "KEY CIVIL LIBERTIES",
      heading: "Core Civil Liberties Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Personal Liberty", icon: "shield", description: "Freedom from arbitrary detention and live freely." },
        { title: "Right to Privacy", icon: "shieldCheck", description: "Control over personal information and private life." },
        { title: "Freedom of Movement", icon: "usersRound", description: "Move freely within India and travel abroad." },
        { title: "Freedom of Association", icon: "users", description: "Form and join groups, organisations and unions." },
        { title: "Freedom of Thought and Expression", icon: "message", description: "Hold and express opinions without fear." },
        { title: "Freedom of Lifestyle and Personal Choice", icon: "sun", description: "Make personal choices about life, relationships and profession." },
        { title: "Protection from Unlawful Surveillance", icon: "gavel", description: "Protection from unreasonable monitoring and state overreach." },
        { title: "Right to Fair Procedure", icon: "landmark", description: "Protection through fair and just legal process." }
      ],
      quoteCard: {
        quote: "“Freedom is not the absence of all restrictions, but the protection of what truly matters.”",
        source: "— Civil Liberties Principle",
        iconType: "constitution",
        image: "/images/rights/civil-liberties-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws Related to Civil Liberties",
      centerImage: "/images/rights/civil-liberties-laws.png",
      items: [
        {
          title: "Constitution of India – Article 19 (Fundamental Freedoms)",
          year: "1950",
          badge: "Article 19",
          description: "Protection of speech, assembly, association, movement, residence, and profession.",
          keyProvisions: [
            "Guarantees six essential freedoms for citizen autonomy and democratic functioning.",
            "Any state restrictions must be reasonable and satisfy the test of proportional necessity."
          ]
        },
        {
          title: "Constitution of India – Article 21 (Right to Life and Personal Liberty)",
          year: "1950",
          badge: "Article 21",
          description: "Cornerstone constitutional guarantee that no person shall be deprived of life or personal liberty except according to procedure established by law.",
          keyProvisions: [
            "Interpreted by courts to include procedural due process, fair trial, and bodily integrity.",
            "Can never be extinguished, suspended, or nullified even during emergency declarations."
          ]
        },
        {
          title: "Constitution of India – Article 22 (Protection from Arbitrary Arrest)",
          year: "1950",
          badge: "Article 22",
          description: "Mandatory safeguards upon arrest and detention by police and state authorities.",
          keyProvisions: [
            "Mandatory duty to inform arrestee of exact legal grounds of arrest immediately.",
            "Right to consult and be defended by a legal practitioner of one's choice.",
            "Mandatory production before the nearest judicial magistrate within 24 hours of arrest."
          ]
        },
        {
          title: "The Right to Privacy Judgement (K.S. Puttaswamy v. Union of India)",
          year: "2017",
          badge: "9-Judge Bench",
          description: "Landmark 9-judge constitutional ruling affirming privacy as an inalienable fundamental right.",
          keyProvisions: [
            "Protects spatial privacy, informational privacy, and bodily autonomy.",
            "Requires state intrusion to have legitimate aim, legal backing, and strict proportionality."
          ]
        },
        {
          title: "Information Technology Act, 2000 (relevant provisions)",
          year: "2000",
          badge: "Digital Law",
          description: "Regulates electronic data, cyber forensics, and sets boundaries for digital interception.",
          keyProvisions: [
            "Section 69: Interception and monitoring permitted only with high-level home ministry authorization.",
            "Section 43A & DPDP rules: Mandatory compensation and security for handling personal sensitive data."
          ]
        },
        {
          title: "Indian Telegraph Act, 1885 (relevant provisions)",
          year: "1885",
          badge: "Surveillance Standards",
          description: "Section 5(2) governing telephone surveillance under the PUCL guidelines.",
          keyProvisions: [
            "Interception permitted only during public emergency or in interest of public safety.",
            "Must be reviewed periodically by high-level Review Committees."
          ]
        },
        {
          title: "The Bharatiya Nyaya Sanhita, 2023 (relevant provisions)",
          year: "2023",
          badge: "Penal Code",
          description: "Modernized criminal code defining substantive offences while preserving procedural safeguards.",
          keyProvisions: [
            "Safeguards against wrongful confinement, extortion, and unlawful restraint.",
            "Clarified offences relating to state security with strict evidentiary thresholds."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Core themes and legal areas connected with civil liberties in India.",
        items: [
          { label: "Right to Privacy", icon: "shield" },
          { label: "Surveillance and Data Protection", icon: "shieldCheck" },
          { label: "Freedom of Movement", icon: "usersRound" },
          { label: "Freedom of Association", icon: "users" },
          { label: "Freedom of Religion and Belief", icon: "sun" },
          { label: "Peaceful Assembly and Protest", icon: "megaphone" },
          { label: "Reasonable Restrictions", icon: "scale" },
          { label: "Preventive Detention", icon: "landmark" },
          { label: "Due Process and Fair Trial", icon: "gavel" },
          { label: "Landmark Judgments", icon: "bookOpen" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Civil Liberties Decisions",
      items: [
        {
          caseName: "Justice K.S. Puttaswamy v. Union of India (2017)",
          court: "Supreme Court of India (9-Judge Bench)",
          year: "2017",
          summary: "Unanimously affirmed that the Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty under Article 21.",
          impact: "Revolutionized digital data privacy, informational autonomy, and personal dignity safeguards across India."
        },
        {
          caseName: "A.D.M. Jabalpur v. Shivkant Shukla (1976 / Overruled in 2017)",
          court: "Supreme Court of India",
          year: "1976 / 2017",
          summary: "Justice H.R. Khanna's lone, legendary dissent upholding Habeas Corpus during the Emergency was officially vindicated when the 9-judge bench in Puttaswamy overruled the majority judgment.",
          impact: "Cemented that the Right to Life and Liberty can NEVER be extinguished by the state, even in an emergency."
        },
        {
          caseName: "Anuradha Bhasin v. Union of India (2020)",
          court: "Supreme Court of India",
          year: "2020",
          summary: "Ruled that access to the Internet is constitutionally protected under Article 19(1)(a) and indefinite internet shutdowns are unlawful.",
          impact: "Mandated transparency, proportionality, and periodic review for any executive suspension of telecommunications."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Civil Liberties",
      centerImage: "/images/rights/civil-liberties-faq.png",
      centerQuote: "“A society that respects civil liberties empowers every individual to reach their potential.”",
      items: [
        {
          question: "What are civil liberties?",
          answer: "Civil liberties are fundamental individual guarantees and freedoms that the government is restrained from violating, ensuring people can live with personal autonomy, dignity, and freedom from arbitrary state control."
        },
        {
          question: "How are civil liberties different from fundamental rights?",
          answer: "Fundamental rights are specific constitutional guarantees contained in Part III of the Constitution. Civil liberties are the broader philosophic and legal sphere of personal autonomy and due process protected by both the Constitution and statutory checks against state overreach."
        },
        {
          question: "Can the government restrict civil liberties?",
          answer: "Civil liberties may be subjected to reasonable restrictions expressly permitted by the Constitution — such as for sovereignty, security of the state, or public order. However, such restrictions must be proportionate, backed by valid law, and subject to judicial review."
        },
        {
          question: "What is the right to privacy?",
          answer: "Recognized as a fundamental right under Article 21 by the Supreme Court in 2017, the right to privacy protects your bodily integrity, informational data, communications, home, and personal life choices from state and corporate intrusion."
        },
        {
          question: "Is peaceful protest a protected civil liberty?",
          answer: "Yes. The freedom to assemble peacefully without arms is guaranteed under Article 19(1)(b). Peaceful protest is a vital democratic safety valve that cannot be arbitrarily banned by executive authorities."
        },
        {
          question: "What can I do if my civil liberties are violated?",
          answer: "You can file a Writ Petition (such as Habeas Corpus or Mandamus) directly in the High Court under Article 226 or Supreme Court under Article 32, approach the Human Rights Commission, or contact HRSJM's emergency legal defense desk."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Constitution of India (PDF)", type: "guide" },
          { label: "Ministry of Home Affairs", type: "link" },
          { label: "National Human Rights Commission", type: "organization" },
          { label: "National Legal Services Authority (NALSA)", type: "helpline" },
          { label: "Privacy and Data Protection Resources", type: "material" },
          { label: "Civil Liberties Organizations", type: "organization" },
          { label: "Awareness Materials and Guides", type: "material" },
          { label: "Helplines & Support Services", type: "helpline" },
          { label: "Case Studies and Judgments", type: "case" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Protect Civil Liberties, Strengthen Democracy",
      description: "Awareness, legal support and community action can help protect civil liberties and build a more just and inclusive India."
    }
  },

  "freedom-of-speech": {
    slug: "freedom-of-speech",
    title: "Freedom of Speech",
    highlightWord: "Speech",
    prefixWord: "Freedom of",
    heroSubtitle:
      "Freedom of speech gives every individual the right to express their thoughts, opinions and ideas without fear. It is essential for a democratic society, a free press, open debate and an informed citizenry.",
    heroImage: "/images/rights/freedom-of-speech-hero.jpg",
    heroBgImage: "/images/rights/freedom-of-speech-hero-bg.png",
    overview: {
      heading: "What is Freedom of Speech?",
      description1:
        "Freedom of speech is the right to express your opinions, ideas and beliefs through speech, writing, media, art or any other means without fear of censorship or punishment. This right strengthens democracy, promotes accountability, encourages dialogue and helps create a more informed and just society.",
      description2:
        "Guaranteed under Article 19(1)(a) of the Indian Constitution, this fundamental right protects independent journalism, artistic creativity, political debate, and the right to peacefully dissent.",
      quote: "“A free voice strengthens democracy, inspires change and gives every citizen the power to build a better and more just India.”",
      image: "/images/rights/freedom-of-speech-collage.png",
      extendedPoints: [
        "Guaranteed to all citizens under Article 19(1)(a) of the Constitution of India.",
        "Includes freedom of the press, investigative journalism, and artistic creations.",
        "Protects constructive criticism of government policies, dissent, and political debate.",
        "Restrictions under Article 19(2) must be reasonable, proportionate, and strictly authorized by law."
      ]
    },
    keyRights: {
      eyebrow: "KEY RIGHTS UNDER FREEDOM OF SPEECH",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Express Opinions", icon: "message", description: "Share your views and ideas freely." },
        { title: "Freedom of Press and Media", icon: "fileText", description: "Free, independent and responsible media." },
        { title: "Right to Peaceful Assembly", icon: "users", description: "Gather and express collective views peacefully." },
        { title: "Freedom of Artistic Expression", icon: "sun", description: "Express through art, literature, music and culture." },
        { title: "Freedom of Online Expression", icon: "sun", description: "Share opinions on digital platforms." },
        { title: "Right to Receive Information", icon: "bookOpen", description: "Access and share information and ideas." },
        { title: "Right to Petition the Government", icon: "fileText", description: "Raise concerns and demand action." },
        { title: "Right to Criticize Public Authorities", icon: "scale", description: "Question government decisions and policies constructively." }
      ],
      quoteCard: {
        quote: "“Voices of the people more transparent and accountable democracy.”",
        source: "— Democratic Freedom Principle",
        iconType: "shield",
        image: "/images/rights/freedom-of-speech-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws for Freedom of Speech",
      centerImage: "/images/rights/freedom-of-speech-laws.png",
      items: [
        {
          title: "Constitution of India – Article 19(1)(a)",
          year: "1950",
          badge: "Fundamental Right",
          description: "Solemn constitutional pledge protecting citizen speech and independent press.",
          keyProvisions: [
            "Not subject to arbitrary executive orders.",
            "Can only be limited by legislation satisfying the strict conditions of Article 19(2)."
          ]
        },
        {
          title: "Constitution of India – Article 19(2) (Reasonable Restrictions)",
          year: "1950 / Amended",
          badge: "Constitutional Safeguards",
          description: "Eight grounds on which reasonable restrictions may be imposed by parliament.",
          keyProvisions: [
            "Sovereignty and integrity of India, security of the state, public order, and decency.",
            "Restrictions must pass judicial scrutiny of proportionality."
          ]
        },
        {
          title: "Press and Registration of Books Act, 1867",
          year: "1867",
          badge: "Print Media",
          description: "Statutory framework for newspaper registration and circulation transparency.",
          keyProvisions: [
            "Regulates print publications and guarantees editorial autonomy."
          ]
        },
        {
          title: "Information Technology Act, 2000 (relevant provisions)",
          year: "2000",
          badge: "Digital Expression",
          description: "Legal provisions governing digital media, intermediary guidelines, and online expression.",
          keyProvisions: [
            "Section 66A struck down by Supreme Court in Shreya Singhal (2015).",
            "Protects intermediaries from liability for user content when following due diligence."
          ]
        },
        {
          title: "Cinematograph Act, 1952",
          year: "1952",
          badge: "Film Certification",
          description: "Governs public exhibition of cinematograph films and certification boards.",
          keyProvisions: [
            "Sets standards for film certification while preserving artistic freedom."
          ]
        },
        {
          title: "Contempt of Courts Act, 1971",
          year: "1971",
          badge: "Judicial Decorum",
          description: "Defines civil and criminal contempt while explicitly protecting fair judicial criticism.",
          keyProvisions: [
            "Section 5 protects fair comments on the merits of decided cases."
          ]
        },
        {
          title: "Defamation Laws (IPC Sections 499–500)",
          year: "1860 / Current",
          badge: "Reputational Balance",
          description: "Protects reputation with 10 explicit exceptions including truth for public good.",
          keyProvisions: [
            "First Exception: Imputation of truth made for public good is fully protected."
          ]
        },
        {
          title: "Official Secrets Act, 1923",
          year: "1923",
          badge: "National Security",
          description: "Penalizes espionage and unauthorized disclosure of classified defense information.",
          keyProvisions: [
            "Balanced by Section 22 of the RTI Act which overrides conflicting secrecy provisions."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Key free-speech advocacy areas supported by HRSJM.",
        items: [
          { label: "Reasonable Restrictions", icon: "scale" },
          { label: "Hate Speech and Incitement", icon: "shield" },
          { label: "Freedom of the Press", icon: "fileText" },
          { label: "Freedom of Expression Online", icon: "sun" },
          { label: "Art, Culture and Creative Freedom", icon: "bookOpen" },
          { label: "Defamation and Legal Liability", icon: "gavel" },
          { label: "Contempt of Court", icon: "landmark" },
          { label: "National Security and Public Order", icon: "shieldCheck" },
          { label: "Peaceful Protests and Assembly", icon: "users" },
          { label: "Recent Case Laws and Judgments", icon: "scale" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Judgments Protecting Free Speech",
      items: [
        {
          caseName: "Romesh Thappar v. State of Madras (1950)",
          court: "Supreme Court of India",
          year: "1950",
          summary: "Struck down a ban on the weekly journal 'Cross Roads', establishing that freedom of speech includes freedom of propagation of ideas through circulation.",
          impact: "Set the bedrock precedent that public order cannot be used as an excuse to suppress political criticism."
        },
        {
          caseName: "Shreya Singhal v. Union of India (2015)",
          court: "Supreme Court of India",
          year: "2015",
          summary: "Struck down the notorious Section 66A of the Information Technology Act as unconstitutional and arbitrarily vague.",
          impact: "Protected millions of internet users from police arrest for sharing critical or controversial political posts online."
        },
        {
          caseName: "S. Rangarajan v. P. Jagjivan Ram (1989)",
          court: "Supreme Court of India",
          year: "1989",
          summary: "Held that movie censorship cannot be permitted merely because hostile crowds threaten protests; state has a duty to protect free expression.",
          impact: "Laid down the 'spark in a powder keg' test — speech cannot be curbed unless there is immediate proximate danger of violence."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Freedom of Speech",
      centerImage: "/images/rights/freedom-of-speech-faq.png",
      centerQuote: "“More open dialogue, more ideas, more progress for a stronger India.”",
      items: [
        {
          question: "What is freedom of speech?",
          answer: "Freedom of speech is the constitutional right to express opinions, share ideas, and communicate beliefs through speech, writing, art, or digital platforms without fear of arbitrary censorship or state reprisal."
        },
        {
          question: "Is freedom of speech an absolute right in India?",
          answer: "No. Unlike some nations, Article 19(1)(a) is qualified by Article 19(2), which permits Parliament to enact reasonable restrictions on grounds like sovereignty, national security, friendly foreign relations, public order, decency, or incitement to an offence."
        },
        {
          question: "What are the reasonable restrictions under Article 19(2)?",
          answer: "The eight constitutional grounds are: 1) Sovereignty and integrity of India; 2) Security of the State; 3) Friendly relations with foreign States; 4) Public order; 5) Decency or morality; 6) Contempt of court; 7) Defamation; 8) Incitement to an offence."
        },
        {
          question: "Can I criticize the government on social media?",
          answer: "Yes. Constructive criticism, peaceful dissent, investigative journalism, and questioning government policies are constitutionally protected. The Supreme Court in Shreya Singhal (2015) ruled that sharing critical views online cannot be criminalized."
        },
        {
          question: "What is the difference between free speech and hate speech?",
          answer: "Free speech protects ideas, critiques, and beliefs. Hate speech, however, intentionally incites hatred, violence, or hostility against marginalized communities based on religion, race, or caste, and is punishable under criminal law."
        },
        {
          question: "What can I do if my freedom of speech is violated?",
          answer: "You can file a Writ Petition before the High Court (Article 226) or Supreme Court (Article 32), approach the Press Council of India, or reach out to HRSJM's free speech legal advocacy wing for legal defense."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Constitution of India (PDF)", type: "guide" },
          { label: "Supreme Court Judgments (Free)", type: "case" },
          { label: "Ministry of Information & Broadcasting", type: "link" },
          { label: "Press Council of India", type: "organization" },
          { label: "National Human Rights Commission", type: "organization" },
          { label: "Legal Aid Services (NALSA)", type: "helpline" },
          { label: "Media Freedom Organizations", type: "organization" },
          { label: "Digital Rights Resources", type: "material" },
          { label: "Awareness Materials and Guides", type: "material" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Raise Your Voice for a More Open and Stronger India",
      description: "Awareness, legal support and community action can protect freedom of speech and strengthen our democracy."
    }
  },

  "right-to-information": {
    slug: "right-to-information",
    title: "Right to Information",
    highlightWord: "Information",
    prefixWord: "Right to",
    heroSubtitle:
      "The Right to Information empowers every citizen to access information held by public authorities. It promotes transparency, accountability and good governance. Know about your rights, the RTI process, the laws that how to use this powerful tool.",
    heroImage: "/images/rights/right-to-information-hero.jpg",
    heroBgImage: "/images/rights/right-to-information-hero-bg.png",
    overview: {
      heading: "What is the Right to Information?",
      description1:
        "The Right to Information (RTI) is a legal right that allows every citizen to access information held by public authorities. The RTI Act, 2005 promotes transparency, accountability and citizen participation in governance. It helps prevent corruption, ensures informed decision-making and empowers people to hold the government accountable.",
      description2:
        "Derived from Article 19(1)(a), this law requires government bodies to respond within 30 days, or within 48 hours for matters concerning life and liberty, transforming citizen-state interaction.",
      quote: "“Information is power. An informed citizen can build a more transparent, accountable and stronger democracy for a better India.”",
      image: "/images/rights/right-to-information-collage.png",
      extendedPoints: [
        "Enacted in 2005 to foster transparency and accountability in governance.",
        "Mandatory 30-day response timeline (48 hours for matters of life and liberty).",
        "Nominal application fee of Rs. 10 (free for Below Poverty Line citizens).",
        "Penalties up to Rs. 25,000 on officials for unlawful delays or false information."
      ]
    },
    keyRights: {
      eyebrow: "KEY RIGHTS UNDER RTI",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Access Information", icon: "fileText", description: "Obtain information from public authorities." },
        { title: "Right to Transparency", icon: "users", description: "Promotes openness in government functioning." },
        { title: "Right to Accountability", icon: "shield", description: "Helps prevent corruption and misuse of public resources." },
        { title: "Right to Seek Clarification", icon: "message", description: "Ask questions and seek explanations." },
        { title: "Right to Inspect Records", icon: "bookOpen", description: "Inspect documents, files and records." },
        { title: "Right to Obtain Copies", icon: "fileText", description: "Receive certified copies of documents." },
        { title: "Right to Information on Public Decisions", icon: "landmark", description: "Know the reasons for administrative decisions." },
        { title: "Right to Appeal", icon: "scale", description: "Appeal to higher authorities if information is denied." }
      ],
      quoteCard: {
        quote: "“A transparent government builds a stronger nation.”",
        source: "— RTI Principle",
        iconType: "scales",
        image: "/images/rights/right-to-information-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Laws Related to Right to Information",
      centerImage: "/images/rights/right-to-information-laws.png",
      items: [
        {
          title: "The Right to Information Act, 2005",
          year: "2005",
          badge: "Apex Statute",
          description: "Universal legislation covering central, state, and municipal government departments.",
          keyProvisions: [
            "Applies to all public authorities, state-funded NGOs, and constitutional bodies.",
            "Section 6: Simple application procedure in writing or online.",
            "Section 8: Limited exemptions for national security, defense, and cabinet deliberations."
          ]
        },
        {
          title: "RTI (Amendment) Act, 2019",
          year: "2019",
          badge: "Amendment",
          description: "Amended terms and conditions of Central and State Information Commissioners.",
          keyProvisions: [
            "Empowers Central Government to notify salaries, allowances, and tenures of Information Commissioners."
          ]
        },
        {
          title: "Central Information Commission (CIC) Rules",
          year: "2012 / Updated",
          badge: "Appellate Procedure",
          description: "Procedural rules governing second appeals and complaints before the CIC.",
          keyProvisions: [
            "Online tracking, video-conference hearings, and electronic evidence filing."
          ]
        },
        {
          title: "State Information Commission Rules",
          year: "State-wise",
          badge: "State Bodies",
          description: "State-specific appeal guidelines regulating State Information Commissions.",
          keyProvisions: [
            "Adjudicates appeals from state and municipal government departments."
          ]
        },
        {
          title: "Public Authority Obligations under RTI Act",
          year: "Section 4",
          badge: "Proactive Disclosure",
          description: "Section 4 mandates proactive publication of manuals, officer duties, and budgets.",
          keyProvisions: [
            "Mandates updating citizen charters, subsidy beneficiaries, and contact directories."
          ]
        },
        {
          title: "Guidelines for Filing an RTI Application",
          year: "DoPT",
          badge: "Citizen Guide",
          description: "Official Department of Personnel & Training circulars facilitating citizen filings.",
          keyProvisions: [
            "Applicants need not give reasons for seeking public information."
          ]
        },
        {
          title: "Relevant Supreme Court and High Court Judgments",
          year: "Jurisprudence",
          badge: "Case Law",
          description: "Key precedents holding that access to answer sheets and judicial assets fall under RTI.",
          keyProvisions: [
            "Affirmed that citizens are entitled to certified copies of public tender documents."
          ]
        },
        {
          title: "Other Related Acts and Government Circulars",
          year: "Complementary",
          badge: "Transparency",
          description: "Public Records Act, Whistleblowers Protection Act, and administrative guidelines.",
          keyProvisions: [
            "Protects citizens reporting financial malfeasance in public bodies."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Essential RTI topics and citizen tools.",
        items: [
          { label: "How to File an RTI Application", icon: "fileText" },
          { label: "Who is a Public Authority?", icon: "building2" },
          { label: "Information Exemptions (Section 8)", icon: "shield" },
          { label: "Time Limits for Response", icon: "clock" },
          { label: "First Appeal to FAA", icon: "scale" },
          { label: "Second Appeal to CIC / SIC", icon: "gavel" },
          { label: "Penalties for Non-Compliance", icon: "shieldCheck" },
          { label: "Proactive Disclosure (Section 4)", icon: "bookOpen" },
          { label: "Online RTI Portals", icon: "link" },
          { label: "Important Judgments", icon: "landmark" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Judgments Expanding RTI",
      items: [
        {
          caseName: "Central Board of Secondary Education v. Aditya Bandopadhyay (2011)",
          court: "Supreme Court of India",
          year: "2011",
          summary: "Held that students and examinees have an absolute right under RTI to inspect and receive certified copies of their evaluated answer sheets.",
          impact: "Brought unprecedented transparency to university and board examinations across India."
        },
        {
          caseName: "CPIO, Supreme Court v. Subhash Chandra Agarwal (2019)",
          court: "Supreme Court of India (5-Judge Bench)",
          year: "2019",
          summary: "Ruled that the Office of the Chief Justice of India is a 'public authority' falling within the purview of the RTI Act.",
          impact: "Affirmed that judicial independence and transparency must go hand-in-hand in a vibrant democracy."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Right to Information",
      centerImage: "/images/rights/right-to-information-faq.png",
      centerQuote: "“An informed citizen is a stronger citizen. Information empowers people to shape a better India.”",
      items: [
        {
          question: "What is the Right to Information (RTI)?",
          answer: "The Right to Information is a statutory right enacted in 2005 that empowers Indian citizens to request and obtain records, documents, contracts, and data held by public authorities."
        },
        {
          question: "Who can file an RTI application?",
          answer: "Any citizen of India can file an RTI application. Corporations, associations, or non-citizens cannot directly file, but any citizen can file in their individual capacity."
        },
        {
          question: "How do I file an RTI application?",
          answer: "Draft a simple query on plain paper or visit rtionline.gov.in. State clearly what information you seek, pay the Rs. 10 fee (or attach BPL card copy), and submit it to the Public Information Officer (PIO) of the concerned department."
        },
        {
          question: "How much time does a public authority have to respond?",
          answer: "The PIO must respond within 30 days from receipt of application. If the information requested concerns the life or liberty of a person, it must be provided within 48 hours."
        },
        {
          question: "What information cannot be provided under RTI?",
          answer: "Section 8 of the RTI Act exempts information affecting national security, sovereignty, cabinet deliberations before decisions, commercial confidence/trade secrets, and personal information with no public interest."
        },
        {
          question: "What can I do if my RTI request is denied?",
          answer: "You can file a First Appeal within 30 days before the departmental First Appellate Authority (FAA). If dissatisfied with the decision, you can file a Second Appeal before the Central or State Information Commission."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "RTI Online Portal (rtionline.gov.in)", type: "link" },
          { label: "Central Information Commission (CIC)", type: "organization" },
          { label: "State Information Commissions", type: "organization" },
          { label: "Department of Personnel & Training", type: "link" },
          { label: "RTI User Manual & Guides", type: "guide" },
          { label: "Sample RTI Application Format", type: "material" },
          { label: "Important Judgments (PDF)", type: "case" },
          { label: "RTI Awareness Materials", type: "material" },
          { label: "NGOs and Support Organizations", type: "organization" },
          { label: "Case Studies and Success Stories", type: "case" },
          { label: "Helplines & Contact Information", type: "helpline" }
        ]
      }
    },
    cta: {
      heading: "Use Your Right to Information, Build a More Transparent India",
      description: "Awareness, active citizenship and legal tools like RTI can create a more accountable and corruption-free society."
    }
  },

  "minority-rights": {
    slug: "minority-rights",
    title: "Minority Rights",
    highlightWord: "Rights",
    prefixWord: "Minority",
    heroSubtitle:
      "Every individual and community, regardless of religion, language, culture or ethnicity, has the right to live with dignity, equality and safety. Know about minority rights, the laws that protect them, and how to seek support.",
    heroImage: "/images/rights/minority-rights-hero.jpg",
    heroBgImage: "/images/rights/minority-rights-hero-bg.png",
    overview: {
      heading: "What are Minority Rights?",
      description1:
        "Minority rights protect the cultural, religious, linguistic and educational rights of minority communities. These rights ensure that every individual and community can preserve their identity, practice their faith, speak their language, and manage their own educational institutions, while enjoying equal protection under the law.",
      description2:
        "Articles 29 and 30 of the Constitution give minorities the fundamental right to conserve their distinct language, script, and culture, and to establish and administer educational institutions of their choice without discriminatory state interference.",
      quote: "“Diversity is our strength. Protecting minority rights helps build a more inclusive, harmonious and united India.”",
      image: "/images/rights/minority-rights-collage.png",
      extendedPoints: [
        "Conservation of language, script, and culture under Article 29(1).",
        "Autonomy to establish and administer educational institutions under Article 30.",
        "Non-discrimination in state aid to educational institutions under Article 30(2).",
        "Oversight by the National Commission for Minorities and Special Officers for Linguistic Minorities."
      ]
    },
    keyRights: {
      eyebrow: "KEY MINORITY RIGHTS",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Equality and Non-Discrimination", icon: "users", description: "Equal treatment under the Constitution and law." },
        { title: "Right to Freedom of Religion", icon: "sun", description: "Freedom to profess, practice and propagate any religion." },
        { title: "Right to Preserve Language and Culture", icon: "bookOpen", description: "Right to conserve and promote distinct language, script and culture." },
        { title: "Right to Establish Educational Institutions", icon: "graduationCap", description: "Right to establish and administer educational institutions (Article 30)." },
        { title: "Right to Protection of Identity", icon: "shield", description: "Protection from forced assimilation and cultural erosion." },
        { title: "Right to Participate in Public Life", icon: "usersRound", description: "Equal opportunity in political, social and economic life." },
        { title: "Right to Safety and Security", icon: "shieldCheck", description: "Protection from hate crimes, violence and discrimination." },
        { title: "Right to Legal Remedies", icon: "scale", description: "Access to courts and legal protection for violation of minority rights." }
      ],
      quoteCard: {
        quote: "“Different beliefs. One nation. Equal rights for all.”",
        source: "— Indian Constitutional Vision",
        iconType: "constitution",
        image: "/images/rights/minority-rights-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws for Minority Rights",
      centerImage: "/images/rights/minority-rights-laws.png",
      items: [
        {
          title: "The Constitution of India (Articles 14, 15, 25, 26, 29, 30)",
          year: "1950",
          badge: "Constitutional Core",
          description: "Foundational constitutional architecture safeguarding equality, secularism, and minority rights.",
          keyProvisions: [
            "Article 15: Prohibits discrimination on grounds of religion or caste.",
            "Articles 25–28: Freedom of conscience and religious autonomy.",
            "Articles 29–30: Cultural and educational rights for minorities."
          ]
        },
        {
          title: "The National Commission for Minorities Act, 1992",
          year: "1992",
          badge: "Statutory Commission",
          description: "Establishes the statutory body to evaluate minority progress and investigate rights violations.",
          keyProvisions: [
            "Covers six notified national religious minorities: Muslims, Christians, Sikhs, Buddhists, Parsis, and Jains.",
            "Powers of a civil court to summon records and witnesses."
          ]
        },
        {
          title: "The Protection of Civil Rights Act, 1955",
          year: "1955",
          badge: "Civil Equality",
          description: "Penalizes the enforcement of any disability arising out of untouchability or discrimination.",
          keyProvisions: [
            "Guarantees equal access to public places, water bodies, and places of worship."
          ]
        },
        {
          title: "The Right to Freedom of Religion (Article 25–28)",
          year: "1950",
          badge: "Faith & Conscience",
          description: "Protects individual conscience and denomination rights to manage religious affairs.",
          keyProvisions: [
            "Freedom to manage religious affairs without arbitrary state interference."
          ]
        },
        {
          title: "The Right to Preserve Language, Script and Culture (Article 29)",
          year: "1950",
          badge: "Article 29",
          description: "Inalienable cultural rights ensuring conservation of distinct scripts and dialects.",
          keyProvisions: [
            "Bars denial of admission into state-aided educational institutions on religious grounds."
          ]
        },
        {
          title: "The Right to Establish Educational Institutions (Article 30)",
          year: "1950",
          badge: "Article 30",
          description: "Constitutional charter empowering minorities to set up and run schools and colleges.",
          keyProvisions: [
            "Guarantees freedom from discrimination in state financial aid."
          ]
        },
        {
          title: "The Prevention of Atrocities (relevant provisions)",
          year: "1989",
          badge: "Special Statute",
          description: "Stringent penal provisions protecting vulnerable and minority communities from violence.",
          keyProvisions: [
            "Designates special fast-track courts for speedy justice."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Key themes and initiatives protecting diversity in India.",
        items: [
          { label: "Religious Freedom", icon: "sun" },
          { label: "Linguistic Minorities", icon: "bookOpen" },
          { label: "Cultural Heritage", icon: "landmark" },
          { label: "Educational Rights", icon: "graduationCap" },
          { label: "Protection from Discrimination", icon: "shield" },
          { label: "Hate Crimes and Legal Action", icon: "scale" },
          { label: "Minority Institutions", icon: "building2" },
          { label: "National Commission for Minorities", icon: "users" },
          { label: "State Minority Commissions", icon: "fileText" },
          { label: "Case Studies and Judgments", icon: "gavel" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Judgments on Minority Rights",
      items: [
        {
          caseName: "T.M.A. Pai Foundation v. State of Karnataka (2002)",
          court: "Supreme Court of India (11-Judge Bench)",
          year: "2002",
          summary: "Affirmed that minority status (linguistic or religious) is determined on a state-by-state basis, upholding administrative autonomy of minority institutions.",
          impact: "Set the modern standard for admissions, fees, and government regulation of private unaided minority colleges."
        },
        {
          caseName: "P.A. Inamdar v. State of Maharashtra (2005)",
          court: "Supreme Court of India (7-Judge Bench)",
          year: "2005",
          summary: "Held that the state cannot impose seat reservation quotas on private unaided minority or non-minority professional colleges.",
          impact: "Protected the fundamental institutional autonomy of minority educational bodies."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Minority Rights",
      centerImage: "/images/rights/minority-rights-faq.png",
      centerQuote: "“United in diversity, stronger as a nation.”",
      items: [
        {
          question: "What are minority rights?",
          answer: "Minority rights are constitutional safeguards ensuring that minority communities (religious, linguistic, or cultural) can preserve their heritage, practice their faith, and administer educational institutions without discrimination."
        },
        {
          question: "Who are considered minority communities in India?",
          answer: "Nationally, six religious communities are notified as minorities: Muslims, Christians, Sikhs, Buddhists, Parsis, and Jains. Linguistic minorities are recognized at the state level based on spoken regional language."
        },
        {
          question: "What rights do religious minorities have?",
          answer: "They have the right to equality (Article 14), freedom of religion (Articles 25–28), freedom to establish religious and charitable institutions, and the right to establish and administer educational institutions (Article 30)."
        },
        {
          question: "What is the difference between Articles 29 and 30?",
          answer: "Article 29 protects any section of citizens (minority or majority) having a distinct language, script, or culture. Article 30 is specifically conferred on religious and linguistic minorities to establish and administer educational institutions."
        },
        {
          question: "Can a minority institution deny admission to non-minority students?",
          answer: "No. Article 29(2) explicitly provides that no citizen shall be denied admission into any educational institution maintained by the State or receiving aid out of State funds on grounds only of religion, race, caste, or language."
        },
        {
          question: "What can I do if my minority rights are violated?",
          answer: "You can lodge a complaint with the National Commission for Minorities (NCM), approach the High Court under Article 226, or reach out to HRSJM's minority advocacy desk for confidential legal support."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "National Commission for Minorities", type: "organization" },
          { label: "State Minority Commissions", type: "organization" },
          { label: "Ministry of Minority Affairs", type: "link" },
          { label: "Legal Aid Services (NALSA)", type: "helpline" },
          { label: "Minority Educational Institutions", type: "organization" },
          { label: "Awareness Materials and Guides", type: "material" },
          { label: "Helplines & Support Services", type: "helpline" },
          { label: "NGOs and Support Organizations", type: "organization" },
          { label: "Case Studies and Judgments", type: "case" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Celebrate Diversity, Protect Minority Rights",
      description: "Awareness, legal support and community action can ensure equality, harmony and a more inclusive India for all."
    }
  },

  "right-to-education": {
    slug: "right-to-education",
    title: "Right to Education",
    highlightWord: "Education",
    prefixWord: "Right to",
    heroSubtitle:
      "Every child has the right to free and compulsory education, quality learning opportunities and equal access to educational institutions. Know about your rights, the laws that protect them, and how to seek support.",
    heroImage: "/images/rights/right-to-education-hero.jpg",
    heroBgImage: "/images/rights/right-to-education-hero-bg.png",
    overview: {
      heading: "What is the Right to Education?",
      description1:
        "The right to education ensures that every child has access to free and compulsory education, quality learning, and an environment that supports their overall development. Education empowers children, reduces inequality and builds a stronger, more inclusive society. This right protects children from discrimination and ensures equal opportunities for all, regardless of their background.",
      description2:
        "Enacted through Article 21A and the RTE Act 2009, this fundamental right guarantees 8 years of free elementary schooling, reserves 25% of seats in private schools for economically weaker sections, and bans corporal punishment.",
      quote: "“Education is not just a right, but a powerful tool to break the cycle of poverty, promote equality and create a brighter future for every child.”",
      image: "/images/rights/right-to-education-collage.png",
      extendedPoints: [
        "Enshrined in Article 21A through the historic 86th Constitutional Amendment Act, 2002.",
        "Compulsory schooling from Class 1 to Class 8 without school fees or book charges.",
        "25% reservation in private schools for underprivileged and disadvantaged children.",
        "Zero tolerance for detention up to elementary completion, corporal punishment, or screening tests."
      ]
    },
    keyRights: {
      eyebrow: "KEY RIGHTS UNDER RIGHT TO EDUCATION",
      heading: "Core Rights Include",
      isArticleStyle: false,
      items: [
        { title: "Right to Free and Compulsory Education", icon: "graduationCap", description: "Free education for children aged 6–14 years." },
        { title: "Right to Equality", icon: "users", description: "Equal access to education without discrimination." },
        { title: "Right to Quality Education", icon: "shield", description: "Safe, inclusive and child-friendly learning environment." },
        { title: "Right to Education for All", icon: "bookOpen", description: "Access to education for marginalized and vulnerable children." },
        { title: "Right to Continue Education", icon: "heart", description: "Protection from dropout and child labour." },
        { title: "Right to Inclusive Education", icon: "usersRound", description: "Education for children with disabilities." },
        { title: "Right to Safe Learning Environment", icon: "home", description: "Protection from violence, harassment and abuse." },
        { title: "Right to Holistic Development", icon: "sun", description: "Education that supports mental, physical and social growth." }
      ],
      quoteCard: {
        quote: "“Educate a child today for a stronger, fairer and more equal India tomorrow.”",
        source: "— Education Empowerment Charter",
        iconType: "shield",
        image: "/images/rights/right-to-education-sidecard.png",
    }
    },
    laws: {
      eyebrow: "IMPORTANT LAWS & DOCUMENTS",
      heading: "Key Indian Laws for Right to Education",
      centerImage: "/images/rights/right-to-education-laws.png",
      items: [
        {
          title: "The Right of Children to Free and Compulsory Education Act, 2009",
          year: "2009",
          badge: "Apex RTE Act",
          description: "Comprehensive federal act guaranteeing 8 years of free elementary schooling.",
          keyProvisions: [
            "Section 12(1)(c): Mandatory 25% quota in private schools for EWS children.",
            "Section 16: Ban on failing or expelling students up to Class 8.",
            "Section 17: Total prohibition of corporal punishment and mental harassment."
          ]
        },
        {
          title: "The Constitution of India (Article 21A)",
          year: "2002",
          badge: "Fundamental Right",
          description: "Constitutional amendment elevating education to a justiciable fundamental right.",
          keyProvisions: [
            "Mandates the State to provide free and compulsory education to all children aged 6 to 14."
          ]
        },
        {
          title: "The National Education Policy (NEP), 2020",
          year: "2020",
          badge: "National Policy",
          description: "Revamped curriculum structure (5+3+3+4) emphasizing foundational literacy and mother-tongue instruction.",
          keyProvisions: [
            "Focuses on early childhood care and universal enrollment by 2030."
          ]
        },
        {
          title: "The Child Labour (Prohibition and Regulation) Act, 1986",
          year: "1986 / 2016",
          badge: "Child Protection",
          description: "Total ban on employment of children below 14 in all commercial occupations.",
          keyProvisions: [
            "Direct link with RTE to ensure rescued child workers are integrated into formal schools."
          ]
        },
        {
          title: "The Juvenile Justice (Care and Protection of Children) Act, 2015",
          year: "2015",
          badge: "Care & Protection",
          description: "Statutory framework ensuring institutional schooling for orphaned and vulnerable children.",
          keyProvisions: [
            "Child Welfare Committees oversee educational rehabilitation."
          ]
        },
        {
          title: "The Protection of Children from Sexual Offences (POCSO) Act, 2012",
          year: "2012",
          badge: "Safety",
          description: "Mandates safe school environments, background checks, and child protection committees.",
          keyProvisions: [
            "Mandatory reporting of abuse in educational institutions."
          ]
        },
        {
          title: "The Rights of Persons with Disabilities Act, 2016",
          year: "2016",
          badge: "Inclusion",
          description: "Ensures inclusive education, barrier-free infrastructure, and accessible learning aids.",
          keyProvisions: [
            "Reservation of seats and free education up to 18 years for children with disabilities."
          ]
        },
        {
          title: "Various State Government Schemes and Policies",
          year: "State-wise",
          badge: "Welfare Schemes",
          description: "Mid-Day Meal, free bicycles, uniforms, scholarships, and digital tablet schemes.",
          keyProvisions: [
            "Incentivizes retention and eliminates nutrition-related absenteeism."
          ]
        }
      ],
      sideCard: {
        title: "RELATED TOPICS",
        description: "Key themes and programs under the Right to Education in India.",
        items: [
          { label: "School Admission and Enrollment", icon: "bookOpen" },
          { label: "No Child Left Behind", icon: "users" },
          { label: "Mid-Day Meal Scheme", icon: "heart" },
          { label: "Scholarships and Financial Support", icon: "landmark" },
          { label: "Education for Girl Children", icon: "shield" },
          { label: "Education for Children with Disabilities", icon: "usersRound" },
          { label: "Prevention of Child Labour", icon: "briefcase" },
          { label: "Safe Schools and Child Protection", icon: "home" },
          { label: "Digital Education and E-Learning", icon: "sun" },
          { label: "Government Education Schemes", icon: "building2" },
          { label: "Grievance Redressal", icon: "scale" },
          { label: "Case Studies and Success Stories", icon: "fileText" }
        ]
      }
    },
    cases: {
      eyebrow: "CASE LAWS & EXAMPLES",
      heading: "Landmark Judgments on Right to Education",
      items: [
        {
          caseName: "Unni Krishnan, J.P. v. State of Andhra Pradesh (1993)",
          court: "Supreme Court of India",
          year: "1993",
          summary: "Recognized that the Right to Education is an essential part of the Right to Life under Article 21, establishing that education cannot be commercialized.",
          impact: "Paved the path directly for the 86th Constitutional Amendment and the enactment of Article 21A."
        },
        {
          caseName: "Society for Unaided Private Schools v. Union of India (2012)",
          court: "Supreme Court of India",
          year: "2012",
          summary: "Constitutionally upheld the validity of the 25% reservation for poor children in private unaided schools under Section 12(1)(c) of the RTE Act.",
          impact: "Affirmed the shared social responsibility of private educational institutions in achieving universal literacy."
        }
      ]
    },
    faqsSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Common Questions on Right to Education",
      centerImage: "/images/rights/right-to-education-faq.png",
      centerQuote: "“Every child in school, every dream within reach.”",
      items: [
        {
          question: "What is the right to education?",
          answer: "The Right to Education is a fundamental right under Article 21A ensuring that every child between 6 and 14 years has the legal right to free and compulsory elementary education in a neighborhood school."
        },
        {
          question: "Which age group is covered under free and compulsory education?",
          answer: "The RTE Act covers all children from 6 to 14 years of age (from Class 1 to Class 8). For children with benchmark disabilities, free education is extended up to 18 years under the RPwD Act."
        },
        {
          question: "Is education a fundamental right in India?",
          answer: "Yes, it is an enforceable fundamental right guaranteed by Article 21A of the Constitution of India, introduced by the 86th Constitutional Amendment Act in 2002."
        },
        {
          question: "Can a child be denied admission in a school?",
          answer: "No. Under Section 14 of the RTE Act, no child can be denied admission for lack of age proof, transfer certificate, or failure to pay capitation fees. Admissions can be taken at any time during the academic year."
        },
        {
          question: "What can I do if a child is not attending school?",
          answer: "You can report to the local Block Education Officer (BEO), the school management committee (SMC), call Childline 1098, or inform HRSJM's education outreach team to facilitate free school enrollment."
        },
        {
          question: "Are there special provisions for children with disabilities?",
          answer: "Yes. The RTE Act and RPwD Act guarantee barrier-free access, special educators, accessible textbooks/Braille, and non-discrimination in admissions across all government and aided schools."
        }
      ],
      resources: {
        title: "HELPFUL RESOURCES",
        items: [
          { label: "Ministry of Education (India)", type: "link" },
          { label: "Right to Education (RTE) Portal", type: "link" },
          { label: "National Education Policy (NEP)", type: "guide" },
          { label: "National Commission for Protection of Child Rights (NCPCR)", type: "organization" },
          { label: "State Education Departments", type: "organization" },
          { label: "Educational Schemes and Scholarships", type: "material" },
          { label: "Legal Aid Services (NALSA)", type: "helpline" },
          { label: "Child Helpline (1098)", type: "helpline" },
          { label: "NGOs and Support Organizations", type: "organization" },
          { label: "Awareness Materials and Guides", type: "material" },
          { label: "Case Studies and Reports", type: "case" },
          { label: "Important Links", type: "link" }
        ]
      }
    },
    cta: {
      heading: "Educate Today, Empower Tomorrow",
      description: "Support the right to education awareness, legal support and community action. Together we can build a brighter India for every child."
    }
  }
};
