import fs from "fs";
import path from "path";

export interface MembershipRecord {
  applicationRef: string;
  submittedAt: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  priorConviction: "No" | "Yes";
  priorConvictionDetails?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  idProofName: string;
  addressProofName: string;
  photoName: string;
  packageName: string;
  packageFee: string;
  packageValidity?: string;
  termsAgreed: boolean;
  pledgeAgreed: boolean;
  declarationAgreed: boolean;
  paymentMode?: string;
  paymentReference?: string;
  status: "pending_review" | "approved" | "rejected";
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const RECORDS_FILE = path.join(DATA_DIR, "membership-records.json");

function ensureStorage(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(RECORDS_FILE)) {
      fs.writeFileSync(RECORDS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to initialize membership records storage:", err);
  }
}

export async function getMembershipRecords(): Promise<MembershipRecord[]> {
  ensureStorage();
  try {
    const raw = fs.readFileSync(RECORDS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading membership records:", err);
    return [];
  }
}

export async function saveMembershipRecord(
  record: MembershipRecord
): Promise<{ success: boolean; record: MembershipRecord; error?: string }> {
  ensureStorage();
  try {
    const records = await getMembershipRecords();
    records.unshift(record);
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2), "utf-8");
    return { success: true, record };
  } catch (err: any) {
    console.error("Error saving membership record:", err);
    return {
      success: false,
      record,
      error: err?.message || "Failed to persist membership record.",
    };
  }
}

export async function findMembershipRecord(
  identifier: string
): Promise<MembershipRecord | null> {
  const records = await getMembershipRecords();
  const query = identifier.trim().toLowerCase();
  return (
    records.find(
      (r) =>
        r.applicationRef.toLowerCase() === query ||
        r.phone.toLowerCase() === query ||
        r.email.toLowerCase() === query
    ) || null
  );
}
