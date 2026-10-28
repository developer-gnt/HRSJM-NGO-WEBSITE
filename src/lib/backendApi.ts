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

export function extractErrorMessage(data: any, fallback = "An unexpected error occurred"): string {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (typeof data.message === "string" && data.message.trim().length > 0) {
    return data.message;
  }
  if (Array.isArray(data.message) && data.message.length > 0) {
    return data.message.join(", ");
  }
  if (typeof data.error === "string" && data.error.trim().length > 0) {
    return data.error;
  }
  if (data.error && typeof data.error === "object") {
    if (typeof data.error.message === "string" && data.error.message.trim().length > 0) {
      return data.error.message;
    }
    if (Array.isArray(data.error.details) && data.error.details.length > 0) {
      return data.error.details.join(", ");
    }
    if (typeof data.error.details === "string" && data.error.details.trim().length > 0) {
      return data.error.details;
    }
    if (typeof data.error.code === "string") {
      return `Server error (${data.error.code})`;
    }
  }
  if (typeof data.latest_message === "string" && data.latest_message.trim().length > 0) {
    return data.latest_message;
  }
  return fallback;
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
  const clean = packageName.trim().toLowerCase();
  const normalizedCode = clean.replace(/[^a-z0-9]+/g, "_").toUpperCase();

  // 1. Exact match by name or code
  const exactName = categories.find((c) => c.name.trim().toLowerCase() === clean);
  if (exactName) return exactName.id;

  const exactCode = categories.find((c) => c.code.toUpperCase() === normalizedCode);
  if (exactCode) return exactCode.id;

  // 2. Specific post checks
  if (clean.includes("district") && (clean.includes("active") || clean.includes("member"))) {
    const matched = categories.find((c) => c.code === "DISTRICT_ACTIVE_MEMBER");
    if (matched) return matched.id;
  }
  if (clean.includes("state") && (clean.includes("active") || clean.includes("member"))) {
    const matched = categories.find((c) => c.code === "STATE_ACTIVE_MEMBER");
    if (matched) return matched.id;
  }
  if (clean.includes("district") && clean.includes("post")) {
    const matched = categories.find((c) => c.code === "DISTRICT_UNIT_POST");
    if (matched) return matched.id;
  }
  if (clean.includes("state") && clean.includes("post")) {
    const matched = categories.find((c) => c.code === "STATE_UNIT_POST");
    if (matched) return matched.id;
  }
  if (clean.includes("director")) {
    const matched = categories.find((c) => c.code === "STATE_DIRECTOR");
    if (matched) return matched.id;
  }
  if (clean.includes("lion")) {
    const matched = categories.find((c) => c.code === "LION_OF_STATE" || c.code === "LION_COUNSELOR_AMBASSADOR");
    if (matched) return matched.id;
  }
  if (clean.includes("counsel") || clean.includes("councillor")) {
    const matched = categories.find((c) => c.code === "COUNSELLOR_OF_STATE" || c.code === "LION_COUNSELOR_AMBASSADOR");
    if (matched) return matched.id;
  }
  if (clean.includes("ambassador")) {
    const matched = categories.find((c) => c.code === "AMBASSADOR_OF_STATE" || c.code === "LION_COUNSELOR_AMBASSADOR");
    if (matched) return matched.id;
  }
  if (clean.includes("national") || clean.includes("cell") || clean.includes("legal")) {
    const matched = categories.find((c) => c.code === "NATIONAL_COUNCIL_CELL" || c.code.includes("NATIONAL"));
    if (matched) return matched.id;
  }
  if (clean.includes("state")) {
    const matched = categories.find((c) => c.code === "STATE_UNIT" || c.code === "STATE_UNIT_POST");
    if (matched) return matched.id;
  }
  if (clean.includes("district")) {
    const matched = categories.find((c) => c.code === "DISTRICT_UNIT" || c.code === "DISTRICT_UNIT_POST");
    if (matched) return matched.id;
  }

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
    const errMsg = extractErrorMessage(json, "Backend membership creation failed");
    throw new Error(errMsg);
  }

  return json.data || json;
}

