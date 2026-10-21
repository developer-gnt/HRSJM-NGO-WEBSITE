import { Users, FileText, Landmark, type LucideIcon } from "lucide-react";

export interface MembershipCategoryItem {
  srNo: number;
  post: string;
  qualification: string;
  fees: string;
  validity: string;
  kit: string[];
}

export interface MembershipCategorySection {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  headerTheme: "blue" | "green";
  kitHeaderLabel: string;
  items: MembershipCategoryItem[];
}

export const membershipCategorySections: MembershipCategorySection[] = [
  {
    id: "active-membership",
    title: "Active Membership",
    subtitle: "Be an active member and contribute at the district and state level.",
    icon: Users,
    iconBg: "#0a3a6b",
    headerTheme: "blue",
    kitHeaderLabel: "Kit",
    items: [
      {
        srNo: 1,
        post: "District Active Member",
        qualification: "Minimum 8th Class",
        fees: "₹800",
        validity: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card & Sticker"],
      },
      {
        srNo: 2,
        post: "State Active Member",
        qualification: "Minimum 8th Class",
        fees: "₹900",
        validity: "1 Year",
        kit: ["Appointment Letter", "Certificate", "Identity Card & Sticker"],
      },
      {
        srNo: 3,
        post: "District Unit Post",
        qualification: "Minimum 10th Class",
        fees: "₹1,300",
        validity: "1 Year",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, ID Cover, Lanyard, Sticker & T-Shirt",
        ],
      },
      {
        srNo: 4,
        post: "State Unit Post",
        qualification: "Minimum 10th Class",
        fees: "₹2,300",
        validity: "2 Years",
        kit: [
          "Appointment Letter",
          "Certificate",
          "Identity Card, ID Cover, Lanyard, Sticker & T-Shirt",
        ],
      },
    ],
  },
  {
    id: "letter-pad-post",
    title: "Letter Pad Post",
    subtitle: "Positions with Letter Pad Authority to represent HRSJM at state level.",
    icon: FileText,
    iconBg: "#116347",
    headerTheme: "green",
    kitHeaderLabel: "Kit / Letter Pad",
    items: [
      {
        srNo: 5,
        post: "Lion of State",
        qualification: "Minimum 12th Pass",
        fees: "₹5,000",
        validity: "5 Years",
        kit: ["Letter Pad"],
      },
      {
        srNo: 6,
        post: "Counselor of State",
        qualification: "Minimum 12th Pass",
        fees: "₹5,000",
        validity: "5 Years",
        kit: ["Letter Pad"],
      },
      {
        srNo: 7,
        post: "Ambassador of State",
        qualification: "Minimum 12th Pass",
        fees: "₹5,000",
        validity: "5 Years",
        kit: ["Letter Pad"],
      },
      {
        srNo: 8,
        post: "Hon'ble State Director",
        qualification: "Minimum Graduate / Degree",
        fees: "₹10,000",
        validity: "10 Years",
        kit: ["Letter Pad"],
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
    kitHeaderLabel: "Kit / Letter Pad",
    items: [
      {
        srNo: 9,
        post: "National Legal Council Cell",
        qualification: "Advocates / Retd. Judges",
        fees: "₹10,000",
        validity: "10 Years",
        kit: ["Letter Pad"],
      },
      {
        srNo: 10,
        post: "National Minority Council Cell",
        qualification:
          "Graduate / Degree (Muslims, Christians, Buddhism, Parsi, Jain & Sikh)",
        fees: "₹10,000",
        validity: "10 Years",
        kit: ["Letter Pad"],
      },
      {
        srNo: 11,
        post: "National Women Council Cell",
        qualification: "Graduate / Degree (Only for Women)",
        fees: "₹10,000",
        validity: "10 Years",
        kit: ["Letter Pad"],
      },
      {
        srNo: 12,
        post: "National Political Council Cell",
        qualification: "Graduate / Degree (For Politicians)",
        fees: "₹10,000",
        validity: "10 Years",
        kit: ["Letter Pad"],
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
  const found = all.find(
    (p) =>
      p.item.post.toLowerCase() === query ||
      p.item.post.toLowerCase().includes(query) ||
      p.category.id.toLowerCase() === query
  );
  return found || all[0];
}

