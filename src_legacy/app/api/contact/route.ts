import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Hook up email/CRM in production: e.g. Resend, SendGrid, or forward to a mailbox.
  console.info("contact form", body);
  return NextResponse.json({ ok: true });
}
