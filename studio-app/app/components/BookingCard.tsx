"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { IconCalendar, IconClock, IconMapPin, IconStar } from "./AuthIcons";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api"`;

const hourOptions = [1, 2, 3, 4, 6, 8, 12];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export type BookingStudio = {
  id: string;
  name: string;
  image: string;
  location: string;
  price: number;
  rating?: number;
};

export default function BookingCard({ studio }: { studio: BookingStudio }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [selectedHours, setSelectedHours] = useState(2);
  const [booking, setBooking] = useState(false);

  const total = studio.price * selectedHours;
  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async () => {
    if (!selectedDate) {
      toast.error("Please select a booking date.");
      return;
    }

    setBooking(true);

    try {
      const res = await fetch(`${API_BASE}/api/createBookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId: studio.id,
          studioName: studio.name,
          studioImage: studio.image,
          location: studio.location,
          date: selectedDate,
          time: selectedTime,
          hours: selectedHours,
          total,
          status: "Pending",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Failed to book this studio");
      }

      toast.success(data.message ?? "Booking confirmed");
      setSelectedDate("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-[#191324] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">{studio.name}</h2>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
            <IconMapPin className="h-3.5 w-3.5 text-purple-400" />
            {studio.location}
          </p>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
          <IconStar className="h-3.5 w-3.5" />
          {studio.rating && studio.rating > 0 ? studio.rating : "New"}
        </span>
      </div>

      <p className="mt-4 border-b border-white/5 pb-5 text-2xl font-bold text-white">
        ৳{studio.price.toLocaleString("en-US")}
        <span className="text-xs font-normal text-white/50"> /hour</span>
      </p>

      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <label
            htmlFor="booking-date"
            className="text-sm font-medium text-white/80"
          >
            Booking Date
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
            <IconCalendar className="h-4 w-4 shrink-0 text-purple-400" />
            <input
              id="booking-date"
              type="date"
              min={today}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-white [color-scheme:dark] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="booking-time"
            className="text-sm font-medium text-white/80"
          >
            Start Time
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
            <IconClock className="h-4 w-4 shrink-0 text-purple-400" />
            <select
              id="booking-time"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              className="w-full appearance-none bg-transparent text-sm text-white focus:outline-none"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="bg-[#241b33]">
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-white/80">
            Duration (hours)
          </span>
          <div className="grid grid-cols-4 gap-2">
            {hourOptions.map((hour) => (
              <button
                key={hour}
                type="button"
                aria-pressed={selectedHours === hour}
                onClick={() => setSelectedHours(hour)}
                className={
                  selectedHours === hour
                    ? "rounded-lg bg-purple-500/15 py-2.5 text-sm font-semibold text-purple-300 ring-1 ring-purple-500/50"
                    : "rounded-lg bg-white/5 py-2.5 text-sm font-medium text-white/70 ring-1 ring-white/10 transition-colors hover:text-white"
                }
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white/[0.02] p-4 text-sm">
        <div className="flex items-center justify-between text-white/60">
          <span>
            ৳{studio.price.toLocaleString("en-US")} × {selectedHours}{" "}
            {selectedHours === 1 ? "hour" : "hours"}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-3 text-base font-bold text-white">
          <span>Total</span>
          <span>৳{total.toLocaleString("en-US")}</span>
        </div>
      </div>

      <button
        type="button"
        disabled={booking}
        onClick={handleBooking}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {booking ? "Booking..." : "Book Now"}
      </button>

      <p className="mt-3 text-center text-[11px] text-white/40">
        Free cancellation up to 48 hours before your booking.
      </p>
    </div>
  );
}
