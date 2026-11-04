import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopRatedStudios from "./components/TopRatedStudios";
import BrowseCategories from "./components/BrowseCategories";
import HowBookingWorks from "./components/HowBookingWorks";
import HostGuarantee from "./components/HostGuarantee";

export default function Home() {


  return (
    <div className="min-h-screen bg-[#0b0a10] font-sans">
      <Navbar />
      <Hero />
      <main className="mx-auto  space-y-14 px-6 py-12 sm:px-10 lg:space-y-20 lg:px-14 lg:py-16">
        <TopRatedStudios />
        <BrowseCategories />
        <HowBookingWorks />
        <HostGuarantee />
      </main>
    </div>
  );
}
