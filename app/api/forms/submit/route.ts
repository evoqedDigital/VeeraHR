import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/forms/send-form-email";

type FormKind = "contact" | "callback" | "job-application";

type Attachment = {
  filename: string;
  contentType: string;
  contentBase64: string;
};

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let kind: FormKind | undefined;
    let payload: Record<string, string> | undefined;
    let attachments: Attachment[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const rawKind = form.get("kind");
      kind = typeof rawKind === "string" ? (rawKind as FormKind) : undefined;
      payload = {};

      for (const [key, value] of form.entries()) {
        if (key === "kind" || key === "cv") continue;
        if (typeof value === "string") payload[key] = value;
      }

      const cv = form.get("cv");
      if (cv instanceof File && cv.size > 0) {
        const bytes = await cv.arrayBuffer();
        attachments = [
          {
            filename: cv.name || "cv",
            contentType: cv.type || "application/octet-stream",
            contentBase64: Buffer.from(bytes).toString("base64"),
          },
        ];
      }
    } else {
      const body = (await request.json()) as {
        kind?: FormKind;
        payload?: Record<string, string>;
      };
      kind = body.kind;
      payload = body.payload;
    }

    if (!kind || !payload) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const result = await sendFormEmail(kind, payload, { attachments });
    if (!result.ok) {
      const status = result.reason === "missing_smtp" ? 400 : 500;
      return NextResponse.json({ ok: false, error: result.reason }, { status });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "submit_failed" }, { status: 500 });
  }
}
