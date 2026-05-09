"use client";

import { useMemo, useState, useTransition } from "react";
import type { CmsUser } from "@/lib/cms/users";
import { deleteUserAction, upsertUserAction } from "@/app/admin/users/actions";

type Draft = {
  email: string;
  role: "admin" | "jobs";
  active: boolean;
};

const emptyDraft: Draft = { email: "", role: "jobs", active: true };

export function UsersManager({ initialUsers }: { initialUsers: CmsUser[] }) {
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return initialUsers;
    return initialUsers.filter((u) => u.email.toLowerCase().includes(s) || u.role.includes(s));
  }, [initialUsers, q]);

  const openNew = () => {
    setMsg(null);
    setDraft({ ...emptyDraft });
  };

  const openEdit = (u: CmsUser) => {
    setMsg(null);
    setDraft({ email: u.email, role: u.role, active: u.active });
  };

  const close = () => setDraft(null);

  const submit = () => {
    if (!draft) return;
    setMsg(null);
    const fd = new FormData();
    fd.set("email", draft.email);
    fd.set("role", draft.role);
    if (draft.active) fd.set("active", "on");
    startTransition(async () => {
      const res = await upsertUserAction(fd);
      if (!res.ok) {
        setMsg({ type: "err", text: res.error });
        return;
      }
      window.location.reload();
    });
  };

  const remove = (email: string) => {
    setMsg(null);
    const fd = new FormData();
    fd.set("email", email);
    startTransition(async () => {
      const res = await deleteUserAction(fd);
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
            placeholder="Search users…"
            className="w-[320px] max-w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
          />
          <span className="text-xs font-semibold text-[#666]">{filtered.length} users</span>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="rounded-lg bg-[#1239D6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          disabled={pending}
        >
          + Add user
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
        <div className="grid grid-cols-[1.6fr_0.6fr_0.6fr_0.8fr] gap-3 border-b border-[#f0f0f0] bg-[#fbfbff] px-4 py-3 text-xs font-bold text-[#333]">
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-[#f5f5f5]">
          {filtered.map((u) => (
            <div key={u.email} className="grid grid-cols-[1.6fr_0.6fr_0.6fr_0.8fr] gap-3 px-4 py-3 text-sm">
              <div className="font-bold text-[#1a1a3e] break-all">{u.email}</div>
              <div className="text-[#444]">{u.role === "admin" ? "Admin" : "Jobs only"}</div>
              <div className={u.active ? "text-[#1b5e20] font-semibold" : "text-[#b71c1c] font-semibold"}>
                {u.active ? "Active" : "Disabled"}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(u)}
                  className="rounded-lg border border-[#ddd] px-3 py-1.5 text-xs font-semibold text-[#444] disabled:opacity-60"
                  disabled={pending}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(u.email)}
                  className="rounded-lg border border-[#ffcdd2] bg-[#ffebee] px-3 py-1.5 text-xs font-semibold text-[#b71c1c] disabled:opacity-60"
                  disabled={pending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-4 py-10 text-center text-sm text-[#666]">No users.</div>}
        </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#eee] px-5 py-4">
              <h2 className="text-lg font-extrabold text-[#1a1a3e]">{draft.email ? "Edit user" : "Add user"}</h2>
              <button type="button" onClick={close} className="rounded-lg border border-[#ddd] px-3 py-1.5 text-sm font-semibold">
                Close
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Email</span>
                <input
                  className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  disabled={Boolean(draft.email && initialUsers.some((u) => u.email === draft.email))}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#333]">Role</span>
                <select
                  className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  value={draft.role}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value as Draft["role"] })}
                >
                  <option value="admin">Admin (all access)</option>
                  <option value="jobs">Jobs only</option>
                </select>
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#333]">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
                />
                Active
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

