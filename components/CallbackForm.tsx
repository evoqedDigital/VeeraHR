"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { brand } from "@/lib/site";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Valid email required"),
  location: z.string().min(1, "Please select a location"),
  jobTitle: z.string().min(1, "Job title is required"),
  sector: z.string().min(1, "Please select a sector"),
});

type FormData = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border border-[#D8DCF0] bg-white px-4 py-3.5 text-sm text-[#12131d] placeholder:text-[#7A7F8F] outline-none transition focus:border-[#1239D6] focus:ring-2 focus:ring-[#1239D6]/20";

export function CallbackForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState("");
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => setShowSuccess(false), 6000);
    return () => clearTimeout(t);
  }, [showSuccess]);

  const onSubmit = async (values: FormData) => {
    setShowError("");
    setSending(true);
    const res = await fetch("/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "callback", payload: values }),
    });
    setSending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setShowSuccess(false);
      if (data?.error === "smtp_auth_failed") {
        setShowError("Email server authentication failed. Please verify SMTP credentials.");
        return;
      }
      if (data?.error === "smtp_connection_failed") {
        setShowError("Could not connect to email server. Please check SMTP host/port.");
        return;
      }
      if (data?.error === "missing_smtp") {
        setShowError("Email server configuration is missing on the website.");
        return;
      }
      if (data?.error === "missing_graph_config") {
        setShowError("Microsoft Graph email configuration is incomplete.");
        return;
      }
      if (data?.error === "graph_token_failed") {
        setShowError("Microsoft Graph authentication failed. Please verify Graph app credentials.");
        return;
      }
      if (data?.error === "graph_send_failed") {
        setShowError("Microsoft Graph could not send the email. Please verify sender permissions.");
        return;
      }
      setShowError("Could not submit right now. Please try again.");
      return;
    }
    setShowSuccess(true);
    reset();
  };

  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:px-10 sm:py-16"
      id="callback"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,18,28,0.62), rgba(14,18,28,0.62)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid overflow-hidden rounded-[22px] border border-white/20 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-[1px] lg:grid-cols-[0.92fr_1.35fr]"
        >
          <div className="hidden bg-black/35 px-8 py-10 text-white lg:block">
            <span className="rounded bg-white/10 px-2 py-1 text-xs font-semibold">Get an Instant Callback</span>
            <h2 className="mt-4 text-[40px] font-extrabold leading-[1.06]">Get In Touch For Seamless Hiring Solutions</h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed">
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#B9C6FF" }}>
                  Address
                </p>
                <p>Al Khaleej Center, Office No: MB31 Near Sharaf DG Metro, Bur Dubai, UAE</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#B9C6FF" }}>
                  Email
                </p>
                <p>admin@veerahr.com</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#B9C6FF" }}>
                  Phone
                </p>
                <p>+971 4288 9597</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F8FA] px-5 py-7 sm:px-8 sm:py-9">
            <div className="mb-5 lg:hidden">
              <span className="rounded bg-[#10131c] px-2 py-1 text-xs font-semibold text-white">Get an Instant Callback</span>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#131623]">Get In Touch For Seamless Hiring Solutions</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Name
              </label>
              <input
                type="text"
                className={fieldClass}
                placeholder="e.g. Oliver Spiteri"
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Company Name
              </label>
              <input
                type="text"
                className={fieldClass}
                placeholder="e.g. Evoqed"
                {...register("company")}
              />
              {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Phone
              </label>
              <input
                type="tel"
                className={fieldClass}
                placeholder="e.g. +44 20 8980 9731"
                autoComplete="tel"
                {...register("phone")}
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Email
              </label>
              <input
                type="email"
                className={fieldClass}
                placeholder="e.g. info@evoqed.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Location
              </label>
              <select
                className={fieldClass}
                defaultValue=""
                {...register("location")}
              >
                <option value="">Select Location</option>
                <option value="dubai">Dubai</option>
                <option value="abu-dhabi">Abu Dhabi</option>
                <option value="sharjah">Sharjah</option>
                <option value="ajman">Ajman</option>
                <option value="other">Other</option>
              </select>
              {errors.location && <p className="mt-1.5 text-xs text-red-600">{errors.location.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Job Title
              </label>
              <input
                type="text"
                className={fieldClass}
                placeholder="e.g. Manager"
                {...register("jobTitle")}
              />
              {errors.jobTitle && <p className="mt-1.5 text-xs text-red-600">{errors.jobTitle.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-left text-sm font-semibold text-[#12162E]">
                Job Sector
              </label>
              <select
                className={fieldClass}
                defaultValue=""
                {...register("sector")}
              >
                <option value="">Select Sector</option>
                <option value="construction">Construction</option>
                <option value="hospitality">Hospitality</option>
                <option value="healthcare">Healthcare</option>
                <option value="security">Security</option>
                <option value="other">Other</option>
              </select>
              {errors.sector && <p className="mt-1.5 text-xs text-red-600">{errors.sector.message}</p>}
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border-none px-7 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              style={{ backgroundColor: brand.primary }}
            >
              {sending ? "Submitting..." : "Get A Callback"}
              <span aria-hidden>↘</span>
            </button>
          </div>

          {showSuccess && (
            <p
              className="mt-5 rounded-xl border border-[#a5d6a7] bg-[#e8f5e9] px-4 py-3.5 text-center text-sm font-semibold text-[#1b5e20]"
              role="status"
            >
              Thank you. Our team will be in touch within 24 hours.
            </p>
          )}
          {showError && (
            <p className="mt-5 rounded-xl border border-[#f2b8b5] bg-[#fff2f2] px-4 py-3.5 text-center text-sm font-semibold text-[#a5312e]">
              {showError}
            </p>
          )}
          </div>
        </form>
      </div>
    </section>
  );
}
