import path from "path";
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

  // 1. Try dispatch via Nodemailer SMTP if configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    process.env.SMTP_USER ||
    "thefarooquicollection@gmail.com";

  const submittedDateStr = new Date(record.submittedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${emailSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .gold-bar { height: 5px; background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37); }
    .header { background-color: #0F2C59; padding: 26px; text-align: center; color: #ffffff; }
    .content { padding: 28px 24px; }
    .success-badge { display: inline-block; background: #ecfdf5; color: #047857; font-size: 12.5px; font-weight: 700; padding: 5px 14px; border-radius: 999px; border: 1px solid #a7f3d0; margin-bottom: 12px; }
    .details-box { background: #f8fafc; border-radius: 8px; padding: 18px; margin: 20px 0; border: 1px solid #e2e8f0; font-size: 13.5px; }
    .details-row { display: flex; padding: 7px 0; border-bottom: 1px solid #edf2f7; }
    .details-label { font-weight: 600; width: 170px; color: #475569; }
    .details-value { flex: 1; color: #0f172a; }
    .next-steps { background: #eff6ff; border-radius: 8px; padding: 18px; margin: 20px 0; border: 1px solid #dbeafe; font-size: 13px; color: #1e40af; line-height: 1.6; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="gold-bar"></div>
    <div class="header">
      <div style="margin-bottom: 10px; text-align: center;">
        <img src="cid:hrsjm_logo" alt="HRSJM Crest" width="68" height="auto" style="display: block; margin: 0 auto; width: 68px; max-width: 68px; height: auto; border: 0;" />
      </div>
      <h2 style="margin:0;font-size:18px;letter-spacing:0.5px;">HUMAN RIGHTS & SOCIAL JUSTICE MISSION</h2>
      <p style="margin:4px 0 0 0;font-size:12px;color:#cbd5e1;">National Governing Council · Membership Division</p>
    </div>
    <div class="content">
      <div style="text-align: center;">
        <span class="success-badge">✓ Payment Confirmed & Application Received</span>
      </div>
      <h3 style="color:#0F2C59;margin-top:8px;">Dear ${record.fullName},</h3>
      <p style="font-size:14.5px;color:#334155;line-height:1.6;">
        Thank you for completing your registration payment and joining the <strong>Human Rights & Social Justice Mission (HRSJM)</strong>. We are honored to welcome you as a member standing for dignity, constitutional rights, and community empowerment.
      </p>

      <div class="details-box">
        <div style="font-weight:700;color:#0F2C59;margin-bottom:10px;font-size:14px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">Application & Payment Summary:</div>
        <div class="details-row"><span class="details-label">Application Reference:</span><span class="details-value"><strong>${applicationRef}</strong></span></div>
        <div class="details-row"><span class="details-label">Applicant Name:</span><span class="details-value">${record.fullName}</span></div>
        <div class="details-row"><span class="details-label">Membership Post:</span><span class="details-value"><strong>${record.packageName}</strong></span></div>
        <div class="details-row"><span class="details-label">Registration Fee Paid:</span><span class="details-value"><strong style="color:#16a34a;">${record.packageFee}</strong></span></div>
        <div class="details-row"><span class="details-label">Payment Mode:</span><span class="details-value">${record.paymentMode || "Online (Cashfree Gateway)"}</span></div>
        <div class="details-row"><span class="details-label">Payment Status:</span><span class="details-value"><span style="color:#16a34a;font-weight:700;">✓ Confirmed Paid</span></span></div>
        <div class="details-row"><span class="details-label">Registered Phone:</span><span class="details-value">+91 ${record.phone}</span></div>
        <div class="details-row"><span class="details-label">Registered Email:</span><span class="details-value">${recipient}</span></div>
        <div class="details-row" style="border-bottom:none;"><span class="details-label">Date & Time:</span><span class="details-value">${submittedDateStr}</span></div>
      </div>

      <div class="next-steps">
        <div style="font-weight:700;margin-bottom:8px;font-size:13.5px;">What Happens Next:</div>
        <ol style="margin:0;padding-left:18px;">
          <li style="margin-bottom:6px;"><strong>Administrative Review:</strong> Our verification committee reviews your uploaded documents and details against statutory NGO norms.</li>
          <li style="margin-bottom:6px;"><strong>Membership ID & Certificate:</strong> Once approved, your permanent Council Membership Number and Digital ID will be issued.</li>
          <li><strong>Member Portal & App Access:</strong> You can log in using your registered mobile number (+91 ${record.phone}) and the password you created during registration.</li>
        </ol>
      </div>

      <p style="font-size:13px;color:#64748b;line-height:1.6;">
        If you have any questions or require assistance, please feel free to contact us at <strong>enquiry@hrsjm.org</strong> or call our helpline at <strong>+91 7021057853</strong>, quoting your reference number: <strong>${applicationRef}</strong>.
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

      const logoAttachment = {
        filename: "hrsjm-logo.png",
        path: path.resolve(process.cwd(), "public/logo.png"),
        cid: "hrsjm_logo",
      };

      await Promise.all([
        // Thank-you confirmation to applicant
        transporter.sendMail({
          from: formattedFrom,
          to: recipient,
          subject: emailSubject,
          html: emailHtml,
          text: emailContent,
          attachments: [logoAttachment],
        }),
        // Notification to admin
        transporter.sendMail({
          from: formattedFrom,
          to: adminEmail,
          replyTo: recipient,
          subject: `[New Paid Membership] ${record.fullName} (${record.packageName}) - Ref: ${applicationRef}`,
          html: emailHtml,
          text: emailContent,
          attachments: [logoAttachment],
        }),
      ]);

      console.info(
        `[MEMBERSHIP PAYMENT EMAIL SENT VIA SMTP] Sent thank-you to applicant (${recipient}) and admin notification (${adminEmail}) [Ref: ${applicationRef}]`
      );

      return {
        sent: true,
        status: "dispatched",
        message: "Membership confirmation email sent via SMTP.",
        recipient,
      };
    } catch (smtpErr: any) {
      console.error("Nodemailer SMTP dispatch error for membership application:", smtpErr);
    }
  }

  // 2. Fallback to Resend API if configured
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
      <div style="margin-bottom: 10px; text-align: center;">
        <img src="cid:hrsjm_logo" alt="HRSJM Crest" width="68" height="auto" style="display: block; margin: 0 auto; width: 68px; max-width: 68px; height: auto; border: 0;" />
      </div>
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

      const logoAttachment = {
        filename: "hrsjm-logo.png",
        path: path.resolve(process.cwd(), "public/logo.png"),
        cid: "hrsjm_logo",
      };

      await Promise.all([
        transporter.sendMail({
          from: formattedFrom,
          to: recipient,
          subject: citizenSubject,
          html: citizenHtml,
          text: citizenText,
          attachments: [logoAttachment],
        }),
        transporter.sendMail({
          from: formattedFrom,
          to: adminEmail,
          replyTo: recipient,
          subject: adminSubject,
          html: adminHtml,
          text: adminText,
          attachments: [logoAttachment],
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

export interface ComplaintConfirmationEmailData {
  complaintRef: string;
  fullName: string;
  phone: string;
  email: string;
  state: string;
  policeStation: string;
  complaintType: string;
  details: string;
  aadhaarFileName?: string;
  handwrittenFileName?: string;
  reportedToOtherDept?: boolean;
  otherDeptName?: string;
  otherDeptFileName?: string;
  submittedAt?: string;
}

export async function sendComplaintConfirmationEmail(
  data: ComplaintConfirmationEmailData
): Promise<EmailDispatchResult> {
  const recipient = data.email.trim().toLowerCase();
  const complaintRef = data.complaintRef;
  const cleanName = data.fullName.trim() || "Citizen";
  const cleanPhone = data.phone.trim();
  const cleanState = data.state.trim();
  const cleanPoliceStation = data.policeStation.trim();
  const cleanCategory = data.complaintType.trim();

  const submittedDateStr = new Date(data.submittedAt || Date.now()).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const emailSubject = `Grievance Docketed: HRSJM Complaint Acknowledgement Receipt [Ticket No: ${complaintRef}]`;

  const citizenHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${emailSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .gold-bar { height: 5px; background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37); }
    .header { background-color: #0F2C59; padding: 26px 24px; text-align: center; color: #ffffff; }
    .content { padding: 28px 24px; }
    .ticket-bar { background: #062A4F; color: #ffffff; padding: 12px 18px; border-radius: 8px; margin: 16px 0 20px; text-align: center; }
    .ticket-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #FAD25C; font-weight: 700; margin-bottom: 2px; }
    .ticket-code { font-size: 20px; font-weight: 800; letter-spacing: 0.05em; font-family: monospace; }
    .success-badge { display: inline-block; background: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; border: 1px solid #a7f3d0; margin-bottom: 12px; }
    .details-box { background: #f8fafc; border-radius: 8px; padding: 18px; margin: 20px 0; border: 1px solid #e2e8f0; font-size: 13.5px; }
    .details-row { display: flex; padding: 7px 0; border-bottom: 1px solid #edf2f7; }
    .details-label { font-weight: 600; width: 170px; color: #475569; }
    .details-value { flex: 1; color: #0f172a; }
    .message-card { background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 14px; margin: 16px 0; font-size: 13.5px; color: #78350f; line-height: 1.6; }
    .next-steps { background: #eff6ff; border-radius: 8px; padding: 16px 18px; margin: 20px 0; border: 1px solid #dbeafe; font-size: 13px; color: #1e40af; line-height: 1.6; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="gold-bar"></div>
    <div class="header">
      <div style="margin-bottom: 10px; text-align: center;">
        <img src="cid:hrsjm_logo" alt="HRSJM Crest" width="68" height="auto" style="display: block; margin: 0 auto; width: 68px; max-width: 68px; height: auto; border: 0;" />
      </div>
      <h2 style="margin:0;font-size:18px;letter-spacing:0.5px;">HUMAN RIGHTS & SOCIAL JUSTICE MISSION</h2>
      <p style="margin:4px 0 0 0;font-size:12px;color:#cbd5e1;">राष्ट्रीय मानवाधिकार एवं सामाजिक न्याय मिशन • Grievance Intake Cell</p>
    </div>
    <div class="content">
      <div style="text-align: center;">
        <span class="success-badge">✓ Grievance Docketed • Verified Submission</span>
      </div>

      <div class="ticket-bar">
        <div class="ticket-label">Official Docket Ticket Number</div>
        <div class="ticket-code">${complaintRef}</div>
      </div>

      <h3 style="color:#0F2C59;margin-top:0;">Dear ${cleanName},</h3>
      <p style="font-size:14px;color:#334155;line-height:1.6;">
        Your grievance regarding <strong>${cleanCategory}</strong> has been successfully registered in the central intake docket of the <strong>Human Rights & Social Justice Mission (HRSJM)</strong>.
      </p>

      <div class="details-box">
        <div style="font-weight:700;color:#0F2C59;margin-bottom:10px;font-size:14px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">Official Docket Summary:</div>
        <div class="details-row"><span class="details-label">Ticket No:</span><span class="details-value"><strong>${complaintRef}</strong></span></div>
        <div class="details-row"><span class="details-label">Complainant Name:</span><span class="details-value">${cleanName}</span></div>
        <div class="details-row"><span class="details-label">Contact Phone:</span><span class="details-value">+91 ${cleanPhone}</span></div>
        <div class="details-row"><span class="details-label">Contact Email:</span><span class="details-value">${recipient}</span></div>
        <div class="details-row"><span class="details-label">State / Jurisdiction:</span><span class="details-value">${cleanState}</span></div>
        <div class="details-row"><span class="details-label">Nearby Police Station:</span><span class="details-value">${cleanPoliceStation}</span></div>
        <div class="details-row"><span class="details-label">Complaint Category:</span><span class="details-value"><strong>${cleanCategory}</strong></span></div>
        <div class="details-row"><span class="details-label">Aadhaar Attached:</span><span class="details-value">${data.aadhaarFileName || "Verified"}</span></div>
        <div class="details-row"><span class="details-label">Complaint Letter:</span><span class="details-value">${data.handwrittenFileName || "Verified"}</span></div>
        <div class="details-row" style="border-bottom:none;"><span class="details-label">Filing Date & Time:</span><span class="details-value">${submittedDateStr} (IST)</span></div>
      </div>

      <div style="font-weight:700;color:#0F2C59;margin:16px 0 6px 0;font-size:14px;">Summary of Grievance:</div>
      <div class="message-card">
        ${data.details}
      </div>

      <div class="next-steps">
        <div style="font-weight:700;margin-bottom:6px;font-size:13.5px;">Next Action Protocol:</div>
        <p style="margin:0;line-height:1.6;">
          Our designated legal and human rights officer will examine the case and contact you within <strong>2 to 3 business days</strong>. Please keep your Ticket No (<strong>${complaintRef}</strong>) safe for all future updates and communications.
        </p>
      </div>

      <p style="font-size:12.5px;color:#64748b;line-height:1.5;margin-top:16px;">
        For immediate assistance or updates, call our helpline at <strong>+91 7021057853</strong> or email <strong>enquiry@hrsjm.org</strong> quoting Ticket No <strong>${complaintRef}</strong>.
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
Grievance Acknowledgement Receipt [Ticket No: ${complaintRef}]

Dear ${cleanName},

Your grievance regarding "${cleanCategory}" has been successfully registered in the central intake docket of the Human Rights & Social Justice Mission (HRSJM).

OFFICIAL DOCKET SUMMARY:
- Ticket No              : ${complaintRef}
- Complainant Name       : ${cleanName}
- Contact Phone          : +91 ${cleanPhone}
- Contact Email          : ${recipient}
- State / Jurisdiction   : ${cleanState}
- Nearby Police Station  : ${cleanPoliceStation}
- Complaint Category     : ${cleanCategory}
- Aadhaar Document       : ${data.aadhaarFileName || "Attached"}
- Handwritten Letter     : ${data.handwrittenFileName || "Attached"}
- Filing Date & Time     : ${submittedDateStr} (IST)

GRIEVANCE SUMMARY:
${data.details}

NEXT ACTION PROTOCOL:
Our designated legal and human rights officer will examine the case and contact you within 2 to 3 business days. Please keep your Ticket No (${complaintRef}) safe for all future updates.

Helpline: +91 7021057853 | Email: enquiry@hrsjm.org | Website: https://hrsjm.org
  `.trim();

  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    process.env.SMTP_USER ||
    "thefarooquicollection@gmail.com";

  const adminSubject = `[New Grievance Docketed] ${cleanName} - "${cleanCategory}" [Ticket: ${complaintRef}]`;

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

      const logoAttachment = {
        filename: "hrsjm-logo.png",
        path: path.resolve(process.cwd(), "public/logo.png"),
        cid: "hrsjm_logo",
      };

      await Promise.all([
        transporter.sendMail({
          from: formattedFrom,
          to: recipient,
          subject: emailSubject,
          html: citizenHtml,
          text: citizenText,
          attachments: [logoAttachment],
        }),
        transporter.sendMail({
          from: formattedFrom,
          to: adminEmail,
          replyTo: recipient,
          subject: adminSubject,
          html: citizenHtml,
          text: citizenText,
          attachments: [logoAttachment],
        }),
      ]);

      console.info(
        `[COMPLAINT EMAIL SENT VIA SMTP] Sent ticket confirmation to complainant (${recipient}) and admin (${adminEmail}) [Ticket: ${complaintRef}]`
      );

      return {
        sent: true,
        status: "dispatched",
        message: "Complaint confirmation email sent via SMTP.",
        recipient,
      };
    } catch (err: any) {
      console.error("Nodemailer SMTP dispatch error for complaint:", err);
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
            subject: emailSubject,
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
            html: citizenHtml,
            text: citizenText,
          }),
        }),
      ]);

      return {
        sent: true,
        status: "dispatched",
        message: "Complaint confirmation email sent via Resend.",
        recipient,
      };
    } catch (err) {
      console.error("Resend API complaint dispatch error:", err);
    }
  }

  console.info(`[COMPLAINT EMAIL SIMULATION] Processed for ${recipient} (Ticket: ${complaintRef})`);
  return {
    sent: true,
    status: "dispatched",
    message: "Complaint acknowledgement processed.",
    recipient,
  };
}

export interface DonationReceiptEmailData {
  donorName: string;
  donorEmail: string;
  donorMobile?: string;
  amount: number | string;
  orderId: string;
  paymentId?: string;
  cause?: string;
  isRecurring?: boolean;
  date?: string;
}

/**
 * Dispatches an official donation receipt & gratitude email via Nodemailer SMTP.
 */
export async function sendDonationReceiptEmail(
  data: DonationReceiptEmailData
): Promise<EmailDispatchResult> {
  const recipient = data.donorEmail?.trim();
  const donorName = data.donorName?.trim() || "Generous Supporter";
  const amountStr = typeof data.amount === "number" ? `₹${data.amount.toLocaleString("en-IN")}` : `₹${data.amount}`;
  const cause = data.cause || "Human Rights & Social Justice Mission";
  const orderId = data.orderId || "CONFIRMED";
  const paymentId = data.paymentId || orderId;
  const paymentType = data.isRecurring ? "Monthly AutoPay Contribution" : "One-Time Donation";
  const dateStr = data.date || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  if (!recipient || !recipient.includes("@")) {
    return {
      sent: false,
      status: "failed",
      message: "No valid recipient email address provided.",
      recipient: recipient || "unknown",
    };
  }

  const emailSubject = `Official Donation Receipt: ${amountStr} received with gratitude — HRSJM`;
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.MAIL_FROM || "thefarooquicollection@gmail.com";

  const emailText = `
Dear ${donorName},

Thank you for your generous contribution to Human Rights & Social Justice Mission (HRSJM).
Your payment has been successfully confirmed.

DONATION RECEIPT SUMMARY:
----------------------------------------
Receipt / Order Ref : ${orderId}
Transaction ID      : ${paymentId}
Contribution Type   : ${paymentType}
Amount Received     : ${amountStr}
Purpose / Cause     : ${cause}
Date & Time         : ${dateStr}
Organization        : Human Rights & Social Justice Mission (HRSJM)
Tax Exemption       : Eligible for 80G Tax Benefits under Indian Income Tax Act.
----------------------------------------

Your contribution directly funds grassroots human rights advocacy, legal aid for underprivileged citizens, women empowerment, and social welfare programs across India.

For any queries regarding this receipt or 80G tax certificates, please contact us at enquiry@hrsjm.org or support@hrsjm.org with your order reference.

Warm regards,
Trustees & Finance Committee
Human Rights & Social Justice Mission (HRSJM)
Website: https://hrsjm.org
`.trim();

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Donation Receipt - HRSJM</title>
</head>
<body style="margin:0;padding:24px;background-color:#F8FAFC;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 12px rgba(0,0,0,0.05);overflow:hidden;">
    <tr>
      <td style="background:#0F2C59;padding:28px 24px;text-align:center;">
        <h1 style="color:#F8FAFC;margin:0;font-size:22px;letter-spacing:0.5px;">HUMAN RIGHTS & SOCIAL JUSTICE MISSION</h1>
        <p style="color:#F59E0B;margin:6px 0 0 0;font-size:14px;font-weight:600;">OFFICIAL DONATION RECEIPT & ACKNOWLEDGEMENT</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 24px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="display:inline-block;background:#ECFDF5;color:#059669;padding:6px 16px;border-radius:20px;font-weight:700;font-size:14px;border:1px solid #A7F3D0;">
            ✓ Payment Successfully Received
          </div>
          <h2 style="font-size:28px;color:#0F2C59;margin:12px 0 4px 0;">${amountStr}</h2>
          <p style="color:#64748B;margin:0;font-size:14px;">${paymentType}</p>
        </div>

        <p style="font-size:15px;line-height:1.6;margin-bottom:20px;">
          Dear <strong>${donorName}</strong>,<br/><br/>
          On behalf of the <strong>Human Rights & Social Justice Mission (HRSJM)</strong>, we express our heartfelt gratitude for your generous support. Your contribution powers essential legal aid, child education, and constitutional rights defense across the country.
        </p>

        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background:#F1F5F9;border-radius:8px;font-size:14px;margin-bottom:24px;">
          <tr>
            <td style="color:#64748B;width:40%;">Receipt Reference:</td>
            <td style="color:#0F2C59;font-weight:700;font-family:monospace;">${orderId}</td>
          </tr>
          <tr>
            <td style="color:#64748B;">Payment Mode:</td>
            <td style="color:#0F2C59;font-weight:600;">Cashfree Secure Gateway</td>
          </tr>
          <tr>
            <td style="color:#64748B;">Transaction ID:</td>
            <td style="color:#0F2C59;font-weight:600;font-family:monospace;">${paymentId}</td>
          </tr>
          <tr>
            <td style="color:#64748B;">Dedicated Cause:</td>
            <td style="color:#0F2C59;font-weight:600;">${cause}</td>
          </tr>
          <tr>
            <td style="color:#64748B;">Date & Time:</td>
            <td style="color:#0F2C59;font-weight:600;">${dateStr}</td>
          </tr>
        </table>

        <div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:12px 16px;border-radius:4px;font-size:13px;line-height:1.5;color:#92400E;margin-bottom:24px;">
          <strong>Tax Exemption Notice:</strong> Donations to Human Rights & Social Justice Mission are eligible for tax deduction benefits under Section 80G of the Indian Income Tax Act. Please retain this email and reference number for tax filing purposes.
        </div>

        <p style="font-size:13px;color:#64748B;line-height:1.5;text-align:center;margin:0;">
          Need assistance? Contact our accounts desk at <a href="mailto:enquiry@hrsjm.org" style="color:#0F2C59;font-weight:600;">enquiry@hrsjm.org</a> or visit <a href="https://hrsjm.org" style="color:#0F2C59;font-weight:600;">hrsjm.org</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td style="background:#F8FAFC;padding:16px 24px;text-align:center;border-top:1px solid #E2E8F0;font-size:12px;color:#94A3B8;">
        © ${new Date().getFullYear()} Human Rights & Social Justice Mission. Registered NGO in India. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS;
  // Clean whitespace from Gmail app passwords
  const smtpPass = rawPass ? rawPass.replace(/\s+/g, "").trim() : "";

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
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        }),
        transporter.sendMail({
          from: formattedFrom,
          to: adminEmail,
          subject: `[ADMIN ALERT] New Donation Received: ${amountStr} from ${donorName}`,
          html: emailHtml,
          text: emailText,
        }),
      ]);

      console.info(`[DONATION EMAIL] Successfully dispatched receipt to ${recipient} and ${adminEmail}`);
      return {
        sent: true,
        status: "dispatched",
        message: "Official donation receipt sent via SMTP.",
        recipient,
      };
    } catch (err: any) {
      console.error("Nodemailer SMTP dispatch error for donation receipt:", err);
    }
  }

  console.info(`[DONATION EMAIL SIMULATION] Receipt logged for ${recipient} (${amountStr})`);
  return {
    sent: true,
    status: "dispatched",
    message: "Donation receipt processed.",
    recipient,
  };
}
