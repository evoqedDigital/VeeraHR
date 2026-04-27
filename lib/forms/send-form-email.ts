import "server-only";
import nodemailer from "nodemailer";

type FormKind = "contact" | "callback" | "job-application";
type Attachment = {
  filename: string;
  contentType: string;
  contentBase64: string;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function toHtml(payload: Record<string, string>) {
  return Object.entries(payload)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v || "-"}</p>`)
    .join("");
}

function titleForKind(kind: FormKind) {
  if (kind === "contact") return "Contact Form";
  if (kind === "callback") return "Callback Request";
  return "Job Application";
}

function adminSubjectForKind(kind: FormKind) {
  if (kind === "contact") return "New Contact Inquiry - Veera HR Website";
  if (kind === "callback") return "New Instant Callback Request - Veera HR Website";
  return "New Job Application - Veera HR Website";
}

function clientSubjectForKind(kind: FormKind) {
  if (kind === "contact") return "We received your inquiry - Veera HR Consultancy";
  if (kind === "callback") return "Your callback request is confirmed - Veera HR Consultancy";
  return "Your job application has been received - Veera HR Consultancy";
}

function clientBodyForKind(kind: FormKind, name: string) {
  if (kind === "contact") {
    return `
      <p style="margin-top:0">Dear ${name || "Valued Client"},</p>
      <p>Thank you for contacting Veera HR Consultancy. We have received your inquiry and our team will review it promptly.</p>
      <p>One of our specialists will respond to you within one business day.</p>
      <p style="margin-bottom:0">Best regards,<br/><strong>Veera HR Consultancy</strong><br/>admin@veerahr.com</p>
    `;
  }
  if (kind === "callback") {
    return `
      <p style="margin-top:0">Dear ${name || "Valued Client"},</p>
      <p>Your callback request has been successfully received by Veera HR Consultancy.</p>
      <p>Our team will contact you shortly to discuss your requirements and next steps.</p>
      <p style="margin-bottom:0">Best regards,<br/><strong>Veera HR Consultancy</strong><br/>admin@veerahr.com</p>
    `;
  }
  return `
    <p style="margin-top:0">Dear ${name || "Applicant"},</p>
    <p>Thank you for applying through Veera HR Consultancy. We have received your application details successfully.</p>
    <p>Our recruitment team will review your profile and contact you if your application matches current opportunities.</p>
    <p style="margin-bottom:0">Best regards,<br/><strong>Veera HR Consultancy Recruitment Team</strong><br/>admin@veerahr.com</p>
  `;
}

function buildAdminTemplate(kind: FormKind, payload: Record<string, string>) {
  const rows = Object.entries(payload)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;color:#0f172a">${k}</td><td style="padding:10px 12px;border:1px solid #e5e7eb;color:#334155">${v || "-"}</td></tr>`,
    )
    .join("");
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0f172a,#1d4ed8);padding:18px 22px;color:#ffffff">
          <h2 style="margin:0;font-size:20px">New ${titleForKind(kind)} Submission</h2>
          <p style="margin:6px 0 0;font-size:13px;opacity:.9">Veera HR Website Notification</p>
        </div>
        <div style="padding:18px 22px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
        </div>
      </div>
    </div>
  `;
}

function buildClientTemplate(kind: FormKind, name: string) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0f172a,#1d4ed8);padding:20px 24px;color:#ffffff">
          <h2 style="margin:0;font-size:22px">${clientSubjectForKind(kind)}</h2>
        </div>
        <div style="padding:22px 24px;color:#334155;font-size:14px;line-height:1.7">
          ${clientBodyForKind(kind, name)}
        </div>
      </div>
    </div>
  `;
}

