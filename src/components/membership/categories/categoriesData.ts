import { Users, FileText, Landmark, type LucideIcon } from "lucide-react";

export type CategoryIconName =
  | "Users"
  | "Briefcase"
  | "Crown"
  | "Award"
  | "Shield"
  | "Star"
  | "Landmark"
  | "User"
  | "Building2";

export interface MembershipCategoryItem {
  srNo: number;
  post: string;
  qualification: string;
  fees: string;
  validity: string;
  duration?: string;
  kit: string[];
  letterPad?: string;
  iconName?: CategoryIconName;
  theme?: "blue" | "green";
}

export interface MembershipCategorySection {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  headerTheme: "blue" | "green";
  kitHeaderLabel: string;
  hasLetterPadColumn?: boolean;
  letterPadHeaderLabel?: string;
  quote: string;
  headerArt: string;
  items: MembershipCategoryItem[];
}

export const membershipCategorySections: MembershipCategorySection[] = [
  {
    id: "general-membership",
    title: "General Membership",
    subtitle: "Be a general member and contribute at the district and state level.",
    icon: Users,
    iconBg: "#062a4f",
    headerTheme: "blue",
    kitHeaderLabel: "Membership Kit",
    hasLetterPadColumn: false,
    letterPadHeaderLabel: "Letter Pad Authority",
    quote: "Be the voice that drives change.",
    headerArt: "/membership/card1_art.png",
    items: [
      {
        srNo: 1,
        post: "District Active Member",
        qualification: "Minimum 8th Class",
        fees: "₹ 800",
        validity: "1 Year",
        duration: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card & Sticker"],
        letterPad: "-",
        iconName: "Users",
        theme: "blue",
      },
      {
        srNo: 2,
        post: "Zonal Active Member",
        qualification: "Minimum 8th Class",
        fees: "₹ 900",
        validity: "1 Year",
        duration: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card & Sticker"],
        letterPad: "-",
        iconName: "Users",
        theme: "blue",
      },
      {
        srNo: 3,
        post: "District Unit Post",
        qualification: "Minimum 10th Class",
        fees: "₹ 1,300",
        validity: "1 Year",
        duration: "1 Year",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, ID Cover, Lanyard, Sticker & T' Shirt",
        ],
        letterPad: "-",
        iconName: "Briefcase",
        theme: "blue",
      },
      {
        srNo: 4,
        post: "Zonal Unit Post",
        qualification: "Minimum 10th Class",
        fees: "₹ 2,300",
        validity: "2 Years",
        duration: "2 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, ID Cover, Lanyard, Sticker & T' Shirt",
        ],
        letterPad: "-",
        iconName: "Briefcase",
        theme: "green",
      },
    ],
  },
  {
    id: "letter-pad-post",
    title: "Letter Pad Posts",
    subtitle: "Positions with Letter Pad Authority to represent HRSJM at state level.",
    icon: FileText,
    iconBg: "#062a4f",
    headerTheme: "blue",
    kitHeaderLabel: "Membership Kit",
    hasLetterPadColumn: true,
    letterPadHeaderLabel: "Letter Pad Authority",
    quote: "Represent. Support. Create impact.",
    headerArt: "/membership/card2_art.png",
    items: [
      {
        srNo: 5,
        post: "Lion of State",
        qualification: "Minimum 12th Pass",
        fees: "₹ 5,000",
        validity: "5 Years",
        duration: "5 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card & Sticker",
          "T' Shirt & Letter Pad",
        ],
        letterPad: "Letter Pad",
        iconName: "Crown",
        theme: "blue",
      },
      {
        srNo: 6,
        post: "Counsellor of State",
        qualification: "Minimum 12th Pass",
        fees: "₹ 5,000",
        validity: "5 Years",
        duration: "5 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card & Sticker",
          "T' Shirt & Letter Pad",
        ],
        letterPad: "Letter Pad",
        iconName: "Award",
        theme: "green",
      },
      {
        srNo: 7,
        post: "Ambassador of State",
        qualification: "Minimum 12th Pass",
        fees: "₹ 5,000",
        validity: "5 Years",
        duration: "2 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card & Sticker",
          "T' Shirt & Letter Pad",
        ],
        letterPad: "Letter Pad",
        iconName: "Shield",
        theme: "blue",
      },
      {
        srNo: 8,
        post: "Hon'ble State Director",
        qualification: "Minimum Graduate / Degree",
        fees: "₹ 10,000",
        validity: "10 Years",
        duration: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
        iconName: "Star",
        theme: "blue",
      },
    ],
  },
  {
    id: "national-level-post",
    title: "National Level Post",
    subtitle: "National level positions to work for specific councils and initiatives.",
    icon: Landmark,
    iconBg: "#062a4f",
    headerTheme: "blue",
    kitHeaderLabel: "Membership Kit",
    hasLetterPadColumn: true,
    letterPadHeaderLabel: "Letter Pad Authority",
    quote: "Work for a greater tomorrow.",
    headerArt: "/membership/card3_art.png",
    items: [
      {
        srNo: 9,
        post: "National Legal Council Call",
        qualification: "Advocate / Retd. Judge",
        fees: "₹ 10,000",
        validity: "10 Years",
        duration: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
        iconName: "Landmark",
        theme: "blue",
      },
      {
        srNo: 10,
        post: "National Minority Council Call",
        qualification:
          "Graduate / Degree (Muslim, Christian, Buddhist, Parsi, Jain & Sikh)",
        fees: "₹ 10,000",
        validity: "10 Years",
        duration: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
        iconName: "Users",
        theme: "green",
      },
      {
        srNo: 11,
        post: "National Women Council Call",
        qualification: "Graduate / Degree (Only for Women)",
        fees: "₹ 10,000",
        validity: "10 Years",
        duration: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
        iconName: "User",
        theme: "blue",
      },
      {
        srNo: 12,
        post: "National Political Council Call",
        qualification: "Graduate / Degree (For Politicians)",
        fees: "₹ 10,000",
        validity: "10 Years",
        duration: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
        iconName: "Building2",
        theme: "blue",
      },
    ],
  },
];

