const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";
const defaultSocialImage = `${siteUrl}/logo.png`;

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
  imageAlt = "HRSJM Official Logo",
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

  const isSquare = !image || image.includes("logo") || image.includes("social-preview");
  const imgWidth = isSquare ? 813 : 1200;
  const imgHeight = isSquare ? 825 : 630;

  const cleanUrl = imageUrl.split("?")[0].toLowerCase();
  const isJpg = cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg");
  const mimeType = isJpg ? "image/jpeg" : "image/png";

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
        width: imgWidth,
        height: imgHeight,
        alt: imageAlt,
        type: mimeType,
      },
    ],
  };
}

export function createTwitter({
  title,
  description,
  image,
  card = "summary",
}: {
  title: string;
  description: string;
  image?: string;
  card?: "summary" | "summary_large_image";
}) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : defaultSocialImage;

  return {
    card,
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
