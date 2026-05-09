import { requestAdminOtpAction, verifyAdminOtpAction } from "@/app/admin/actions";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const invalid = params.error === "invalid";
  const invalidEmail = params.error === "invalid_email";
  const invalidCode = params.error === "invalid_code";
  const otpSendFailed = params.error === "otp_send_failed";
  const sent = params.sent === "1";

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-2xl font-extrabold text-[#1a1a3e]">Admin Login</h1>
      <p className="mb-6 text-sm text-[#666]">Sign in with an email verification code.</p>

      {sent && (
        <p className="mb-4 rounded-lg bg-[#e8f5e9] p-3 text-sm font-semibold text-[#1b5e20]">
          Code sent. Check your inbox.
        </p>
      )}
      {(invalidEmail || otpSendFailed) && (
        <p className="mb-4 rounded-lg bg-[#ffebee] p-3 text-sm text-[#b71c1c]">
          {invalidEmail ? "Email is not allowed." : "Failed to send code. Check email setup and try again."}
        </p>
      )}
      {invalidCode && <p className="mb-4 rounded-lg bg-[#ffebee] p-3 text-sm text-[#b71c1c]">Invalid code.</p>}

      <div className="space-y-4 rounded-xl border border-[#eee] bg-white p-5">
        <form action={requestAdminOtpAction} className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#333]">Admin email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#ddd] px-3 py-2.5 text-sm"
            />
          </label>
          <button className="w-full rounded-lg bg-[#1239D6] px-4 py-2.5 text-sm font-semibold text-white" type="submit">
            Send code
          </button>
        </form>

        <div className="h-px bg-[#eee]" />

        <form action={verifyAdminOtpAction} className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#333]">Admin email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#ddd] px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#333]">6-digit code</span>
            <input
              type="text"
              name="code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              required
              className="w-full rounded-lg border border-[#ddd] px-3 py-2.5 text-sm"
              placeholder="123456"
            />
          </label>
          <button className="w-full rounded-lg bg-[#1239D6] px-4 py-2.5 text-sm font-semibold text-white" type="submit">
            Verify & sign in
          </button>
        </form>
      </div>
    </section>
  );
}
