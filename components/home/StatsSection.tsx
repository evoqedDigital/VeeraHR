"use client";

import { useCountUp } from "@/hooks/useCountUp";

function Stat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const { ref, value } = useCountUp(end, 1700, true);
  return (
    <div ref={ref} className="text-center">
      <div className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-tight text-[#6c63ff] tabular-nums">
        {value}
        <span className="text-[1.35rem] font-bold sm:text-[1.6rem]">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-medium text-[#555] sm:text-[13px]">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="px-4 py-14 sm:px-10 sm:py-16"
      id="stats"
      style={{
        background:
          "radial-gradient(ellipse 65% 75% at 50% 45%, #e8e6ff 0%, #faf9ff 55%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-10 text-center text-xl font-bold leading-snug text-[#111] sm:mb-12 sm:text-[1.65rem]">
          Let&apos;s grow your business together with skilled talent
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-4 lg:gap-8">
          <Stat end={15} suffix="K+" label="Placements" />
          <Stat end={76} suffix="%" label="Client satisfaction" />
          <Stat end={117} suffix="+" label="Clients worldwide" />
          <Stat end={16} suffix="+" label="Years of experience" />
        </div>
      </div>
    </section>
  );
}
