"use client";

import { useMemo, useState, useTransition } from "react";
import type { BlogPost } from "@/lib/data/blog-posts";
import { deleteBlogAction, upsertBlogAction } from "@/app/admin/blogs/actions";

type Draft = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  day: string;
  month: string;
  badge: "purple" | "red";
  href: string;
  content: string;
};

const emptyDraft: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  image: "",
  day: "01",
  month: "JAN",
  badge: "purple",
  href: "",
  content: "",
};

export function BlogsManager({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return initialBlogs;
    return initialBlogs.filter(
      (b) => b.title.toLowerCase().includes(s) || b.slug.toLowerCase().includes(s) || b.excerpt.toLowerCase().includes(s),
    );
  }, [initialBlogs, q]);

  const openNew = () => {
    setMsg(null);
    setDraft({ ...emptyDraft });
  };

  const openEdit = (b: BlogPost) => {
    setMsg(null);
    setDraft({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      image: b.image,
      day: b.day,
      month: b.month,
      badge: b.badge,
      href: b.href,
      content: (b.content ?? []).join("\n"),
    });
  };

  const close = () => setDraft(null);

  const submit = () => {
    if (!draft) return;
    setMsg(null);
    const fd = new FormData();
    if (draft.id) fd.set("id", draft.id);
    fd.set("slug", draft.slug);
    fd.set("title", draft.title);
    fd.set("excerpt", draft.excerpt);
    fd.set("image", draft.image);
    fd.set("day", draft.day);
    fd.set("month", draft.month);
    fd.set("badge", draft.badge);
    fd.set("href", draft.href || `/blog/${draft.slug}`);
    fd.set("content", draft.content);
    startTransition(async () => {
      const res = await upsertBlogAction(fd);
      if (!res.ok) {
        setMsg({ type: "err", text: res.error });
        return;
      }
      window.location.reload();
    });
  };

  const remove = (id: string) => {
    setMsg(null);
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      const res = await deleteBlogAction(fd);
      if (!res.ok) {
        setMsg({ type: "err", text: res.error });
        return;
      }
      window.location.reload();
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#eceef7] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search blogs…"
            className="w-[320px] max-w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
          />
          <span className="text-xs font-semibold text-[#666]">{filtered.length} items</span>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="rounded-lg bg-[#1239D6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          disabled={pending}
        >
          + Add blog
        </button>
      </div>

      {msg && (
        <div
          className={`rounded-xl border p-3 text-sm font-semibold ${
            msg.type === "err" ? "border-[#ffcdd2] bg-[#ffebee] text-[#b71c1c]" : "border-[#c8e6c9] bg-[#e8f5e9] text-[#1b5e20]"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#eceef7] bg-white shadow-sm">
        <div className="grid grid-cols-[1.4fr_1fr_0.7fr_0.7fr] gap-3 border-b border-[#f0f0f0] bg-[#fbfbff] px-4 py-3 text-xs font-bold text-[#333]">
          <div>Title</div>
          <div>Slug</div>
          <div>Date</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-[#f5f5f5]">
          {filtered.map((b) => (
            <div key={b.id} className="grid grid-cols-[1.4fr_1fr_0.7fr_0.7fr] gap-3 px-4 py-3 text-sm">
              <div className="min-w-0">
                <div className="font-bold text-[#1a1a3e] truncate">{b.title}</div>
                <div className="text-xs text-[#777] line-clamp-1">{b.excerpt}</div>
              </div>
              <div className="text-xs text-[#666] break-all">{b.slug}</div>
              <div className="text-[#444]">
                {b.day} {b.month}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(b)}
                  className="rounded-lg border border-[#ddd] px-3 py-1.5 text-xs font-semibold text-[#444] disabled:opacity-60"
                  disabled={pending}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(b.id)}
                  className="rounded-lg border border-[#ffcdd2] bg-[#ffebee] px-3 py-1.5 text-xs font-semibold text-[#b71c1c] disabled:opacity-60"
                  disabled={pending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-4 py-10 text-center text-sm text-[#666]">No blogs found.</div>}
        </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#eee] px-5 py-4">
              <h2 className="text-lg font-extrabold text-[#1a1a3e]">{draft.id ? "Edit blog" : "Add blog"}</h2>
              <button type="button" onClick={close} className="rounded-lg border border-[#ddd] px-3 py-1.5 text-sm font-semibold">
                Close
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto px-5 py-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Slug</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.slug}
                    onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                    placeholder="e.g. hr-compliance-dubai-legal-success"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Href (optional)</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.href}
                    onChange={(e) => setDraft({ ...draft, href: e.target.value })}
                    placeholder="/blog/your-slug"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Title</span>
                <input
                  className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Excerpt</span>
                <textarea
                  className="min-h-[90px] w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.excerpt}
                  onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Image URL</span>
                <input
                  className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.image}
                  onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Day</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.day}
                    onChange={(e) => setDraft({ ...draft, day: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Month</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.month}
                    onChange={(e) => setDraft({ ...draft, month: e.target.value })}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Badge</span>
                  <select
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.badge}
                    onChange={(e) => setDraft({ ...draft, badge: e.target.value as Draft["badge"] })}
                  >
                    <option value="purple">purple</option>
                    <option value="red">red</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Content paragraphs (one per line)</span>
                <textarea
                  className="min-h-[220px] w-full rounded-lg border border-[#ddd] px-3 py-2 font-mono text-xs"
                  value={draft.content}
                  onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                />
              </label>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-[#eee] px-5 py-4">
              <button
                type="button"
                onClick={submit}
                className="rounded-lg bg-[#1239D6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                disabled={pending}
              >
                {pending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

