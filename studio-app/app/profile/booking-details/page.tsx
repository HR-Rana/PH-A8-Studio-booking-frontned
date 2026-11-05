"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingDetails, {
  type MyBooking,
} from "../../components/profile/BookingDetails";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

function BookingDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("id") ?? "";

  const [booking, setBooking] = useState<MyBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);

    const getBooking = async () => {
      try {
        const res = await fetch(`${API_BASE}/getBookings/${bookingId}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!isCancelled) {
          setBooking(res.ok ? data : null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching booking:", error);
          setBooking(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    getBooking();

    return () => {
      isCancelled = true;
    };
  }, [bookingId]);

  if (loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />
      </main>
    );
  }

  if (!bookingId || !booking) {
    return (
      <main className="grid min-h-[60vh] place-items-center px-6">
        <div className="max-w-md rounded-2xl border border-white/5 bg-[#191324] p-10 text-center">
          <h1 className="text-xl font-bold text-white">Booking not found</h1>
          <p className="mt-2 text-sm text-white/50">
            The booking you are looking for does not exist or was removed.
          </p>
          <Link
            href="/profile"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)]"
          >
            Back to Profile
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
      <BookingDetails
        booking={booking}
        onClose={() => router.back()}
        onUpdate={(updated) => setBooking(updated)}
      />
    </main>
  );
}

export default function BookingDetailsPage() {
  return (
    <div className="min-h-screen bg-[#0b0a10] font-sans">
      <Navbar />

      <Suspense
        fallback={
          <main className="grid min-h-[60vh] place-items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />
          </main>
        }
      >
        <BookingDetailsContent />
      </Suspense>

    </div>
  );
}
