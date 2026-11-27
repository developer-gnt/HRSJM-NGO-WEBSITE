const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";
const defaultSocialImage = `${siteUrl}/social-preview.png`;

export interface PageSocialProps {
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
  image,
  imageAlt = "Human Rights & Social Justice Mission (HRSJM)",
  type = "website",
}: PageSocialProps) {
  const fullUrl = urlPath
    ? `${siteUrl}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`
    : siteUrl;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : defaultSocialImage;

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
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: imageAlt,
        type: imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg") ? "image/jpeg" : "image/png",
      },
    ],
  };
}

export function createTwitter({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : defaultSocialImage;

  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [imageUrl],
    creator: "@hrsjm_president",
    site: "@hrsjm_president",
  };
}

export function createPageMetadata({
  title,
  description,
  urlPath = "",
  image,
  imageAlt,
  type = "website",
}: PageSocialProps) {
  return {
    openGraph: createOpenGraph({ title, description, urlPath, image, imageAlt, type }),
    twitter: createTwitter({ title, description, image }),
  };
}
