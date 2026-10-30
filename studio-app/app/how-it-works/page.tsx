import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import HowItWorksHero from "../components/HowItWorksHero";
import StudioSeekers from "../components/StudioSeekers";
import StudioHosts from "../components/StudioHosts";
import WhyChooseStudioSpace from "../components/WhyChooseStudioSpace";
import FAQSection from "../components/FAQSection";
import GetStartedCTA from "../components/GetStartedCTA";

export const metadata: Metadata = {
  title: "How It Works — StudioSpace",
  description:
    "See how StudioSpace makes finding, booking and listing creative studios simple — for seekers and hosts alike.",
};

export default function HowItWorksPage() {
  return (
    <div className="bg-[#0b0a10] font-sans">
      <Navbar active="How It Works" />
      <main>
        <HowItWorksHero>
          <StudioSeekers />
        </HowItWorksHero>

        <div className="mx-auto max-w-[1440px] space-y-14 px-6 py-14 sm:px-10 lg:space-y-20 lg:px-14 lg:py-16">
          <StudioHosts />
          <WhyChooseStudioSpace />
          <FAQSection />
          <GetStartedCTA />
        </div>
      </main>
    </div>
  );
}
