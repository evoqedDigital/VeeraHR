import Image from "next/image";

type CountryFlag = { code: string; label: string };

export function OutsourceCountriesSection({ flags }: { flags: readonly CountryFlag[] }) {
  return (
    <section className="px-4 py-12 sm:px-10 sm:py-16" aria-labelledby="outsource-countries-heading">
      <div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[28px] bg-[#dbeafe] px-6 py-10 sm:px-10 sm:py-12">
        {/* Very subtle dotted globe background */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.28)_1px,transparent_1px)] opacity-15"
          style={{ backgroundSize: "16px 16px" }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt=""
          className="pointer-events-none absolute inset-0 m-auto h-[min(100%,400px)] w-full max-w-[920px] object-contain p-4 opacity-[0.06] invert"
        />
        <h2
          id="outsource-countries-heading"
          className="relative z-[1] mb-8 text-center text-xl font-extrabold text-[#111] sm:mb-10 sm:text-2xl"
        >
          Top countries we outsource from
        </h2>
        <div className="relative z-[1] grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {flags.map((row) => (
            <div key={row.code} className="flex flex-col items-center gap-2.5 text-center">
              <div className="relative h-10 w-14 overflow-hidden rounded-sm bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)] sm:h-11 sm:w-16">
                <Image
                  src={`https://flagcdn.com/w160/${row.code}.png`}
                  alt=""
                  fill
                  className="object-contain p-[1px]"
                  sizes="64px"
                />
              </div>
              <span className="text-sm font-bold text-[#111]">{row.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
