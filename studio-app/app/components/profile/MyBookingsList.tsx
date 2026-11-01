"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { IconCalendarCheck, IconMapPin } from "../AuthIcons";
import type { Booking, BookingStatus } from "./ProfileData";
import { studioImages } from "./ProfileData";

const filters: (BookingStatus | "All")[] = [
  "All",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const statusStyles: Record<BookingStatus, string> = {
  Confirmed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  Completed: "bg-purple-500/10 text-purple-400 ring-purple-500/30",
  Cancelled: "bg-red-500/10 text-red-400 ring-red-500/30",
};

export default function MyBookingsList({
  bookings,
}: {
  bookings: Booking[];
}) {
  const [filter, setFilter] = useState<BookingStatus | "All">("All");

  const visibleBookings =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((option) => {
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={
                isActive
                  ? "rounded-full bg-purple-500/15 px-4 py-2 text-xs font-semibold text-purple-400 ring-1 ring-purple-500/40"
                  : "rounded-full px-4 py-2 text-xs font-medium text-white/70 ring-1 ring-white/10 transition-colors hover:text-white"
              }
            >
              {option}
            </button>
          );
        })}
      </div>

      {visibleBookings.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-[#191324]/60 p-10 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
            <IconCalendarCheck className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-white">
            No bookings here
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
            Studios you book will show up here with their dates and status.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {visibleBookings.map((booking) => (
            <li
              key={booking.id}
              className="flex flex-col gap-4 rounded-xl border border-white/5 bg-[#191324] p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">
                <Image
                  src={studioImages[booking.image]}
                  alt={booking.studio}
                  fill
                  sizes="(min-width: 640px) 112px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {booking.studio}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50">
                  <IconMapPin className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-white/70">{booking.location}</span>
                  <span aria-hidden="true">·</span>
                  <IconCalendarCheck className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-white/70">{booking.date}</span>
                </div>
                <p className="mt-1.5 text-xs text-white/50">
                  {booking.time} · {booking.hours} hour
                  {booking.hours > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
                <p className="text-base font-bold text-white">
                  ৳{booking.total.toLocaleString("en-US")}
                </p>
                <button
                  type="button"
                  disabled={booking.status !== "Confirmed"}
                  onClick={() => {
                    toast.info("Booking details coming soon");
                  }}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
