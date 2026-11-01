import Image from "next/image";
import Link from "next/link";
import photoShootSession from "../../public/images/photo-shoot-session.jpg";

function RocketIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

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

export default function CommunityCTA() {
  return (
    <section className="bg-white px-6 pb-20 sm:px-10 lg:px-14">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#3b0d69] via-[#6a1fb0] to-[#8b2fe8]">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <Image
            src={photoShootSession}
            alt=""
            fill
            sizes="50vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4b1583] via-[#6a1fb0]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:pr-40">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 text-white">
              <RocketIcon />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white sm:text-[22px]">
                Join Our Creative Community
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Be a part of StudioSpace and take your creativity to the next
                level.
              </p>
            </div>
          </div>

          <Link
            href="/register"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-50"
          >
            Get Started
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
