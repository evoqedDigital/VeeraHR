import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import type { ReactNode } from "react";

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-[#1a1a3e]">{title}</h1>
        <form action={logoutAction}>
          <button className="rounded-lg border border-[#ddd] px-3 py-2 text-sm font-semibold text-[#444]" type="submit">
            Logout
          </button>
        </form>
      </div>
      <nav className="mb-6 flex flex-wrap gap-2">
        {[
          ["/admin", "Dashboard"],
          ["/admin/home", "Home"],
          ["/admin/services", "Services"],
          ["/admin/countries", "Countries"],
          ["/admin/blogs", "Blogs"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="rounded-full border border-[#d9ddf5] bg-white px-3 py-1.5 text-sm font-semibold text-[#1239D6] no-underline"
          >
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </section>
  );
}

export function JsonEditorCard({
  title,
  jsonValue,
  action,
  resetAction,
  saved,
}: {
  title: string;
  jsonValue: string;
  action: (formData: FormData) => Promise<void>;
  resetAction: () => Promise<void>;
  saved: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#eceef7] bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-bold text-[#1a1a3e]">{title}</h2>
      <p className="mb-4 text-sm text-[#666]">
        Edit JSON and save. Keep structure valid. This updates public website content immediately.
      </p>
      {saved && (
        <p className="mb-3 rounded-lg bg-[#e8f5e9] p-2.5 text-sm font-semibold text-[#1b5e20]">
          Saved successfully.
        </p>
      )}
      <form action={action}>
        <textarea
          name="json"
          defaultValue={jsonValue}
          className="min-h-[420px] w-full rounded-lg border border-[#ddd] bg-[#fbfbff] p-3 font-mono text-xs leading-relaxed text-[#222]"
          spellCheck={false}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-lg bg-[#1239D6] px-4 py-2 text-sm font-semibold text-white" type="submit">
            Save changes
          </button>
        </div>
      </form>
      <form action={resetAction} className="mt-2">
        <button className="rounded-lg border border-[#ddd] px-4 py-2 text-sm font-semibold text-[#444]" type="submit">
          Reset to current defaults
        </button>
      </form>
    </div>
  );
}
