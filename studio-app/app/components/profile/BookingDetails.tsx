"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  IconArrow,
  IconCalendar,
  IconClock,
  IconTrash,
} from "../AuthIcons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export type MyBookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type MyBooking = {
  _id: string;
  studioId?: string;
  studioName?: string;
  studioImage?: string;
  location?: string;
  date?: string;
  time?: string;
  hours?: number;
  total?: number;
  status?: MyBookingStatus;
  userEmail?: string;
  userId?: string;
};

const statusStyles: Record<MyBookingStatus, string> = {
  Pending: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30",
  Confirmed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  Completed: "bg-purple-500/10 text-purple-400 ring-purple-500/30",
  Cancelled: "bg-red-500/10 text-red-400 ring-red-500/30",
};

function bookedOnLabel(id: string) {
  const seconds = Number.parseInt(id.slice(0, 8), 16);

  if (!seconds || Number.isNaN(seconds)) {
    return null;
  }

  return new Date(seconds * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function BookingDetails({
  booking,
  onClose,
  onUpdate,
}: {
  booking: MyBooking;
  onClose: () => void;
  onUpdate: (booking: MyBooking) => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const status = (booking.status ?? "Pending") as MyBookingStatus;
  const canCancel = status === "Pending" || status === "Confirmed";
  const bookedOn = bookedOnLabel(booking._id);

  const handleCancel = async () => {
    setCancelling(true);

    try {
      const res = await fetch(`${API_BASE}/updateBookings/${booking._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Failed to cancel booking");
      }

      toast.success(data.message ?? "Booking cancelled successfully");
      onUpdate((data.data as MyBooking) ?? { ...booking, status: "Cancelled" });
      setConfirmOpen(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setCancelling(false);
    }
  };

  const details = [
    {
      label: "Booking ID",
      value: `#${booking._id}`,
    },
    {
      label: "Location",
      value: booking.location || "Not specified",
    },
    {
      label: "Booking Date",
      value: booking.date || "Not specified",
    },
    {
      label: "Start Time",
      value: booking.time || "Not specified",
    },
    {
      label: "Duration",
      value: `${booking.hours ?? 0} hour${(booking.hours ?? 0) === 1 ? "" : "s"}`,
    },
    {
      label: "Booked By",
      value: booking.userEmail || booking.userId || "Unknown user",
    },
    {
      label: "Booked On",
      value: bookedOn ?? "—",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/5 bg-[#191324]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-purple-400"
        >
          ← Back to My Bookings
        </button>

        <span
          className={`rounded-full px-4 py-1.5 text-[11px] font-semibold ring-1 ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="relative h-52 overflow-hidden rounded-xl border border-white/5 sm:h-64">
            <Image
              src={booking.studioImage || "/placeholder.png"}
              alt={booking.studioName || "Studio"}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {booking.studioName || "Studio booking"}
            </h2>
            {booking.studioId ? (
              <Link
                href={`/studios/${booking.studioId}`}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300"
              >
                Visit studio page
                <IconArrow className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>

          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <dt className="text-[11px] font-medium uppercase tracking-wide text-white/40">
                  {detail.label}
                </dt>
                <dd className="mt-1 break-all text-sm font-semibold text-white">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="h-fit rounded-2xl border border-white/5 bg-[#241b33] p-6">
          <h3 className="text-sm font-bold text-white">Payment Summary</h3>

          <div className="mt-5 space-y-3 text-sm text-white/60">
            {booking.total !== undefined && booking.hours ? (
              <div className="flex items-center justify-between">
                <span>
                  ৳
                  {Math.max(
                    1,
                    Math.ceil(booking.total / booking.hours),
                  ).toLocaleString("en-US")}{" "}
                  × {booking.hours} hour
                  {booking.hours === 1 ? "" : "s"}
                </span>
                <span className="text-white">
                  ৳{Number(booking.total).toLocaleString("en-US")}
                </span>
              </div>
            ) : null}

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IconClock className="h-3.5 w-3.5 text-purple-400" />
                {booking.time || "10:00 AM"}
              </span>
              <span className="flex items-center gap-1.5">
                <IconCalendar className="h-3.5 w-3.5 text-purple-400" />
                {booking.date || "—"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-base font-bold text-white">
            <span>Total</span>
            <span>৳{Number(booking.total ?? 0).toLocaleString("en-US")}</span>
          </div>

          {canCancel ? (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-3 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10"
            >
              <IconTrash className="h-4 w-4" />
              Cancel Booking
            </button>
          ) : (
            <p className="mt-6 rounded-xl bg-white/[0.02] px-4 py-3 text-center text-xs text-white/50">
              {status === "Cancelled"
                ? "This booking has been cancelled."
                : "This booking can no longer be cancelled."}
            </p>
          )}

          <p className="mt-4 text-center text-[11px] text-white/40">
            Free cancellation up to 48 hours before your booking.
          </p>
        </aside>
      </div>

      <AlertDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmOpen(false);
          }
        }}
      >
        <AlertDialogContent className="border border-white/10 bg-[#191324] text-white">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-red-500/10 text-red-400">
              <IconTrash />
            </AlertDialogMedia>

            <AlertDialogTitle>
              Cancel &quot;{booking.studioName}&quot;?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-white/60">
              Your slot on {booking.date} at {booking.time} will be released.
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="border-white/10 bg-white/[0.02]">
            <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white">
              Keep Booking
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={cancelling}
              onClick={(event) => {
                event.preventDefault();
                handleCancel();
              }}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              {cancelling ? "Cancelling..." : "Yes, Cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
