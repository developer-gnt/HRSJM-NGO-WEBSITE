import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "baby"
  | "badge"
  | "bookOpen"
  | "briefcase"
  | "building2"
  | "chartNoAxesCombined"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "download"
  | "email"
  | "facebook"
  | "fileText"
  | "graduationCap"
  | "hand"
  | "heart"
  | "instagram"
  | "landmark"
  | "linkedin"
  | "location"
  | "megaphone"
  | "menu"
  | "phone"
  | "play"
  | "refreshCw"
  | "scale"
  | "search"
  | "shieldCheck"
  | "userRoundCheck"
  | "users"
  | "usersRound"
  | "venus"
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
    case "baby":
      return <svg {...commonProps}><path d="M9 12h.01" /><path d="M15 12h.01" /><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" /><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" /></svg>;
    case "badge":
      return <svg {...commonProps}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /></svg>;
    case "bookOpen":
      return <svg {...commonProps}><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z" /></svg>;
    case "briefcase":
      return <svg {...commonProps}><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>;
    case "building2":
      return <svg {...commonProps}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>;
    case "chartNoAxesCombined":
      return <svg {...commonProps}><path d="M3 17v-4" /><path d="M8 17V8" /><path d="M13 17v-2" /><path d="m13.7 8.3 3.9-3.9a2.1 2.1 0 0 1 3 3l-3.9 3.9a2.1 2.1 0 0 1-3-3Z" /></svg>;
    case "chevronLeft":
      return <svg {...commonProps}><path d="m15 18-6-6 6-6" /></svg>;
    case "chevronRight":
      return <svg {...commonProps}><path d="m9 18 6-6-6-6" /></svg>;
    case "close":
      return <svg {...commonProps}><path d="m6 6 12 12" /><path d="M18 6 6 18" /></svg>;
    case "download":
      return <svg {...commonProps}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></svg>;
    case "email":
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "facebook":
      return <svg {...commonProps}><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" fill="currentColor" stroke="none" /></svg>;
    case "fileText":
      return <svg {...commonProps}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>;
    case "graduationCap":
      return <svg {...commonProps}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>;
    case "hand":
      return <svg {...commonProps}><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>;
    case "heart":
      return <svg {...commonProps}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
    case "instagram":
      return <svg {...commonProps}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
    case "landmark":
      return <svg {...commonProps}><path d="m12 3 8 4H4Z" /><path d="M4 7h16" /><path d="M6 21v-9" /><path d="M10 21v-9" /><path d="M14 21v-9" /><path d="M18 21v-9" /><path d="M3 21h18" /></svg>;
    case "linkedin":
      return <svg {...commonProps}><path d="M6 9v9" /><path d="M6 6v.1" /><path d="M10 18v-5a3 3 0 0 1 6 0v5" /><path d="M10 9v9" /></svg>;
    case "location":
      return <svg {...commonProps}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "megaphone":
      return <svg {...commonProps}><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>;
    case "menu":
      return <svg {...commonProps}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>;
    case "phone":
      return <svg {...commonProps}><path d="M6 3h3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L16 13l5 2v3c0 1.1-.9 2-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" /></svg>;
    case "play":
      return <svg {...commonProps}><path d="M8 5.14v13.72L19 12 8 5.14Z" fill="currentColor" stroke="none" /></svg>;
    case "refreshCw":
      return <svg {...commonProps}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>;
    case "scale":
      return <svg {...commonProps}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></svg>;
    case "search":
      return <svg {...commonProps}><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></svg>;
    case "shieldCheck":
      return <svg {...commonProps}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "userRoundCheck":
      return <svg {...commonProps}><path d="M2 21a8 8 0 0 1 13.292-6" /><circle cx="10" cy="8" r="5" /><path d="m16 19 2 2 4-4" /></svg>;
    case "users":
      return <svg {...commonProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "usersRound":
      return <svg {...commonProps}><path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /></svg>;
    case "venus":
      return <svg {...commonProps}><circle cx="12" cy="9" r="5" /><path d="M12 14v7" /><path d="M9 18.5h6" /></svg>;
    case "youtube":
      return <svg {...commonProps}><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></svg>;
    case "x":
      return <svg {...commonProps}><path d="M5 4 19 20" /><path d="M19 4 5 20" /></svg>;
  }
}
