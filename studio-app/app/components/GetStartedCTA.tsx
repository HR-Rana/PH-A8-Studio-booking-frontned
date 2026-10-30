import Link from "next/link";
import { IconArrow, IconRocket } from "./AuthIcons";

export default function GetStartedCTA() {
  return (
    <section>
      <div className="rounded-[32px] bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 px-6 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
              <IconRocket className="h-5 w-5 text-white" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Ready to Get Started?
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Join StudioSpace today and explore endless creative
                possibilities.
              </p>
            </div>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#1c1530] transition-colors hover:bg-purple-50"
          >
            Get Started
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
