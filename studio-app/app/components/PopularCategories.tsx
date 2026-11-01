import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import {
  IconCamera,
  IconClapper,
  IconMic,
  IconMusic,
  IconPalette,
  IconSphere,
} from "./AuthIcons";
import whiteCycStudio from "../../public/images/white-cyc-studio.jpg";
import filmSetDirector from "../../public/images/film-set-director.jpg";
import podcastMicrophones from "../../public/images/podcast-microphones.jpg";
import musicMixingConsole from "../../public/images/music-mixing-console.jpg";
import pinkContentStudio from "../../public/images/pink-content-studio.jpg";
import soundStageLoft from "../../public/images/sound-stage-loft.jpg";

const categories: {
  name: string;
  image: StaticImageData;
  icon: ReactNode;
}[] = [
  {
    name: "Photography Studio",
    image: whiteCycStudio,
    icon: <IconCamera className="h-5 w-5" />,
  },
  {
    name: "Film & Video Production",
    image: filmSetDirector,
    icon: <IconClapper className="h-5 w-5" />,
  },
  {
    name: "Podcast Studio",
    image: podcastMicrophones,
    icon: <IconMic className="h-5 w-5" />,
  },
  {
    name: "Music Recording",
    image: musicMixingConsole,
    icon: <IconMusic className="h-5 w-5" />,
  },
  {
    name: "Art Workshop",
    image: pinkContentStudio,
    icon: <IconPalette className="h-5 w-5" />,
  },
  {
    name: "Cyclorama Studio",
    image: soundStageLoft,
    icon: <IconSphere className="h-5 w-5" />,
  },
];

export default function PopularCategories() {
  return (
    <section>
      <SectionHeading
        lines
        title={
          <>
            Popular <span className="text-purple-400">Categories</span>
          </>
        }
        subtitle="Explore studios tailored to your creative needs"
      />

      <div className="mt-8 flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group relative h-36 w-44 shrink-0 snap-start cursor-pointer overflow-hidden rounded-xl border border-purple-500/25 transition-colors hover:border-purple-500/60 md:h-40 md:w-auto"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(min-width: 768px) 16vw, 70vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
            <div className="absolute inset-x-0 top-5 flex justify-center">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-black/50 text-white ring-1 ring-white/25 backdrop-blur-sm">
                {category.icon}
              </span>
            </div>
            <p className="absolute inset-x-3 bottom-3 text-xs font-semibold leading-snug text-white">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