export interface UnifiedMembershipPackage {
  category: MembershipCategorySection;
  item: MembershipCategoryItem;
}

export function getAllMembershipPackages(): UnifiedMembershipPackage[] {
  return membershipCategorySections.flatMap((category) =>
    category.items.map((item) => ({ category, item }))
  );
}

export function findMembershipPackage(
  postOrId?: string | null
): UnifiedMembershipPackage {
  const all = getAllMembershipPackages();
  if (!postOrId) return all[0];
  const query = postOrId.trim().toLowerCase();

  // Bidirectional aliases for backward compatibility with previous and alternative names
  const aliasMap: Record<string, string> = {
    "district active member": "district active member",
    "state active member": "zonal active member",
    "zonal active member": "zonal active member",
    "state unit post": "zonal unit post",
    "zonal unit post": "zonal unit post",
    "lion of state": "lion of zone",
    "lion of zone": "lion of zone",
    "counselor of state": "counsellor of zone",
    "councillor of state": "counsellor of zone",
    "counsellor of state": "counsellor of zone",
    "counsellor of zone": "counsellor of zone",
    "ambassador of state": "ambassador of zone",
    "ambassador of zone": "ambassador of zone",
    "hon'ble state director": "hon'ble zone director",
    "hon'ble zone director": "hon'ble zone director",
    "national legal council cell": "national legal council call",
    "national legal council call": "national legal council call",
    "national minority council cell": "national minority council call",
    "national minority council call": "national minority council call",
    "national woman council cell": "national women council call",
    "national women council call": "national women council call",
    "national political council cell": "national political council call",
    "national political council call": "national political council call",
    "active-membership": "general-membership",
  };

  const resolvedQuery = aliasMap[query] ? aliasMap[query].toLowerCase() : query;

  const found = all.find(
    (p) =>
      p.item.post.toLowerCase() === resolvedQuery ||
      p.item.post.toLowerCase().includes(resolvedQuery) ||
      resolvedQuery.includes(p.item.post.toLowerCase()) ||
      p.category.id.toLowerCase() === resolvedQuery ||
      p.item.post.toLowerCase() === query ||
      p.item.post.toLowerCase().includes(query) ||
      p.category.id.toLowerCase() === query
  );
  return found || all[0];
}

