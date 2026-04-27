import { AdminShell, JsonEditorCard } from "@/app/admin/_components";
import { saveBlogsAction, resetBlogsAction } from "@/app/admin/actions";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getBlogPosts } from "@/lib/data/blog-posts";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdminAuth();
  const params = await searchParams;
  const blogs = await getBlogPosts();

  return (
    <AdminShell title="Manage Blog Content">
      <JsonEditorCard
        title="Blogs JSON"
        jsonValue={JSON.stringify(blogs, null, 2)}
        action={saveBlogsAction}
        resetAction={resetBlogsAction}
        saved={params.saved === "1"}
      />
    </AdminShell>
  );
}
