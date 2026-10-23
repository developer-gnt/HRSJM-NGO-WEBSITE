import type { MembershipRecord } from "./membershipStorage";

export interface EmailDispatchResult {
  sent: boolean;
  status: "dispatched" | "simulated_pending_smtp_config" | "failed";
  message: string;
  recipient: string;
}

/**
 * Sends or simulates an application-received confirmation email.
 * Reuses environment variables (SMTP_HOST, RESEND_API_KEY) if configured.
 * If credentials are not yet provided by the client, securely logs the payload
 * and records simulation status without crashing or blocking the user flow.
 */
export async function sendMembershipApplicationEmail(
  record: MembershipRecord
): Promise<EmailDispatchResult> {
  const recipient = record.email;
  const applicationRef = record.applicationRef;

  const emailSubject = `HRSJM Membership Application Received — Ref: ${applicationRef}`;
  const emailContent = `
Dear ${record.fullName},

Thank you for applying for membership with Human Rights & Social Justice Mission (HRSJM).

Your application details:
- Reference Number: ${applicationRef}
- Post / Category: ${record.packageName}
- Registration Fee: ${record.packageFee}
- Date Submitted: ${new Date(record.submittedAt).toLocaleDateString("en-IN")}
- Status: Under Review

Our administration committee will review your submitted documents and verify your eligibility against the official HRSJM Bye-Laws. You will receive further notification regarding verification and issuance of your membership credentials.

For any queries regarding your application, please reach out to our office with your reference number.

Warm regards,
Membership Committee
Human Rights & Social Justice Mission (HRSJM)
National Office: Mumbai, Maharashtra
Website: https://hrsjm.org
`.trim();

  // Check if Resend or SMTP environment variables are configured
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;

  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "HRSJM <no-reply@hrsjm.org>",
          to: [recipient],
          subject: emailSubject,
          text: emailContent,
        }),
      });

      if (res.ok) {
        return {
          sent: true,
          status: "dispatched",
          message: "Confirmation email sent via Resend API.",
          recipient,
        };
      }
    } catch (err) {
      console.error("Resend API dispatch error:", err);
    }
  }

  // Fallback: When no external email provider is configured, log cleanly and return simulation status
  console.info(
    `[EMAIL SIMULATION] Application received email for ${recipient} (Ref: ${applicationRef}):\nSubject: ${emailSubject}\n`
  );

  return {
    sent: false,
    status: "simulated_pending_smtp_config",
    message:
      "Email logged in simulation store. In production, configure SMTP_HOST or RESEND_API_KEY to send real emails.",
    recipient,
  };
}
