import { redirect } from "next/navigation";
import { fetchNews } from "@/lib/backendApi";

export const revalidate = 60;

export default async function FeaturedArticleRoute() {
  try {
    const data = await fetchNews({ status: "PUBLISHED", limit: 1 });
    if (data.items.length > 0) {
      redirect(`/news/${data.items[0].slug || data.items[0].id}`);
    }
  } catch {}
  redirect("/news");
}
