import Image from "next/image";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#15111d]">
      <div className="absolute inset-y-0 right-0 hidden w-[55%] md:block">
        <Image
          src="/images/hero-studio.jpg"
          alt="Neon-lit creative studio with softbox lighting"
          fill
          priority
          sizes="55vw"
          className="object-cover object-[65%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15111d] via-[#15111d]/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#131217] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 pb-28 pt-10 sm:px-10 lg:px-14 lg:pb-40">
        <div className="max-w-xl">
          <span className="flex items-center gap-3 text-sm font-semibold text-purple-400">
            About Us
            <span className="h-[2px] w-10 rounded-full bg-purple-400" />
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[54px]">
            Empowering Creators with the{" "}
            <span className="text-purple-400">Perfect Space</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-[17px]">
            StudioSpace is a premier marketplace for creative spaces,
            connecting studio owners with creators, and making
            professional-grade studios accessible to everyone.
          </p>

          <Link
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.4)] transition-transform hover:scale-[1.03]"
          >
            Explore Studios
            <ArrowIcon />
          </Link>
        </div>

        <div className="relative mt-10 h-56 w-full overflow-hidden rounded-2xl md:hidden">
          <Image
            src="/images/hero-studio.jpg"
            alt="Neon-lit creative studio with softbox lighting"
            fill
            sizes="100vw"
            className="object-cover object-[65%_30%]"
          />
        </div>
      </div>

      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-[70px] w-full sm:h-[90px]"
        aria-hidden="true"
      >
        <path fill="#ffffff" d="M0 90V30c480 52 960 52 1440 0v60H0Z" />
      </svg>
    </section>
  );
}
