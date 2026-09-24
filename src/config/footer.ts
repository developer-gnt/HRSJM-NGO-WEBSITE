export interface FooterLink {
  label: string;
  href: string;
  placeholder?: boolean;
}

export interface SocialLink extends FooterLink {
  icon: "facebook" | "x" | "instagram" | "youtube" | "linkedin";
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
  icon: "location" | "phone" | "email";
}

export const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About HRSJM", href: "/about" },
  { label: "Know Your Rights", href: "/rights" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Membership", href: "/membership" },
  { label: "Donation", href: "/donation" },
  { label: "Complaint / Get Help", href: "/complaint" },
  { label: "Events & Activities", href: "/events" },
  { label: "News / Blog", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const usefulLinks: FooterLink[] = [
  { label: "Join Us", href: "/membership" },
  { label: "Make a Donation", href: "/donation" },
  { label: "File a Complaint", href: "/complaint" },
  { label: "Renew Membership", href: "/membership/renew" },
  { label: "Our Constitution", href: "/constitution" },
  { label: "FAQs", href: "/faqs" },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "facebook", placeholder: true },
  { label: "X", href: "#", icon: "x", placeholder: true },
  { label: "Instagram", href: "#", icon: "instagram", placeholder: true },
  { label: "YouTube", href: "#", icon: "youtube", placeholder: true },
  { label: "LinkedIn", href: "#", icon: "linkedin", placeholder: true },
];

export const contactItems: ContactItem[] = [
  {
    label: "Address",
    value: "Contact details to be added",
    icon: "location",
  },
  {
    label: "Phone",
    value: "Contact details to be added",
    icon: "phone",
  },
  {
    label: "Email",
    value: "Contact details to be added",
    icon: "email",
  },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];
