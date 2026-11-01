import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PopularCategories from "../components/PopularCategories";
import FeaturedStudios from "../components/FeaturedStudios";

export const metadata: Metadata = {
  title: "Explore Studios — StudioSpace",
  description:
    "Explore photography, film, podcast, music and art studios — handpicked, verified and loved by creators.",
};

export default function ExplorePage() {
  return (
    <div className="bg-[#0b0a10] font-sans">
      <Navbar active="Explore Studios" />
      <main className="mx-auto  space-y-14 px-6 py-12 sm:px-10 lg:space-y-20 lg:px-14 lg:py-16">
        <PopularCategories />
        <FeaturedStudios />
      </main>
    </div>
  );
}
