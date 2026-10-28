const LOCAL_BACKEND_URL = "http://localhost:3000/api/v1";
const PROD_BACKEND_URL = "http://194.164.151.17:3000/api/v1";

export function getBackendApiUrl(): string {
  // 1. Check explicit URL from environment
  const envUrl =
    typeof window === "undefined"
      ? process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim();
  }

  // 2. Check if running on Vercel or production mode
  const isProd =
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.VERCEL) ||
    Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV) ||
    (process.env.NEXT_PUBLIC_APP_ENV || process.env.APP_ENV || "").toLowerCase() === "production";

  return isProd ? PROD_BACKEND_URL : LOCAL_BACKEND_URL;
}

/**
 * Primary HTTP client to communicate with HRSJM Backend API.
 * Automatically tries getBackendApiUrl(). If configured to localhost and connection is refused
 * or fails, seamlessly routes to the live VPS backend (PROD_BACKEND_URL) so user transactions
 * and payment sessions do not break.
 */
export async function backendFetch(
  endpointPath: string,
  init?: RequestInit
): Promise<Response> {
  const primaryBase = getBackendApiUrl();
  const cleanEndpoint = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;
  const primaryUrl = `${primaryBase}${cleanEndpoint}`;

  try {
    return await fetch(primaryUrl, init);
  } catch (err: any) {
    // If primary was localhost and connection failed (e.g. local backend offline), fallback to live VPS
    if (primaryBase.includes("localhost") || primaryBase.includes("127.0.0.1")) {
      const fallbackUrl = `${PROD_BACKEND_URL}${cleanEndpoint}`;
      console.warn(
        `[backendApi] Primary local endpoint (${primaryUrl}) unreachable (${err.message}). Retrying via live backend: ${fallbackUrl}`
      );
      try {
        return await fetch(fallbackUrl, init);
      } catch (fallbackErr: any) {
        throw new Error(
          `Unable to connect to backend server. Both local (${primaryUrl}) and live (${fallbackUrl}) endpoints failed: ${fallbackErr.message || err.message}`
        );
      }
    }
    throw err;
  }
}

export interface BackendCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  fee: number;
  validity_days: number;
  status: string;
}

export interface BackendMembershipResponse {
  id: string;
  membership_number?: string;
  status: string;
  category_id: string;
  user_id: string;
  application_data?: Record<string, any>;
  created_at: string;
}

export interface CashfreeOrderResponse {
  order_id: string;
  payment_session_id?: string;
  cf_order_id?: string;
  order_status?: string;
  amount: number;
  currency: string;
  purpose: string;
  reference_id?: string;
  payment_url?: string;
}

/**
 * Fetch all available membership categories from live backend
 */
