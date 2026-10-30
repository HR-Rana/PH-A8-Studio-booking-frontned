import { Fragment } from "react";
import type { ReactNode } from "react";
import { IconArrow } from "./AuthIcons";

type Step = {
  title: string;
  description: string;
  visual: ReactNode;
};

export default function StepsSection({
  labelIcon,
  labelBase,
  labelAccent,
  subtitle,
  steps,
}: {
  labelIcon: ReactNode;
  labelBase: string;
  labelAccent: string;
  subtitle: string;
  steps: Step[];
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        {labelIcon}
        <h2 className="text-2xl font-bold text-white">
          {labelBase} <span className="text-purple-400">{labelAccent}</span>
        </h2>
      </div>
      <p className="mt-2 max-w-md text-sm text-white/60">{subtitle}</p>

      <div className="mt-8 flex flex-col items-stretch gap-5 md:flex-row md:items-center md:gap-0">
        {steps.map((step, index) => (
          <Fragment key={step.title}>
            {index > 0 ? (
              <IconArrow className="hidden h-6 w-6 shrink-0 text-purple-500 md:mx-2 lg:mx-4" />
            ) : null}
            <article className="flex-1 rounded-2xl border border-white/10 bg-[#171223]/90 p-5 transition-colors hover:border-purple-500/40 md:self-stretch">
              <div className="flex h-24 items-center justify-center">
                {step.visual}
              </div>
              <div className="mt-5 flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-purple-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {step.description}
              </p>
            </article>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
