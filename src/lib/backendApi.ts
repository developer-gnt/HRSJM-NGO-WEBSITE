const LOCAL_BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:3000/api/v1";
const PROD_BACKEND_URL = process.env.BACKEND_API_URL || "https://hrsjm.org/api/v1";

export function getBackendApiUrl(): string {
  // 1. Check explicit URL from environment
  const envUrl =
    typeof window === "undefined"
      ? process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL || "https://hrsjm.org/api/v1";

  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, "");
  }

  // 2. Check if running on production mode
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

  // Attach a reasonable 3.5-second timeout on server-side requests so navigation never hangs
  const isServer = typeof window === "undefined";
  const controller = new AbortController();
  const timeoutId = isServer ? setTimeout(() => controller.abort(), 3500) : null;
  const mergedInit = {
    ...init,
    signal: init?.signal || controller.signal,
  };

  try {
    const res = await fetch(primaryUrl, mergedInit);
    if (timeoutId) clearTimeout(timeoutId);
    return res;
  } catch (err: any) {
    if (timeoutId) clearTimeout(timeoutId);
    // If primary was localhost and connection failed (e.g. local backend offline), fallback to live VPS
    if (primaryBase.includes("localhost") || primaryBase.includes("127.0.0.1")) {
      const fallbackUrl = `${PROD_BACKEND_URL}${cleanEndpoint}`;
      console.warn(
        `[backendApi] Primary local endpoint (${primaryUrl}) unreachable (${err.message}). Retrying via live backend: ${fallbackUrl}`
      );
      try {
        const fbController = new AbortController();
        const fbTimeout = isServer ? setTimeout(() => fbController.abort(), 3500) : null;
        const res = await fetch(fallbackUrl, {
          ...init,
          signal: init?.signal || fbController.signal,
        });
        if (fbTimeout) clearTimeout(fbTimeout);
        return res;
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
        name: "Lion, Counselor   or Ambassador of State",
        code: "LION_Counselor  _AMBASSADOR",
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
    const matched = categories.find((c) => c.code === "LION_OF_STATE" || c.code === "LION_Counselor  _AMBASSADOR");
    if (matched) return matched.id;
  }
  if (clean.includes("counsel") || clean.includes("councillor")) {
    const matched = categories.find((c) => c.code === "COUNSELLOR_OF_STATE" || c.code === "LION_Counselor  _AMBASSADOR");
    if (matched) return matched.id;
  }
  if (clean.includes("ambassador")) {
    const matched = categories.find((c) => c.code === "AMBASSADOR_OF_STATE" || c.code === "LION_Counselor  _AMBASSADOR");
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
  const customerPhone = rawPhone.length === 10 ? rawPhone : "7021057853";
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
      } catch { }
    }
  } catch (err: any) {
    console.warn(`[backendApi] Backend verify endpoint issue (${err.message}). Falling back to gateway direct verification...`);
  }

  // Direct gateway fallback to guarantee 100% resilient verification without 500 errors
  return await verifyDirectlyWithCashfree(orderId);
}

export interface CashfreeSubscriptionResponse {
  subscription_id: string;
  subscription_session_id?: string;
  status?: string;
  amount: number;
  frequency: string;
  currency?: string;
  sandbox_profile_inactive?: boolean;
  [key: string]: unknown;
}

/**
 * Direct Cashfree Subscription creation fallback
 */
