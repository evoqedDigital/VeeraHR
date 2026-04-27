"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "ok" | "err";

const fields = [
  { name: "name", label: "Name", type: "text" as const, autoComplete: "name" as const },
  {
    name: "company",
    label: "Company Name",
    type: "text" as const,
    autoComplete: "organization" as const,
  },
  { name: "phone", label: "Phone", type: "tel" as const, autoComplete: "tel" as const },
  { name: "email", label: "Email", type: "email" as const, autoComplete: "email" as const },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    const body: Record<string, string> = {};
    fields.forEach((f) => {
      body[f.name] = (data.get(f.name) as string) ?? "";
    });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label
            className="mb-1 block text-sm font-medium text-zinc-700"
            htmlFor={f.name}
          >
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      ))}
      {status === "ok" && (
        <p className="text-sm font-medium text-emerald-700" role="status">
          Thank you — we will be in touch shortly.
        </p>
      )}
      {status === "err" && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please call us or try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Get Updated"}
      </button>
    </form>
  );
}
