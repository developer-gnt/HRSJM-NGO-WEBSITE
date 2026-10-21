import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
    };
  }

  return {
    title: `${data.title} | Know Your Rights`,
    description: data.heroSubtitle,
    openGraph: {
      title: `${data.title} | Human Rights & Social Justice Mission`,
      description: data.heroSubtitle,
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
