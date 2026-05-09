"use client";

import { useMemo, useState, useTransition } from "react";
import type { Job } from "@/lib/data/jobs";
import { deleteJobAction, upsertJobAction } from "@/app/admin/jobs/actions";

type Draft = {
  id?: number;
  title: string;
  category: string;
  type: Job["type"];
  location: string;
  salary: number;
  currency: Job["currency"];
  experience: Job["experience"];
  featured: boolean;
  isNew: boolean;
  posted: string;
  logo: string;
  desc: string;
  reqs: string;
  benefits: string;
};

function jobToDraft(j: Job): Draft {
  return {
    id: j.id,
    title: j.title,
    category: j.category,
    type: j.type,
    location: j.location,
    salary: j.salary,
    currency: j.currency,
    experience: j.experience,
    featured: j.featured,
    isNew: j.isNew,
    posted: j.posted,
    logo: j.logo,
    desc: j.desc,
    reqs: (j.reqs ?? []).join("\n"),
    benefits: (j.benefits ?? []).join("\n"),
  };
}

const emptyDraft: Draft = {
  title: "",
  category: "",
  type: "Full Time",
  location: "",
  salary: 0,
  currency: "AED",
  experience: "1-3",
  featured: false,
  isNew: false,
  posted: "Today",
  logo: "VH",
  desc: "",
  reqs: "",
  benefits: "",
};

