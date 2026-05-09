import { loginAction } from "@/app/admin/actions";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const invalid = params.error === "invalid";

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-2xl font-extrabold text-[#1a1a3e]">Admin Login</h1>
      <p className="mb-6 text-sm text-[#666]">Use your admin credentials to manage website content.</p>
      {invalid && <p className="mb-4 rounded-lg bg-[#ffebee] p-3 text-sm text-[#b71c1c]">Invalid password.</p>}
      <form action={loginAction} className="space-y-4 rounded-xl border border-[#eee] bg-white p-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#333]">Username</span>
          <input
            type="text"
            name="username"
            required
            autoComplete="username"
            className="w-full rounded-lg border border-[#ddd] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#333]">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-[#ddd] px-3 py-2.5 text-sm"
          />
        </label>
        <button className="rounded-lg bg-[#1239D6] px-4 py-2.5 text-sm font-semibold text-white" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}
