"use client";

import Image from "next/image";
import {
  IconArrow,
  IconCalendar,
  IconDatabase,
  IconGem,
  IconTrend,
  IconUsers,
} from "../AuthIcons";
import ProfileCard from "./ProfileCard";
import type { StudioListing } from "./ProfileData";
import type { MyBooking, MyBookingStatus } from "./BookingDetails";

export type DashboardUser = {
  name: string;
  email: string;
  role?: string | null;
};

const statusStyles: Record<MyBookingStatus, string> = {
  Pending: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30",
  Confirmed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  Completed: "bg-purple-500/10 text-purple-400 ring-purple-500/30",
  Cancelled: "bg-red-500/10 text-red-400 ring-red-500/30",
};

export default function DashboardOverview({
  user,
  listings,
  bookings,
  onNavigate,
  signout,
}: {
  user: DashboardUser;
  listings: StudioListing[];
  bookings: MyBooking[];
  onNavigate: (tab: "Add New Studio" | "My Studio Listings" | "My Bookings") => void;
  signout: () => Promise<void>;
}) {
  const totalBookings = bookings.length;
  const totalSpent = bookings
    .filter((booking) => booking.status !== "Cancelled")
    .reduce((sum, booking) => sum + (booking.total ?? 0), 0);
  const avgRating =
    listings.length > 0
      ? (
          listings.reduce((sum, listing) => sum + listing.rating, 0) /
          listings.length
        ).toFixed(1)
      : "—";

  const stats = [
    {
      label: "Active Listings",
      value: listings.filter((l) => l.status === "Approved").length,
      hint: `${listings.length} total`,
      icon: <IconDatabase className="h-5 w-5" />,
    },
    {
      label: "Booked Studios",
      value: totalBookings,
      hint: "lifetime bookings",
      icon: <IconCalendar className="h-5 w-5" />,
    },
    {
      label: "Total Spent",
      value: `৳${totalSpent.toLocaleString("en-US")}`,
      hint: "on studio bookings",
      icon: <IconTrend className="h-5 w-5" />,
    },
    {
      label: "Avg. Rating",
      value: avgRating,
      hint: "across your studios",
      icon: <IconGem className="h-5 w-5" />,
    },
  ];

  const quickActions = [
    {
      label: "Upload a New Studio",
      hint: "List your space in minutes",
      tab: "Add New Studio" as const,
      icon: <IconUsers className="h-5 w-5 text-purple-400" />,
    },
    {
      label: "View My Listings",
      hint: "Manage your studios",
      tab: "My Studio Listings" as const,
      icon: <IconDatabase className="h-5 w-5 text-purple-400" />,
    },
    {
      label: "See My Bookings",
      hint: "Upcoming & past bookings",
      tab: "My Bookings" as const,
      icon: <IconCalendar className="h-5 w-5 text-purple-400" />,
    },
  ];

  const recentBookings = [...bookings]
    .filter((booking) => booking.status !== "Cancelled")
    .slice(0, 3);





    

  return (
    <div className="space-y-10">
      <ProfileCard user={user} signout={signout} />

      <section>
        <h2 className="text-lg font-bold text-white">Overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-[#191324] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-white/50">
                  {stat.label}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-purple-500/10 text-purple-400">
                  {stat.icon}
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-white/50">{stat.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-white">Quick Actions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigate(action.tab)}
              className="group flex items-start justify-between gap-4 rounded-xl border border-white/5 bg-[#191324] p-5 text-left transition-colors hover:border-purple-500/40"
            >
              <span>
                <span className="flex items-center gap-3 font-semibold text-white">
                  {action.icon}
                  {action.label}
                </span>
                <span className="mt-2 block text-xs text-white/50">
                  {action.hint}
                </span>
              </span>
              <IconArrow className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-purple-400" />
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Bookings</h2>
          <button
            type="button"
            onClick={() => onNavigate("My Bookings")}
            className="flex items-center gap-2 text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300"
          >
            View All
            <IconArrow className="h-3.5 w-3.5" />
          </button>
        </div>

        {recentBookings.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-white/10 bg-[#191324]/60 p-6 text-center text-sm text-white/60">
            No confirmed bookings yet.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-white/5 rounded-xl border border-white/5 bg-[#191324]">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-wrap items-center gap-4 p-4"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={booking.studioImage || "/placeholder.png"}
                    alt={booking.studioName || "Studio"}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {booking.studioName || "Studio booking"}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    {booking.date} · {booking.time}
                  </p>
                </div>
                <p className="text-sm font-bold text-white">
                  ৳{Number(booking.total ?? 0).toLocaleString("en-US")}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${statusStyles[booking.status ?? "Pending"]}`}
                >
                  {booking.status ?? "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
