import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import Mission from "../components/Mission";
import CreativeSpaces from "../components/CreativeSpaces";
import CommunityCTA from "../components/CommunityCTA";

export const metadata: Metadata = {
  title: "About Us — StudioSpace",
  description:
    "StudioSpace is a premier marketplace for creative spaces, connecting studio owners with creators, and making professional-grade studios accessible to everyone.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar active="About Us" />
      <main>
        <AboutHero />
        <Mission />
        <CreativeSpaces />
        <CommunityCTA />
      </main>
    </div>
  );
}
