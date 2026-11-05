import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { Suspense, type ReactNode } from "react";
import { IconArrow, IconCamera, IconClapper, IconMapPin, IconMic, IconMusic, IconPalette, IconSphere, IconStar } from "./AuthIcons";
import photoStudioRedSet from "../../public/images/photo-studio-red-set.png";
import cameraDollySoundstage from "../../public/images/camera-dolly-soundstage.png";
import podcastMicrophones from "../../public/images/podcast-microphones.jpg";
import musicStudioConsole from "../../public/images/music-studio-console.png";
import pinkContentStudio from "../../public/images/pink-content-studio.jpg";
import whiteCycStudio from "../../public/images/white-cyc-studio.jpg";
import { toast } from "react-toastify";


type Studio = {
  name: string;
  category: string;
  categoryIcon: ReactNode;
  rating: string;
  reviews: number;
  price: string;
  location: string;
  image: StaticImageData;
};

// const studios: Studio[] = [
//   {
//     name: "Infinity Photo Studio",
//     category: "Photo Studio",
//     categoryIcon: <IconCamera className="h-3.5 w-3.5" />,
//     rating: "4.9",
//     reviews: 210,
//     price: "$40",
//     location: "Dhaka, Bangladesh",
//     image: photoStudioRedSet,
//   },
//   {
//     name: "CineCraft Studio",
//     category: "Film & Video",
//     categoryIcon: <IconClapper className="h-3.5 w-3.5" />,
//     rating: "4.8",
//     reviews: 85,
//     price: "$60",
//     location: "Dhaka, Bangladesh",
//     image: cameraDollySoundstage,
//   },
//   {
//     name: "The Podcast Hub",
//     category: "Podcast",
//     categoryIcon: <IconMic className="h-3.5 w-3.5" />,
//     rating: "4.5",
//     reviews: 72,
//     price: "$35",
//     location: "Dhaka, Bangladesh",
//     image: podcastMicrophones,
//   },
//   {
//     name: "Melody Studio",
//     category: "Music",
//     categoryIcon: <IconMusic className="h-3.5 w-3.5" />,
//     rating: "4.9",
//     reviews: 88,
//     price: "$50",
//     location: "Dhaka, Bangladesh",
//     image: musicStudioConsole,
//   },
//   {
//     name: "Artisan Space",
//     category: "Art Workshop",
//     categoryIcon: <IconPalette className="h-3.5 w-3.5" />,
//     rating: "4.7",
//     reviews: 64,
//     price: "$30",
//     location: "Dhaka, Bangladesh",
//     image: pinkContentStudio,
//   },
//   {
//     name: "Cyc Studio Pro",
//     category: "Cyc Studio",
//     categoryIcon: <IconSphere className="h-3.5 w-3.5" />,
//     rating: "4.8",
//     reviews: 72,
//     price: "$70",
//     location: "Dhaka, Bangladesh",
//     image: whiteCycStudio,
//   },
// ];

export default function TopRatedStudios() {

  return (
    <section>
      <div className="relative">
        <div className="text-center">
          <p className="text-sm font-medium text-white/70">Top Rated Studios</p>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Featured <span className="text-purple-400">Studios</span>
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Discover our handpicked selection of creative spaces
          </p>
        </div>
        {/* <Link
          href="/explore"
          className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-purple-400/50 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500/15 lg:absolute lg:right-0 lg:top-2 lg:mx-0 lg:mt-0"
        >
          View All Studios
          <IconArrow className="h-3.5 w-3.5" />
        </Link> */}
      </div>

      <Suspense fallback={<p className="py-10 text-center text-white/60">Loading top rated studios...</p>}>
        <TopStudiosGrid />
      </Suspense>
    </section>
  );
}

type TopStudio = {
  _id: string;
  name: string;
  category?: string;
  categoryIcon?: ReactNode;
  rating: string;
  reviews: number;
  price: string;
  location: string;
  image: string;
};

async function TopStudiosGrid() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudios`);
  const studios: TopStudio[] = await res.json();

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
      {
        studios.length === 0 ? (
          <p className="col-span-full py-10 text-center text-white/60">No studios found.</p>
        ) : <div>
          {studios.map((studio: TopStudio) => (
            <article
              key={studio.name}
              className="flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#191324]"
            >
              <div className="relative h-40 sm:h-44 xl:h-36">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                  {studio.categoryIcon}
                  {studio.category}
                </span>
                <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm">
                  <IconStar className="h-3 w-3 text-amber-400" />
                  <span className="font-semibold">{studio.rating}</span>
                  <span className="text-white/60">({studio.reviews} reviews)</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug text-white">
                    {studio.name}
                  </h3>
                  <p className="shrink-0 text-base font-bold text-white">
                    {studio.price}
                    <span className="text-[10px] font-normal text-white/50">
                      {" "}
                      /hr
                    </span>
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  <IconMapPin className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-white/60">{studio.location}</span>
                </div>
                <Link href={`/studios/${studio._id}`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-purple-400/40 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500/15"
                >
                  View Details
                  <IconArrow className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      }
    </div>
  );
}
