"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "info" as const, label: "Personal Info" },
  { id: "docs" as const, label: "Documents" },
  { id: "activity" as const, label: "Activity" },
];

export function ProfileClient() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("info");

  return (
    <section className="grid grid-cols-1 items-start gap-10 px-4 py-14 sm:px-10 lg:grid-cols-[300px_1fr] lg:gap-12">
      <div
        className="sticky top-[90px] rounded-[20px] bg-gradient-to-br from-[#6c63ff] to-[#a89cff] px-6 py-8 text-center text-white lg:px-6"
        style={{ background: "linear-gradient(145deg, #6c63ff, #a89cff)" }}
      >
        <div className="mx-auto mb-3.5 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[3px] border-white/50 bg-white/25 text-4xl font-extrabold">
          V
        </div>
        <h3 className="mb-0.5 text-xl font-extrabold">Veera HR Client</h3>
        <div className="mb-4 text-xs tracking-wider text-white/80 uppercase">Registered Partner</div>
        <div className="mb-4 grid grid-cols-2 gap-2.5 text-left">
          {[
            ["12", "Applications"],
            ["4", "Active Jobs"],
            ["3", "Placements"],
            ["UAE", "Region"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-[10px] px-2.5 py-2.5 text-center"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <div className="text-lg font-extrabold">{n}</div>
              <div className="text-[10px] text-white/80 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full cursor-pointer rounded-[20px] border-none bg-white py-2.5 text-sm font-bold text-[#6c63ff] hover:bg-[#f0eeff]"
        >
          Edit Profile
        </button>
      </div>

      <div>
        <h2 className="mb-1.5 text-xl font-extrabold sm:text-[26px]">
          My <span className="text-[#6c63ff]">Dashboard</span>
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-[#777]">
          Manage your profile, documents, and track your recruitment activity with Veera HR Consultancy.
        </p>
        <div className="mb-7 flex flex-wrap border-b-2 border-[#eee]">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`-mb-0.5 cursor-pointer border-b-2 border-transparent bg-transparent px-4 py-2.5 text-sm font-semibold ${
                tab === t.id
                  ? "border-[#6c63ff] text-[#6c63ff]"
                  : "text-[#888] hover:text-[#6c63ff]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "info" && (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Full Name",
                "Email Address",
                "Phone Number",
                "Nationality",
                "Job Category",
                "Current Location",
                "Years of Experience",
                "Member Since",
              ].map((l) => (
                <div key={l} className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold tracking-wide text-[#bbb] uppercase">
                    {l}
                  </span>
                  <span className="text-sm font-medium text-[#333]">—</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#1a1a3e] to-[#2d2d6e] px-6 py-2.5 text-sm font-bold text-white no-underline"
                style={{ background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d6e 100%)" }}
              >
                Update My Info →
              </Link>
            </div>
          </div>
        )}
        {tab === "docs" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Passport Copy", s: "Uploaded · Verified", ok: true },
              { t: "CV / Resume", s: "Click to upload", ok: false },
              { t: "Emirates ID", s: "Click to upload", ok: false },
              { t: "Educational Cert.", s: "Click to upload", ok: false },
              { t: "Experience Letter", s: "Click to upload", ok: false },
              { t: "Other Document", s: "Click to upload", ok: false },
            ].map((d) => (
              <div
                key={d.t}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-colors ${
                  d.ok
                    ? "border-[#a5d6a7] bg-[#f1fff4]"
                    : "border-[#ddd] hover:border-[#6c63ff]"
                }`}
              >
                <div
                  className={`mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-lg ${
                    d.ok ? "bg-[#e8f5e9]" : "bg-[#f0eeff]"
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${d.ok ? "fill-[#2e7d32]" : "fill-[#6c63ff]"}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold">{d.t}</h4>
                <p className="text-[11px] text-[#aaa]">{d.s}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "activity" && (
          <div className="flex flex-col gap-3.5">
            {[
              { c: "green", t: "Profile created successfully", s: "Welcome to Veera HR Consultancy" },
              {
                c: "purple",
                t: "Application submitted — Security Supervisor",
                s: "Location: Masafi · Salary: AED 4000",
              },
              { c: "purple", t: "Document requested — Passport Copy", s: "Please upload for verification" },
              { c: "green", t: "Passport Copy verified", s: "Document approved by our team" },
              { c: "red", t: "Action required", s: "Complete your profile" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-[#f7f7ff] p-3.5">
                <div
                  className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    a.c === "green" ? "bg-[#43a047]" : a.c === "red" ? "bg-[#e53935]" : "bg-[#6c63ff]"
                  }`}
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#333]">{a.t}</h4>
                  <span className="text-xs text-[#aaa]">{a.s}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
