export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  qualification?: string;
  location?: string;
  role?: string;
  quote?: string;
  bio?: string;
  specialization?: string;
  experience?: string;
  focusAreas?: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description?: string;
  iconName: string;
}

export interface SubNavItem {
  id: string;
  label: string;
  targetId: string;
}

export const subNavItems: SubNavItem[] = [
  { id: "who-we-are", label: "Who We Are", targetId: "who-we-are" },
  { id: "our-history", label: "Our History", targetId: "our-history" },
  { id: "mission-vision", label: "Mission & Vision", targetId: "mission-vision" },
  { id: "values-principles", label: "Values & Principles", targetId: "values-principles" },
  { id: "leadership", label: "Leadership", targetId: "leadership" },
];

export const leadershipMembers: LeadershipMember[] = [
  {
    id: "mt-qazi",
    name: "Mr. M.T. Qazi",
    designation: "Honorable National President",
    qualification: "M.A. Human Rights",
    location: "Delhi, Mumbai",
    role: "National President",
    experience: "Human Rights Leadership, Administration & Governance",
    focusAreas: "Human Rights Protection, Social Justice, Policy Advocacy, National Coordination, Member Welfare",
    bio: "Mr. M.T. Qazi serves as the Honorable National President of HRSJM, leading the organization's national initiatives for the promotion and protection of human rights across India.",
    image: "/assets/leadership/leader_mt_qazi_v3.jpg",
  },
  {
    id: "sp-panigrahi",
    name: "Mr. S. P. Panigrahi",
    designation: "National Vice President",
    qualification: "B.Com | Engineer",
    location: "Maharashtra",
    role: "National Vice President",
    experience: "Organizational Strategy, Institutional Development & Operations",
    focusAreas: "Public Advocacy, Community Development, Executive Governance, State Operations",
    bio: "Mr. S. P. Panigrahi serves as the National Vice President of HRSJM, overseeing executive administration, nationwide organizational coordination, and public advocacy.",
    image: "/assets/leadership/leader_sp_panigrahi_v2.jpg",
  },
  {
    id: "na-diwakar",
    name: "Mr. N. A. Diwakar",
    designation: "National General Secretary",
    qualification: "M.A. | B.Ed.",
    location: "Maharashtra",
    role: "National General Secretary",
    experience: "Grassroots Mobilization, Human Rights Education & Public Outreach",
    focusAreas: "Educational Rights, Community Legal Awareness, Grievance Redressal, Field Missions",
    bio: "Mr. N. A. Diwakar leads grassroots mobilization and administrative execution as the National General Secretary of HRSJM.",
    image: "/assets/leadership/leader_placeholder.svg",
  },
  {
    id: "sh-shaikh",
    name: "Adv. S. H. Shaikh",
    designation: "Joint Secretary",
    qualification: "B.A. | L.L.B.",
    location: "Maharashtra",
    role: "Joint Secretary",
    experience: "Legal Advocacy, Constitutional Law & Grievance Counseling",
    focusAreas: "Civil Rights, Legal Aid Support, Public Interest Litigation, Statutory Compliance",
    bio: "Adv. S. H. Shaikh serves as Joint Secretary of HRSJM, providing strategic legal guidance and facilitating legal assistance for marginalized individuals.",
    image: "/assets/leadership/leader_sh_shaikh_v2.jpg",
  },
  {
    id: "ar-ahmed",
    name: "Mr. A. R. Ahmed",
    designation: "Treasurer",
    qualification: "B.Com | Engineer",
    location: "Maharashtra",
    role: "Treasurer",
    experience: "Financial Management, Audit Compliance & Resource Planning",
    focusAreas: "Transparent Accounting, Fund Allocation, Social Welfare Budgeting, Governance",
    bio: "Mr. A. R. Ahmed oversees financial integrity, statutory audits, and fiscal stewardship as Treasurer of HRSJM.",
    image: "/assets/leadership/leader_ar_ahmed_v2.jpg",
  },
  {
    id: "rd-khetri",
    name: "Mr. R. D. Khetri",
    designation: "Director",
    qualification: "Governing Body Member",
    location: "Maharashtra",
    role: "Director",
    experience: "Community Relations, Grassroots Welfare & Social Mediation",
    focusAreas: "Public Grievance Resolution, Community Outreach, Social Welfare",
    bio: "Mr. R. D. Khetri serves as Director on the National Governing Body, championing community harmony and grassroots social justice initiatives.",
    image: "/assets/leadership/leader_rd_khetri_v2.jpg",
  },
  {
    id: "mm-patel",
    name: "Adv. M. M. Patel",
    designation: "Director (Legal)",
    qualification: "B.A. | L.L.B.",
    location: "Gujarat",
    role: "Director (Legal)",
    experience: "Judicial Procedures, Human Rights Litigation & Legal Counseling",
    focusAreas: "Fundamental Rights, Labor Protections, Legal Clinics, Judicial Advocacy",
    bio: "Adv. M. M. Patel guides legal aid clinics, constitutional rights advocacy, and statutory compliance as Director (Legal).",
    image: "/assets/leadership/leader_mm_patel_v2.jpg",
  },
  {
    id: "mz-siddiqui",
    name: "Adv. M. Z. Siddiqui",
    designation: "Director (Legal)",
    qualification: "M.A. | B.Ed. | L.L.B.",
    location: "Maharashtra",
    role: "Director (Legal)",
    experience: "Constitutional Advocacy, Dispute Resolution & Public Defense",
    focusAreas: "Citizens' Rights, Legal Literacy, Civil Liberties, Pro Bono Defense",
    bio: "Adv. M. Z. Siddiqui champions legal education, civic literacy, and pro bono legal support across Maharashtra.",
    image: "/assets/leadership/leader_mz_siddiqui_v2.jpg",
  },
  {
    id: "ih-khan",
    name: "Adv. I. H. Khan",
    designation: "Director (Legal)",
    qualification: "Governing Body Member",
    location: "Delhi",
    role: "Director (Legal)",
    experience: "National Policy Advocacy & Legal Governance",
    focusAreas: "Central Regulatory Affairs, Human Rights Frameworks, Legal Redressal",
    bio: "Adv. I. H. Khan oversees legal governance and statutory compliance for national-level campaigns from Delhi.",
    image: "/assets/leadership/leader_ih_khan_v2.jpg",
  },
  {
    id: "fp-khan",
    name: "Dr. F. P. Khan",
    designation: "Director (Human Resources)",
    qualification: "Doctor",
    location: "U.P.",
    role: "Director (Human Resources)",
    experience: "Public Health Advocacy, Community Welfare & Talent Administration",
    focusAreas: "Healthcare Equity, Volunteer Training, Medical Rights, Community Outreach",
    bio: "Dr. F. P. Khan directs human resource development, volunteer coordination, and public health awareness drives.",
    image: "/assets/leadership/leader_fp_khan_v2.jpg",
  },
  {
    id: "as-sayyed",
    name: "Mr. A. S. Sayyed",
    designation: "Director",
    qualification: "M.B.A. (Finance)",
    location: "U.K.",
    role: "Director",
    experience: "International Relations, Global Advocacy & Strategic Development",
    focusAreas: "Global Human Rights Standards, International Collaboration, Strategic Oversight",
    bio: "Mr. A. S. Sayyed represents international coordination, cross-border advocacy partnerships, and institutional relations.",
    image: "/assets/leadership/leader_as_sayyed_v2.jpg",
  },
];

