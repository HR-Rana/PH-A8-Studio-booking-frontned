import StepsSection from "./StepsSection";
import {
  IconCalendar,
  IconClock,
  IconHouse,
  IconImage,
  IconSparkle,
  IconStar,
  IconUserPlus,
} from "./AuthIcons";

const hostSteps = [
  {
    title: "Create Your Account",
    description: "Sign up and set up your host profile.",
    visual: (
      <div className="relative">
        <div className="grid h-14 w-[4.25rem] place-items-center rounded-lg bg-[#241b33] ring-1 ring-purple-500/40">
          <IconUserPlus className="h-6 w-6 text-purple-400" />
        </div>
        <IconSparkle className="absolute -left-3 -top-2.5 h-3 w-3 text-purple-300/70" />
      </div>
    ),
  },
  {
    title: "Add Your Studio",
    description: "Provide details, photos, pricing, and availability.",
    visual: (
      <div className="grid h-14 w-[4.25rem] place-items-center rounded-lg bg-[#241b33] ring-1 ring-white/15">
        <IconImage className="h-6 w-6 text-gray-400" />
      </div>
    ),
  },
  {
    title: "Manage Bookings",
    description:
      "Accept requests, view your calendar, and manage your schedule.",
    visual: (
      <div className="relative">
        <IconCalendar className="h-12 w-12 text-purple-400" />
        <span className="absolute -bottom-1.5 -left-1.5 grid h-6 w-6 place-items-center rounded-full bg-purple-600 text-white">
          <IconClock className="h-3.5 w-3.5" />
        </span>
      </div>
    ),
  },
  {
    title: "Grow Your Business",
    description: "Reach more creators and turn your space into income.",
    visual: (
      <div className="relative flex items-end gap-1.5">
        <span className="h-4 w-2 rounded bg-purple-500/50" />
        <span className="h-7 w-2 rounded bg-purple-400" />
        <span className="h-10 w-2 rounded bg-purple-500" />
        <IconStar className="absolute -right-3.5 -top-2 h-4 w-4 text-amber-300" />
      </div>
    ),
  },
];

export default function StudioHosts() {
  return (
    <StepsSection
      labelIcon={<IconHouse className="h-7 w-7 text-purple-400" />}
      labelBase="For Studio"
      labelAccent="Hosts"
      subtitle="List your studio and start earning from your creative space."
      steps={hostSteps}
    />
  );
}
