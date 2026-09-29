export interface HeroSlideData {
  id: number;
  image: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  highlightedText: string;
  description: string;
  primaryAction: string;
  primaryHref: string;
  secondaryAction: string;
  secondaryHref: string;
}

export const heroSlides: HeroSlideData[] = [
  {
    id: 1,
    image: "/home-hero-bg.png",
    eyebrow: "Human Rights & Social Justice Mission",
    titleLine1: "Justice Should Never",
    titleLine2: "Depend on",
    highlightedText: "Who You Are.",
    description:
      "HRSJM stands for human rights, dignity, equality and peace. We work with communities, empower individuals and fight for a fairer, more just society.",
    primaryAction: "Join HRSJM",
    primaryHref: "/membership",
    secondaryAction: "Watch Our Story",
    secondaryHref: "/about#who-we-are",
  },
  {
    id: 2,
    image: "/home-hero-bg-2.png",
    eyebrow: "Human Rights for Everyone",
    titleLine1: "Dignity, Equality,",
    titleLine2: "",
    highlightedText: "Justice for Every Person.",
    description:
      "We stand with communities, protect human dignity and work toward a more equal and just society.",
    primaryAction: "Join HRSJM",
    primaryHref: "/membership",
    secondaryAction: "Our Work",
    secondaryHref: "/what-hrsjm-does",
  },
  {
    id: 3,
    image: "/home-hero-bg-3.png",
    eyebrow: "Together for Justice",
    titleLine1: "Together We Can Build",
    titleLine2: "a",
    highlightedText: "More Equal World.",
    description:
      "Every voice matters. Every person deserves dignity, equality, security and access to justice.",
    primaryAction: "Take Action",
    primaryHref: "#take-action",
    secondaryAction: "Learn More",
    secondaryHref: "/about",
  },
];
