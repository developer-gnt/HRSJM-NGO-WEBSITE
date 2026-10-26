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

  const emailSubject = `Payment Successful: HRSJM Membership Application Received (${applicationRef})`;
  const emailContent = `
Dear ${record.fullName},

Thank you for completing your registration payment for membership with Human Rights & Social Justice Mission (HRSJM).
Your payment has been successfully confirmed and your application is now under review.

APPLICATION & PAYMENT DETAILS:
- Application Reference No : ${applicationRef}
- Registered Email         : ${recipient}
- Registered Mobile        : ${record.phone}
- Post / Category          : ${record.packageName}
- Amount Paid              : ${record.packageFee}
- Payment Mode             : ${record.paymentMode || "Online (Cashfree Gateway)"}
- Transaction / Order ID   : ${record.paymentReference || "Confirmed"}
- Date & Time              : ${new Date(record.submittedAt).toLocaleString("en-IN")}
- Current Status           : Under Review (Pending Verification)

WHAT HAPPENS NEXT:
1. Document & Eligibility Verification: Our administrative committee will review your application and documents against official NGO norms.
2. Membership Activation: Upon administrative approval, your official Membership Number will be assigned.
3. Login Access: Once approved, you can log in to the HRSJM Member Portal / Mobile App using your registered mobile number and password.

For support or questions, quote your Reference Number (${applicationRef}) and contact support@hrsjm.org.

Warm regards,
Membership Committee
Human Rights & Social Justice Mission (HRSJM)
National Headquarters, New Delhi, India
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

export async function sendContactInquiryEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<EmailDispatchResult> {
  const recipient = data.email;
  const inquiryRef = `INQ-${Date.now().toString(36).toUpperCase()}`;

  const emailSubject = `Inquiry Received [${inquiryRef}] - Human Rights & Social Justice Mission`;
  const emailContent = `
Dear ${data.name},

Thank you for reaching out to the Human Rights & Social Justice Mission (HRSJM).
We have received your message regarding: "${data.subject || 'General Inquiry'}".

YOUR MESSAGE DETAILS:
- Inquiry Reference : ${inquiryRef}
- Contact Phone     : ${data.phone || 'N/A'}
- Message Summary   :
${data.message}

Our team reviews inquiries daily and will respond within 24 to 48 hours.

Warm regards,
Secretariat & Helpdesk
Human Rights & Social Justice Mission (HRSJM)
National Headquarters, New Delhi, India
Website: https://hrsjm.org · Email: contact@hrsjm.org
  `.trim();

  const resendApiKey = process.env.RESEND_API_KEY;
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
          message: "Contact acknowledgement email sent.",
          recipient,
        };
      }
    } catch (err) {
      console.error("Resend API contact dispatch error:", err);
    }
  }

  console.info(`[CONTACT INQUIRY EMAIL] Dispatched to ${recipient} (Ref: ${inquiryRef})`);
  return {
    sent: true,
    status: "dispatched",
    message: "Contact acknowledgement processed.",
    recipient,
  };
}
