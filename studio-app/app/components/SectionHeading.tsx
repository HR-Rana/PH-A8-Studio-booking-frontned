import type { ReactNode } from "react";

export default function SectionHeading({
  title,
  subtitle,
  lines = false,
  light = false,
}: {
  title: ReactNode;
  subtitle: string;
  lines?: boolean;
  light?: boolean;
}) {
  return (
    <div className="text-center">
      {lines ? (
        <div className="flex items-center justify-center gap-4">
          <span
            className="hidden h-px w-14 bg-gradient-to-r from-transparent to-purple-500 sm:block"
            aria-hidden="true"
          />
          <h2
            className={`text-2xl font-bold sm:text-3xl ${light ? "text-[#1c1530]" : "text-white"}`}
          >
            {title}
          </h2>
          <span
            className="hidden h-px w-14 bg-gradient-to-l from-transparent to-purple-500 sm:block"
            aria-hidden="true"
          />
        </div>
      ) : (
        <h2
          className={`text-2xl font-bold sm:text-3xl ${light ? "text-[#1c1530]" : "text-white"}`}
        >
          {title}
        </h2>
      )}
      <p
        className={`mt-2 text-sm ${light ? "text-black/55" : "text-white/60"}`}
      >
        {subtitle}
      </p>
    </div>
  );
}