/**
 * Direct Cashfree PG Order Creation - creates order directly on Cashfree authoritative Gateway
 */
export async function createDirectCashfreeOrder(payload: {
  purpose: "membership" | "donation";
  amount: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  orderNote?: string;
  returnUrl?: string;
  referenceId?: string;
}): Promise<CashfreeOrderResponse> {
  const appId = process.env.CASHFREE_APP_ID || "193832513e297cea762ab341be238391";
  const secretKey = process.env.CASHFREE_SECRET_KEY || "41be1cddd6263a8190c19bef1651a0f0febeb200";
  const apiVersion = process.env.CASHFREE_API_VERSION || "2023-08-01";
  const isProd =
    (process.env.CASHFREE_ENV || process.env.NEXT_PUBLIC_CASHFREE_MODE || "").toLowerCase() ===
    "production";
  const baseUrl = isProd ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

  const orderPrefix = payload.purpose === "donation" ? "hrsjm_don" : "hrsjm_mbr";
  const cleanRef = (payload.referenceId || Date.now().toString(36)).replace(/[^a-zA-Z0-9]/g, "").slice(0, 14);
  const orderId = `${orderPrefix}_${cleanRef}_${Date.now().toString(36)}`;

  const rawPhone = (payload.customerPhone || "").replace(/\D/g, "").slice(-10);
  const customerPhone = rawPhone.length === 10 ? rawPhone : "9876543210";
  const customerId = `cust_${customerPhone}_${Date.now().toString(36).slice(-4)}`;
  const customerName = (payload.customerName || "HRSJM Supporter").replace(/[^a-zA-Z0-9 ]/g, " ").slice(0, 50).trim() || "HRSJM Supporter";
  const customerEmail = payload.customerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.customerEmail)
    ? payload.customerEmail
    : "donor@hrsjm.org";

  const headers = {
    "x-client-id": appId,
    "x-client-secret": secretKey,
    "x-api-version": apiVersion,
    "Content-Type": "application/json",
  };

  const body = {
    order_id: orderId,
    order_amount: payload.amount,
    order_currency: "INR",
    customer_details: {
      customer_id: customerId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
    },
    order_meta: {
      return_url: payload.returnUrl || `http://localhost:3001/payments/callback?order_id={order_id}`,
    },
    order_note: payload.orderNote || `${payload.purpose === "donation" ? "Donation" : "Membership"} Payment`,
  };

  const res = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Direct Cashfree order creation returned invalid response (${res.status}): ${text.slice(0, 150)}`);
  }

  if (!res.ok || !json.payment_session_id) {
    const errMsg = extractErrorMessage(json, `Failed to create Cashfree session (${res.status})`);
    throw new Error(errMsg);
  }

  return {
    order_id: json.order_id,
    payment_session_id: json.payment_session_id,
    cf_order_id: json.cf_order_id,
    order_status: json.order_status,
    amount: json.order_amount,
    currency: json.order_currency || "INR",
    purpose: payload.purpose,
    reference_id: payload.referenceId,
  };
}

/**
 * Create a Cashfree Payment Order (Backend endpoint with instant Direct Gateway fallback)
 */
export async function createCashfreeOrder(payload: {
  purpose: "membership" | "donation";
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderNote?: string;
  returnUrl?: string;
  referenceId?: string;
}): Promise<CashfreeOrderResponse> {
  try {
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

    if (res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (json.success !== false && (json.data?.payment_session_id || json.payment_session_id)) {
          return json.data || json;
        }
      } catch {
        // Fall back to direct
      }
    }
  } catch (err: any) {
    console.warn("Backend Cashfree order creation failed, using direct Cashfree Gateway:", err.message);
  }

  return createDirectCashfreeOrder(payload);
}

/**
 * Direct Cashfree PG Verification - queries Cashfree Gateway authoritative API directly
 */
export async function verifyDirectlyWithCashfree(orderId: string): Promise<any> {
  const appId = process.env.CASHFREE_APP_ID || "193832513e297cea762ab341be238391";
  const secretKey = process.env.CASHFREE_SECRET_KEY || "41be1cddd6263a8190c19bef1651a0f0febeb200";
  const apiVersion = process.env.CASHFREE_API_VERSION || "2023-08-01";
  const isProd =
    (process.env.CASHFREE_ENV || process.env.NEXT_PUBLIC_CASHFREE_MODE || "").toLowerCase() ===
    "production";
  const baseUrl = isProd ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

  const headers = {
    "x-client-id": appId,
    "x-client-secret": secretKey,
    "x-api-version": apiVersion,
    "Content-Type": "application/json",
  };

  const cleanOid = encodeURIComponent(orderId);

  // 1. Fetch order details from Cashfree PG
  const orderRes = await fetch(`${baseUrl}/orders/${cleanOid}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!orderRes.ok) {
    const errText = await orderRes.text();
    throw new Error(`Cashfree order lookup failed (${orderRes.status}): ${errText.slice(0, 150)}`);
  }

  const orderData = await orderRes.json();

  // 2. Fetch payment attempts from Cashfree PG
  let attempts: any[] = [];
  try {
    const attemptsRes = await fetch(`${baseUrl}/orders/${cleanOid}/payments`, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    if (attemptsRes.ok) {
      attempts = await attemptsRes.json();
    }
  } catch {
    // ignore attempts error if orderData is available
  }

  const successfulAttempt =
    Array.isArray(attempts) &&
    attempts.find((att: any) => att.payment_status === "SUCCESS");

  const isConfirmed = Boolean(successfulAttempt) || orderData.order_status === "PAID";

  if (isConfirmed) {
    return {
      status: "SUCCESS",
      order_id: orderId,
      message: "Payment confirmed successfully with Cashfree gateway",
      latest_status: "SUCCESS",
      payment: {
        gateway_payment_id: String(
          successfulAttempt?.cf_payment_id || orderData.cf_order_id || Date.now()
        ),
        amount: Number(successfulAttempt?.payment_amount || orderData.order_amount || 0),
        payment_status: "SUCCESS",
      },
    };
  }

  const latestStatus =
    (successfulAttempt as any)?.payment_status || orderData.order_status || "PENDING";
  const reason =
    (successfulAttempt as any)?.payment_message ||
    (orderData.order_status === "EXPIRED"
      ? "Payment session expired"
      : orderData.order_status === "TERMINATED"
      ? "Payment session terminated"
      : `Payment status on gateway: ${latestStatus}`);

  return {
    status: latestStatus === "SUCCESS" ? "SUCCESS" : "FAILED",
    order_id: orderId,
    message: reason,
    latest_status: latestStatus,
    latest_message: reason,
  };
}

/**
 * Verify a Cashfree Payment Order attempt with backend or direct gateway fallback
 */
export async function verifyCashfreeOrder(orderId: string): Promise<any> {
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    const res = await fetch(`/api/payments/verify?order_id=${encodeURIComponent(orderId)}`, {
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
      const errMsg = extractErrorMessage(json, "Failed to verify Cashfree payment");
      throw new Error(errMsg);
    }
    return json.data || json;
  }

  // Server-side (Next.js server): Try central backend endpoint first
  try {
    const res = await backendFetch(`/payments/cashfree/orders/${encodeURIComponent(orderId)}/verify`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (json.success !== false && (json.status === "SUCCESS" || json.data?.status === "SUCCESS")) {
          return json.data || json;
        }
      } catch {}
    }
  } catch (err: any) {
    console.warn(`[backendApi] Backend verify endpoint issue (${err.message}). Falling back to gateway direct verification...`);
  }

  // Direct gateway fallback to guarantee 100% resilient verification without 500 errors
  return await verifyDirectlyWithCashfree(orderId);
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
    const errMsg = extractErrorMessage(json, "Failed to record donation");
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

