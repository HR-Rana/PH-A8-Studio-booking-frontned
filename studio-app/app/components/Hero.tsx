"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./AuthIcons";

const slides = [
  {
    image: "/images/purple-podcast-studio.png",
    alt: "Purple-lit studio with boom-arm microphones",
    lead: "Bring Your",
    accent: "Creative",
    rest: "Vision to Life",
    description:
      "Rent premium studios for photography, filming, podcasting, music and more — all in one place.",
  },
  {
    image: "/images/film-studio-crew.png",
    alt: "Film crew working on a lit soundstage",
    lead: "Where Great",
    accent: "Content",
    rest: "Gets Made",
    description:
      "Sound stages, cyc walls and film sets with professional gear — book by the hour and start shooting in minutes.",
  },
  {
    image: "/images/onair-content-studio.png",
    alt: "Content studio with ON AIR neon sign and camera gear",
    lead: "Make Your Next",
    accent: "Masterpiece",
    rest: "Here",
    description:
      "Podcast booths, music suites and creative spaces ready for your very next session.",
  },
];

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 ${direction === "left" ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M8 5.5v13a.7.7 0 0 0 1.07.6l10.2-6.5a.7.7 0 0 0 0-1.2L9.07 4.9A.7.7 0 0 0 8 5.5Z" />
    </svg>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);

  const go = (step: number) => {
    setActive((current) => (current + step + slides.length) % slides.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#0b0a10]">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[#1b0938]/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a10] via-[#0b0a10]/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b0a10]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0a10]/80 to-transparent" />

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white sm:left-6"
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white sm:right-6"
      >
        <Chevron direction="right" />
      </button>

      <div className="relative mx-auto flex min-h-[460px] flex-col justify-center px-6 py-20 sm:min-h-[520px] sm:px-10 lg:px-14">
        <div className="max-w-2xl">
          <h1
            key={active}
            className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[56px]"
          >
            {slides[active].lead}{" "}
            <span className="text-purple-400">{slides[active].accent}</span>{" "}
            {slides[active].rest}
          </h1>

          <p
            key={`desc-${active}`}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {slides[active].description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore Studios
              <IconArrow className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-full bg-black/40 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <PlayIcon />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-purple-500"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
