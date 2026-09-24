import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "close"
  | "email"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "location"
  | "menu"
  | "phone"
  | "search"
  | "youtube"
  | "x";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export default function Icon({ name, ...props }: IconProps) {
  const commonProps = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };

  switch (name) {
    case "arrow":
      return <svg {...commonProps}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>;
    case "close":
      return <svg {...commonProps}><path d="m6 6 12 12" /><path d="M18 6 6 18" /></svg>;
    case "email":
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "facebook":
      return <svg {...commonProps}><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" fill="currentColor" stroke="none" /></svg>;
    case "instagram":
      return <svg {...commonProps}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
    case "linkedin":
      return <svg {...commonProps}><path d="M6 9v9" /><path d="M6 6v.1" /><path d="M10 18v-5a3 3 0 0 1 6 0v5" /><path d="M10 9v9" /></svg>;
    case "location":
      return <svg {...commonProps}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "menu":
      return <svg {...commonProps}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>;
    case "phone":
      return <svg {...commonProps}><path d="M6 3h3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L16 13l5 2v3c0 1.1-.9 2-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" /></svg>;
    case "search":
      return <svg {...commonProps}><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></svg>;
    case "youtube":
      return <svg {...commonProps}><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></svg>;
    case "x":
      return <svg {...commonProps}><path d="M5 4 19 20" /><path d="M19 4 5 20" /></svg>;
  }
}
