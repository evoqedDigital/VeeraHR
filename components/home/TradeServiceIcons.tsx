import type { ReactNode } from "react";

const c = "text-[#6c63ff]";

/** Line-style icons for homepage “Our Services” trade cards. */
export const tradeServiceIcons: ReactNode[] = [
  <svg key="ac" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="8" width="8" height="6" rx="1" />
    <path d="M5 6V5a2 2 0 0 1 2-2h1.5M11 3h.5" />
    <path d="M6 8h.5M6 10h.5M6 12h.5" />
    <rect x="14" y="10" width="7" height="8" rx="1" />
    <line x1="4" y1="20" x2="4" y2="14" />
    <line x1="9" y1="20" x2="9" y2="14" />
  </svg>,
  <svg key="paint" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="3" width="5" height="5" rx="0.5" />
    <path d="M9 4h9v4H9" />
    <line x1="4" y1="5.5" x2="2" y2="5.5" />
    <line x1="2" y1="5.5" x2="2" y2="8" />
    <line x1="2" y1="8" x2="4" y2="8" />
  </svg>,
  <svg key="pipe" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h4v4H4z" />
    <path d="M8 6h4v2H8" />
    <path d="M12 4h4v4" />
    <path d="M8 8v4h3v2" />
    <path d="M11 14v2h-3v2" />
    <line x1="4" y1="20" x2="8" y2="20" />
  </svg>,
  <svg key="garden" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v3" />
    <path d="M8 5c0 1.5 1 3.5 4 3.5s4-2 4-3.5" />
    <path d="M8 5c-2 0-3 1.5-3 3.5 0 2 1.5 3.5 3.5 3.5" />
    <path d="M16 5c2 0 3 1.5 3 3.5 0 2-1.5 3.5-3.5 3.5" />
    <path d="M6 20h12" />
    <path d="M9 20s0-3 1.5-5" />
    <path d="M12 20s-1-4-1-5" />
    <path d="M15 20s0-3-1.5-5" />
  </svg>,
  <svg key="clean" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 20h12l2-2M5 20l-2-2" />
    <line x1="3" y1="18" x2="3" y2="16" />
    <path d="M7 3l1 1 1-1" />
    <line x1="8" y1="4" x2="8" y2="14" />
  </svg>,
  <svg key="drive" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <line x1="12" y1="4" x2="12" y2="6" />
    <line x1="4" y1="12" x2="6" y2="12" />
    <line x1="20" y1="12" x2="18" y2="12" />
  </svg>,
  <svg key="deliver" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="6" width="6" height="4" rx="0.5" />
    <rect x="3" y="15" width="4" height="3" rx="0.5" />
    <rect x="8" y="12" width="4" height="3" rx="0.5" />
    <path d="M6 6V4h8v8h-2" />
    <line x1="5" y1="20" x2="5" y2="18" />
    <line x1="4" y1="20" x2="10" y2="20" />
  </svg>,
  <svg key="life" className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <path d="M12 3v1M12 20v1M3 12h1M20 12h1" />
  </svg>,
];
