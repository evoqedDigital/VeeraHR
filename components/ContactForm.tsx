"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email(),
  phone: z.string().min(1, "Required"),
  interest: z.string().min(1, "Please select"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type Form = z.infer<typeof schema>;

export function ContactForm() {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!ok) return;
    const t = setTimeout(() => setOk(false), 6000);
    return () => clearTimeout(t);
  }, [ok]);

  const onSubmit = async (values: Form) => {
    setError("");
    setSending(true);
    const res = await fetch("/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "contact", payload: values }),
    });
    setSending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setOk(false);
      if (data?.error === "smtp_auth_failed") {
        setError("Email server authentication failed. Please verify SMTP credentials.");
        return;
      }
      if (data?.error === "smtp_connection_failed") {
        setError("Could not connect to email server. Please check SMTP host/port.");
        return;
      }
      if (data?.error === "missing_smtp") {
        setError("Email server configuration is missing on the website.");
        return;
      }
      if (data?.error === "missing_graph_config") {
        setError("Microsoft Graph email configuration is incomplete.");
        return;
      }
      if (data?.error === "graph_token_failed") {
        setError("Microsoft Graph authentication failed. Please verify Graph app credentials.");
        return;
      }
      if (data?.error === "graph_send_failed") {
        setError("Microsoft Graph could not send the email. Please verify sender permissions.");
        return;
      }
      setError("Could not send your message right now. Please try again.");
      return;
    }
    setOk(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#555]">First Name *</label>
          <input
            className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
            {...register("firstName")}
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#555]">Last Name *</label>
          <input
            className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
            {...register("lastName")}
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-[#555]">Email *</label>
        <input
          type="email"
          className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-[#555]">Phone *</label>
        <input
          className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
          {...register("phone")}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-[#555]">I&apos;m interested in *</label>
        <select
          className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
          defaultValue=""
          {...register("interest")}
        >
          <option value="">Select…</option>
          <option value="hire">Hiring / Staffing</option>
          <option value="job">Find a job</option>
          <option value="pro">PRO & Visas</option>
          <option value="other">Other</option>
        </select>
        {errors.interest && <p className="mt-1 text-xs text-red-500">{errors.interest.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-[#555]">Company</label>
        <input
          className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
          {...register("company")}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-[#555]">Message *</label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-[#e0e0f0] px-3.5 py-2.5 text-sm outline-none focus:border-[#6c63ff]"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={sending}
        className="rounded-lg bg-[#6c63ff] px-8 py-3 text-sm font-bold text-white hover:bg-[#5a52e0]"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
      {ok && (
        <p className="rounded-lg bg-[#e8f5e9] p-3 text-sm font-semibold text-[#2e7d32]">
          Thank you — we&apos;ll be in touch shortly.
        </p>
      )}
      {error && (
        <p className="rounded-lg bg-[#fdecea] p-3 text-sm font-semibold text-[#b42318]">{error}</p>
      )}
    </form>
  );
}
