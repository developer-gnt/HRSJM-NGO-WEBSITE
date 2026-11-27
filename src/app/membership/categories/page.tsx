import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import MembershipCategoriesPage from "@/components/membership/categories/MembershipCategoriesPage";
import { membershipCategorySections } from "@/components/membership/categories/categoriesData";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const catParam = resolvedParams?.cat;
  const catId = typeof catParam === "string" ? parseInt(catParam, 10) : undefined;

  const allItems = membershipCategorySections.flatMap((s) => s.items);
  const matchedItem = catId ? allItems.find((item) => item.srNo === catId) : undefined;

  if (matchedItem) {
    const postTitle = `${matchedItem.post} - HRSJM Membership`;
    const postDesc = `Join Human Rights & Social Justice Mission (HRSJM) as "${matchedItem.post}" (${matchedItem.fees} / ${matchedItem.duration || matchedItem.validity}). Qualification: ${matchedItem.qualification}. Apply online.`;
    const urlPath = `/membership/categories?cat=${matchedItem.srNo}`;

    return {
      title: postTitle,
      description: postDesc,
      alternates: {
        canonical: urlPath,
      },
      openGraph: createOpenGraph({
        title: postTitle,
        description: postDesc,
        urlPath,
        image: "/social-preview.jpg",
        imageAlt: `HRSJM Membership - ${matchedItem.post}`,
      }),
      twitter: createTwitter({
        title: postTitle,
        description: postDesc,
        image: "/social-preview.jpg",
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
      image: "/social-preview.jpg",
      imageAlt: "Human Rights & Social Justice Mission (HRSJM) Official Logo",
    }),
    twitter: createTwitter({
      title: defaultTitle,
      description: defaultDesc,
      image: "/social-preview.jpg",
    }),
  };
}

export default function MembershipCategoriesRoute() {
  return <MembershipCategoriesPage />;
}
