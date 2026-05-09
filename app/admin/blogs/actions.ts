"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { readCmsContent, updateCmsContent } from "@/lib/cms/store";
import { BLOG_POSTS, type BlogPost } from "@/lib/data/blog-posts";

const BlogSchema = z.object({
  id: z.string().min(1).optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().min(1),
  day: z.string().min(1),
  month: z.string().min(1),
  badge: z.enum(["purple", "red"]),
  href: z.string().min(1),
  content: z.array(z.string().min(1)).default([]),
});

function linesToArray(raw: unknown) {
  return String(raw ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function getCurrentBlogs(): Promise<BlogPost[]> {
  const cms = await readCmsContent();
  return Array.isArray(cms.blogs) ? (cms.blogs as BlogPost[]) : BLOG_POSTS;
}

export async function upsertBlogAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });

  const parsed = BlogSchema.safeParse({
    id: (formData.get("id") || undefined) as string | undefined,
    slug: formData.get("slug"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    image: formData.get("image"),
    day: formData.get("day"),
    month: formData.get("month"),
    badge: formData.get("badge"),
    href: formData.get("href"),
    content: linesToArray(formData.get("content")),
  });
  if (!parsed.success) return { ok: false, error: "Invalid blog data." };

  const blogs = await getCurrentBlogs();
  const b = parsed.data;
  const id = b.id ?? crypto.randomUUID();

  const next = (() => {
    const idx = blogs.findIndex((x) => x.id === id);
    const nextBlog: BlogPost = { ...b, id, content: b.content };
    if (idx === -1) return [nextBlog, ...blogs];
    const copy = [...blogs];
    copy[idx] = nextBlog;
    return copy;
  })();

  await updateCmsContent({ blogs: next });
  revalidatePath("/blog");
  revalidatePath(`/blog/${b.slug}`);
  revalidatePath("/admin/blogs");
  return { ok: true };
}

export async function deleteBlogAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "Invalid id." };

  const blogs = await getCurrentBlogs();
  const next = blogs.filter((b) => b.id !== id);
  await updateCmsContent({ blogs: next });
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  return { ok: true };
}

