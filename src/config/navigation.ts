export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  external?: boolean;
}

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About HRSJM", href: "/about" },
  { label: "Know Your Rights", href: "/rights" },
  { label: "What HRSJM Does", href: "/what-hrsjm-does" },
];

export const secondaryNavigation: NavigationItem[] = [
  { label: "Membership", href: "/membership" },
  { label: "Donation", href: "/donation" },
  { label: "Complaint / Get Help", href: "/complaint" },
  { label: "Events & Activities", href: "/events" },
  { label: "News / Blog", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const mainNavigation: NavigationItem[] = [...primaryNavigation, ...secondaryNavigation];