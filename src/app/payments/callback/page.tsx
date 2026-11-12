"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Heart,
  RefreshCw,
} from "lucide-react";
import { verifyCashfreeOrder } from "@/lib/backendApi";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(1);

  const verifyPayment = async (oid: string, maxAttempts = 3) => {
    setIsLoading(true);
    setError(null);

    let lastError: any = null;
    let latestData: any = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      setRetryAttempt(attempt);
      try {
        const data = await verifyCashfreeOrder(oid);
        latestData = data;

        const isConfirmed =
          data?.status === "SUCCESS" ||
          data?.payment?.payment_status === "SUCCESS" ||
          data?.data?.status === "SUCCESS";

        if (isConfirmed) {
          setResult(data);
          setError(null);
          setIsLoading(false);
          return;
        }

        // If not yet confirmed and more retries remain, wait 1.5s for gateway to synchronize
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1500));
          continue;
        }
      } catch (err: unknown) {
        lastError = err;
        // If 500 race condition or network hiccup, allow 1.5s for backend/webhook lock to complete
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1500));
          continue;
        }
      }
    }

    const finalSuccess =
      latestData?.status === "SUCCESS" ||
      latestData?.payment?.payment_status === "SUCCESS" ||
      latestData?.data?.status === "SUCCESS";

    if (finalSuccess) {
      setResult(latestData);
      setError(null);
    } else {
      setResult(latestData);
      setError(
        (lastError as Error)?.message ||
          latestData?.message ||
          "Could not verify payment with Cashfree. Please click Re-check Transaction Status below."
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (orderId) {
      verifyPayment(orderId);
    } else {
      setIsLoading(false);
      setError("No Cashfree order reference provided in callback URL.");
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            border: "4px solid #e2e8f0",
            borderTopColor: "#0a3a6b",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: 20,
          }}
        />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-navy, #0a3a6b)", margin: "0 0 8px 0" }}>
          Verifying Payment with Cashfree Gateway...
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0, maxWidth: 440 }}>
          {retryAttempt > 1
            ? `Synchronizing final bank confirmation with Cashfree (attempt ${retryAttempt} of 3)...`
            : "Please hold on while we safely verify your payment attempt with the banking network."}
        </p>
      </div>
    );
  }

  const isSuccess =
    result?.status === "SUCCESS" ||
    result?.payment?.payment_status === "SUCCESS" ||
    result?.data?.status === "SUCCESS";
  const paymentData = result?.payment || result?.data?.payment || result;
  const receiptData = result?.receipt || result?.data?.receipt;
  const isDonation =
    orderId?.toLowerCase().includes("don") ||
    result?.purpose?.toLowerCase().includes("donation");

  if (error || !isSuccess) {
    return (
      <div
        style={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: "36px 28px",
            maxWidth: 480,
            width: "100%",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            border: "1px solid #fee2e2",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#fef2f2",
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px auto",
              border: "1px solid #fecaca",
            }}
          >
            <XCircle size={36} />
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 8px 0" }}>
            Payment Incomplete or Awaiting Bank Confirmation
          </h1>
          <p style={{ fontSize: 13.5, color: "#64748b", margin: "0 0 20px 0", lineHeight: 1.5 }}>
            {error ||
              result?.message ||
              "The transaction could not be confirmed immediately. If your account was debited, your bank will synchronize shortly."}
          </p>

          {orderId && (
            <div
              style={{
                background: "#f1f5f9",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 12,
                fontFamily: "monospace",
                color: "#475569",
                marginBottom: 24,
                wordBreak: "break-all",
              }}
            >
              Order Ref: {orderId}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orderId && (
              <button
                type="button"
                onClick={() => verifyPayment(orderId)}
                style={{
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#334155",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <RefreshCw size={16} /> Re-check Transaction Status
              </button>
            )}
            <Link
              href="/"
              style={{
                padding: "12px 20px",
                borderRadius: 8,
                background: "#0a3a6b",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        background: "linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: "40px 32px",
          maxWidth: 540,
          width: "100%",
          boxShadow: "0 20px 40px rgba(10, 58, 107, 0.08)",
          border: "1px solid #e2e8f0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#ecfdf5",
            color: "#059669",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            border: "2px solid #a7f3d0",
          }}
        >
          <CheckCircle2 size={44} />
        </div>

        <span
          style={{
            display: "inline-block",
            background: "#dcfce7",
            color: "#166534",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 20,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 10,
          }}
        >
          Payment Verified
        </span>

        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0a3a6b", margin: "0 0 8px 0" }}>
          {isDonation ? "Donation Successfully Received!" : "Membership Application Verified!"}
        </h1>

        <p style={{ fontSize: 13.5, color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.5 }}>
          {isDonation
            ? "Thank you for your generous support towards human dignity and justice. Your official donation receipt has been recorded."
            : "Your membership application payment has been confirmed. Welcome to Human Rights & Social Justice Mission."}
        </p>

        {/* Receipt / Order Details Box */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            padding: "20px 22px",
            textAlign: "left",
            fontSize: 13,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
            <span style={{ color: "#64748b" }}>Transaction Status:</span>
            <strong style={{ color: "#059669", display: "flex", alignItems: "center", gap: 4 }}>
              <ShieldCheck size={14} /> Confirmed via Cashfree
            </strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
            <span style={{ color: "#64748b" }}>Cashfree Order ID:</span>
            <span style={{ fontFamily: "monospace", color: "#1e293b", fontWeight: 600 }}>{orderId}</span>
          </div>

          {receiptData?.receipt_number && (
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
              <span style={{ color: "#64748b" }}>Official Receipt No:</span>
              <strong style={{ color: "#0a3a6b" }}>{receiptData.receipt_number}</strong>
            </div>
          )}

          {paymentData?.amount && (
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
              <span style={{ color: "#64748b" }}>Amount Paid:</span>
              <strong style={{ fontSize: 16, color: "#0a3a6b" }}>₹{Number(paymentData.amount).toLocaleString("en-IN")}</strong>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Date &amp; Time:</span>
            <span style={{ color: "#334155" }}>{new Date().toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Printer size={16} /> Print Confirmation
          </button>

          <Link
            href="/"
            style={{
              padding: "12px 22px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #0a3a6b 0%, #175496 100%)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(10, 58, 107, 0.2)",
            }}
          >
            Back to Home <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Loading verification...
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