export async function fetchBackendCategories(): Promise<BackendCategory[]> {
  try {
    const res = await backendFetch("/membership-categories", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    const data = await res.json();
    return data?.data?.items || data?.data || [];
  } catch (err) {
    console.warn("Error fetching categories from backend, using fallbacks:", err);
    return [
      {
        id: "e33a2dd6-996d-4991-b2bc-88ecebd19aba",
        name: "District Unit",
        code: "DISTRICT_UNIT",
        description: "Qualification: 10th Pass · 1 Year Free Renewal",
        fee: 3000,
        validity_days: 365,
        status: "ACTIVE",
      },
      {
        id: "4febe0bf-c03a-4217-b11b-a7fef8b6f11c",
        name: "State Unit",
        code: "STATE_UNIT",
        description: "Qualification: 10th Pass · 2 Years Free Renewal",
        fee: 3000,
        validity_days: 365,
        status: "ACTIVE",
      },
      {
        id: "1781c1b4-60d1-4034-899a-d749f7f93e81",
        name: "Lion, Counselor or Ambassador of State",
        code: "LION_COUNSELOR_AMBASSADOR",
        description: "Qualification: 12th Pass · 3 Years Free Renewal",
        fee: 3000,
        validity_days: 365,
        status: "ACTIVE",
      },
      {
        id: "812214df-9f5c-42d7-803f-64705ce53379",
        name: "Hon'ble State Director",
        code: "STATE_DIRECTOR",
        description: "Qualification: Graduate · 4 Years Free Renewal",
        fee: 3000,
        validity_days: 365,
        status: "ACTIVE",
      },
      {
        id: "01dd8a2c-f4fa-47f8-bd85-31c700640717",
        name: "National Council Cell",
        code: "NATIONAL_COUNCIL_CELL",
        description: "Lawyers, Women or Minority · Qualification: Graduate · 5 Yrs Free Renewal",
        fee: 3000,
        validity_days: 365,
        status: "ACTIVE",
      },
    ];
  }
}

/**
 * Match a selected frontend package name or code to a live backend category UUID
 */
export async function resolveBackendCategoryId(packageName: string): Promise<string> {
  const categories = await fetchBackendCategories();
  const lower = packageName.toLowerCase();

  if (lower.includes("national") || lower.includes("cell") || lower.includes("legal council")) {
    const matched = categories.find((c) => c.code === "NATIONAL_COUNCIL_CELL");
    if (matched) return matched.id;
  }
  if (lower.includes("director")) {
    const matched = categories.find((c) => c.code === "STATE_DIRECTOR");
    if (matched) return matched.id;
  }
  if (
    lower.includes("lion") ||
    lower.includes("councillor") ||
    lower.includes("counselor") ||
    lower.includes("ambassador") ||
    lower.includes("letter pad")
  ) {
    const matched = categories.find((c) => c.code === "LION_COUNSELOR_AMBASSADOR");
    if (matched) return matched.id;
  }
  if (lower.includes("state") || lower.includes("zonal") || lower.includes("zone")) {
    const matched = categories.find((c) => c.code === "STATE_UNIT");
    if (matched) return matched.id;
  }
  if (lower.includes("district")) {
    const matched = categories.find((c) => c.code === "DISTRICT_UNIT");
    if (matched) return matched.id;
  }

  // Fallback to first active category
  return categories[0]?.id || "e33a2dd6-996d-4991-b2bc-88ecebd19aba";
}

/**
 * Submit Membership Application to live backend
 */
export async function createBackendMembership(payload: {
  categoryId: string;
  fullName: string;
  mobile: string;
  email: string;
  password?: string;
  policeStation: string;
  personalDetails: Record<string, any>;
  applicationData: Record<string, any>;
}): Promise<BackendMembershipResponse> {
  const url = `${getBackendApiUrl()}/memberships`;
  const body: Record<string, any> = {
    category_id: payload.categoryId,
    full_name: payload.fullName.trim(),
    mobile_number: payload.mobile.trim(),
    email: payload.email.trim().toLowerCase(),
    police_station: payload.policeStation.trim(),
    personal_details: payload.personalDetails,
    application_data: payload.applicationData,
  };

  if (payload.password && payload.password.trim().length >= 6) {
    body.password = payload.password.trim();
  }

  const res = await backendFetch("/memberships", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    if (res.status === 413 || text.includes("Request Entity Too Large") || text.includes("Payload Too Large")) {
      throw new Error("The application payload or uploaded documents are too large for the server (413). Please compress images before uploading.");
    }
    throw new Error(`Backend server returned invalid response (${res.status}): ${text.slice(0, 150)}`);
  }

  if (!res.ok || json.success === false) {
    const errMsg = json.message || json.error || (Array.isArray(json.message) ? json.message.join(", ") : "Backend membership creation failed");
    throw new Error(errMsg);
  }

  return json.data || json;
}

/**
 * Create a Cashfree Payment Order
 */
export async function createCashfreeOrder(payload: {
  purpose: "membership" | "donation";
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderNote?: string;
  returnUrl?: string;
  referenceId?: string;
}): Promise<CashfreeOrderResponse> {
  const body = {
    purpose: payload.purpose,
    amount: payload.amount,
    customer_name: payload.customerName,
    customer_phone: payload.customerPhone,
    customer_email: payload.customerEmail,
    order_note: payload.orderNote,
    return_url: payload.returnUrl,
    reference_id: payload.referenceId,
  };

  const res = await backendFetch("/payments/cashfree/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Payment order creation returned invalid response (${res.status}): ${text.slice(0, 150)}`);
  }

  if (!res.ok || json.success === false) {
    const errMsg = json.message || json.error || "Failed to create Cashfree order";
    throw new Error(errMsg);
  }

  return json.data || json;
}

/**
 * Verify a Cashfree Payment Order attempt with backend
 */
export async function verifyCashfreeOrder(orderId: string): Promise<any> {
  const isBrowser = typeof window !== "undefined";
  const res = isBrowser
    ? await fetch(`/api/payments/verify?order_id=${encodeURIComponent(orderId)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      })
    : await backendFetch(`/payments/cashfree/orders/${encodeURIComponent(orderId)}/verify`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Payment verification returned invalid response (${res.status}): ${text.slice(0, 150)}`);
  }

  if (!res.ok || json.success === false) {
    const errMsg = json.error || json.message || "Failed to verify Cashfree payment";
    throw new Error(errMsg);
  }

  return json.data || json;
}

/**
 * Submit Donation intent / record to live backend
 */
