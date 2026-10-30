import Image from "next/image";

function ZapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M13 2 3 14h7l-1 8 11-13h-8l1-7Z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const perks = [
  {
    title: "Easy Booking",
    sub: "In Seconds",
    icon: <ZapIcon />,
  },
  {
    title: "Trusted &",
    sub: "Secure",
    icon: <ShieldCheckIcon />,
  },
  {
    title: "A Growing",
    sub: "Creative Community",
    icon: <UsersIcon />,
  },
];

export default function Mission() {
  return (
    <section className="bg-white px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pt-20">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative h-72 overflow-hidden rounded-3xl shadow-sm sm:h-96 lg:h-[420px]">
          <Image
            src="/images/luke-greenwood-uZW1GyRLm44-unsplash.jpg"
            alt="StudioSpace creative studio lounge"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="flex items-center gap-3 text-sm font-semibold text-purple-600">
            Our Mission
            <span className="h-[2px] w-10 rounded-full bg-purple-400" />
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-[44px]">
            Making Creativity
            <br />
            More Accessible
          </h2>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-gray-500">
            We believe great ideas deserve the right space. Our mission is to
            bridge the gap between creators and creative spaces by providing a
            seamless, reliable, and transparent booking platform for studios of
            all kinds.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
            {perks.map((perk) => (
              <li key={perk.title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple-100 text-purple-600">
                  {perk.icon}
                </span>
                <span className="text-sm font-semibold leading-snug text-gray-900">
                  {perk.title}
                  <br />
                  {perk.sub}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