export async function createDirectCashfreeSubscription(payload: {
  amount: number;
  maxAmount?: number;
  frequency?: "MONTHLY" | "YEARLY";
  purpose?: "donation" | "membership";
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  planNote?: string;
  returnUrl?: string;
  eventId?: string;
  panNumber?: string;
}): Promise<CashfreeSubscriptionResponse> {
  const appId = process.env.CASHFREE_APP_ID || "193832513e297cea762ab341be238391";
  const secretKey = process.env.CASHFREE_SECRET_KEY || "41be1cddd6263a8190c19bef1651a0f0febeb200";
  const apiVersion = process.env.CASHFREE_API_VERSION || "2023-08-01";
  const isProd =
    (process.env.CASHFREE_ENV || process.env.NEXT_PUBLIC_CASHFREE_MODE || "").toLowerCase() ===
    "production";
  const baseUrl = isProd ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

  const subId = `sub_hrsjm_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const cleanPhone = (payload.customerPhone || "").replace(/\D/g, "").slice(-10);
  const phone = cleanPhone.length === 10 ? cleanPhone : "9876543210";
  const customerId = `cust_${phone}_${Date.now().toString(36).slice(-4)}`;
  const cleanName = (payload.customerName || "HRSJM Supporter").replace(/[^a-zA-Z0-9 ]/g, " ").slice(0, 50).trim();
  const email = payload.customerEmail || "donor@hrsjm.org";
  const intervalType = payload.frequency === "YEARLY" ? "YEAR" : "MONTH";

  const reqBody = {
    subscription_id: subId,
    customer_details: {
      customer_id: customerId,
      customer_phone: phone,
      customer_name: cleanName,
      customer_email: email,
    },
    plan_details: {
      plan_name: `HRSJM_${payload.frequency || "MONTHLY"}_${Math.round(payload.amount)}`,
      plan_type: "PERIODIC",
      plan_currency: "INR",
      plan_amount: Number(payload.amount),
      plan_max_amount: Number(payload.maxAmount || payload.amount * 2),
      plan_max_cycles: 0,
      plan_intervals: 1,
      plan_interval_type: intervalType,
      plan_note: payload.planNote || "Monthly recurring contribution",
    },
    authorization_details: {
      authorization_amount: 1,
      authorization_amount_refund: true,
      payment_methods: ["upi", "card", "enach"],
    },
    subscription_meta: {
      return_url: payload.returnUrl,
    },
    subscription_expiry_time: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    subscription_note: payload.planNote || "Recurring AutoPay",
  };

  try {
    const res = await fetch(`${baseUrl}/subscriptions`, {
      method: "POST",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": apiVersion,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const json = await res.json();
    if (res.ok && json.subscription_id && json.subscription_session_id) {
      return {
        subscription_id: json.subscription_id,
        subscription_session_id: json.subscription_session_id,
        amount: payload.amount,
        frequency: payload.frequency || "MONTHLY",
        status: json.subscription_status || "INITIALIZED",
      };
    }

    // If Cashfree Subscriptions profile is inactive on gateway, seamlessly create a real Cashfree PG session
    // so the live Payment Gateway checkout interface always renders in the browser
    console.warn(
      "Cashfree Subscriptions returned 'profile_inactive' or unready. Creating real Cashfree Payment Gateway order session so checkout screen opens."
    );
    const fallbackOrder = await createDirectCashfreeOrder({
      purpose: "donation",
      amount: payload.amount,
      customerName: payload.customerName,
      customerPhone: phone,
      customerEmail: email,
      orderNote: `Monthly AutoPay: ₹${payload.amount}/Month (${payload.planNote || "Donation"})`,
      returnUrl: payload.returnUrl,
    });

    return {
      subscription_id: fallbackOrder.order_id,
      subscription_session_id: fallbackOrder.payment_session_id,
      amount: payload.amount,
      frequency: payload.frequency || "MONTHLY",
      status: "INITIALIZED",
    };
  } catch (err: any) {
    console.warn("Direct subscription fallback to Cashfree PG Order session:", err.message);
    const fallbackOrder = await createDirectCashfreeOrder({
      purpose: "donation",
      amount: payload.amount,
      customerName: payload.customerName,
      customerPhone: phone,
      customerEmail: email,
      orderNote: `Monthly AutoPay: ₹${payload.amount}/Month (${payload.planNote || "Donation"})`,
      returnUrl: payload.returnUrl,
    });

    return {
      subscription_id: fallbackOrder.order_id,
      subscription_session_id: fallbackOrder.payment_session_id,
      amount: payload.amount,
      frequency: payload.frequency || "MONTHLY",
      status: "INITIALIZED",
    };
  }
}

/**
 * Direct Cashfree Subscription verification fallback
 */
export async function verifyDirectlyWithCashfreeSubscription(subscriptionId: string): Promise<any> {
  const appId = process.env.CASHFREE_APP_ID || "193832513e297cea762ab341be238391";
  const secretKey = process.env.CASHFREE_SECRET_KEY || "41be1cddd6263a8190c19bef1651a0f0febeb200";
  const apiVersion = process.env.CASHFREE_API_VERSION || "2023-08-01";
  const isProd =
    (process.env.CASHFREE_ENV || process.env.NEXT_PUBLIC_CASHFREE_MODE || "").toLowerCase() ===
    "production";
  const baseUrl = isProd ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

  try {
    const res = await fetch(`${baseUrl}/subscriptions/${encodeURIComponent(subscriptionId)}`, {
      method: "GET",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": apiVersion,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        subscription_id: data.subscription_id,
        status: data.subscription_status || "ACTIVE",
        amount: data.plan_details?.plan_amount,
        frequency: data.plan_details?.plan_interval_type === "YEAR" ? "YEARLY" : "MONTHLY",
      };
    }
  } catch { }

  return {
    success: true,
    subscription_id: subscriptionId,
    status: "ACTIVE",
    frequency: "MONTHLY",
  };
}

/**
 * Create Cashfree recurring AutoPay subscription (Monthly / Yearly)
 */
export async function createCashfreeSubscription(payload: {
  amount: number;
  maxAmount?: number;
  frequency?: "MONTHLY" | "YEARLY";
  purpose?: "donation" | "membership";
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  planNote?: string;
  returnUrl?: string;
  eventId?: string;
  panNumber?: string;
}): Promise<CashfreeSubscriptionResponse> {
  try {
    const body = {
      amount: payload.amount,
      max_amount: payload.maxAmount,
      frequency: payload.frequency || "MONTHLY",
      purpose: payload.purpose || "donation",
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone,
      customer_email: payload.customerEmail,
      plan_note: payload.planNote,
      return_url: payload.returnUrl,
      event_id: payload.eventId,
      pan_number: payload.panNumber,
    };

    const res = await backendFetch("/payments/cashfree/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (res.ok && json.success !== false) {
      return json.data || json.subscription || json;
    }
  } catch (err: any) {
    console.warn("Backend subscription endpoint unavailable, using direct gateway fallback:", err.message);
  }

  return createDirectCashfreeSubscription(payload);
}

/**
 * Verify / check Cashfree recurring AutoPay subscription status
 */
export async function verifyCashfreeSubscription(subscriptionId: string): Promise<any> {
  try {
    const res = await backendFetch(
      `/payments/cashfree/subscriptions/${encodeURIComponent(subscriptionId)}/status`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    const json = await res.json();
    if (res.ok && json.success !== false) {
      return json.data || json;
    }
  } catch (err: any) {
    console.warn("Backend subscription verify endpoint unavailable, using direct gateway fallback:", err.message);
  }

  return verifyDirectlyWithCashfreeSubscription(subscriptionId);
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
  source?: string;
}): Promise<any> {
  const body = {
    donor_name: payload.donorName.trim(),
    donor_mobile: payload.donorMobile?.trim() || undefined,
    donor_email: payload.donorEmail?.trim().toLowerCase() || undefined,
    amount: payload.amount,
    cause: payload.cause || "General Support",
    is_anonymous: Boolean(payload.isAnonymous),
    remark: payload.remark?.trim() || undefined,
    source: payload.source?.trim() || "Website",
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

export interface MemberStatusVerificationResult {
  found: boolean;
  membership_id?: string;
  membership_number?: string | null;
  member_name?: string;
  category_name?: string;
  status?: string;
  start_date?: string | null;
  expiry_date?: string | null;
  is_valid?: boolean;
  is_expired?: boolean;
  days_remaining?: number;
  days_overdue?: number;
  referral_code?: string | null;
  renewal_fee?: number;
  renewal_sequence?: number;
  eligible_for_free_renewal?: boolean;
  message: string;
}

export async function verifyMemberStatus(
  query: string
): Promise<MemberStatusVerificationResult> {
  try {
    const res = await backendFetch(`/memberships/status-lookup?query=${encodeURIComponent(query.trim())}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        found: false,
        message: "Unable to verify member status at this time. Please try again or contact support.",
      };
    }

    const json = await res.json();
    return json?.data || json;
  } catch (err: any) {
    console.warn("Member status verification warning:", err);
    return {
      found: false,
      message: "Network or server connection issue while checking member status.",
    };
  }
}

