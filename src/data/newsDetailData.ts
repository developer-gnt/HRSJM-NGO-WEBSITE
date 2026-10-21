export interface TestimonialVoice {
  avatar?: string;
  cardPhoto?: string;
  name: string;
  role: string;
  quote: string;
}

export interface ArticleStep {
  number: number;
  text: string;
}

export interface NewsSectionItem {
  id: string;
  tocTitle: string;
  heading: string;
  paragraphs: string[];
  steps?: ArticleStep[];
  testimonials?: TestimonialVoice[];
}

export interface TrendingArticle {
  title: string;
  href: string;
  image: string;
}

export interface RelatedArticle {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

export interface NewsArticleDetail {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  bannerImage: string;
  cardImage: string;
  summaryCallout: string;
  sections: NewsSectionItem[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  sidebarQuotePoster: {
    image: string;
  };
  relatedArticles: RelatedArticle[];
}

export const trendingArticles: TrendingArticle[] = [
  {
    title: "New Guidelines on Child Rights Protection",
    href: "/news/child-rights-building-a-safer-and-brighter-future",
    image: "/images/news/trending-1.png",
  },
  {
    title: "Success Story: Community Support in Action",
    href: "/news/how-a-small-step-in-education-changed-a-community",
    image: "/images/news/trending-2.png",
  },
  {
    title: "Women's Rights and Legal Protection in India",
    href: "/news/womens-rights-progress-and-the-road-ahead",
    image: "/images/news/trending-3.png",
  },
  {
    title: "HRSJM Support for Community Initiatives",
    href: "/news/hrsjm-community-outreach-program-in-maharashtra",
    image: "/images/news/trending-4.png",
  },
  {
    title: "Civic Rights: Challenges and Opportunities",
    href: "/rights/civil-rights",
    image: "/images/news/trending-5.png",
  },
];

export const newsArticlesData: Record<string, NewsArticleDetail> = {
  "understanding-your-right-to-information-rti": {
    slug: "understanding-your-right-to-information-rti",
    category: "Legal Insights",
    categorySlug: "legal-insights",
    title: "Understanding Your Right to Information (RTI)",
    subtitle:
      "A practical guide to filing RTI applications and using transparency as a tool for everyday accountability.",
    date: "September 20, 2025",
    readTime: "6 min read",
    bannerImage: "/images/news/banner-rti.png",
    cardImage: "/images/news/card-rti.png",
    summaryCallout:
      "The Right to Information (RTI) empowers every citizen to ask questions, seek information held by public authorities, and hold government institutions accountable. It is a powerful law that promotes transparency, reduces corruption and strengthens democracy.",
    sections: [
      {
        id: "what-is-rti",
        tocTitle: "What is RTI?",
        heading: "1. What is the Right to Information (RTI)?",
        paragraphs: [
          "The Right to Information Act, 2005 gives every citizen the legal right to access information held by public authorities. It helps in promoting transparency, accountability and good governance by allowing citizens to know how decisions are made, how public money is spent, and how government programs are implemented.",
        ],
      },
      {
        id: "who-can-file",
        tocTitle: "Who Can File an RTI Application?",
        heading: "2. Who Can File an RTI Application?",
        paragraphs: [
          "Any Indian citizen can file an RTI application. There is no need to give a reason for requesting information. The law applies to all government departments, public sector undertakings, local bodies and any organization substantially funded by the government.",
        ],
      },
      {
        id: "how-to-file",
        tocTitle: "How to File an RTI Application?",
        heading: "3. How to File an RTI Application?",
        paragraphs: [
          "You can file an RTI application in a simple format either online or offline. Here's how:",
        ],
        steps: [
          { number: 1, text: "Identify the Public Information Officer (PIO) of the concerned department." },
          { number: 2, text: "Write a clear and specific request for the information you need." },
          { number: 3, text: "Pay the prescribed application fee (usually ₹10)." },
          { number: 4, text: "Submit your application online (through the RTI portal) or by post/in person." },
        ],
      },
      {
        id: "response-timeline",
        tocTitle: "Response Timeline",
        heading: "4. Response Timeline",
        paragraphs: [
          "The public authority must respond within 30 days of receiving your application. If the information concerns the life or liberty of a person, the response must be given within 48 hours. If the application is transferred to another department, you will be informed within 5 days.",
        ],
      },
      {
        id: "what-if-denied",
        tocTitle: "What to Do If Information is Denied?",
        heading: "5. What to Do If Information is Denied?",
        paragraphs: [
          "If you do not receive a response within the given time or if the information is denied, you can file a First Appeal within 30 days to the senior officer in the department. If you are still not satisfied, you can file a Second Appeal with the Central or State Information Commission.",
        ],
      },
      {
        id: "why-rti-matters",
        tocTitle: "Why RTI Matters?",
        heading: "6. Why RTI Matters?",
        paragraphs: [
          "RTI is a powerful tool in the hands of ordinary citizens. It helps in ensuring better public services, exposes irregularities and empowers communities to demand their rights. By using RTI, we can build a more transparent, accountable and inclusive society.",
        ],
      },
    ],
    cta: {
      heading: "Let's Build a More Transparent India",
      description:
        "Awareness and active participation can create real change. Learn more about your rights and how you can use RTI to make a difference in your community.",
      buttonText: "Explore Resources",
      buttonHref: "/rights/right-to-information",
    },
    sidebarQuotePoster: {
      image: "/images/news/quote-poster-rti.png",
    },
    relatedArticles: [
      {
        slug: "how-a-small-step-in-education-changed-a-community",
        category: "SUCCESS STORIES",
        title: "How a Small Step in Education Changed a Community",
        date: "Sep 19, 2025",
        readTime: "6 min read",
        image: "/images/news/card-education.png",
      },
      {
        slug: "womens-rights-progress-and-the-road-ahead",
        category: "WOMEN'S RIGHTS",
        title: "Women's Rights: Progress and the Road Ahead",
        date: "Sep 18, 2025",
        readTime: "7 min read",
        image: "/images/news/card-womens-rights.png",
      },
      {
        slug: "hrsjm-community-outreach-program-in-maharashtra",
        category: "EVENTS & ACTIVITIES",
        title: "HRSJM Community Outreach Program in Maharashtra",
        date: "Sep 14, 2025",
        readTime: "4 min read",
        image: "/images/news/card-maharashtra.png",
      },
    ],
  },

  "how-a-small-step-in-education-changed-a-community": {
    slug: "how-a-small-step-in-education-changed-a-community",
    category: "Success Stories",
    categorySlug: "success-stories",
    title: "How a Small Step in Education Changed a Community",
    subtitle:
      "Discover how a simple community-led education initiative created opportunities, built confidence and transformed lives in a village.",
    date: "September 19, 2025",
    readTime: "6 min read",
    bannerImage: "/images/news/banner-education.png",
    cardImage: "/images/news/card-education.png",
    summaryCallout:
      "A small step in education can create a big change. This is the story of how a community came together to improve learning opportunities for children, leading to a brighter and more hopeful future for the entire village.",
    sections: [
      {
        id: "the-beginning",
        tocTitle: "The Beginning",
        heading: "1. The Beginning",
        paragraphs: [
          "In a small village, many children were not able to attend school regularly due to lack of resources, awareness and proper facilities. Parents wanted a better future for their children, but they needed support to make education accessible.",
        ],
      },
      {
        id: "community-led-initiative",
        tocTitle: "A Community-Led Initiative",
        heading: "2. A Community-Led Initiative",
        paragraphs: [
          "With the support of local volunteers and partners, an education program was started. The initiative focused on:",
        ],
        steps: [
          { number: 1, text: "Awareness campaigns for parents about the importance of education" },
          { number: 2, text: "Providing learning materials and school supplies" },
          { number: 3, text: "Organizing after-school classes and mentorship" },
          { number: 4, text: "Creating a safe and supportive learning environment" },
        ],
      },
      {
        id: "real-impact",
        tocTitle: "Real Impact",
        heading: "3. Real Impact",
        paragraphs: [
          "Within a short time, more children started attending school regularly. Their performance improved, and they became more confident. The initiative also encouraged parents, especially mothers, to take an active role in their children's education.",
        ],
      },
      {
        id: "voices-from-community",
        tocTitle: "Voices from the Community",
        heading: "4. Voices from the Community",
        paragraphs: [],
        testimonials: [
          {
            avatar: "/images/news/avatar-pooja.png",
            quote:
              "“I love going to school now. I want to become a teacher and help other children in my village.”",
            name: "Pooja",
            role: "Class 7",
          },
          {
            avatar: "/images/news/avatar-rajesh.png",
            quote:
              "“This program has given new hope to our children. We are proud to see them learning and growing.”",
            name: "Rajesh",
            role: "Parent",
          },
        ],
      },
      {
        id: "a-brighter-future",
        tocTitle: "A Brighter Future",
        heading: "5. A Brighter Future",
        paragraphs: [
          "Today, the village is seeing a positive change. More children are in school, parents are more involved, and the community is working together for a better tomorrow. This story shows that even a small step in education can create a lasting impact when people come together.",
        ],
      },
    ],
    cta: {
      heading: "Be a Part of the Change",
      description:
        "Support our education initiatives and help more children get access to quality education.",
      buttonText: "Get Involved",
      buttonHref: "/membership",
    },
    sidebarQuotePoster: {
      image: "/images/news/quote-poster-education.png",
    },
    relatedArticles: [
      {
        slug: "understanding-your-right-to-information-rti",
        category: "LEGAL INSIGHTS",
        title: "Understanding Your Right to Information (RTI)",
        date: "Sep 20, 2025",
        readTime: "6 min read",
        image: "/images/news/card-rti.png",
      },
      {
        slug: "womens-rights-progress-and-the-road-ahead",
        category: "WOMEN'S RIGHTS",
        title: "Women's Rights: Progress and the Road Ahead",
        date: "Sep 18, 2025",
        readTime: "7 min read",
        image: "/images/news/card-womens-rights.png",
      },
      {
        slug: "hrsjm-community-outreach-program-in-maharashtra",
        category: "EVENTS & ACTIVITIES",
        title: "HRSJM Community Outreach Program in Maharashtra",
        date: "Sep 14, 2025",
        readTime: "4 min read",
        image: "/images/news/card-maharashtra.png",
      },
    ],
  },

  "womens-rights-progress-and-the-road-ahead": {
    slug: "womens-rights-progress-and-the-road-ahead",
    category: "Women's Rights",
    categorySlug: "womens-rights",
    title: "Women's Rights: Progress and the Road Ahead",
    subtitle:
      "Explore the progress made in women's rights in India, the key legal protections, ongoing challenges, and how we can build a safer, more equal future for every woman and girl.",
    date: "September 18, 2025",
    readTime: "7 min read",
    bannerImage: "/images/news/banner-womens-rights.png",
    cardImage: "/images/news/card-womens-rights.png",
    summaryCallout:
      "Women's rights are human rights. A society can truly progress when every woman and girl has the freedom, safety and opportunities to live with dignity, make choices and reach her full potential.",
    sections: [
      {
        id: "progress-over-the-years",
        tocTitle: "Progress Over the Years",
        heading: "1. Progress Over the Years",
        paragraphs: [
          "India has made significant progress in advancing women's rights through education, legal reforms, increased representation and greater awareness. More women are pursuing education, joining the workforce, and taking leadership roles in politics, business and community development.",
        ],
      },
      {
        id: "key-legal-protections",
        tocTitle: "Key Legal Protections",
        heading: "2. Key Legal Protections",
        paragraphs: [
          "Several laws in India protect the rights and dignity of women, including:",
        ],
        steps: [
          { number: 1, text: "Protection of Women from Domestic Violence Act, 2005" },
          { number: 2, text: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013" },
          { number: 3, text: "Equal Remuneration Act, 1976" },
          { number: 4, text: "Maternity Benefit Act, 1961 (amended)" },
        ],
      },
      {
        id: "ongoing-challenges",
        tocTitle: "Ongoing Challenges",
        heading: "3. Ongoing Challenges",
        paragraphs: [
          "Despite progress, women still face challenges such as gender-based violence, unequal access to education and healthcare, financial dependence, and social discrimination. These issues require continuous efforts from government, communities and individuals to create lasting change.",
        ],
      },
      {
        id: "stories-of-change",
        tocTitle: "Stories of Change",
        heading: "4. Stories of Change",
        paragraphs: [],
        testimonials: [
          {
            cardPhoto: "/images/news/story-photo-anjali.png",
            avatar: "/images/news/avatar-anjali.png",
            quote:
              "“Education gave me confidence to dream bigger. Today, I want to support other girls in my village to do the same.”",
            name: "Anjali",
            role: "College Student",
          },
          {
            cardPhoto: "/images/news/story-photo-sunita.png",
            avatar: "/images/news/avatar-sunita.png",
            quote:
              "“With the support of our self-help group, I started my small business. Now I am financially independent and can support my family.”",
            name: "Sunita",
            role: "Entrepreneur",
          },
        ],
      },
      {
        id: "what-can-be-done",
        tocTitle: "What Can Be Done",
        heading: "5. What Can Be Done",
        paragraphs: [],
        steps: [
          { number: 1, text: "Promote equal access to quality education for girls" },
          { number: 2, text: "Strengthen awareness about legal rights and support services" },
          { number: 3, text: "Encourage community participation and male allyship" },
          { number: 4, text: "Support women's economic empowerment through skill development" },
        ],
      },
      {
        id: "a-more-equal-future",
        tocTitle: "A More Equal Future",
        heading: "6. A More Equal Future",
        paragraphs: [
          "A safer, more equal future is possible when we work together — empowering women, challenging discrimination, and creating opportunities for every girl to thrive. Let's continue to support and stand for women's rights.",
        ],
      },
    ],
    cta: {
      heading: "Support Women's Empowerment",
      description:
        "Join our initiatives to create safer communities and equal opportunities for women and girls.",
      buttonText: "Get Involved",
      buttonHref: "/membership",
    },
    sidebarQuotePoster: {
      image: "/images/news/quote-poster-womens-rights.png",
    },
    relatedArticles: [
      {
        slug: "understanding-your-right-to-information-rti",
        category: "LEGAL INSIGHTS",
        title: "Understanding Your Right to Information (RTI)",
        date: "Sep 20, 2025",
        readTime: "6 min read",
        image: "/images/news/card-rti.png",
      },
      {
        slug: "how-a-small-step-in-education-changed-a-community",
        category: "SUCCESS STORIES",
        title: "How a Small Step in Education Changed a Community",
        date: "Sep 19, 2025",
        readTime: "6 min read",
        image: "/images/news/card-education.png",
      },
      {
        slug: "hrsjm-community-outreach-program-in-maharashtra",
        category: "EVENTS & ACTIVITIES",
        title: "HRSJM Community Outreach Program in Maharashtra",
        date: "Sep 14, 2025",
        readTime: "4 min read",
        image: "/images/news/card-maharashtra.png",
      },
    ],
  },

  "hrsjm-community-outreach-program-in-maharashtra": {
    slug: "hrsjm-community-outreach-program-in-maharashtra",
    category: "Events & Activities",
    categorySlug: "events-activities",
    title: "HRSJM Community Outreach Program in Maharashtra",
    subtitle:
      "An overview of our recent awareness drive, free legal aid camps and grassroots support programs across Maharashtra.",
    date: "September 14, 2025",
    readTime: "4 min read",
    bannerImage: "/images/news/banner-maharashtra.png",
    cardImage: "/images/news/card-maharashtra.png",
    summaryCallout:
      "Grassroots empowerment happens when legal literacy meets community action. Our Maharashtra outreach initiative brings free legal aid, grievance redressal and civil rights guidance directly to vulnerable and underserved settlements.",
    sections: [
      {
        id: "why-maharashtra",
        tocTitle: "Why Maharashtra, Why Now",
        heading: "1. Why Maharashtra, Why Now",
        paragraphs: [
          "This monsoon season, our field teams travelled through settlements and village clusters across Maharashtra where awareness of basic legal rights remains thin and access to institutional help is thinner. Common complaints heard across districts: delayed ration supplies, unpaid wages, school admission hurdles for migrant children, and confusion regarding official documents.",
          "The outreach programme was designed around those grievances — not around what we assumed people needed, but around what community members told us during our initial listening visits.",
        ],
      },
      {
        id: "key-focus-areas",
        tocTitle: "Key Focus Areas of the Drive",
        heading: "2. Key Focus Areas of the Drive",
        paragraphs: [
          "Over the course of the drive, HRSJM volunteers and legal counsellors organized comprehensive support sessions including:",
        ],
        steps: [
          { number: 1, text: "Door-to-door legal literacy and rights awareness campaigns" },
          { number: 2, text: "Aadhaar, ration card and welfare documentation assistance camps" },
          { number: 3, text: "Free on-site legal aid consultations for women, laborers and seniors" },
          { number: 4, text: "Interactive school assemblies on constitutional rights and child safety" },
        ],
      },
      {
        id: "listening-before-teaching",
        tocTitle: "Listening Before Teaching",
        heading: "3. Listening Before Teaching",
        paragraphs: [
          "The most important sessions were the ones where we spoke least. Community meetings opened with residents describing their own disputes and doubts, and the guidance followed those threads — rights explained through the very problems in the room, in Marathi and Hindi, with printed one-page guides left behind for later reference.",
          "Local volunteers from each settlement were identified and briefed to continue the work after the programme moved on. Knowledge that stays in the community outlasts any single visit.",
        ],
      },
      {
        id: "stories-from-community",
        tocTitle: "Stories from the Community",
        heading: "4. Stories from the Community",
        paragraphs: [],
        testimonials: [
          {
            cardPhoto: "/images/news/story-photo-rekha.png",
            quote:
              "“When my ration card was rejected three times, I did not know what to do. The HRSJM camp helped me file an official grievance, and within three weeks, our family got our entitlements.”",
            name: "Rekha Tai",
            role: "Self-Help Group Member",
          },
          {
            cardPhoto: "/images/news/story-photo-ramesh.png",
            quote:
              "“Having lawyers explain our rights in our own village made all the difference. We now know how to approach authorities with confidence and dignity.”",
            name: "Ramesh Patil",
            role: "Village Elder",
          },
        ],
      },
      {
        id: "tangible-outcomes",
        tocTitle: "Tangible Outcomes Achieved",
        heading: "5. Tangible Outcomes Achieved",
        paragraphs: [],
        steps: [
          { number: 1, text: "Over 1,200 public grievances registered and tracked to completion" },
          { number: 2, text: "Free document correction and identity enrollment for 850+ families" },
          { number: 3, text: "On-site legal counsel provided for 340+ women and senior citizens" },
          { number: 4, text: "Establishment of permanent village legal aid focal points" },
        ],
      },
      {
        id: "what-comes-next",
        tocTitle: "What Comes Next",
        heading: "6. What Comes Next",
        paragraphs: [
          "The Maharashtra outreach will return in the coming quarter to follow up on open cases and expand into newly identified districts. An application filed is not a problem solved — we track every grievance until resolution.",
          "We invite volunteers, supporters and community advocates to stand with us as we expand our outreach across Western India.",
        ],
      },
    ],
    cta: {
      heading: "Support Our Community Outreach",
      description:
        "Join our legal aid volunteers and help bring essential rights awareness to underserved communities across India.",
      buttonText: "Get Involved",
      buttonHref: "/membership",
    },
    sidebarQuotePoster: {
      image: "/images/news/quote-poster-maharashtra.png",
    },
    relatedArticles: [
      {
        slug: "understanding-your-right-to-information-rti",
        category: "LEGAL INSIGHTS",
        title: "Understanding Your Right to Information (RTI)",
        date: "Sep 20, 2025",
        readTime: "6 min read",
        image: "/images/news/card-rti.png",
      },
      {
        slug: "womens-rights-progress-and-the-road-ahead",
        category: "WOMEN'S RIGHTS",
        title: "Women's Rights: Progress and the Road Ahead",
        date: "Sep 18, 2025",
        readTime: "7 min read",
        image: "/images/news/card-womens-rights.png",
      },
      {
        slug: "child-rights-building-a-safer-and-brighter-future",
        category: "CHILDREN'S RIGHTS",
        title: "Child Rights: Building a Safer and Brighter Future",
        date: "Sep 13, 2025",
        readTime: "6 min read",
        image: "/images/news/card-child-rights.png",
      },
    ],
  },

  "child-rights-building-a-safer-and-brighter-future": {
    slug: "child-rights-building-a-safer-and-brighter-future",
    category: "Children's Rights",
    categorySlug: "childrens-rights",
    title: "Child Rights: Building a Safer and Brighter Future",
    subtitle:
      "Why child protection matters, key legal frameworks under Indian law, and how communities can build safe, supportive environments for every child.",
    date: "September 13, 2025",
    readTime: "6 min read",
    bannerImage: "/images/news/banner-child-rights.png",
    cardImage: "/images/news/card-child-rights.png",
    summaryCallout:
      "Every child has an inherent right to safety, nutrition, quality education, and protection from harm. Building a brighter future requires active vigilance, community awareness, and strict enforcement of child protection laws.",
    sections: [
      {
        id: "fundamental-child-rights",
        tocTitle: "Rights Every Child Holds",
        heading: "1. The Rights Every Child Holds",
        paragraphs: [
          "Children in India hold a full charter of rights guaranteed by the Constitution: the right to life, dignity, equality, and protection against discrimination. The guiding principle is universal: the best interests of the child must always come first — ahead of convenience, custom, or cost.",
          "A child is a recognized rights-holder, entitled to education, healthcare, and an environment free from exploitation, abuse, and neglect.",
        ],
      },
      {
        id: "key-child-laws",
        tocTitle: "Key Legal Protections in India",
        heading: "2. Key Legal Protections in India",
        paragraphs: [
          "Several landmark statutes establish the framework for child protection across the country:",
        ],
        steps: [
          { number: 1, text: "Right to Free and Compulsory Education (RTE) Act, 2009" },
          { number: 2, text: "Protection of Children from Sexual Offences (POCSO) Act, 2012" },
          { number: 3, text: "Child Labour (Prohibition and Regulation) Amendment Act, 2016" },
          { number: 4, text: "Juvenile Justice (Care and Protection of Children) Act, 2015" },
        ],
      },
      {
        id: "protection-begins-locally",
        tocTitle: "Protection Begins Locally",
        heading: "3. Why Protection Begins Locally",
        paragraphs: [
          "National legislation establishes standards, but child safety is decided in everyday spaces: in classrooms where teachers notice distress, in anganwadis where nutrition is tracked, and in neighborhoods where adults choose to look out for vulnerable children.",
          "A community educated on the POCSO framework, Childline 1098, and Child Welfare Committees can intervene early and prevent harm before it escalates.",
        ],
      },
      {
        id: "voices-of-change",
        tocTitle: "Voices of Change",
        heading: "4. Voices of Change",
        paragraphs: [],
        testimonials: [
          {
            avatar: "/images/news/avatar-aarav.png",
            quote:
              "“Learning about our rights in school made us feel safe and heard. We know who to reach out to if someone needs help.”",
            name: "Aarav",
            role: "Student, Class 8",
          },
          {
            avatar: "/images/news/avatar-meera.png",
            quote:
              "“When parents and teachers collaborate with legal aid networks, we create an invisible shield of safety around our children.”",
            name: "Meera Sharma",
            role: "School Headmistress",
          },
        ],
      },
      {
        id: "what-communities-can-do",
        tocTitle: "What Communities Can Do",
        heading: "5. What Communities Can Do",
        paragraphs: [],
        steps: [
          { number: 1, text: "Learn to recognize early behavioral signs of trauma or distress" },
          { number: 2, text: "Keep the Childline 1098 emergency helpline visible across schools and markets" },
          { number: 3, text: "Active participation in School Management Committees (SMCs)" },
          { number: 4, text: "Enforce zero tolerance for child labour in domestic and commercial premises" },
        ],
      },
      {
        id: "a-shared-responsibility",
        tocTitle: "A Shared Responsibility",
        heading: "6. A Shared Responsibility",
        paragraphs: [
          "Child rights are the definitive benchmark of our society's moral progress. Protecting the next generation requires collective action, unyielding compassion, and continuous institutional accountability.",
          "Together, we can ensure that every child grows up in an environment where their potential is nurtured and their rights are fiercely protected.",
        ],
      },
    ],
    cta: {
      heading: "Protect Every Child's Future",
      description:
        "Partner with HRSJM to conduct child rights awareness sessions and support child protection helplines in your area.",
      buttonText: "Get Involved",
      buttonHref: "/membership",
    },
    sidebarQuotePoster: {
      image: "/images/news/quote-poster-child-rights.png",
    },
    relatedArticles: [
      {
        slug: "how-a-small-step-in-education-changed-a-community",
        category: "SUCCESS STORIES",
        title: "How a Small Step in Education Changed a Community",
        date: "Sep 19, 2025",
        readTime: "6 min read",
        image: "/images/news/card-education.png",
      },
      {
        slug: "womens-rights-progress-and-the-road-ahead",
        category: "WOMEN'S RIGHTS",
        title: "Women's Rights: Progress and the Road Ahead",
        date: "Sep 18, 2025",
        readTime: "7 min read",
        image: "/images/news/card-womens-rights.png",
      },
      {
        slug: "hrsjm-community-outreach-program-in-maharashtra",
        category: "EVENTS & ACTIVITIES",
        title: "HRSJM Community Outreach Program in Maharashtra",
        date: "Sep 14, 2025",
        readTime: "4 min read",
        image: "/images/news/card-maharashtra.png",
      },
    ],
  },

  "hrsjm-in-the-news-recent-media-highlights": {
    slug: "hrsjm-in-the-news-recent-media-highlights",
    category: "Media Coverage",
    categorySlug: "media-coverage",
    title: "HRSJM in the News: Recent Media Highlights",
    subtitle:
      "A review of recent press coverage, broadcast interviews and editorial features highlighting HRSJM's legal aid drives and advocacy campaigns across India.",
    date: "September 12, 2025",
    readTime: "3 min read",
    bannerImage: "/images/news/banner-media-coverage.png",
    cardImage: "/images/news/card-media-coverage.png",
    summaryCallout:
      "Responsible journalism and public transparency are the twin pillars of a vibrant democracy. Through sustained media engagement, HRSJM amplifies grassroots human rights issues and holds public institutions accountable.",
    sections: [
      {
        id: "media-spotlights",
        tocTitle: "Media Spotlights on Legal Camps",
        heading: "1. Media Spotlights on Legal Camps",
        paragraphs: [
          "Leading national dailies and regional publications have reported extensively on our community outreach and legal literacy initiatives. Correspondents highlighted the direct impact of on-the-spot grievance filing and document verification camps for migrant workers and marginalized women.",
          "The reports shed light on how accessible legal counseling bridges the critical divide between statutory rights and lived grassroots realities.",
        ],
      },
      {
        id: "campaign-highlights",
        tocTitle: "Campaign Highlights in the Press",
        heading: "2. Campaign Highlights in the Press",
        paragraphs: [
          "Recent journalistic features have spotlighted key milestones across our ongoing advocacy programmes:",
        ],
        steps: [
          { number: 1, text: "National coverage of RTI transparency drives and civic engagement seminars" },
          { number: 2, text: "Broadcast segments on POSH workplace safety protocols and gender equality" },
          { number: 3, text: "Regional press reports on rural school upgrades and digital learning centers" },
          { number: 4, text: "Editorial recognition of community grievance redressal mechanisms" },
        ],
      },
      {
        id: "role-of-free-press",
        tocTitle: "The Role of the Free Press",
        heading: "3. The Role of the Free Press",
        paragraphs: [
          "A free and vigilant press is vital for human rights enforcement. When journalists investigate systemic delays, document neglected public infrastructure, and give voice to vulnerable citizens, institutions are motivated to act swiftly.",
          "HRSJM works in close collaboration with legal reporters, providing ground-level verified data, case studies, and policy analysis to drive constructive reforms.",
        ],
      },
      {
        id: "editorial-perspectives",
        tocTitle: "Editorial Perspectives",
        heading: "4. Editorial Perspectives",
        paragraphs: [],
        testimonials: [
          {
            avatar: "/images/news/avatar-journalist.png",
            quote:
              "“Grassroots legal initiatives like HRSJM provide the verifiable field evidence that makes investigative human rights reporting both rigorous and impactful.”",
            name: "Vikram Sen",
            role: "Senior Legal Correspondent",
          },
          {
            avatar: "/images/news/avatar-editor.png",
            quote:
              "“When civic organizations and independent media align on public transparency, everyday citizens benefit directly through greater institutional responsiveness.”",
            name: "Shalini Joshi",
            role: "Civil Society Reporter",
          },
        ],
      },
      {
        id: "amplifying-impact",
        tocTitle: "How Media Partnerships Amplify Impact",
        heading: "5. How Media Partnerships Amplify Impact",
        paragraphs: [],
        steps: [
          { number: 1, text: "Educating millions on constitutional, civic, and consumer protections" },
          { number: 2, text: "Highlighting stalled administrative decisions to accelerate public resolution" },
          { number: 3, text: "Fostering citizen journalism and local civic documentation" },
          { number: 4, text: "Facilitating constructive dialogue between citizens and state departments" },
        ],
      },
      {
        id: "advocacy-journey",
        tocTitle: "Continuing Our Advocacy Journey",
        heading: "6. Continuing Our Advocacy Journey",
        paragraphs: [
          "As we look ahead, our mission remains clear: to shine a bright light on injustice, empower every citizen with knowledge, and build an inclusive society where rights are defended and upheld.",
          "We thank our media partners, legal analysts, and citizen reporters who continue to amplify the cause of justice across the nation.",
        ],
      },
    ],
    cta: {
      heading: "Amplify Human Rights Voices",
      description:
        "Join our media and communications network to report stories of courage, justice, and community resilience.",
      buttonText: "Connect With Us",
      buttonHref: "/contact",
    },
    sidebarQuotePoster: {
      image: "/images/news/quote-poster-media-coverage.png",
    },
    relatedArticles: [
      {
        slug: "understanding-your-right-to-information-rti",
        category: "LEGAL INSIGHTS",
        title: "Understanding Your Right to Information (RTI)",
        date: "Sep 20, 2025",
        readTime: "6 min read",
        image: "/images/news/card-rti.png",
      },
      {
        slug: "hrsjm-community-outreach-program-in-maharashtra",
        category: "EVENTS & ACTIVITIES",
        title: "HRSJM Community Outreach Program in Maharashtra",
        date: "Sep 14, 2025",
        readTime: "4 min read",
        image: "/images/news/card-maharashtra.png",
      },
      {
        slug: "child-rights-building-a-safer-and-brighter-future",
        category: "CHILDREN'S RIGHTS",
        title: "Child Rights: Building a Safer and Brighter Future",
        date: "Sep 13, 2025",
        readTime: "6 min read",
        image: "/images/news/card-child-rights.png",
      },
    ],
  },
};
