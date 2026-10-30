import Link from "next/link";
import type { ReactNode } from "react";
import { ApertureLogo } from "./Navbar";
import { IconXLogo } from "./AuthIcons";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "#" },
];

const categories = [
  "Photography",
  "Film & Video",
  "Podcast",
  "Music",
  "Art Workshop",
];

function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M80 299.3V512h116V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4.4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8h66z" />
    </svg>
  );
}

function IconYouTube({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64s-170.78 0-213.371 11.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  );
}

function IconInstagram({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function IconLinkedIn({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

function IconHeart({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} text-purple-400`}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const socials: { label: string; icon: ReactNode }[] = [
  { label: "X (Twitter)", icon: <IconXLogo className="h-4 w-4" /> },
  { label: "Facebook", icon: <IconFacebook /> },
  { label: "YouTube", icon: <IconYouTube /> },
  { label: "Instagram", icon: <IconInstagram /> },
  { label: "LinkedIn", icon: <IconLinkedIn /> },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0b1c]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.6fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <ApertureLogo className="h-9 w-9" />
              <span className="flex flex-col leading-none">
                <span className="text-[22px] font-bold tracking-tight text-white">
                  Studio<span className="text-purple-400">Space</span>
                </span>
                <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                  Create. Capture. Collaborate.
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Your one-stop marketplace for renting creative spaces across the
              city.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-white/70 transition-colors hover:text-purple-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-purple-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Popular Categories
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="#"
                    className="transition-colors hover:text-purple-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Subscribe to Our Newsletter
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Get the latest studios, offers and creative tips.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© 2025 StudioSpace. All rights reserved.</span>
            <span
              className="hidden h-4 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="transition-colors hover:text-purple-400"
            >
              Terms & Conditions
            </Link>
            <span
              className="hidden h-4 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="transition-colors hover:text-purple-400"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="flex items-center gap-1.5">
            Built for Creators. By Creators
            <IconHeart />
          </p>
        </div>
      </div>
    </footer>
  );
}
