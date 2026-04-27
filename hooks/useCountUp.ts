"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: number,
  duration = 1600,
  startWhenVisible = true,
) {
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(!startWhenVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startWhenVisible) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startWhenVisible]);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(end * eased);
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration]);

  return { ref, value: Math.round(value) };
}
