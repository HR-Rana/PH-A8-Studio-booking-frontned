"use client";

import Link from "next/link";
import { ApertureLogo } from "../Navbar";
import LogoutButton from "./LogoutButton";

export type ProfileTab =
  | "Dashboard"
  | "Add New Studio"
  | "My Studio Listings"
  | "My Bookings";

const tabs: { label: ProfileTab }[] = [
  { label: "Dashboard" },
  { label: "Add New Studio" },
  { label: "My Studio Listings" },
  { label: "My Bookings" },
];

export default function ProfileTabs({
  active,
  onChange,
}: {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#131217]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-14">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <ApertureLogo className="h-9 w-9" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[20px] font-bold tracking-tight text-white">
              Studio
              <span className="text-purple-400">Space</span>
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-white/40">
              Creative Rentals
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 xl:block">
          <ul className="flex items-center">
            {tabs.map((tab) => {
              const isActive = tab.label === active;
              return (
                <li key={tab.label}>
                  <button
                    type="button"
                    onClick={() => onChange(tab.label)}
                    className={
                      isActive
                        ? "relative flex h-[72px] items-center px-4 text-[15px] font-semibold text-purple-400 after:absolute after:bottom-0 after:left-4 after:h-[2px] after:w-[calc(100%-2rem)] after:rounded-full after:bg-purple-400"
                        : "flex h-[72px] items-center px-4 text-[15px] font-medium text-white/90 transition-colors hover:text-purple-400"
                    }
                  >
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <LogoutButton />
      </div>

      <div className="border-t border-white/5 xl:hidden">
        <ul className="flex items-center gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const isActive = tab.label === active;
            return (
              <li key={tab.label} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onChange(tab.label)}
                  className={
                    isActive
                      ? "rounded-full bg-purple-500/15 px-4 py-2 text-xs font-semibold text-purple-400 ring-1 ring-purple-500/40"
                      : "rounded-full px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:text-purple-400"
                  }
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
