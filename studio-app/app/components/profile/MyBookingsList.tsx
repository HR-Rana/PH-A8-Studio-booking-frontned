"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconCalendarCheck, IconMapPin } from "../AuthIcons";
import type { BookingStatus } from "./ProfileData";
import type { MyBooking } from "./BookingDetails";

export type BookingFilterStatus = BookingStatus | "Pending";

const filters: (BookingFilterStatus | "All")[] = [
  "All",
  "Confirmed",
  "Cancelled",
  "Pending"
];

const statusStyles: Record<BookingFilterStatus, string> = {
  Confirmed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  Pending: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30",
  Cancelled: "bg-red-500/10 text-red-400 ring-red-500/30",
};

export default function MyBookingsList({
  bookings,
}: {
  bookings: MyBooking[];
}) {
  const [filter, setFilter] = useState<BookingFilterStatus | "All">("All");

  const visibleBookings =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => (booking.status ?? "Pending") === filter);

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

      {bookings.length === 0 ? (
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
              key={booking._id}
              className="flex flex-col gap-4 rounded-xl border border-white/5 bg-[#191324] p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">
                <Image
                  src={booking.studioImage || "/placeholder.png"}
                  alt={booking.studioName ?? "Studio"}
                  fill
                  sizes="(min-width: 640px) 112px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {booking.studioName ?? "Studio booking"}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${statusStyles[(booking.status ?? "Pending") as BookingFilterStatus]}`}
                  >
                    {booking.status ?? "Pending"}
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
                  {booking.time} · {booking.hours ?? 0} hour
                  {(booking.hours ?? 0) > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
                <p className="text-base font-bold text-white">
                  ৳{Number(booking.total ?? 0).toLocaleString("en-US")}
                </p>
                <Link
                  href={`/profile/booking-details?id=${booking._id}`}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/5"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
