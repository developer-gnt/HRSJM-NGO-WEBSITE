const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";

export interface PageOGProps {
  title: string;
  description: string;
  urlPath?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

export function createOpenGraph({
  title,
  description,
  urlPath = "",
  image = "/logo.png",
  imageAlt = "Human Rights & Social Justice Mission (HRSJM)",
  type = "website",
}: PageOGProps) {
  const fullUrl = urlPath ? `${siteUrl}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}` : siteUrl;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    type,
    locale: "en_IN",
    url: fullUrl,
    siteName: "HRSJM - Human Rights & Social Justice Mission",
    title,
    description,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: imageAlt,
      },
    ],
  };
}
