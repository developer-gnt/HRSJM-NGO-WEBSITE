import {
  CalendarDays,
  HeartHandshake,
  Megaphone,
  Newspaper,
  Scale,
  Tv,
  type LucideIcon,
} from "lucide-react";

/* Shared blog/article categories. The same list powers the Categories card
   on the News & Blog page, the Featured Article page and every category
   listing, so labels, counts and routes stay consistent site-wide. */
export interface ArticleCategory {
  slug: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export const articleCategories: ArticleCategory[] = [
  {
    slug: "all-posts",
    label: "All Posts",
    href: "/news",
    icon: Newspaper,
    description:
      "Every update, story, insight and announcement from Human Rights & Social Justice Mission in one place.",
  },
  {
    slug: "announcements",
    label: "Announcements",
    href: "/news/category/announcements",
    icon: Megaphone,
    description:
      "Official notices, programme updates and important announcements from HRSJM.",
  },
  {
    slug: "legal-insights",
    label: "Legal Insights",
    href: "/news/category/legal-insights",
    icon: Scale,
    description:
      "Plain-language explainers on constitutional rights, laws and everyday legal awareness.",
  },
  {
    slug: "success-stories",
    label: "Success Stories",
    /* Points to the dedicated Success Stories page instead of the old
       category listing; /news/category/success-stories redirects there. */
    href: "/success-stories",
    icon: HeartHandshake,
    description:
      "Real stories of dignity, justice and change from the communities we serve.",
  },
  {
    slug: "events-activities",
    label: "Events & Activities",
    href: "/news/category/events-activities",
    icon: CalendarDays,
    description:
      "Recaps and highlights from our awareness drives, workshops and community outreach.",
  },
  {
    slug: "media-coverage",
    label: "Media Coverage",
    href: "/news/category/media-coverage",
    icon: Tv,
    description:
      "HRSJM in the press — coverage of our initiatives, campaigns and events across India.",
  },
];

/* Look up a category by its URL slug (e.g. "legal-insights"). */
export function findArticleCategory(slug: string): ArticleCategory | undefined {
  return articleCategories.find((category) => category.slug === slug);
}