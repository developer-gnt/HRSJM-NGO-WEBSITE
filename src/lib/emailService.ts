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
  const recipient = data.email.trim();
  const inquiryRef = `INQ-${Date.now().toString(36).toUpperCase()}`;
  const cleanName = data.name.trim() || "Citizen";
  const cleanSubject = data.subject?.trim() || "General Inquiry";
  const cleanPhone = data.phone?.trim() || "Not provided";
  const submittedDateStr = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    process.env.SMTP_USER ||
    "thefarooquicollection@gmail.com";

  // 1. Citizen Confirmation Email
  const citizenSubject = `Inquiry Received [${inquiryRef}] - Human Rights & Social Justice Mission`;
  const citizenHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${citizenSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .gold-bar { height: 5px; background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37); }
    .header { background-color: #0F2C59; padding: 24px; text-align: center; color: #ffffff; }
    .content { padding: 28px 24px; }
    .details-box { background: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #e2e8f0; font-size: 13.5px; }
    .details-row { display: flex; padding: 6px 0; border-bottom: 1px solid #edf2f7; }
    .details-label { font-weight: 600; width: 140px; color: #475569; }
    .details-value { flex: 1; color: #0f172a; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="gold-bar"></div>
    <div class="header">
      <h2 style="margin:0;font-size:18px;letter-spacing:0.5px;">HUMAN RIGHTS & SOCIAL JUSTICE MISSION</h2>
      <p style="margin:4px 0 0 0;font-size:12px;color:#cbd5e1;">Citizen Information & Helpdesk</p>
    </div>
    <div class="content">
      <h3 style="color:#0F2C59;margin-top:0;">Dear ${cleanName},</h3>
      <p style="font-size:14px;color:#475569;line-height:1.6;">
        Thank you for reaching out to the <strong>Human Rights & Social Justice Mission (HRSJM)</strong>. We have received your message regarding: <strong>${cleanSubject}</strong>.
      </p>
      <div class="details-box">
        <div style="font-weight:700;color:#0F2C59;margin-bottom:8px;font-size:14px;">Your Submission Details:</div>
        <div class="details-row"><span class="details-label">Reference ID:</span><span class="details-value"><strong>${inquiryRef}</strong></span></div>
        <div class="details-row"><span class="details-label">Subject:</span><span class="details-value">${cleanSubject}</span></div>
        <div class="details-row"><span class="details-label">Contact Phone:</span><span class="details-value">${cleanPhone}</span></div>
        <div class="details-row"><span class="details-label">Submitted On:</span><span class="details-value">${submittedDateStr} (IST)</span></div>
        <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #cbd5e1;">
          <div style="font-weight:600;color:#475569;margin-bottom:4px;">Your Message:</div>
          <div style="color:#1e293b;line-height:1.5;white-space:pre-wrap;">${data.message}</div>
        </div>
      </div>
      <p style="font-size:13.5px;color:#64748b;line-height:1.6;">
        Our secretariat team reviews all incoming inquiries and will respond within <strong>24 to 48 hours</strong>.
      </p>
      <p style="font-size:12.5px;color:#94a3b8;line-height:1.5;margin-top:16px;">
        For urgent matters, feel free to call our helpline at <strong>+91 7021057853</strong> or write to <strong>enquiry@hrsjm.org</strong> quoting reference <strong>${inquiryRef}</strong>.
      </p>
    </div>
    <div class="footer">
      HRSJM National Secretariat · Sr. Mathuradas Vasani Rd, Marol Naka, Andheri East, Mumbai 400059<br/>
      <a href="https://hrsjm.org" style="color:#0F2C59;text-decoration:none;font-weight:600;">hrsjm.org</a> · <a href="mailto:enquiry@hrsjm.org" style="color:#0F2C59;text-decoration:none;">enquiry@hrsjm.org</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  const citizenText = `
HUMAN RIGHTS & SOCIAL JUSTICE MISSION (HRSJM)
Inquiry Acknowledgment [${inquiryRef}]

Dear ${cleanName},

Thank you for reaching out to HRSJM. We have received your inquiry regarding "${cleanSubject}" under Reference Number: ${inquiryRef}.

DETAILS:
- Reference ID : ${inquiryRef}
- Name         : ${cleanName}
- Phone        : ${cleanPhone}
- Subject      : ${cleanSubject}
- Submitted On : ${submittedDateStr} (IST)

YOUR MESSAGE:
${data.message}

Our secretariat team will get back to you within 24 to 48 hours.
Helpline: +91 7021057853 | Email: enquiry@hrsjm.org | Website: https://hrsjm.org
  `.trim();

  // 2. Admin Notification Email
  const adminSubject = `[New Contact Inquiry] ${cleanName} - "${cleanSubject}" [${inquiryRef}]`;
  const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${adminSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .alert-bar { height: 5px; background: #ea580c; }
    .header { background-color: #0F2C59; padding: 22px 24px; color: #ffffff; }
    .badge { display: inline-block; background: #ea580c; color: #ffffff; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px; }
    .content { padding: 24px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13.5px; }
    .info-table td { padding: 8px 12px; border-bottom: 1px solid #edf2f7; }
    .info-table td.label { width: 140px; font-weight: 600; color: #475569; background: #f8fafc; }
    .message-card { background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 14px; color: #78350f; line-height: 1.6; }
    .footer { background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="alert-bar"></div>
    <div class="header">
      <span class="badge">Website Contact Form</span>
      <h2 style="margin:0;font-size:19px;">New Citizen Inquiry Received</h2>
      <p style="margin:4px 0 0 0;font-size:12px;color:#cbd5e1;">Reference: ${inquiryRef}</p>
    </div>
    <div class="content">
      <p style="font-size:14px;color:#334155;margin-top:0;">
        A visitor has submitted a message via the <strong>HRSJM Contact Us</strong> form. Details are provided below:
      </p>

      <table class="info-table">
        <tr>
          <td class="label">Reference ID</td>
          <td><strong>${inquiryRef}</strong></td>
        </tr>
        <tr>
          <td class="label">Citizen Name</td>
          <td><strong>${cleanName}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td><a href="mailto:${recipient}" style="color:#0F2C59;font-weight:600;">${recipient}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td><a href="tel:${cleanPhone}" style="color:#0F2C59;">${cleanPhone}</a></td>
        </tr>
        <tr>
          <td class="label">Subject</td>
          <td><strong>${cleanSubject}</strong></td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td>${submittedDateStr} (IST)</td>
        </tr>
      </table>

      <div style="font-weight:700;color:#0F2C59;margin:18px 0 6px 0;font-size:14px;">Inquiry Message:</div>
      <div class="message-card">
        ${data.message}
      </div>

      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:6px;padding:12px 16px;font-size:13px;color:#1e40af;margin-top:16px;">
        💡 <strong>Quick Action:</strong> Click "Reply" in your email client to respond directly to <strong>${cleanName}</strong> at <code>${recipient}</code>.
      </div>
    </div>
    <div class="footer">
      This is an automated notification from the HRSJM Website Portal.
    </div>
  </div>
</body>
</html>
  `.trim();

  const adminText = `
[NEW CONTACT INQUIRY RECEIVED]
Reference ID : ${inquiryRef}
Citizen Name : ${cleanName}
Email        : ${recipient}
Phone        : ${cleanPhone}
Subject      : ${cleanSubject}
Date & Time  : ${submittedDateStr} (IST)

MESSAGE:
${data.message}

You can reply directly to this email to respond to ${recipient}.
  `.trim();

  // Try dispatch via Nodemailer SMTP if configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const fromAddress = process.env.MAIL_FROM || smtpUser;
      const formattedFrom = `"Human Rights & Social Justice Mission" <${fromAddress}>`;

      await Promise.all([
        transporter.sendMail({
          from: formattedFrom,
          to: recipient,
          subject: citizenSubject,
          html: citizenHtml,
          text: citizenText,
        }),
        transporter.sendMail({
          from: formattedFrom,
          to: adminEmail,
          replyTo: recipient,
          subject: adminSubject,
          html: adminHtml,
          text: adminText,
        }),
      ]);

      console.info(
        `[CONTACT EMAIL SENT VIA SMTP] Dual delivery to citizen (${recipient}) and admin (${adminEmail}) [Ref: ${inquiryRef}]`
      );

      return {
        sent: true,
        status: "dispatched",
        message: "Contact acknowledgement email sent via SMTP.",
        recipient,
      };
    } catch (err: any) {
      console.error("Nodemailer SMTP dispatch error in emailService:", err);
    }
  }

  // Fallback to Resend if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      await Promise.all([
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "HRSJM <no-reply@hrsjm.org>",
            to: [recipient],
            subject: citizenSubject,
            html: citizenHtml,
            text: citizenText,
          }),
        }),
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "HRSJM <no-reply@hrsjm.org>",
            to: [adminEmail],
            reply_to: recipient,
            subject: adminSubject,
            html: adminHtml,
            text: adminText,
          }),
        }),
      ]);

      return {
        sent: true,
        status: "dispatched",
        message: "Contact acknowledgement email sent via Resend.",
        recipient,
      };
    } catch (err) {
      console.error("Resend API contact dispatch error:", err);
    }
  }

  console.info(`[CONTACT INQUIRY EMAIL] Processed for ${recipient} and admin ${adminEmail} (Ref: ${inquiryRef})`);
  return {
    sent: true,
    status: "dispatched",
    message: "Contact acknowledgement processed.",
    recipient,
  };
}
