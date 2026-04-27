import { phoneMalta, phoneMaltaTel, quickContactMalta } from "@/lib/site";

export function SubpageTopBar() {
  return (
    <div className="border-b border-amber-200/40 bg-amber-50/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">
          Quick contact
        </p>
        <p className="text-pretty text-zinc-600">{quickContactMalta}</p>
        <a
          className="font-medium text-brand hover:underline"
          href={`tel:${phoneMaltaTel}`}
        >
          {phoneMalta}
        </a>
      </div>
    </div>
  );
}
