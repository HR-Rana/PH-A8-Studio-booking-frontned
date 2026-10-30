import Image from "next/image";
import Link from "next/link";

const spaces = [
  {
    label: "Photography Studio",
    href: "#",
    image: "/images/hero.jpg",
    alt: "Photography studio session",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    label: "Film & Video Production",
    href: "#",
    image: "/images/pexels-silverkblack-36697247.jpg",
    alt: "Videographer filming a production",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.6-4c1-.3 2.1.3 2.4 1.4Z" />
        <path d="m6.2 5.3 3.1 3.9" />
        <path d="m12.4 3.4 3.1 4" />
        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    ),
  },
  {
    label: "Podcast Studio",
    href: "#",
    image: "/images/pexels-dlxmedia-hu-215591835-11901222.jpg",
    alt: "Podcast studio with microphones",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v3" />
      </svg>
    ),
  },
  {
    label: "Music Recording",
    href: "#",
    image: "/images/candidsoul-podcast-8281777.jpg",
    alt: "Music recording studio equipment",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: "Art Workshop Studio",
    href: "#",
    image: "/images/pexels-luchik-14920148.jpg",
    alt: "Creative art studio with colorful lighting",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13a1.7 1.7 0 0 1-.43-1.12 1.64 1.64 0 0 1 1.66-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6 17.46 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Cyclorama Studio",
    href: "#",
    image: "/images/neon-wang-OWPB5I0xgFg-unsplash.jpg",
    alt: "Cyclorama studio with white cyc wall",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
];

export default function CreativeSpaces() {
  return (
    <section className="w-full bg-white px-6 pb-16 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <span className="inline-flex items-center gap-3 text-sm font-semibold text-purple-600">
            What We Offer
            <span className="h-[2px] w-10 rounded-full bg-purple-400" />
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            A Wide Range of Creative Spaces
          </h2>

          <p className="mt-3 text-[15px] text-gray-500">
            From photography to music, find the ideal studio for your next
            project.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {spaces.map((space) => (
            <Link
              key={space.label}
              href={space.href}
              className="group relative block overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[6/5]">
                <Image
                  src={space.image}
                  alt={space.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/55" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-white">
                  {space.icon}
                  <span className="text-center text-[13px] font-semibold leading-tight">
                    {space.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
