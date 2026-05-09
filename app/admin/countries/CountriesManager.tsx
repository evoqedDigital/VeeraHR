"use client";

import { useMemo, useState, useTransition } from "react";
import type { CountryRow } from "@/lib/data/countries";
import { deleteCountryAction, upsertCountryAction } from "@/app/admin/countries/actions";

type Draft = {
  index: number | null;
  name: string;
  description: string;
  image: string;
  cityLabel: string;
  imageLeft: boolean;
  positions: string;
};

const emptyDraft: Draft = {
  index: null,
  name: "",
  description: "",
  image: "",
  cityLabel: "Top cities we serve",
  imageLeft: true,
  positions: "",
};

export function CountriesManager({ initialCountries }: { initialCountries: CountryRow[] }) {
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return initialCountries;
    return initialCountries.filter((c) => c.name.toLowerCase().includes(s) || c.description.toLowerCase().includes(s));
  }, [initialCountries, q]);

  const openNew = () => {
    setMsg(null);
    setDraft({ ...emptyDraft });
  };

  const openEdit = (index: number, c: CountryRow) => {
    setMsg(null);
    setDraft({
      index,
      name: c.name,
      description: c.description,
      image: c.image,
      cityLabel: c.cityLabel ?? "",
      imageLeft: c.imageLeft,
      positions: (c.positions ?? []).join("\n"),
    });
  };

  const close = () => setDraft(null);

  const submit = () => {
    if (!draft) return;
    setMsg(null);
    const fd = new FormData();
    if (draft.index !== null) fd.set("index", String(draft.index));
    fd.set("name", draft.name);
    fd.set("description", draft.description);
    fd.set("image", draft.image);
    fd.set("cityLabel", draft.cityLabel);
    if (draft.imageLeft) fd.set("imageLeft", "on");
    fd.set("positions", draft.positions);
    startTransition(async () => {
      const res = await upsertCountryAction(fd);
      if (!res.ok) {
        setMsg({ type: "err", text: res.error });
        return;
      }
      window.location.reload();
    });
  };

  const remove = (index: number) => {
    setMsg(null);
    const fd = new FormData();
    fd.set("index", String(index));
    startTransition(async () => {
      const res = await deleteCountryAction(fd);
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
            placeholder="Search countries…"
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
          + Add country
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
        <div className="grid grid-cols-[1fr_2fr_1.2fr_0.7fr] gap-3 border-b border-[#f0f0f0] bg-[#fbfbff] px-4 py-3 text-xs font-bold text-[#333]">
          <div>Name</div>
          <div>Description</div>
          <div>Flag/Image</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-[#f5f5f5]">
          {filtered.map((c, idx) => (
            <div key={`${c.name}-${idx}`} className="grid grid-cols-[1fr_2fr_1.2fr_0.7fr] gap-3 px-4 py-3 text-sm">
              <div className="font-bold text-[#1a1a3e]">{c.name}</div>
              <div className="text-[#555] line-clamp-2">{c.description}</div>
              <div className="text-xs text-[#666] break-all">{c.image}</div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(idx, c)}
                  className="rounded-lg border border-[#ddd] px-3 py-1.5 text-xs font-semibold text-[#444] disabled:opacity-60"
                  disabled={pending}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="rounded-lg border border-[#ffcdd2] bg-[#ffebee] px-3 py-1.5 text-xs font-semibold text-[#b71c1c] disabled:opacity-60"
                  disabled={pending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-4 py-10 text-center text-sm text-[#666]">No countries found.</div>}
        </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#eee] px-5 py-4">
              <h2 className="text-lg font-extrabold text-[#1a1a3e]">{draft.index === null ? "Add country" : "Edit country"}</h2>
              <button type="button" onClick={close} className="rounded-lg border border-[#ddd] px-3 py-1.5 text-sm font-semibold">
                Close
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Name</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">Image / flag URL</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Description</span>
                <textarea
                  className="min-h-[120px] w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#333]">City label (optional)</span>
                  <input
                    className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    value={draft.cityLabel}
                    onChange={(e) => setDraft({ ...draft, cityLabel: e.target.value })}
                  />
                </label>
                <label className="inline-flex items-center gap-2 pt-7 text-sm font-semibold text-[#333]">
                  <input
                    type="checkbox"
                    checked={draft.imageLeft}
                    onChange={(e) => setDraft({ ...draft, imageLeft: e.target.checked })}
                  />
                  Image on left
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Positions / Cities (one per line)</span>
                <textarea
                  className="min-h-[160px] w-full rounded-lg border border-[#ddd] px-3 py-2 font-mono text-xs"
                  value={draft.positions}
                  onChange={(e) => setDraft({ ...draft, positions: e.target.value })}
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

