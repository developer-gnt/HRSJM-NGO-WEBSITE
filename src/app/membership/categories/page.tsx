import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import MembershipCategoriesPage from "@/components/membership/categories/MembershipCategoriesPage";
import { membershipCategorySections } from "@/components/membership/categories/categoriesData";

export const revalidate = 86400; // Allow public CDN and crawler caching (24 hours)

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const catParam = resolvedParams?.cat;
  const catId = typeof catParam === "string" ? parseInt(catParam, 10) : undefined;
  const shareParam = resolvedParams?.share;
  const shareQuery = typeof shareParam === "string" ? `&share=${shareParam}` : "";

  const allItems = membershipCategorySections.flatMap((s) => s.items);
  const matchedItem = catId ? allItems.find((item) => item.srNo === catId) : undefined;

  if (matchedItem) {
    const postTitle = `${matchedItem.post} | HRSJM Membership`;
    const postDesc = `Join Human Rights & Social Justice Mission (HRSJM) as "${matchedItem.post}" (${matchedItem.fees} / ${matchedItem.duration || matchedItem.validity}). Qualification: ${matchedItem.qualification}. Apply online.`;
    const urlPath = `/membership/categories?cat=${matchedItem.srNo}${shareQuery}`;

    return {
      title: `${matchedItem.post} - Membership Categories & Fees | HRSJM India`,
      description: postDesc,
      alternates: {
        canonical: urlPath,
      },
      openGraph: createOpenGraph({
        title: postTitle,
        description: postDesc,
        urlPath,
        image: "/logo.png",
        imageAlt: `HRSJM Official Logo - ${matchedItem.post}`,
      }),
      twitter: createTwitter({
        title: postTitle,
        description: postDesc,
        image: "/logo.png",
        card: "summary",
      }),
    };
  }

  const defaultTitle = "Membership Categories, Posts & Fees | HRSJM India";
  const defaultDesc =
    "Explore HRSJM membership categories, fees, validity, and kit details for District Active Member, State Unit, Letter Pad, and National Council posts.";

  return {
    title: defaultTitle,
    description: defaultDesc,
    keywords: [
      "HRSJM Membership Categories",
      "NGO Post Fees",
      "District Active Member NGO",
      "State Unit Post HRSJM",
      "Letter Pad Post NGO",
      "National Level NGO Post",
      "Human Rights ID Card Kit",
    ],
    alternates: {
      canonical: "/membership/categories",
    },
    openGraph: createOpenGraph({
      title: defaultTitle,
      description: defaultDesc,
      urlPath: "/membership/categories",
      image: "/logo.png",
      imageAlt: "HRSJM Official Logo",
    }),
    twitter: createTwitter({
      title: defaultTitle,
      description: defaultDesc,
      image: "/logo.png",
      card: "summary",
    }),
  };
}

export default function MembershipCategoriesRoute() {
  return <MembershipCategoriesPage />;
}
