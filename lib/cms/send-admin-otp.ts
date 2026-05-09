import "server-only";

import nodemailer from "nodemailer";

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

async function sendViaMicrosoftGraph(to: string, code: string) {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;
  const sender = process.env.GRAPH_SENDER_EMAIL || process.env.SMTP_USER || "admin@veerahr.com";

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

  if (!tokenRes.ok) return { ok: false as const, reason: "graph_token_failed" as const };

  const tokenJson = (await tokenRes.json()) as { access_token?: string };
  if (!tokenJson.access_token) return { ok: false as const, reason: "graph_token_failed" as const };

  const subject = "Veera HR Admin Login Code";
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0f172a,#1d4ed8);padding:18px 22px;color:#fff">
          <h2 style="margin:0;font-size:18px">Admin Login Verification</h2>
        </div>
        <div style="padding:18px 22px;color:#0f172a">
          <p style="margin-top:0">Your one-time login code is:</p>
          <div style="font-size:28px;font-weight:800;letter-spacing:6px;margin:12px 0">${code}</div>
          <p style="margin-bottom:0;color:#475569">This code expires in 10 minutes. If you didn’t request this, you can ignore this email.</p>
        </div>
      </div>
    </div>
  `;

  const sendRes = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenJson.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: to } }],
      },
      saveToSentItems: true,
    }),
  });

  if (!sendRes.ok) return { ok: false as const, reason: "graph_send_failed" as const };
  return { ok: true as const };
}

export async function sendAdminOtpEmail(to: string, code: string) {
  // Prefer Microsoft Graph if configured.
  if (process.env.GRAPH_TENANT_ID && process.env.GRAPH_CLIENT_ID && process.env.GRAPH_CLIENT_SECRET) {
    return sendViaMicrosoftGraph(to, code);
  }

  const transport = getTransport();
  if (!transport) return { ok: false as const, reason: "missing_smtp" as const };

  const from = process.env.FORM_FROM_EMAIL || process.env.SMTP_USER || "admin@veerahr.com";
  try {
    await transport.sendMail({
      from,
      to,
      subject: "Veera HR Admin Login Code",
      text: `Your admin login code is: ${code}\n\nThis code expires in 10 minutes.`,
      html: `<p>Your admin login code is:</p><p style="font-size:24px;font-weight:800;letter-spacing:6px">${code}</p><p>This code expires in 10 minutes.</p>`,
    });
    return { ok: true as const };
  } catch {
    return { ok: false as const, reason: "smtp_send_failed" as const };
  }
}