export const valuesList: ValueItem[] = [
  {
    id: "peace",
    title: "Peace",
    description: "Promoting non-violent dialogue, social harmony, and reconciliation across all communities.",
    iconName: "peace",
  },
  {
    id: "democracy",
    title: "Democracy",
    description: "Upholding participatory civic engagement, transparent governance, and the sovereign voice of the people.",
    iconName: "democracy",
  },
  {
    id: "secularism",
    title: "Secularism",
    description: "Protecting pluralism, freedom of belief, and equal respect for all faiths without discrimination.",
    iconName: "secularism",
  },
  {
    id: "human-security",
    title: "Human Security",
    description: "Ensuring freedom from fear, violence, and institutional vulnerability for every citizen.",
    iconName: "human-security",
  },
  {
    id: "social-development",
    title: "Social Development",
    description: "Strengthening community infrastructure, inclusive welfare, and universal access to basic necessities.",
    iconName: "social-development",
  },
  {
    id: "political-development",
    title: "Political Development",
    description: "Empowering marginalized groups to actively shape policy, civic institutions, and electoral accountability.",
    iconName: "political-development",
  },
  {
    id: "economic-development",
    title: "Economic Development",
    description: "Championing fair wages, livelihood security, workers’ rights, and equitable wealth distribution.",
    iconName: "economic-development",
  },
  {
    id: "cultural-development",
    title: "Cultural Development",
    description: "Honoring diverse cultural expressions, indigenous heritage, and grassroots artistic voices.",
    iconName: "cultural-development",
  },
  {
    id: "equality",
    title: "Equality",
    description: "Eliminating discrimination based on caste, creed, religion, gender, or social background.",
    iconName: "equality",
  },
  {
    id: "dignity",
    title: "Dignity for All",
    description: "Recognizing the inherent and inalienable worth of every human being as supreme.",
    iconName: "dignity",
  },
];