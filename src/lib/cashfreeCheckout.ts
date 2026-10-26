import { load, CashfreeInstance } from "@cashfreepayments/cashfree-js";

let cashfreeInstance: CashfreeInstance | null = null;

/**
 * Initializes and caches the Cashfree Web SDK instance
 */
export async function getCashfreeInstance(): Promise<CashfreeInstance | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (cashfreeInstance) {
    return cashfreeInstance;
  }

  const mode =
    process.env.NEXT_PUBLIC_CASHFREE_MODE?.toLowerCase() === "production"
      ? "production"
      : "sandbox";

  try {
    cashfreeInstance = await load({ mode });
    return cashfreeInstance;
  } catch (error) {
    console.error("Failed to load Cashfree Web SDK:", error);
    throw new Error(
      "Could not load Cashfree Web Checkout SDK. Please check your network connection."
    );
  }
}

export interface LaunchCashfreeOptions {
  paymentSessionId: string;
  redirectTarget?: "_modal" | "_self" | "_blank" | "_top";
}

/**
 * Launches the Cashfree checkout flow for a payment session
 */
export async function launchCashfreeCheckout({
  paymentSessionId,
  redirectTarget = "_self",
}: LaunchCashfreeOptions): Promise<void> {
  if (!paymentSessionId) {
    throw new Error("Missing Cashfree payment session ID.");
  }

  const cashfree = await getCashfreeInstance();
  if (!cashfree) {
    throw new Error(
      "Cashfree Web SDK could not be initialized in this browser environment."
    );
  }

  return await cashfree.checkout({
    paymentSessionId,
    redirectTarget,
  });
}
