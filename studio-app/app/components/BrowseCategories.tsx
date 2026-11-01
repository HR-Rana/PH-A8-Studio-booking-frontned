import Link from "next/link";
import Image from "next/image";
import { IconArrow } from "./AuthIcons";

const categories = [
  {
    name: "Photo Studios",
    image: "/images/photographer-directing.jpg",
  },
  {
    name: "Sound Stages",
    image: "/images/sound-stage-loft.jpg",
  },
  {
    name: "Podcast Rooms",
    image: "/images/podcast-microphones.jpg",
  },
  {
    name: "Music Suites",
    image: "/images/music-mixing-console.jpg",
  },
  {
    name: "Art Workshops",
    image: "/images/pink-content-studio.jpg",
  },
];

export default function BrowseCategories() {
  return (
    <section>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Browse by Studio <span className="text-purple-400">Categories</span>
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Find the perfect space for your creative project
        </p>
      </div>

      <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {categories.map((category) => (
          <Link
            key={category.name}
            href="/explore"
            className="group relative h-40 w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-white/5 lg:h-44 lg:w-auto"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 20vw, 70vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">
                {category.name}
              </p>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors group-hover:border-purple-400 group-hover:bg-purple-500/20">
                <IconArrow className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
