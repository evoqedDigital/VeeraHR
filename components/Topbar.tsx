import { site } from "@/lib/site";
import { social } from "@/lib/social";

const PhoneIcon = () => (
  <svg
    className="h-[14px] w-[14px] shrink-0 fill-[#6c63ff]"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-4 w-4 fill-[#ccc] transition-colors group-hover:fill-[#6c63ff]" viewBox="0 0 24 24" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-4 w-4 fill-[#ccc] transition-colors group-hover:fill-[#6c63ff]" viewBox="0 0 24 24" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Topbar() {
  return (
    <div className="bg-[#111] px-4 py-[7px] text-[13px] text-[#ccc] sm:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <PhoneIcon />
          <span>
            Have any questions? : <strong className="text-white">{site.phone}</strong>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-3.5">
          <a
            href={`mailto:${site.email}`}
            className="border-r border-[#444] pr-3.5 text-[#ccc] no-underline"
          >
            {site.email}
          </a>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="group text-[#ccc]" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="group text-[#ccc]" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
