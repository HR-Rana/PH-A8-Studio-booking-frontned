import Link from "next/link";
import { IconArrow } from "./AuthIcons";

const steps = [
  {
    title: "Discover Spaces",
    description: "Browse a wide range of studios near you.",
  },
  {
    title: "Select Shoot Hours",
    description: "Choose your preferred date and time.",
  },
  {
    title: "Book Instantly",
    description: "Confirm your booking with secure payment.",
  },
  {
    title: "Create & Produce",
    description: "Start your creative journey!",
  },
];

export default function HowBookingWorks() {
  return (
    <section className="rounded-2xl border border-purple-500/20 bg-[#15111d] p-6 sm:p-10 lg:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
        <div>
          <p className="text-sm font-medium text-white/60">
            Simple. Fast. Reliable.
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
            How <span className="text-purple-400">Booking</span> Works?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Guarantee your creative space in just 4 easy steps.
          </p>
          <Link
            href="/explore"
            className="mt-6 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Start Booking
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              {index > 0 ? (
                <IconArrow className="absolute -left-3 top-3 hidden h-4 w-4 text-purple-500 sm:block" />
              ) : null}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-purple-600 text-sm font-bold text-white shadow-[0_0_18px_rgba(147,51,234,0.55)]">
                {index + 1}
              </span>
              <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
              <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
