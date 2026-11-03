"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import NavUserInfo from "./NavUserInfo"
type NavLink = {
  label: string;
  href: string;
  dropdown?: boolean;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/explore", dropdown: false },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

export function ApertureLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-white ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m14.31 8 5.74 9.94" />
      <path d="M9.69 8h11.48" />
      <path d="m7.38 12 5.74-9.94" />
      <path d="M9.69 16 3.95 6.06" />
      <path d="M14.31 16H2.83" />
      <path d="m16.62 12-5.74 9.94" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white/70"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar({ active = "Home" }: { active?: string }) {

  const {data:session, isPending, error} = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const userData = session?.user;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#131217]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px]  items-center justify-between px-6 sm:px-10 lg:px-14">
        <Link href="/" className="flex items-center gap-3">
          <ApertureLogo />
          <span className="flex flex-col leading-none">
            <span className="text-[22px] font-bold tracking-tight text-white">
              Studio
              <span className="text-purple-400">Space</span>
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-white/40">
              Creative Rentals
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.label === active;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "relative flex h-[72px] items-center gap-1 px-4 text-[15px] font-semibold text-purple-400 after:absolute after:bottom-0 after:left-4 after:h-[2px] after:w-[calc(100%-2rem)] after:rounded-full after:bg-purple-400"
                      : "flex h-[72px] items-center gap-1 px-4 text-[15px] font-medium text-white/90 transition-colors hover:text-purple-400"
                  }
                >
                  {link.label}
                  {link.dropdown ? <ChevronIcon /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
 {!userData ?
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden rounded-full border border-purple-400/50 px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500/15 md:block"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(147,51,234,0.45)] transition-colors hover:from-purple-500 hover:to-purple-400 md:block"
          >
            Register
          </Link>
        </div>
        :
        <NavUserInfo /> }

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white transition-colors hover:bg-white/5 hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-nav-menu"
        className={`overflow-hidden border-white/5 bg-[#131217]/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-[420px] border-t opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pb-6 pt-2 sm:px-10">
          {navLinks.map((link) => {
            const isActive = link.label === active;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    isActive
                      ? "flex items-center gap-1 rounded-lg px-3 py-3 text-[15px] font-semibold text-purple-400"
                      : "flex items-center gap-1 rounded-lg px-3 py-3 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-purple-400"
                  }
                >
                  {link.label}
                  {link.dropdown ? <ChevronIcon /> : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {userData ? (
          <div className="border-t border-white/5 px-6 pb-6 pt-4 sm:px-10">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-7 py-2.5 text-center text-sm font-semibold text-white shadow-[0_0_24px_rgba(147,51,234,0.45)] transition-colors hover:from-purple-500 hover:to-purple-400"
            >
              My Profile
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 border-t border-white/5 px-6 pb-6 pt-4 sm:flex-row sm:px-10">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full border border-purple-400/50 px-7 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-purple-500/15"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-7 py-2.5 text-center text-sm font-semibold text-white shadow-[0_0_24px_rgba(147,51,234,0.45)] transition-colors hover:from-purple-500 hover:to-purple-400"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