export async function createBackendDonation(payload: {
  donorName: string;
  donorMobile?: string;
  donorEmail?: string;
  amount: number;
  cause?: string;
  isAnonymous?: boolean;
  remark?: string;
}): Promise<any> {
  const body = {
    donor_name: payload.donorName.trim(),
    donor_mobile: payload.donorMobile?.trim() || undefined,
    donor_email: payload.donorEmail?.trim().toLowerCase() || undefined,
    amount: payload.amount,
    cause: payload.cause || "General Support",
    is_anonymous: Boolean(payload.isAnonymous),
    remark: payload.remark?.trim() || undefined,
  };

  const res = await backendFetch("/donations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok || json.success === false) {
    const errMsg = json.message || json.error || "Failed to record donation";
    throw new Error(errMsg);
  }

  return json.data || json;
}

/**
 * Submit Citizen Complaint / Support Ticket to live backend
 */
export async function createBackendComplaint(payload: {
  fullName: string;
  phone: string;
  email?: string;
  complaintType: string;
  state: string;
  policeStation: string;
  details: string;
  aadhaarFileName?: string;
  aadhaarFileUri?: string;
  handwrittenFileName?: string;
  handwrittenFileUri?: string;
  reportedToOtherDept?: boolean;
  otherDeptName?: string;
  otherDeptFileName?: string;
  otherDeptFileUri?: string;
}): Promise<any> {
  const body: Record<string, any> = {
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    state: payload.state.trim(),
    policeStation: payload.policeStation.trim(),
    complaintType: payload.complaintType.trim(),
    details: payload.details.trim(),
  };
  if (payload.email && payload.email.trim()) {
    body.email = payload.email.trim().toLowerCase();
  }
  if (payload.aadhaarFileName) body.aadhaarFileName = payload.aadhaarFileName;
  if (payload.aadhaarFileUri) body.aadhaarFileUri = payload.aadhaarFileUri;
  if (payload.handwrittenFileName) body.handwrittenFileName = payload.handwrittenFileName;
  if (payload.handwrittenFileUri) body.handwrittenFileUri = payload.handwrittenFileUri;
  if (payload.reportedToOtherDept !== undefined) body.reportedToOtherDept = payload.reportedToOtherDept;
  if (payload.otherDeptName) body.otherDeptName = payload.otherDeptName;
  if (payload.otherDeptFileName) body.otherDeptFileName = payload.otherDeptFileName;
  if (payload.otherDeptFileUri) body.otherDeptFileUri = payload.otherDeptFileUri;

  try {
    const res = await backendFetch("/support-tickets/public", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (res.ok && json.success !== false) {
      return json.data || json;
    }
    if (res.status !== 404) {
      let errMsg = "Failed to submit complaint";
      if (Array.isArray(json.message)) {
        errMsg = json.message.join(", ");
      } else if (json.error?.details && Array.isArray(json.error.details)) {
        errMsg = json.error.details.join(", ");
      } else if (json.message) {
        errMsg = json.message;
      } else if (json.error) {
        errMsg = typeof json.error === "string" ? json.error : JSON.stringify(json.error);
      }
      throw new Error(errMsg);
    }
  } catch (err: any) {
    if (err.message && !err.message.includes("404")) {
      throw err;
    }
  }

  // Fallback to assistance-requests if running on older backend
  const fallbackBody = {
    full_name: payload.fullName.trim(),
    mobile: payload.phone.trim(),
    email: payload.email?.trim().toLowerCase() || undefined,
    requested_amount: 1,
    reason: `[Complaint: ${payload.complaintType}] ${payload.details.slice(0, 100)}`,
    description: `Citizen Complaint / Grievance Details:\n- Source: Website\n- Category: ${payload.complaintType}\n- State: ${payload.state}\n- Nearby Police Station: ${payload.policeStation}\n- Description:\n${payload.details}`,
  };

  const fallbackRes = await backendFetch("/assistance-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fallbackBody),
  });

  const fallbackJson = await fallbackRes.json();
  if (!fallbackRes.ok || fallbackJson.success === false) {
    throw new Error(fallbackJson.message || fallbackJson.error || "Failed to submit complaint");
  }

  const data = fallbackJson.data || fallbackJson;
  return {
    ...data,
    ticketId: `HRSJM-CMP-${(data.id || Date.now().toString(36)).slice(0, 8).toUpperCase()}`,
  };
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  field?: "email" | "phone" | "both";
  message?: string;
  existingStatus?: string;
  membershipNumber?: string;
}

/**
 * Check if a mobile number or email already exists in membership / users database
 */
export async function checkDuplicateMembership(
  email?: string,
  phone?: string
): Promise<DuplicateCheckResult> {
  const params = new URLSearchParams();
  if (email) params.append("email", email.trim());
  if (phone) params.append("phone", phone.trim());

  try {
    const res = await backendFetch(`/memberships/check-duplicate?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return { isDuplicate: false };
    }

    const json = await res.json();
    return json?.data || json;
  } catch (err) {
    console.warn("Duplicate check API warning:", err);
    return { isDuplicate: false };
  }
}