export function JobsManager({ initialJobs }: { initialJobs: Job[] }) {
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState<string>("");
  const [okMsg, setOkMsg] = useState<string>("");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return initialJobs;
    return initialJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(s) ||
        j.category.toLowerCase().includes(s) ||
        j.location.toLowerCase().includes(s),
    );
  }, [initialJobs, q]);

  const openNew = () => {
    setError("");
    setOkMsg("");
    setDraft({ ...emptyDraft });
  };

  const openEdit = (j: Job) => {
    setError("");
    setOkMsg("");
    setDraft(jobToDraft(j));
  };

  const close = () => setDraft(null);

  const submit = () => {
    if (!draft) return;
    setError("");
    setOkMsg("");

    const fd = new FormData();
    if (draft.id) fd.set("id", String(draft.id));
    fd.set("title", draft.title);
    fd.set("category", draft.category);
    fd.set("type", draft.type);
    fd.set("location", draft.location);
    fd.set("salary", String(draft.salary));
    fd.set("currency", draft.currency);
    fd.set("experience", draft.experience);
    if (draft.featured) fd.set("featured", "on");
    if (draft.isNew) fd.set("isNew", "on");
    fd.set("posted", draft.posted);
    fd.set("logo", draft.logo);
    fd.set("desc", draft.desc);
    fd.set("reqs", draft.reqs);
    fd.set("benefits", draft.benefits);

    startTransition(async () => {
      const res = await upsertJobAction(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setOkMsg(draft.id ? "Updated job." : "Created job.");
      // Data is revalidated server-side; user can refresh list after closing.
      close();
      window.location.reload();
    });
  };

  const remove = (id: number) => {
    setError("");
    setOkMsg("");
    const fd = new FormData();
    fd.set("id", String(id));
    startTransition(async () => {
      const res = await deleteJobAction(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setOkMsg("Deleted job.");
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
            placeholder="Search by title, category, or location…"
            className="w-[320px] max-w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
          />
          <span className="text-xs font-semibold text-[#666]">{filtered.length} jobs</span>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="rounded-lg bg-[#1239D6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          disabled={pending}
        >
          + Add job
        </button>
      </div>

      {(error || okMsg) && (
        <div
          className={`rounded-xl border p-3 text-sm font-semibold ${
            error ? "border-[#ffcdd2] bg-[#ffebee] text-[#b71c1c]" : "border-[#c8e6c9] bg-[#e8f5e9] text-[#1b5e20]"
          }`}
        >
          {error || okMsg}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#eceef7] bg-white shadow-sm">
        <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.6fr_0.7fr_0.6fr] gap-3 border-b border-[#f0f0f0] bg-[#fbfbff] px-4 py-3 text-xs font-bold text-[#333]">
          <div>Title</div>
          <div>Category</div>
          <div>Location</div>
          <div>Type</div>
          <div>Salary</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-[#f5f5f5]">
          {filtered.map((j) => (
            <div
              key={j.id}
              className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.6fr_0.7fr_0.6fr] gap-3 px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1a1a3e] truncate">{j.title}</span>
                  {j.featured && <span className="rounded-full bg-[#fff3e0] px-2 py-0.5 text-[11px] font-extrabold text-[#ef6c00]">Featured</span>}
                  {j.isNew && <span className="rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[11px] font-extrabold text-[#1565c0]">New</span>}
                </div>
                <div className="mt-0.5 text-xs text-[#777]">Posted: {j.posted}</div>
              </div>
              <div className="text-[#444]">{j.category}</div>
              <div className="text-[#444]">{j.location}</div>
              <div className="text-[#444]">{j.type}</div>
              <div className="font-extrabold text-[#6c63ff]">
                {j.currency} {j.salary.toLocaleString()}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(j)}
                  className="rounded-lg border border-[#ddd] px-3 py-1.5 text-xs font-semibold text-[#444] disabled:opacity-60"
                  disabled={pending}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(j.id)}
                  className="rounded-lg border border-[#ffcdd2] bg-[#ffebee] px-3 py-1.5 text-xs font-semibold text-[#b71c1c] disabled:opacity-60"
                  disabled={pending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-4 py-10 text-center text-sm text-[#666]">No jobs found.</div>}
        </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#eee] px-5 py-4">
              <h2 className="text-lg font-extrabold text-[#1a1a3e]">{draft.id ? "Edit job" : "Add job"}</h2>
              <button type="button" onClick={close} className="rounded-lg border border-[#ddd] px-3 py-1.5 text-sm font-semibold">
                Close
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Title</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Category</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Location</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.location}
                    onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Type</span>
                  <select
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.type}
                    onChange={(e) => setDraft({ ...draft, type: e.target.value as Draft["type"] })}
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Salary</span>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.salary}
                    onChange={(e) => setDraft({ ...draft, salary: Number(e.target.value) })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Currency</span>
                  <select
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.currency}
                    onChange={(e) => setDraft({ ...draft, currency: e.target.value as Draft["currency"] })}
                  >
                    <option value="AED">AED</option>
                    <option value="USD">USD</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Experience</span>
                  <select
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.experience}
                    onChange={(e) => setDraft({ ...draft, experience: e.target.value as Draft["experience"] })}
                  >
                    <option value="fresher">Fresher</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Posted (text)</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.posted}
                    onChange={(e) => setDraft({ ...draft, posted: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Logo letters</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.logo}
                    onChange={(e) => setDraft({ ...draft, logo: e.target.value })}
                  />
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#333]">
                  <input
                    type="checkbox"
                    checked={draft.featured}
                    onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#333]">
                  <input type="checkbox" checked={draft.isNew} onChange={(e) => setDraft({ ...draft, isNew: e.target.checked })} />
                  New badge
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Short description</span>
                <textarea
                  className="min-h-[90px] w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.desc}
                  onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
                />
              </label>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Requirements (one per line)</span>
                  <textarea
                    className="min-h-[160px] w-full rounded-lg border border-[#ddd] px-3 py-2 font-mono text-xs"
                    value={draft.reqs}
                    onChange={(e) => setDraft({ ...draft, reqs: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Benefits (one per line)</span>
                  <textarea
                    className="min-h-[160px] w-full rounded-lg border border-[#ddd] px-3 py-2 font-mono text-xs"
                    value={draft.benefits}
                    onChange={(e) => setDraft({ ...draft, benefits: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#eee] px-5 py-4">
              <button
                type="button"
                onClick={submit}
                className="rounded-lg bg-[#1239D6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                disabled={pending}
              >
                {pending ? "Saving…" : "Save job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

