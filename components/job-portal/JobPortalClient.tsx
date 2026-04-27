"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CtaBand } from "@/components/CtaBand";
import { JOBS, type Job } from "@/lib/data/jobs";

const LOCATIONS = Array.from(new Set(JOBS.map((j) => j.location))).sort();
const CATEGORIES = Array.from(new Set(JOBS.map((j) => j.category))).sort();

export function JobPortalClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [loc, setLoc] = useState("");
  const [sort, setSort] = useState<"newest" | "salary-high" | "salary-low">("newest");
  const [job, setJob] = useState<Job | null>(null);
  const [applyOk, setApplyOk] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let list = JOBS.filter((j) => {
      const s = q.trim().toLowerCase();
      if (s && !j.title.toLowerCase().includes(s) && !j.category.toLowerCase().includes(s)) {
        return false;
      }
      if (cat && j.category !== cat) return false;
      if (loc && j.location !== loc) return false;
      return true;
    });
    if (sort === "salary-high") list = [...list].sort((a, b) => b.salary - a.salary);
    if (sort === "salary-low") list = [...list].sort((a, b) => a.salary - b.salary);
    return list;
  }, [q, cat, loc, sort]);

  const openJob = (j: Job) => {
    setJob(j);
    setApplyOk(false);
    setCvFile(null);
  };
  const closeModal = () => setJob(null);

  const submit = async () => {
    if (!job || !name || !email || !phone) return;
    setSubmitting(true);
    setSubmitError("");
    const formData = new FormData();
    formData.set("kind", "job-application");
    formData.set("jobTitle", job.title);
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("message", message);
    formData.set("cvFileName", cvFile?.name ?? "Not attached");
    if (cvFile) formData.set("cv", cvFile);

    const res = await fetch("/api/forms/submit", {
      method: "POST",
      body: formData,
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setApplyOk(false);
      if (data?.error === "smtp_auth_failed") {
        setSubmitError("Email server authentication failed. Please verify SMTP credentials.");
        return;
      }
      if (data?.error === "smtp_connection_failed") {
        setSubmitError("Could not connect to email server. Please check SMTP host/port.");
        return;
      }
      if (data?.error === "missing_smtp") {
        setSubmitError("Email server configuration is missing on the website.");
        return;
      }
      if (data?.error === "missing_graph_config") {
        setSubmitError("Microsoft Graph email configuration is incomplete.");
        return;
      }
      if (data?.error === "graph_token_failed") {
        setSubmitError("Microsoft Graph authentication failed. Please verify Graph app credentials.");
        return;
      }
      if (data?.error === "graph_send_failed") {
        setSubmitError("Microsoft Graph could not send the email. Please verify sender permissions.");
        return;
      }
      setSubmitError("Could not submit the application right now. Please try again.");
      return;
    }
    setApplyOk(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setCvFile(null);
  };

  useEffect(() => {
    if (job) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <>
      <div
        className="px-4 py-12 text-center text-white sm:px-10"
        style={{ background: "linear-gradient(135deg, #1a1a3e 0%, #3d3580 100%)" }}
      >
        <p className="mb-1 text-xs font-semibold tracking-widest text-[#a89cff] uppercase">
          Open roles
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Find a role with Veera HR</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm text-white/75">
          Search openings, read the full description, and apply in a few steps.
        </p>
      </div>

      <div className="border-b border-[#eee] bg-[#fafafa] px-4 py-4 sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="min-w-0 flex-1 sm:min-w-[200px]">
            <span className="mb-1 block text-[11px] font-semibold text-[#888]">Search</span>
            <input
              className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2.5 text-sm"
              placeholder="Job title or keyword"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <label>
            <span className="mb-1 block text-[11px] font-semibold text-[#888]">Category</span>
            <select
              className="w-full min-w-[140px] rounded-lg border border-[#ddd] bg-white px-3 py-2.5 text-sm sm:w-auto"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option value="">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-[11px] font-semibold text-[#888]">Location</span>
            <select
              className="w-full min-w-[140px] rounded-lg border border-[#ddd] bg-white px-3 py-2.5 text-sm sm:w-auto"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            >
              <option value="">All</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-[11px] font-semibold text-[#888]">Sort</span>
            <select
              className="w-full min-w-[150px] rounded-lg border border-[#ddd] bg-white px-3 py-2.5 text-sm sm:w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <option value="newest">Newest first</option>
              <option value="salary-high">Salary: high to low</option>
              <option value="salary-low">Salary: low to high</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="mb-4 text-sm text-[#666]">
          <span className="font-semibold text-[#1a1a3e]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "opening" : "openings"}
        </p>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-[#999]">No jobs match your filters.</p>
        )}
        <ul className="space-y-3">
          {filtered.map((j) => (
            <li key={j.id}>
              <button
                type="button"
                onClick={() => openJob(j)}
                className="w-full rounded-xl border border-[#eee] bg-white p-4 text-left shadow-sm transition hover:border-[#6c63ff]/40 hover:shadow-md"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-[15px] font-bold text-[#1a1a3e]">{j.title}</span>
                    <p className="text-[13px] text-[#666]">
                      {j.category} · {j.location} · {j.type}
                    </p>
                  </div>
                  <div className="text-sm font-extrabold text-[#6c63ff] sm:text-right">
                    {j.currency} {j.salary.toLocaleString()}
                    <span className="text-xs font-medium text-[#999]"> / mo</span>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-[13px] text-[#777]">{j.desc}</p>
                <span className="mt-2 inline-block text-xs font-semibold text-[#6c63ff]">
                  View details →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CtaBand
        label="Hiring?"
        title="Need talent fast?"
        href="/contact"
        button="Contact us →"
      />

      <AnimatePresence>
        {job && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
            role="presentation"
          >
            <motion.div
              key={job.id}
              className="flex max-h-[95vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-start justify-between gap-2 border-b border-[#f0f0f0] px-5 py-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#1a1a3e]">{job.title}</h2>
                  <p className="text-sm text-[#6c63ff]">
                    {job.location} · {job.currency} {job.salary.toLocaleString()}/mo
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full bg-[#f5f5f5] px-2.5 py-1 text-lg text-[#888] leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <h3 className="mb-2 text-xs font-extrabold tracking-wide text-[#999] uppercase">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-[#555]">{job.desc}</p>
                <h3 className="mb-2 mt-5 text-xs font-extrabold tracking-wide text-[#999] uppercase">
                  Requirements
                </h3>
                <ul className="list-disc space-y-1 pl-4 text-sm text-[#555]">
                  {job.reqs.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h3 className="mb-2 mt-5 text-xs font-extrabold tracking-wide text-[#999] uppercase">
                  Benefits
                </h3>
                <ul className="list-disc space-y-1 pl-4 text-sm text-[#555]">
                  {job.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                {applyOk && (
                  <p className="mb-3 mt-4 rounded-lg bg-[#e8f5e9] p-3 text-center text-sm font-semibold text-[#2e7d32]">
                    Application received. We’ll contact you within 2–3 business days.
                  </p>
                )}
                {submitError && (
                  <p className="mb-3 mt-4 rounded-lg bg-[#fdecea] p-3 text-center text-sm font-semibold text-[#b42318]">
                    {submitError}
                  </p>
                )}
                <div className="mt-6 border-t border-[#eee] pt-5">
                  <h3 className="mb-3 text-sm font-extrabold text-[#1a1a3e]">Apply</h3>
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm"
                      placeholder="Full name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="w-full rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="w-full rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm"
                      placeholder="Phone *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <textarea
                      className="min-h-[88px] w-full rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm"
                      placeholder="Short message (optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div>
                      <span className="mb-1.5 block text-xs font-semibold text-[#666]">CV attachment (optional)</span>
                      <input
                        ref={cvInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                      />
                      <div className="rounded-xl border border-dashed border-[#d9d7ff] bg-[#fafaff] p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => cvInputRef.current?.click()}
                            className="rounded-lg border border-[#6c63ff]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#6c63ff] transition hover:bg-[#f4f2ff]"
                          >
                            {cvFile ? "Change file" : "Upload CV"}
                          </button>
                          {cvFile ? (
                            <>
                              <span className="max-w-[220px] truncate text-xs text-[#555]">{cvFile.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setCvFile(null);
                                  if (cvInputRef.current) cvInputRef.current.value = "";
                                }}
                                className="text-xs font-semibold text-[#e53935]"
                              >
                                Remove
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-[#888]">PDF, DOC, DOCX (max 5 MB)</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        disabled={submitting || !name || !email || !phone}
                        onClick={submit}
                        className="flex-1 rounded-lg bg-[#6c63ff] py-2.5 text-sm font-bold text-white hover:bg-[#5a52e0]"
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-lg border border-[#ddd] px-4 py-2.5 text-sm font-semibold text-[#666]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
