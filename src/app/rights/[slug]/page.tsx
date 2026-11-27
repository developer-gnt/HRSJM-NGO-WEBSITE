import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createOpenGraph, createTwitter } from "@/lib/seo";
import { rightsDetailData } from "@/data/rightsDetailData";
import RightsDetailView from "@/components/rights/detail/RightsDetailView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(rightsDetailData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = rightsDetailData[slug];

  if (!data) {
    return {
      title: "Category Not Found",
      alternates: {
        canonical: `/rights/${slug}`,
      },
    };
  }

  const desc = data.heroSubtitle ? data.heroSubtitle.slice(0, 155) : "Know your rights with HRSJM.";

  return {
    title: `${data.title} | Know Your Rights`,
    description: desc,
    alternates: {
      canonical: `/rights/${slug}`,
    },
    openGraph: {
      title: `${data.title} | Human Rights & Social Justice Mission`,
      description: desc,
      images: [data.heroImage],
    },
  };
}

export default async function RightsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = rightsDetailData[slug];

  if (!data) {
    notFound();
  }

  return <RightsDetailView data={data} />;
}
