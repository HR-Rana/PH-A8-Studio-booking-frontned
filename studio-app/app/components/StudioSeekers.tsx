import Image from "next/image";
import StepsSection from "./StepsSection";
import {
  IconCalendar,
  IconCheck,
  IconClapper,
  IconSearch,
  IconSparkle,
  IconStar,
} from "./AuthIcons";

const seekerSteps = [
  {
    title: "Search & Explore",
    description:
      "Browse through a wide range of studios for every need, location, category, and price.",
    visual: (
      <div className="relative">
        <div className="flex items-center gap-2 rounded-full bg-[#241b33] px-4 py-2.5 text-xs font-medium text-white/70 ring-1 ring-purple-500/40">
          <IconSearch className="h-3.5 w-3.5 text-purple-400" />
          Search studio...
        </div>
        <IconSparkle className="absolute -right-3.5 -top-3 h-4 w-4 text-purple-400" />
        <IconSparkle className="absolute -bottom-2.5 -left-3.5 h-2.5 w-2.5 text-purple-300/70" />
      </div>
    ),
  },
  {
    title: "Check Details",
    description: "View photos, amenities, availability, and past reviews.",
    visual: (
      <div className="relative h-16 w-32 overflow-hidden rounded-lg ring-1 ring-white/10">
        <Image
          src="/images/podcast-recording-room.jpg"
          alt=""
          fill
          sizes="128px"
          className="object-cover"
        />
        <span className="absolute bottom-1 right-1 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
          <IconStar className="h-2.5 w-2.5 text-amber-400" />
          4.8
        </span>
      </div>
    ),
  },
  {
    title: "Book Your Slot",
    description: "Select your preferred date and time. Secure it with our booking system.",
    visual: (
      <div className="relative">
        <IconCalendar className="h-12 w-12 text-purple-400" />
        <span className="absolute -right-2.5 -top-1 grid h-6 w-6 place-items-center rounded-full bg-green-500 text-white">
          <IconCheck className="h-3.5 w-3.5" />
        </span>
      </div>
    ),
  },
  {
    title: "Get Creative!",
    description: "Enjoy your session and bring your ideas to life.",
    visual: <IconClapper className="h-12 w-12 -rotate-12 text-purple-400" />,
  },
];

export default function StudioSeekers() {
  return (
    <StepsSection
      labelIcon={<IconSearch className="h-7 w-7 text-purple-400" />}
      labelBase="For Studio"
      labelAccent="Seekers"
      subtitle="Find and book your ideal studio in just a few clicks."
      steps={seekerSteps}
    />
  );
}
