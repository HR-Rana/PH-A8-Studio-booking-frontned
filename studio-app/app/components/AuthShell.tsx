import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ApertureLogo } from "./Navbar";
import { IconArrow, IconCheck } from "./AuthIcons";

type AuthShellProps = {
  title: ReactNode;
  subtitle: string;
  benefits: string[];
  topNote: string;
  topLinkLabel: string;
  topLinkHref: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  overlay?: ReactNode;
  children: ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  benefits,
  topNote,
  topLinkLabel,
  topLinkHref,
  image,
  imageAlt,
  imageClassName,
  overlay,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0a14] font-sans">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-50 md:w-[55%] md:opacity-100">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className={`object-cover ${imageClassName ?? ""}`}
        />
        {overlay}
        <div className="absolute inset-0 bg-[#0d0a14]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0d0a14]/40 to-[#0d0a14]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0a14] to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
          <Link href="/" className="flex items-center gap-2.5">
            <ApertureLogo className="h-9 w-9" />
            <span className="text-[22px] font-bold tracking-tight text-white">
              Studio<span className="text-purple-400">Space</span>
            </span>
          </Link>

          <p className="flex items-center gap-2 text-sm text-white/70">
            <span className="hidden sm:inline">{topNote}</span>
            <Link
              href={topLinkHref}
              className="flex items-center gap-1.5 font-semibold text-purple-400 transition-colors hover:text-purple-300"
            >
              {topLinkLabel}
              <IconArrow className="h-3.5 w-3.5" />
            </Link>
          </p>
        </header>

        <main className="mx-auto grid w-full max-w-[1240px] flex-1 items-center gap-12 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-2 lg:px-12 lg:pb-10 lg:pt-0">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70 sm:max-w-sm">
              {subtitle}
            </p>
            <ul className="mt-9 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-white/90 sm:text-[15px]"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-purple-500 text-white">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">{children}</div>
        </main>
      </div>
    </div>
  );
}
