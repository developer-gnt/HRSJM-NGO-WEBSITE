/* Shared article data for the news/blog system. The Featured Article section,
   Latest News grid, the Featured Article page and the category listings all
   read from this single source so content never diverges between views. */

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug?: string;
  href?: string;
  image: string;
  imagePosition?: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author?: string;
  tags?: string[];
  sections?: ArticleSection[];
}

/* The Featured Article shown on the News & Blog page — full body included. */
export const featuredArticle: Article = {
  slug: "strengthening-fundamental-rights-in-a-changing-india",
  href: "/featured-article",
  image: "/images/news-featured-supreme-court.png",
  alt: "Supreme Court of India at sunset, seen through trees along the approach avenue",
  category: "Legal Insights",
  tags: ["Legal • Human Rights", "Featured"],
  title: "Strengthening Fundamental Rights in a Changing India",
  description:
    "An in-depth look at recent developments in human rights and the importance of constitutional and community-centered action.",
  author: "HRSJM Editorial Team",
  date: "Sep 24, 2025",
  readTime: "8 min read",
  sections: [
    {
      heading: "Introduction",
      paragraphs: [
        "India's Constitution opens with a promise: justice, liberty, equality and dignity for every citizen. Fundamental Rights are the backbone of that promise — the guarantees that protect us in our homes, workplaces, classrooms and courtrooms.",
        "As the country grows and changes, so do the situations in which rights must be defended. New technologies, shifting social conditions and rising awareness all place fresh demands on protections written more than seven decades ago. Understanding how these rights work — and how to use them — is the first step in keeping them alive.",
      ],
    },
    {
      heading: "Understanding Fundamental Rights",
      paragraphs: [
        "The Constitution groups Fundamental Rights into broad protections: equality before the law; the freedoms of speech, expression, assembly and movement; protection from exploitation and forced labour; freedom of religion and belief; and cultural and educational rights for all communities. Standing behind them all is the right to approach the courts when a right is violated.",
        "In everyday terms, these rights mean that no person can be denied treatment or opportunity because of caste, religion, gender or place of birth, and that every person can speak, assemble, practise their faith and seek justice without fear.",
      ],
    },
    {
      heading: "Rights and Constitutional Protection",
      paragraphs: [
        "Fundamental Rights are not suggestions — they are enforceable guarantees. Citizens can approach the courts directly when a right is threatened, and the judiciary has consistently played a central role in interpreting and strengthening these protections in line with the times.",
        "Decisions by the courts have steadily widened the reach of the guarantees — reading dignity, privacy and fair procedure into the rights the founders wrote. This living interpretation is what allows protections drafted in the mid-twentieth century to answer the questions of a rapidly changing society.",
      ],
    },
    {
      heading: "Human Rights in Everyday Life",
      paragraphs: [
        "Rights matter most in ordinary moments: a child staying in school, a worker paid fairly, a family accessing public services without discrimination, a citizen raising a question with officials and being heard.",
        "Human rights awareness turns abstract guarantees into daily practice. When people know what they are entitled to — and how to ask for it respectfully and lawfully — public systems respond better, and violations become harder to ignore.",
      ],
    },
    {
      heading: "Challenges and Changing Social Conditions",
      paragraphs: [
        "Changing conditions create new frontiers for rights. The digital world has expanded speech while raising new questions of privacy and misinformation. Urban migration, economic pressure and social inequality can quietly erode access to education, healthcare and fair treatment.",
        "These challenges do not weaken the rights themselves — they make awareness, vigilance and community support more important than ever. Protection is not only a courtroom matter; it is built in neighbourhoods, schools and village squares.",
      ],
    },
    {
      heading: "Community-Centered Action",
      paragraphs: [
        "At HRSJM, we believe lasting change begins in the community. Our legal literacy drives, awareness workshops and support programmes are designed to bring knowledge of rights to the people who need it most — in their own language and in their own context.",
        "Community-centered action works because it stays close to the ground: it listens first, explains rights in practical terms, and stands with people as they seek remedies — from filing a complaint to approaching a legal aid clinic.",
      ],
    },
    {
      heading: "What Citizens Can Do",
      paragraphs: [
        "Every citizen has a role in strengthening fundamental rights. Learn the rights the Constitution guarantees you. Use the lawful tools available — such as Right to Information applications, grievance portals and free legal aid — to seek answers and remedies.",
        "Report discrimination and exploitation when you see it, support neighbours who may not know their rights, and take part in awareness programmes in your area. Rights remain strong not when they are written down, but when they are understood, used and defended.",
      ],
    },
    {
      heading: "Conclusion",
      paragraphs: [
        "Fundamental rights are India's shared inheritance — and a shared responsibility. As society changes, the work of protecting dignity, equality and justice changes with it.",
        "By staying informed, supporting one another and acting through lawful, community-centered means, every citizen helps ensure that the Constitution's promise is not only preserved on paper but lived in practice. HRSJM remains committed to that work — and to walking alongside the communities we serve.",
      ],
    },
  ],
};