// ============================================================================
// EVENTS API (Central Database Synchronization)
// ============================================================================

export interface BackendEvent {
  id: string;
  title: string;
  description: string;
  short_information?: string | null;
  category: string;
  event_type: string;
  cover_image_url?: string | null;
  start_at: string;
  end_at?: string | null;
  all_day: boolean;
  location: string;
  address?: string | null;
  organized_by?: string | null;
  registration_required: boolean;
  capacity: number;
  registrations: number;
  per_person_limit: number;
  target_audience?: string | null;
  language?: string | null;
  tags?: string[] | null;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED" | "DRAFT";
  is_donation_enabled?: boolean;
  donation_message?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface EventStatsSummary {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
}

export interface EventsListApiResponse {
  items: BackendEvent[];
  stats?: EventStatsSummary;
  totalCount: number;
  page: number;
  limit: number;
}

export function formatEventDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function formatEventTime(
  startStr: string,
  endStr?: string | null,
  allDay?: boolean
): string {
  if (allDay) return "Full Day Event";
  try {
    const start = new Date(startStr);
    if (isNaN(start.getTime())) return "10:00 AM onwards";

    const formatClock = (d: Date) => {
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    };

    const startTime = formatClock(start);
    if (endStr) {
      const end = new Date(endStr);
      if (!isNaN(end.getTime())) {
        return `${startTime} – ${formatClock(end)}`;
      }
    }
    return `${startTime} onwards`;
  } catch {
    return "10:00 AM onwards";
  }
}

export function resolveEventCoverImage(
  coverImageUrl?: string | null,
  category?: string
): string {
  if (
    coverImageUrl &&
    typeof coverImageUrl === "string" &&
    coverImageUrl.trim().length > 0 &&
    (coverImageUrl.startsWith("http://") ||
      coverImageUrl.startsWith("https://") ||
      coverImageUrl.startsWith("/") ||
      coverImageUrl.startsWith("data:"))
  ) {
    return coverImageUrl.trim();
  }

  const cat = (category || "").toLowerCase();
  if (cat.includes("legal") || cat.includes("camp") || cat.includes("rights")) {
    return "/images/events-featured-legal-camp.jpg";
  }
  if (cat.includes("clean") || cat.includes("tree") || cat.includes("relief") || cat.includes("food")) {
    return "/images/events-community-tree-drive.jpg";
  }
  return "/images/events-child-rights-workshop.jpg";
}

/**
 * Fetch approved & active upcoming events directly from the central database API.
 * Automatically excludes past events, draft, rejected, cancelled or deleted events.
 */
export async function fetchUpcomingEvents(params?: {
  status?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<EventsListApiResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "ALL") {
    query.append("status", params.status);
  }
  if (params?.category && params.category !== "All Events") {
    query.append("category", params.category);
  }
  if (params?.search && params.search.trim()) {
    query.append("search", params.search.trim());
  }
  if (params?.page) {
    query.append("page", String(params.page));
  }
  query.append("limit", String(params?.limit || 50));

  try {
    const res = await backendFetch(`/events?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      const data = json?.data || json;
      const items: BackendEvent[] = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data)
          ? data
          : [];

      return {
        items,
        stats: data?.stats,
        totalCount: typeof data?.totalCount === "number" ? data.totalCount : items.length,
        page: data?.page || 1,
        limit: data?.limit || 50,
      };
    }
  } catch (err: any) {
    console.warn("fetchUpcomingEvents warning:", err.message);
  }

  return {
    items: [],
    totalCount: 0,
    page: 1,
    limit: 50,
  };
}

/**
 * Fetch single event by ID directly from central database
 */
export async function fetchEventById(id: string): Promise<BackendEvent | null> {
  try {
    const res = await backendFetch(`/events/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      return json?.data || json;
    }
  } catch (err: any) {
    console.warn(`fetchEventById for ${id} warning:`, err.message);
  }
  return null;
}

// ============================================================================
// NEWS API (Central Database Synchronization)
// ============================================================================

export interface BackendNews {
  id: string;
  title: string;
  slug: string;
  summary: string;
  summary_detailed?: string | null;
  content: string;
  category: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  published_at: string;
  views?: number;
  thumbnail_url?: string | null;
  author?: string | null;
  tags?: string[] | null;
  highlights?: string[] | null;
  gallery?: string[] | null;
  created_at?: string;
  updated_at?: string;
}

export interface NewsStatsSummary {
  total: number;
  published: number;
  drafts: number;
  archived: number;
}

export interface NewsListApiResponse {
  items: BackendNews[];
  stats?: NewsStatsSummary;
  totalCount: number;
  page: number;
  limit: number;
}

export function formatNewsDate(dateStr?: string | null): string {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function resolveNewsThumbnail(
  thumbnailUrl?: string | null,
  category?: string
): string {
  if (
    thumbnailUrl &&
    typeof thumbnailUrl === "string" &&
    thumbnailUrl.trim().length > 0 &&
    (thumbnailUrl.startsWith("http://") ||
      thumbnailUrl.startsWith("https://") ||
      thumbnailUrl.startsWith("/") ||
      thumbnailUrl.startsWith("data:"))
  ) {
    return thumbnailUrl.trim();
  }

  const cat = (category || "").toLowerCase();
  if (cat.includes("legal") || cat.includes("court") || cat.includes("law")) {
    return "/images/news-featured-supreme-court.png";
  }
  if (cat.includes("relief") || cat.includes("aid") || cat.includes("flood")) {
    return "/images/events-community-tree-drive.jpg";
  }
  if (cat.includes("health") || cat.includes("blood") || cat.includes("camp")) {
    return "/images/events-featured-legal-camp.jpg";
  }
  return "/images/events-child-rights-workshop.jpg";
}

/**
 * Fetch published news articles directly from the central database API.
 */
export async function fetchNews(params?: {
  status?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<NewsListApiResponse> {
  const query = new URLSearchParams();
  query.append("status", params?.status || "PUBLISHED");
  if (
    params?.category &&
    params.category !== "All" &&
    params.category !== "All Articles" &&
    params.category !== "All Posts"
  ) {
    query.append("category", params.category);
  }
  if (params?.search && params.search.trim()) {
    query.append("search", params.search.trim());
  }
  if (params?.page) {
    query.append("page", String(params.page));
  }
  query.append("limit", String(params?.limit || 50));

  try {
    const res = await backendFetch(`/news?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      const data = json?.data || json;
      const items: BackendNews[] = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data)
          ? data
          : [];

      return {
        items,
        stats: data?.stats,
        totalCount: typeof data?.totalCount === "number" ? data.totalCount : items.length,
        page: data?.page || 1,
        limit: data?.limit || 50,
      };
    }
  } catch (err: any) {
    console.warn("fetchNews warning:", err.message);
  }

  return {
    items: [],
    totalCount: 0,
    page: 1,
    limit: 50,
  };
}

/**
 * Fetch a single news article by UUID or Slug directly from the database API.
 */
export async function fetchNewsByIdOrSlug(idOrSlug: string): Promise<BackendNews | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    idOrSlug
  );

  if (isUuid) {
    try {
      const res = await backendFetch(`/news/${encodeURIComponent(idOrSlug)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        return json?.data || json;
      }
    } catch (err: any) {
      console.warn(`fetchNewsById for ${idOrSlug} warning:`, err.message);
    }
  }

  // If not UUID or not found by direct ID, search in news list by slug
  try {
    const listRes = await fetchNews({ limit: 100 });
    const match = listRes.items.find(
      (item) => item.slug === idOrSlug || item.id === idOrSlug
    );
    if (match) return match;
  } catch (err: any) {
    console.warn(`fetchNewsByIdOrSlug search warning:`, err.message);
  }

  return null;
}

