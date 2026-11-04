import type { Metadata } from "next";
import { Suspense } from "react";
import { IconHeart, IconStar, IconMapPin } from "../components/AuthIcons"
import Navbar from "../components/Navbar";
import PopularCategories from "../components/PopularCategories";
import FeaturedStudios from "../components/FeaturedStudios";
import Image from "next/image"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Explore Studios — StudioSpace",
  description:
    "Explore photography, film, podcast, music and art studios — handpicked, verified and loved by creators.",
};

async function ExploreStudios() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudios`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  type ExploreStudio = {
    _id: string;
    name: string;
    price: string;
    rating: string;
    reviews: number;
    image: string;
    location: string;
    tags: string[];
  };

  const result: ExploreStudio[] = await res.json();



  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {result.map((studio) => (
        <article
          key={studio._id}
          className="overflow-hidden rounded-xl border border-white/5 bg-[#191324]"
        >
          <Link href={`/studios/${studio._id}`} >
            <div className="relative h-40 sm:h-44">
              <Image
                src={studio?.image}
                alt={studio.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <button
                type="button"
                aria-label={`Save ${studio.name}`}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:text-purple-400"
              >
                <IconHeart className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {studio.name}
                </h3>
                <p className="shrink-0 text-sm font-bold text-white">
                  {studio.price}
                  <span className="text-[10px] font-normal text-white/50">
                    {" "}
                    /hour
                  </span>
                </p>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <IconStar className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-semibold text-white">
                  {studio.rating}
                </span>
                <span className="text-white/50">
                  ({studio.reviews} reviews)
                </span>
                <IconMapPin className="ml-1 h-3.5 w-3.5 text-purple-400" />
                <span className="text-white/70">{studio.location}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {studio.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-white/70 ring-1 ring-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </article>
      ))
      }
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="bg-[#0b0a10] font-sans">
      <Navbar active="Explore Studios" />

      <main className="container mx-auto space-y-14 px-6 py-12 sm:px-10 lg:space-y-20 lg:px-14 lg:py-16">
        <Suspense
          fallback={
            <div className="text-white">
              Loading studios...
            </div>
          }
        >
          {/* <ExploreStudios /> */}
          <FeaturedStudios />
        </Suspense>
        <PopularCategories />


      </main>
    </div>
  );
}