import Image from "next/image";

const perks = [
  {
    label: "Instant Booking",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4.5 w-4.5 text-yellow-400"
        aria-hidden="true"
      >
        <path d="M13 2 3 14h7l-1 8 11-13h-8l1-7Z" />
      </svg>
    ),
  },
  {
    label: "Secure & Trusted",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 text-purple-400"
        aria-hidden="true"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Best Prices",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4.5 w-4.5 text-yellow-400"
        aria-hidden="true"
      >
        <path d="M12 2 9.2 8.1 2.5 9l4.9 4.7-1.2 6.8L12 17.2l5.8 3.3-1.2-6.8L21.5 9l-6.7-.9L12 2Z" />
      </svg>
    ),
  },
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0a10]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-studio.jpg"
          alt="Professional photo studio with purple lighting and softboxes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-[#1b0938]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a10] via-[#0b0a10]/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b0a10]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0a10]/80 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[540px] flex-col justify-center px-6 py-20 sm:px-10 lg:px-14">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[64px]">
            Find & Book the Perfect{" "}
            <span className="text-purple-400">Creative</span> Space
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Photography, Filmmaking, Podcasting, Music and more — all in one
            place. Rent professional studios, hassle-free.
          </p>

          <form
            action="#"
            className="mt-10 flex w-full max-w-xl items-center gap-3 rounded-full bg-white p-2 pl-6 shadow-[0_8px_40px_rgba(88,28,135,0.35)]"
          >
            <SearchIcon className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              type="text"
              name="search"
              placeholder="Search for studios (e.g. photography, podcast...)"
              className="h-11 w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-8 text-sm font-semibold text-white transition-colors hover:from-purple-500 hover:to-purple-400"
            >
              Search
            </button>
          </form>

          <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 text-[15px] font-medium text-white">
            {perks.map((perk) => (
              <li key={perk.label} className="flex items-center gap-2.5">
                {perk.icon}
                <span>{perk.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
