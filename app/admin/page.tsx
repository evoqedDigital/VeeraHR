import Link from "next/link";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { AdminShell } from "@/app/admin/_components";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  await requireAdminAuth();

  return (
    <AdminShell title="Content Admin">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["/admin/home", "Home content", "Hero media, about image, industries, homepage service cards, process steps."],
          ["/admin/services", "Services page", "Edit exact service titles, descriptions, and image paths."],
          ["/admin/countries", "Countries page", "Manage country list, descriptions, positions, and images."],
          ["/admin/blogs", "Blog articles", "Create/update blog cards and full detail content."],
        ].map(([href, label, desc]) => (
          <Link key={href} href={href} className="rounded-xl border border-[#e8ebf8] bg-white p-5 no-underline">
            <h2 className="text-lg font-bold text-[#1a1a3e]">{label}</h2>
            <p className="mt-1 text-sm text-[#666]">{desc}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
