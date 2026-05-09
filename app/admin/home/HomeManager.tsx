"use client";

import { useMemo, useState, useTransition } from "react";
import type { HomeContent } from "@/lib/data/home";
import { saveHomeAction } from "@/app/admin/actions";

type CardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Card({ title, description, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-[#eceef7] bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-[#1a1a3e]">{title}</h2>
      {description && <p className="mt-1 text-sm text-[#666]">{description}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function listToLines(list: readonly string[]) {
  return (list ?? []).join("\n");
}

export function HomeManager({ initialHome }: { initialHome: HomeContent }) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [heroPoster, setHeroPoster] = useState(initialHome.heroPoster);
  const [aboutImage, setAboutImage] = useState(initialHome.aboutImage);
  const [whyImage, setWhyImage] = useState(initialHome.whyImage);
  const [heroVideoSources, setHeroVideoSources] = useState(listToLines(initialHome.heroVideoSources as string[]));

  const payload = useMemo(() => {
    return {
      heroPoster,
      aboutImage,
      whyImage,
      heroVideoSources: heroVideoSources
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      industries: initialHome.industries,
      homeServices: initialHome.homeServices,
      outsourceCountryFlags: initialHome.outsourceCountryFlags,
      hrProcessSteps: initialHome.hrProcessSteps,
      whyFeatures: initialHome.whyFeatures,
      testimonials: initialHome.testimonials,
    };
  }, [aboutImage, heroPoster, heroVideoSources, initialHome, whyImage]);

  const save = () => {
    setMsg(null);
    const fd = new FormData();
    fd.set("json", JSON.stringify(payload));
    startTransition(async () => {
      try {
        await saveHomeAction(fd);
      } catch {
        setMsg({ type: "err", text: "Failed to save. Check values and try again." });
        return;
      }
      setMsg({ type: "ok", text: "Saved." });
      window.location.reload();
    });
  };

  return (
    <div className="space-y-4">
      {msg && (
        <div
          className={`rounded-xl border p-3 text-sm font-semibold ${
            msg.type === "err" ? "border-[#ffcdd2] bg-[#ffebee] text-[#b71c1c]" : "border-[#c8e6c9] bg-[#e8f5e9] text-[#1b5e20]"
          }`}
        >
          {msg.text}
        </div>
      )}

      <Card title="Home Media" description="Update hero poster and images used on the homepage.">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#333]">Hero poster URL</span>
            <input
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
              value={heroPoster}
              onChange={(e) => setHeroPoster(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#333]">About image URL</span>
            <input
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
              value={aboutImage}
              onChange={(e) => setAboutImage(e.target.value)}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-[#333]">Why image URL</span>
            <input
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
              value={whyImage}
              onChange={(e) => setWhyImage(e.target.value)}
            />
          </label>
        </div>
      </Card>

      <Card title="Hero Videos" description="One video path/URL per line.">
        <textarea
          className="min-h-[140px] w-full rounded-lg border border-[#ddd] bg-[#fbfbff] p-3 font-mono text-xs leading-relaxed"
          value={heroVideoSources}
          onChange={(e) => setHeroVideoSources(e.target.value)}
          spellCheck={false}
        />
      </Card>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-[#1239D6] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Saving…" : "Save home"}
        </button>
      </div>

      <div className="rounded-2xl border border-[#ffe0b2] bg-[#fff8e1] p-4 text-sm text-[#7a4d00]">
        This Home editor is now form-based for the main media fields. If you want the rest of the Home sections (industries,
        services, steps, testimonials) to also have Add/Edit/Delete screens like Jobs, tell me which sections you edit most
        and I’ll convert them next.
      </div>
    </div>
  );
}

