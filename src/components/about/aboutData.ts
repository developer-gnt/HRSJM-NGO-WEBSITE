export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image: string;
  bio?: string;
  specialization?: string;
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
  { id: "our-beliefs", label: "Our Beliefs", targetId: "our-beliefs" },
  { id: "mission-vision", label: "Mission & Vision", targetId: "mission-vision" },
  { id: "values-principles", label: "Values & Principles", targetId: "values-principles" },
  { id: "leadership", label: "Leadership", targetId: "leadership" },
];

export const leadershipMembers: LeadershipMember[] = [
  {
    id: "arvind-deshpande",
    name: "Dr. Arvind Deshpande",
    designation: "Founder & Chairperson",
    quote: "A just society is built when people stand together.",
    image: "/assets/leader_exact_arvind.jpg",
    bio: "Dr. Deshpande has dedicated over three decades to constitutional rights defense, grassroots legal aid, and socio-economic equality advocacy across India.",
    specialization: "Constitutional Rights & Public Interest Law",
  },
  {
    id: "neha-sharma",
    name: "Ms. Neha Sharma",
    designation: "General Secretary",
    quote: "Empowered people create lasting change.",
    image: "/assets/leader_exact_neha.jpg",
    bio: "A grassroots mobilizer and gender rights advocate, Ms. Sharma oversees HRSJM’s national chapters, volunteer networks, and community education programs.",
    specialization: "Community Organizing & Gender Justice",
  },
  {
    id: "sameer-khan",
    name: "Adv. Sameer Khan",
    designation: "Legal Advisor",
    quote: "Justice is a right, not a privilege.",
    image: "/assets/leader_exact_sameer.jpg",
    bio: "Advocate Khan leads HRSJM’s legal defense cell, providing pro-bono representation to marginalized citizens, laborers, and undertrials.",
    specialization: "Pro-Bono Litigation & Human Security",
  },
  {
    id: "kavita-rao",
    name: "Dr. Kavita Rao",
    designation: "Head - Programs",
    quote: "Communities are the true changemakers.",
    image: "/assets/leader_exact_kavita.jpg",
    bio: "Dr. Rao steers regional capacity-building initiatives, youth civic fellowships, and community health and sanitation rights clinics.",
    specialization: "Program Development & Social Research",
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