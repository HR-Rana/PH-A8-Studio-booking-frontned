"use client";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { IconArrow, IconHeart, IconMapPin, IconStar } from "./AuthIcons";
import photoShootSession from "../../public/images/photo-shoot-session.jpg";
import podcastRecordingRoom from "../../public/images/podcast-recording-room.jpg";
import musicMixingConsole from "../../public/images/music-mixing-console.jpg";
import redHomeStudio from "../../public/images/red-home-studio.jpg";
import {useState, useEffect} from "react"
import { toast } from "react-toastify";

type StudioData = {
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    location: string;
    tags: string[];
}


export default function FeaturedStudios() {
    const [studios, setStudios] = useState<StudioData[]>([]);
    const [loading, setLoading] = useState(true);


   useEffect(() => {
       const fetchStudios = async () => {
         try {
           const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudios`);
   
           if (!res.ok) {
             throw new Error("Failed to fetch studios");
           }
   
           const result = await res.json();
           console.log(result)
   
           setStudios(result);
   
         } catch (error) {
           console.error("Error fetching studios:", error);
           toast.error("Failed to load studios");
         } finally {
           setLoading(false);
         }
       };
   
        fetchStudios();
      }, []);


      if (loading) {
        return (
          <p className="py-10 text-center text-white/60">
            Featured studios are loading...
          </p>
        );
      }

      if (studios.length === 0) {
        return (
          <p className="py-10 text-center text-white/60">
            No studios available right now.
          </p>
        );
      }


  return (
    <section>
      <div className="relative">
        <SectionHeading
          lines
          title={
            <>
              Featured <span className="text-purple-400">Studios</span>
            </>
          }
          subtitle="Handpicked studios, loved by creators"
        />
        {/* <Link
          href="/explore"
          className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-purple-400/50 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500/15 lg:absolute lg:right-0 lg:top-1 lg:mx-0 lg:mt-0"
        >
          View All Studios
          <IconArrow className="h-3.5 w-3.5" />
        </Link> */}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {studios.map((studio) => (
         <Link href={`/studios/${studio._id}`}  key={studio.name}>
           <article
           
            className="overflow-hidden rounded-xl border border-white/5 bg-[#191324]"
          >
            <div className="relative h-40 sm:h-44">
              <Image
                src={studio.image}
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
          </article>
         </Link>
        ))}
      </div>
    </section>
  );
}
