import { Users, FileText, Landmark, type LucideIcon } from "lucide-react";

export interface MembershipCategoryItem {
  srNo: number;
  post: string;
  qualification: string;
  fees: string;
  validity: string;
  kit: string[];
  letterPad?: string;
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
    kitHeaderLabel: "Kit",
    hasLetterPadColumn: true,
    letterPadHeaderLabel: "Letter Pad Authority",
    quote: "Be the voice that drives change.",
    headerArt: "/membership/card1_art.png",
    items: [
      {
        srNo: 1,
        post: "District Active Member",
        qualification: "Minimum 8th Class",
        fees: "₹800",
        validity: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card & Sticker"],
        letterPad: "-",
      },
      {
        srNo: 2,
        post: "State Active Member",
        qualification: "Minimum 8th Class",
        fees: "₹800",
        validity: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card & Sticker"],
        letterPad: "-",
      },
      {
        srNo: 3,
        post: "District Unit Post",
        qualification: "Minimum 10th Class",
        fees: "₹1,300",
        validity: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card, ID Cover, Lanyard, Sticker & T' Shirt"],
        letterPad: "-",
      },
      {
        srNo: 4,
        post: "State Unit Post",
        qualification: "Minimum 10th Class",
        fees: "₹2,300",
        validity: "2 Years",
        kit: ["Appointment Letter", "Certificate", "Identity Card, ID Cover, Lanyard, Sticker & T' Shirt"],
        letterPad: "-",
      },
    ],
  },
  {
    id: "letter-pad-post",
    title: "Letter Pad Post",
    subtitle: "Positions with Letter Pad Authority to represent HRSJM at state level.",
    icon: FileText,
    iconBg: "#062a4f",
    headerTheme: "blue",
    kitHeaderLabel: "Kit",
    hasLetterPadColumn: true,
    letterPadHeaderLabel: "Letter Pad Authority",
    quote: "Represent. Support. Create impact.",
    headerArt: "/membership/card2_art.png",
    items: [
      {
        srNo: 5,
        post: "Lion of State",
        qualification: "Minimum 12th Pass",
        fees: "₹5,000",
        validity: "5 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 2 ID Cover, 2 Lanyard, 2 Sticker & 2 T' Shirt",
        ],
        letterPad: "Letter Pad",
      },
      {
        srNo: 6,
        post: "Counsellor of State",
        qualification: "Minimum 12th Pass",
        fees: "₹5,000",
        validity: "5 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 2 ID Cover, 2 Lanyard, 2 Sticker & 2 T' Shirt",
        ],
        letterPad: "Letter Pad",
      },
      {
        srNo: 7,
        post: "Ambassador of State",
        qualification: "Minimum 12th Pass",
        fees: "₹5,000",
        validity: "5 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 2 ID Cover, 2 Lanyard, 2 Sticker & 2 T' Shirt",
        ],
        letterPad: "Letter Pad",
      },
      {
        srNo: 8,
        post: "Hon'ble State Director",
        qualification: "Minimum Graduate / Degree",
        fees: "₹10,000",
        validity: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
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
    kitHeaderLabel: "Kit",
    hasLetterPadColumn: true,
    letterPadHeaderLabel: "Letter Pad Authority",
    quote: "Work for a greater tomorrow.",
    headerArt: "/membership/card3_art.png",
    items: [
      {
        srNo: 9,
        post: "National Legal Council Cell",
        qualification: "Advocate / Retd. Judge",
        fees: "₹10,000",
        validity: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
      },
      {
        srNo: 10,
        post: "National Minority Council Cell",
        qualification:
          "Graduate / Degree (Muslim, Christian, Buddhist, Parsi, Jain & Sikh)",
        fees: "₹10,000",
        validity: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
      },
      {
        srNo: 11,
        post: "National Woman Council Cell",
        qualification: "Graduate / Degree (Only for Women)",
        fees: "₹10,000",
        validity: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
      },
      {
        srNo: 12,
        post: "National Political Council Cell",
        qualification: "Graduate / Degree (For Politicians)",
        fees: "₹10,000",
        validity: "10 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, 3 ID Cover, 3 Lanyard, 3 Sticker & 3 T' Shirt",
        ],
        letterPad: "Letter Pad",
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

  // Aliases for backward compatibility with previous names
  const aliasMap: Record<string, string> = {
    "district active member": "District General Member",
    "state active member": "Zonal General Member",
    "state unit post": "Zonal Unit Post",
    "lion of state": "Lion of Zone",
    "counselor of state": "Councillor of Zone",
    "councillor of state": "Councillor of Zone",
    "ambassador of state": "Ambassador of Zone",
    "hon'ble state director": "Hon'ble Zone Director",
    "national legal council cell": "National Legal Council Call",
    "national minority council cell": "National Minority Council Call",
    "national woman council cell": "National Woman Council Call",
    "national political council cell": "National Political Council Call",
    "active-membership": "general-membership",
  };

  const resolvedQuery = aliasMap[query] ? aliasMap[query].toLowerCase() : query;

  const found = all.find(
    (p) =>
      p.item.post.toLowerCase() === resolvedQuery ||
      p.item.post.toLowerCase().includes(resolvedQuery) ||
      p.category.id.toLowerCase() === resolvedQuery ||
      p.item.post.toLowerCase() === query ||
      p.item.post.toLowerCase().includes(query) ||
      p.category.id.toLowerCase() === query
  );
  return found || all[0];
}

