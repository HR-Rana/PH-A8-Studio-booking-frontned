import Image from "next/image";
import type { ReactNode } from "react";
import { IconCheck, IconHeadphones, IconShield, IconZap } from "./AuthIcons";
import filmSetDirector from "../../public/images/film-set-director.jpg";

const guarantees: { label: string; sublabel: string; icon: ReactNode }[] = [
  {
    label: "Liability",
    sublabel: "Protection",
    icon: <IconShield className="h-5 w-5" />,
  },
  {
    label: "Verified",
    sublabel: "Profiles",
    icon: <IconCheck className="h-5 w-5" />,
  },
  {
    label: "Equipment",
    sublabel: "Safety",
    icon: <IconZap className="h-5 w-5" />,
  },
  {
    label: "24/7 Host",
    sublabel: "Support",
    icon: <IconHeadphones className="h-5 w-5" />,
  },
];

export default function HostGuarantee() {
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
      <div className="relative h-64 overflow-hidden rounded-2xl border border-white/5 sm:h-80 lg:h-[300px]">
        <Image
          src={filmSetDirector}
          alt="Creator working on a moody film set"
          fill
          // sizes="100vw"
          className="object-cover  w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b0938]/50 to-transparent" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Host <span className="text-purple-400">Guarantee</span> &amp; Creator
          Support
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
          Your creativity, our commitment. We&apos;re here to support you every
          step of the way.
        </p>

        <ul className="mt-8 flex flex-wrap gap-4">
          {guarantees.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#191324] py-3 pl-3.5 pr-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-600/20 text-purple-400 ring-1 ring-purple-500/40">
                {item.icon}
              </span>
              <p className="text-xs font-semibold leading-tight text-white">
                {item.label}
                <br />
                {item.sublabel}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