/* Latest news grid articles (News & Blog page, the All Articles page,
   category listings and their /articles/[slug] detail pages). Every entry
   carries a slug, an author and full body sections so each card links to
   a real detail page — all views read from this single source. */
export const latestArticles: Article[] = [
  {
    slug: "understanding-your-right-to-information-rti",
    image: "/images/story-6.png",
    alt: "Village elder in Maharashtra looking hopefully into the distance",
    category: "Legal Insights",
    title: "Understanding Your Right to Information (RTI)",
    description:
      "A practical guide to filing RTI applications and using transparency as a tool for everyday accountability.",
    author: "HRSJM Editorial Team",
    date: "Sep 20, 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "What the RTI Act Gives You",
        paragraphs: [
          "The Right to Information Act gives every citizen the legal power to ask questions of public authorities — and to receive an answer. Government departments, local bodies, schools, hospitals and public offices funded by public money are covered. When you file an RTI application, the office you write to is legally bound to respond within a fixed time, usually thirty days.",
          "This is not a favour the administration does for you; it is a statutory right. You do not need a lawyer, a reason, or any special status. Any citizen can ask what work was completed, how funds were spent, or which rules were applied to a decision that affects them.",
        ],
      },
      {
        heading: "How to File an RTI Application",
        paragraphs: [
          "An RTI application can be as short as a single sentence: \u201cPlease provide a copy of…\u201d Write clearly, name the public authority, and describe the record you want in plain language. Attach the application fee — usually ten rupees — by postal order, court fee stamp or online payment where the department accepts it.",
          "You can submit the application in person at the office's public counter, by registered post, or through the central and state RTI online portals. Always keep a copy of what you sent and proof of submission. If you do not know which office holds the record, you can still file with the likely department and ask them to transfer it to the correct one — they are required to do so.",
        ],
      },
      {
        heading: "What You Can Ask — and What You Cannot",
        paragraphs: [
          "You can ask for records, files, inspection reports, bills, vouchers, muster rolls, decisions and the reasons behind administrative decisions. You can also ask for samples of materials used in public works, and you can inspect files in person at the office concerned.",
          "A small set of exemptions exists — information that would harm national security, invade personal privacy without public interest, or reveal a clearly exempted class of records. But the exemption list is narrow, and when personal information is involved, authorities must still disclose it if a larger public interest is served. Most refusals you will encounter in daily life are not valid under the Act.",
        ],
      },
      {
        heading: "Why RTI Matters for Everyday Accountability",
        paragraphs: [
          "Transparency changes behaviour long before an answer arrives. When officials know that citizens can — and do — ask for records, files move, ration supplies reach fair-price shops, scholarship payments land on time, and road repairs meet the specification written on paper.",
          "In HRSJM's legal literacy drives across communities, RTI is often the first tool people learn to use, because a single well-asked question can resolve a grievance that months of verbal complaints could not. Accountability is not an abstract idea; it begins when a citizen writes a short application and keeps the receipt.",
        ],
      },
      {
        heading: "Using the Answer — or the Silence",
        paragraphs: [
          "When the reply arrives, read it carefully. The information may resolve your question outright. If records reveal wrongdoing or neglect, the same documents become evidence for complaints to the department's higher officers, vigilance bodies, or the courts.",
          "If no reply arrives within the time limit, or the answer is evasive, you can file a first appeal with the same department and, after that, a second appeal with the Information Commission. Silence has a cost under the Act — officers who delay or deny without reason can be penalised. Used patiently and lawfully, RTI turns ordinary citizens into everyday guardians of public accountability.",
        ],
      },
    ],
  },
  {
    slug: "how-a-small-step-in-education-changed-a-community",
    image: "/images/story-2.png",
    alt: "A young student attending class in a government school",
    category: "Success Stories",
    title: "How a Small Step in Education Changed a Community",
    description:
      "How a small initiative in education brought lasting change to a village community.",
    author: "HRSJM Editorial Team",
    date: "Sep 19, 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "A Village Where Schooling Stopped Early",
        paragraphs: [
          "Two years ago, in a small settlement not far from our field office, the pattern was familiar: children enrolled in the village school, stayed for a few years, and drifted out — the girls into household work, the boys into day labour. By the time students reached the upper primary classes, more than half the original batch was gone.",
          "Families were not indifferent to education. They simply could not see a path from the classroom to a better life, and the school's hold on the community had weakened over years of quiet, unremarked dropouts.",
        ],
      },
      {
        heading: "One Classroom, One Decision",
        paragraphs: [
          "The change began with something deliberately small. HRSJM volunteers, working with the school's headmaster and the village panchayat, started a daily after-school study hour — one room, one blackboard, a handful of older students coaching the younger ones, and a mother from the community volunteering to keep attendance.",
          "The rule was simple: nobody is turned away, and nobody is scolded for falling behind. Within weeks the room was full. Parents began dropping in to watch. The study hour quietly became the most attended \u201cinstitution\u201d in the village.",
        ],
      },
      {
        heading: "The Change That Followed",
        paragraphs: [
          "Attendance in the regular school rose within a single term, because the study hour had rebuilt the habit of learning. Teachers reported that children who had fallen silent in class began answering. Two older students who had left school returned to prepare for their board examinations privately.",
          "The ripple went further. Mothers who came to the study hour asked for literacy classes of their own. The panchayat, seeing the hall full every evening, repaired the school's leaking roof and sanctioned a boundary wall. What began as one room with one volunteer became a community-wide investment in its own children.",
        ],
      },
      {
        heading: "What Made It Work",
        paragraphs: [
          "The programme succeeded because it asked very little and gave something immediately useful. There were no long speeches about the value of education — instead, children got help with homework they were already carrying home, and parents saw progress they could verify in their own kitchen: books opened without being told, lessons recited during chores.",
          "It also worked because the community owned it from day one. The volunteer was a local mother, the room belonged to the village, and the headmaster chaired the monthly review. HRSJM's role was to start the fire, not to run the kitchen.",
        ],
      },
      {
        heading: "Lessons for Every Community",
        paragraphs: [
          "The lesson we carry from this village is that the distance between a struggling school and a thriving one is often a single, well-chosen step — and the people best placed to take it already live there. What communities need is a starting structure, a little training and steady encouragement.",
          "HRSJM now uses the same playbook in other settlements: begin with the smallest useful thing, put local people in charge, and let visible results argue for the next step. Education changes a community when the community changes with it — one classroom, one evening, one child at a time.",
        ],
      },
    ],
  },
  {
    slug: "womens-rights-progress-and-the-road-ahead",
    image: "/images/story-3.png",
    alt: "A woman wearing a traditional headscarf in her neighbourhood",
    category: "Women's Rights",
    title: "Women's Rights: Progress and the Road Ahead",
    description:
      "Key legal protections, challenges and how we can build safer communities.",
    author: "HRSJM Editorial Team",
    date: "Sep 18, 2025",
    readTime: "7 min read",
    sections: [
      {
        heading: "The Legal Foundations",
        paragraphs: [
          "Indian law guarantees women a substantial set of protections: equality before the law and non-discrimination under the Constitution; the Dowry Prohibition Act; the Protection of Women from Domestic Violence Act; the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act; and specific provisions on cruelty, bigamy and property rights in the criminal and personal laws.",
          "Alongside these sit entitlements that matter in daily life — the right to equal wages for equal work, maternity benefits, reservation in panchayats and local bodies, and free legal aid for women under the Legal Services Authorities Act. Together they form a framework that, on paper, protects women at home, at work and in public life.",
        ],
      },
      {
        heading: "Where Progress Is Visible",
        paragraphs: [
          "The progress of the last two decades is real and measurable. More girls are in classrooms and colleges than at any point in our history. Women's workforce participation is slowly recovering, self-help groups have put financial tools in millions of women's hands, and reservations have brought over a million women into elected local office.",
          "Reporting has improved too. Crimes that were once suffered in silence are now registered, litigated and debated publicly. Domestic violence victims have protection officers and shelter homes to approach; workplaces with ten or more employees must have an internal complaints committee. Awareness — once the missing ingredient — is spreading through campaigns like ours.",
        ],
      },
      {
        heading: "The Gaps That Remain",
        paragraphs: [
          "Yet the distance between the law and lived experience remains wide. Conviction rates lag far behind registration. Protection officers and committees exist on paper but are under-resourced or unknown to the women they serve. Economic dependence still traps women in violent homes, and social pressure still discourages families from pursuing cases.",
          "Newer challenges compound the old ones: online harassment of women, digital finance fraud that targets first-time users, and the invisible burden of unpaid care work that keeps women out of the workforce. The road ahead runs through these gaps — closing the distance between a right written down and a right that is usable.",
        ],
      },
      {
        heading: "Safety, Work and Dignity in Everyday Life",
        paragraphs: [
          "Safety is not only about the criminal law; it is built from street lighting, functioning public transport, responsive policing and neighbourhoods that refuse to look away. Work is not only about wages; it is about crèches, safe commutes, and complaint mechanisms a woman can actually use without fear of losing her job.",
          "This is why HRSJM's programmes work at the community level: legal literacy camps that teach the Domestic Violence Act in plain language, workplace awareness sessions on POSH rights, and support for women navigating police stations and courts. Rights become real when a woman knows the form to fill, the office to visit, and the person who will stand with her.",
        ],
      },
      {
        heading: "The Road Ahead",
        paragraphs: [
          "The next phase of progress will be won in ordinary places: in homes where a daughter's education is treated as non-negotiable, in offices where complaints are heard and acted upon, in panchayats where women representatives move from attendance to agenda-setting, and in courts where delay is the last great denial.",
          "Every citizen has a part in this. Believing a woman when she speaks, refusing to marry dowry into the family, hiring and retaining women at work, and supporting legal aid for those who cannot afford it — these small acts, multiplied, are how safer communities are built. The law has given women their rights; society's task, still unfinished, is to make them liveable.",
        ],
      },
    ],
  },
  {
    slug: "hrsjm-community-outreach-program-in-maharashtra",
    image: "/images/story-1.png",
    alt: "Community members gathered together in an urban settlement",
    category: "Events & Activities",
    title: "HRSJM Community Outreach Program in Maharashtra",
    description:
      "An overview of our recent awareness drive and community support program.",
    author: "HRSJM Field Team",
    date: "Sep 14, 2025",
    readTime: "4 min read",
    sections: [
      {
        heading: "Why Maharashtra, Why Now",
        paragraphs: [
          "This monsoon season, our field teams travelled through settlements and village clusters across Maharashtra where awareness of basic legal rights remains thin and access to help is thinner. Complaints we heard again and again: delayed ration supplies, unpaid wages, school admission hurdles for migrant children, and confusion about documents.",
          "The outreach programme was designed around those grievances — not around what we assumed people needed, but around what they told us on previous visits.",
        ],
      },
      {
        heading: "What the Programme Included",
        paragraphs: [
          "Over the course of the drive, HRSJM volunteers conducted street-corner legal literacy sessions, door-to-door document camps, and school assemblies on child safety. At the document camps, teams helped residents check and correct Aadhaar and ration card details, and explained step by step how to file grievances on public portals — and how to follow up when answers don't come.",
          "A mobile help desk, staffed by volunteers and a visiting legal aid counsellor, travelled with the programme and took up individual cases: a pension stuck for eight months here, a wage dispute there. Several grievances were filed on the spot, with copies handed to the families so they could track the replies themselves.",
        ],
      },
      {
        heading: "Listening Before Teaching",
        paragraphs: [
          "The most important sessions were the ones where we spoke least. Community meetings opened with residents describing their own disputes and doubts, and the teaching followed those threads — rights explained through the very problems in the room, in Marathi and Hindi, with printed one-page guides left behind for later.",
          "Local volunteers from each settlement were identified and briefed to continue the work after the programme moved on. Sustainability was the design goal: knowledge that stays in the community outlasts any single visit.",
        ],
      },
      {
        heading: "What Comes Next",
        paragraphs: [
          "The Maharashtra outreach will return in the coming quarter to follow up on filed grievances and to train the local volunteers further. Case files opened during the drive are being tracked by our field team until they are resolved — an application filed is not a problem solved, and we do not count it as one.",
          "To every volunteer, donor and local partner who made this drive possible: thank you. Watch this space — and our events page — for the next programme dates in your district.",
        ],
      },
    ],
  },
  {
    slug: "child-rights-building-a-safer-and-brighter-future",
    image: "/images/story-5.png",
    alt: "A smiling child in a classroom full of students",
    category: "Children's Rights",
    title: "Child Rights: Building a Safer and Brighter Future",
    description:
      "Why child protection matters and what can be done at the local level.",
    author: "HRSJM Editorial Team",
    date: "Sep 13, 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "The Rights Every Child Holds",
        paragraphs: [
          "Children in India hold a full charter of rights: the fundamental rights of the Constitution, the right to free and compulsory education between six and fourteen under the RTE Act, protection from exploitation and hazardous work, and — through the Juvenile Justice (Care and Protection of Children) Act and the POCSO Act — special protection from abuse and a justice system designed around their needs.",
          "The guiding principle across all of these is the same: the best interests of the child come first, ahead of convenience, custom or cost. A child is a rights-holder, not property and not a problem to be managed.",
        ],
      },
      {
        heading: "Why Protection Begins Locally",
        paragraphs: [
          "National laws set the standard, but child safety is decided locally — in the school where a teacher notices bruises, in the anganwadi where a worker tracks weight and attendance, in the street where neighbours either intervene or look away. Most children who are harmed are harmed by people they know, in places adults assume are safe.",
          "That is why local vigilance outperforms any distant bureaucracy. A community that knows what POCSO mandates, where the child helpline 1098 is, and how to reach the Child Welfare Committee can protect a child months before any official machinery would have noticed.",
        ],
      },
      {
        heading: "Education, Health and Safety Go Together",
        paragraphs: [
          "These protections are not separate silos. A child in school is a child who is counted, seen and fed at midday; a child out of school disappears from every system at once. Nutrition, immunisation and safe housing are as much child-rights issues as any statute, because each one determines whether a child can actually use the rights on paper.",
          "In our field work, the pattern is consistent: when families get help stabilising the basics — documents, school admission, midday meals, a health card — reports of child labour and early marriage in the same households fall. Security upstream prevents harm downstream.",
        ],
      },
      {
        heading: "What Communities Can Do",
        paragraphs: [
          "Every adult in a neighbourhood can do something concrete. Learn the signs of distress — sudden withdrawal, chronic absence from school, unexplained injuries. Keep the child helpline number visible. Support the school's school management committee and ask it to meet. Insist that coaching centres, hostels and employers around you follow the law on child workers.",
          "Talk to children about their rights in an age-appropriate way — that their body is their own, that no adult may hurt them, and that telling a trusted adult is always right, never wrong. A child who knows this is the hardest child to harm in silence.",
        ],
      },
      {
        heading: "A Shared Responsibility",
        paragraphs: [
          "Child rights are the clearest test of a society's values, because children can neither vote, lobby nor negotiate for them. The future we keep promising is not built by speeches; it is built in classrooms that stay open, homes that stay safe, and neighbourhoods that stay watchful.",
          "HRSJM's child protection work — school assemblies, parent workshops, helpline awareness drives and case support — continues across our programme districts. We invite every parent, teacher and neighbour to join it. A safer and brighter future for children is not a slogan; it is a weekly practice of the adults around them.",
        ],
      },
    ],
  },
  {
    slug: "hrsjm-in-the-news-recent-media-highlights",
    image: "/images/news-hero-bg.png",
    imagePosition: "center 72%",
    alt: "Newspaper front page reading Human Rights — A Stronger India",
    category: "Media Coverage",
    title: "HRSJM in the News: Recent Media Highlights",
    description:
      "Coverage of our latest initiatives, events and campaigns across India.",
    author: "HRSJM Editorial Team",
    date: "Sep 12, 2025",
    readTime: "3 min read",
    sections: [
      {
        heading: "Awareness Drives That Reached Thousands",
        paragraphs: [
          "Regional papers across Maharashtra and neighbouring states covered our recent legal literacy drives, noting the scale of participation — street-corner sessions, school assemblies and document camps that together reached thousands of residents over a few weeks. Reporters highlighted the practical format: rights explained in plain language, with grievances filed on the spot.",
          "Coverage of the drives also carried quotes from community members themselves — a pension finally released, a school admission unblocked — which, to us, matters more than any mention of our name.",
        ],
      },
      {
        heading: "Legal Literacy in Local Language",
        paragraphs: [
          "Our one-page legal guides, printed in Marathi and Hindi and distributed free at every camp, drew particular interest from local media. Editors appreciated the plain-language approach: RTI, domestic violence protections, and child helpline numbers explained without jargon, on a single sheet a family can keep at home.",
          "Several publications reprinted the helpline numbers from the guide, extending the campaign's reach well beyond the districts we could visit in person.",
        ],
      },
      {
        heading: "Partnerships in the Spotlight",
        paragraphs: [
          "Stories also focused on the partnerships behind the work — local schools that hosted sessions, panchayats that opened their halls, and pro-bono legal counsellors who staffed our mobile help desk. The coverage rightly framed community rights work as a shared effort rather than a single organisation's achievement.",
          "We thank every partner mentioned by name in these reports. The visibility helps: after the coverage, volunteer enquiries and requests for camps in new districts both rose sharply.",
        ],
      },
      {
        heading: "Looking Ahead",
        paragraphs: [
          "Media attention is welcome, but it is a means, not the mission. Every report on an awareness drive is an invitation to the next reader: to learn their rights, attend a camp, volunteer an hour, or simply pass a helpline number to a neighbour who needs it.",
          "We will keep this page updated as coverage grows, and our own news section will always carry the first, fullest account of what we are doing — and why. For interview or press enquiries, please reach us through the contact page.",
        ],
      },
    ],
  },
];

/* Look up a grid article by its URL slug (e.g. "understanding-your-right-to-information-rti"). */
export function findLatestArticleBySlug(slug: string): Article | undefined {
  return latestArticles.find((article) => article.slug === slug);
}