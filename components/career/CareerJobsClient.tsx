"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAREER_JOBS, type CareerJob } from "@/lib/data/career-jobs";
import { CtaBand } from "@/components/CtaBand";

function filterJobs(
  all: CareerJob[],
  q: string,
  cat: string,
  type: string,
  loc: string,
) {
  return all.filter(
    (j) =>
      (!q || j.title.toLowerCase().includes(q.toLowerCase())) &&
      (!cat || j.category === cat) &&
      (!type || j.type === type) &&
      (!loc || j.location === loc),
  );
}

export function CareerJobsClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [type, setType] = useState("");
  const [loc, setLoc] = useState("");

  const list = useMemo(
    () => filterJobs(CAREER_JOBS, q, cat, type, loc),
    [q, cat, type, loc],
  );

  return (
    <>
      <div
        className="px-4 py-12 text-center sm:px-10"
        style={{ background: "linear-gradient(135deg, #e8e6ff 0%, #f0f0ff 100%)" }}
      >
        <div className="mb-3 text-[13px] font-semibold tracking-wide text-[#6c63ff]">Apply Today</div>
        <h1 className="text-3xl font-extrabold text-[#1a1a3e] sm:text-[40px]">Find A Job That Fits You</h1>
      </div>
      <section className="px-4 py-12 sm:px-10">
        <div className="mb-8 flex flex-wrap gap-3.5">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-md border border-[#ddd] bg-white px-3 py-2.5">
            <svg className="h-4 w-4 shrink-0 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="w-full border-none text-sm text-[#333] outline-none"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select
            className="min-w-[160px] cursor-pointer rounded-md border border-[#ddd] bg-white py-2.5 pr-8 pl-3 text-sm text-[#555] outline-none"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="">All Job Category</option>
            <option value="Security">Security</option>
            <option value="Driving">Driving</option>
            <option value="House keeping">House keeping</option>
            <option value="Cleaning">Cleaning</option>
          </select>
          <select
            className="min-w-[160px] cursor-pointer rounded-md border border-[#ddd] bg-white py-2.5 pr-8 pl-3 text-sm text-[#555] outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
          <select
            className="min-w-[160px] cursor-pointer rounded-md border border-[#ddd] bg-white py-2.5 pr-8 pl-3 text-sm text-[#555] outline-none"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          >
            <option value="">All Job Location</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Masafi">Masafi</option>
          </select>
        </div>
        {list.length === 0 && (
          <p className="py-12 text-center text-sm text-[#999]">No jobs found matching your criteria.</p>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((j) => (
            <div
              key={j.title}
              className="rounded-[10px] border border-[#e8e8e8] bg-white p-5 transition-shadow hover:border-[#a89cff] hover:shadow-[0_6px_24px_rgba(108,99,255,0.12)]"
            >
              <h3 className="mb-3.5 text-sm font-extrabold text-[#1a1a3e] uppercase">{j.title}</h3>
              <div className="mb-4 flex flex-col gap-1.5">
                <span className="text-[13px] text-[#555]">
                  <strong className="text-[#222]">Category:</strong> {j.category}
                </span>
                <span className="text-[13px] text-[#555]">
                  <strong className="text-[#222]">Location:</strong> {j.location}
                </span>
                <span className="text-[13px] text-[#555]">
                  <strong className="text-[#222]">Salary:</strong> {j.salary}
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#e53935] px-3.5 py-2 text-[13px] font-semibold text-white no-underline hover:bg-[#c62828]"
              >
                More Details →
              </Link>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        label="Empower Your Business"
        title="Ready To Transform\nYour Workforce?"
        href="/contact"
        button="Get Started Today →"
      />
    </>
  );
}
