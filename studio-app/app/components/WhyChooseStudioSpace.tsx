import type { ReactNode } from "react";
import {
  IconGem,
  IconHeadphones,
  IconShield,
  IconStar,
  IconUsers,
  IconZap,
} from "./AuthIcons";

const items: { icon: ReactNode; lines: [string, string] }[] = [
  {
    icon: <IconZap className="h-6 w-6 text-purple-400" />,
    lines: ["Easy Booking", "In Seconds"],
  },
  {
    icon: <IconShield className="h-6 w-6 text-purple-400" />,
    lines: ["Trusted & Secure", "Transactions"],
  },
  {
    icon: <IconGem className="h-6 w-6 text-purple-400" />,
    lines: ["Transparent", "Pricing"],
  },
  {
    icon: <IconUsers className="h-6 w-6 text-purple-400" />,
    lines: ["A Growing", "Creative Community"],
  },
  {
    icon: <IconHeadphones className="h-6 w-6 text-purple-400" />,
    lines: ["24/7", "Support"],
  },
];

export default function WhyChooseStudioSpace() {
  return (
    <section>
      <div className="flex items-center gap-3">
        <IconStar className="h-5 w-5 text-white" />
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Why Choose <span className="text-purple-400">StudioSpace?</span>
        </h2>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
        {items.map((item, index) => (
          <li
            key={item.lines.join(" ")}
            className={`flex items-center gap-3 ${
              index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
            }`}
          >
            {item.icon}
            <p className="text-sm font-semibold leading-snug text-white">
              {item.lines[0]}
              <br />
              {item.lines[1]}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
