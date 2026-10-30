import Image from "next/image";
import type { ReactNode } from "react";

function Squiggle() {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      className="mt-6 h-5 w-28 text-purple-500"
      aria-hidden="true"
    >
      <path
        d="M2 18c28 4 50-14 64-12s34 12 52 6"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HowItWorksHero({ children }: { children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/register-studio.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-[65%_30%] object-cover"
        />
        <div className="absolute inset-0 bg-purple-600/25 mix-blend-hue" />
        <div className="absolute inset-0 bg-[#0b0a10]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a10] via-[#0b0a10]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0b0a10] via-[#0b0a10]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-16 pt-10 sm:px-10 lg:px-14 lg:pb-20 lg:pt-14">
        <span className="inline-flex items-center rounded-full border border-purple-500/50 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-200">
          Easy Steps. Big Possibilities.
        </span>
        <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          How It <span className="text-purple-400">Works</span>
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
          StudioSpace makes it simple to find and book the perfect creative
          space — or list your studio for others.
        </p>
        <Squiggle />

        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}