async function sendViaMicrosoftGraph(
  kind: FormKind,
  payload: Record<string, string>,
  attachments: Attachment[],
) {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;
  const sender = process.env.GRAPH_SENDER_EMAIL || process.env.SMTP_USER || "admin@veerahr.com";
  const to = process.env.FORM_TO_EMAIL || "admin@veerahr.com";

  if (!tenantId || !clientId || !clientSecret) {
    return { ok: false as const, reason: "missing_graph_config" as const };
  }

  const tokenRes = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });

  if (!tokenRes.ok) {
    return { ok: false as const, reason: "graph_token_failed" as const };
  }

  const tokenJson = (await tokenRes.json()) as { access_token?: string };
  if (!tokenJson.access_token) {
    return { ok: false as const, reason: "graph_token_failed" as const };
  }

  const subject = adminSubjectForKind(kind);
  const textBody = Object.entries(payload).map(([k, v]) => `${k}: ${v || "-"}`).join("\n");
  const htmlBody = buildAdminTemplate(kind, payload);

  const sendRes = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenJson.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: "HTML", content: `${htmlBody}<pre>${textBody}</pre>` },
        toRecipients: [{ emailAddress: { address: to } }],
        attachments: attachments.map((file) => ({
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: file.filename,
          contentType: file.contentType,
          contentBytes: file.contentBase64,
        })),
      },
      saveToSentItems: true,
    }),
  });

  if (!sendRes.ok) {
    return { ok: false as const, reason: "graph_send_failed" as const };
  }

  const clientEmail = payload.email;
  if (clientEmail) {
    const ackSubject = clientSubjectForKind(kind);
    const ackName = payload.name || payload.firstName || "Valued Client";
    await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: ackSubject,
          body: { contentType: "HTML", content: buildClientTemplate(kind, ackName) },
          toRecipients: [{ emailAddress: { address: clientEmail } }],
        },
        saveToSentItems: true,
      }),
    });
  }

  return { ok: true as const };
}

export async function sendFormEmail(
  kind: FormKind,
  payload: Record<string, string>,
  options?: { attachments?: Attachment[] },
) {
  const attachments = options?.attachments ?? [];

  // Prefer Microsoft Graph if configured to avoid SMTP AUTH restrictions.
  if (process.env.GRAPH_TENANT_ID && process.env.GRAPH_CLIENT_ID && process.env.GRAPH_CLIENT_SECRET) {
    return sendViaMicrosoftGraph(kind, payload, attachments);
  }

  const transport = getTransport();
  if (!transport) return { ok: false, reason: "missing_smtp" as const };

  const to = process.env.FORM_TO_EMAIL || "admin@veerahr.com";
  const from = process.env.FORM_FROM_EMAIL || process.env.SMTP_USER || "admin@veerahr.com";
  const subject = adminSubjectForKind(kind);

  try {
    await transport.sendMail({
      from,
      to,
      subject,
      text: Object.entries(payload).map(([k, v]) => `${k}: ${v || "-"}`).join("\n"),
      html: buildAdminTemplate(kind, payload),
      attachments: attachments.map((file) => ({
        filename: file.filename,
        contentType: file.contentType,
        content: Buffer.from(file.contentBase64, "base64"),
      })),
    });

    const clientEmail = payload.email;
    if (clientEmail) {
      const ackName = payload.name || payload.firstName || "Valued Client";
      await transport.sendMail({
        from,
        to: clientEmail,
        subject: clientSubjectForKind(kind),
        text: `Dear ${ackName},\n\nYour ${titleForKind(kind).toLowerCase()} has been received by Veera HR Consultancy. Our team will follow up shortly.\n\nBest regards,\nVeera HR Consultancy`,
        html: buildClientTemplate(kind, ackName),
      });
    }

    return { ok: true as const };
  } catch (error: unknown) {
    const err = error as { code?: string; responseCode?: number };
    if (err?.code === "EAUTH" || err?.responseCode === 535) {
      return { ok: false as const, reason: "smtp_auth_failed" as const };
    }
    if (err?.code === "ETIMEDOUT" || err?.code === "ECONNECTION") {
      return { ok: false as const, reason: "smtp_connection_failed" as const };
    }
    return { ok: false as const, reason: "smtp_send_failed" as const };
  }
}
