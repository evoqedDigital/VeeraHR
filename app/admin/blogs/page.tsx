import { AdminShell } from "@/app/admin/_components";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getBlogPosts } from "@/lib/data/blog-posts";
import { BlogsManager } from "@/app/admin/blogs/BlogsManager";

export default async function AdminBlogsPage({
}: {
}) {
  await requireAdminAuth({ roles: ["admin"] });
  const blogs = await getBlogPosts();

  return (
    <AdminShell title="Manage Blog Content">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#666]">Add, edit, and delete blog posts shown on the Blog page.</p>
      </div>
      <BlogsManager initialBlogs={blogs} />
    </AdminShell>
  );
}
