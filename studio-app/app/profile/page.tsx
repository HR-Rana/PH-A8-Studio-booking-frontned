"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import ProfileTabs, { type ProfileTab } from "../components/profile/ProfileTabs";
import DashboardOverview from "../components/profile/DashboardOverview";
import UploadStudioForm from "../components/profile/UploadStudioForm";
import MyStudioListings from "../components/profile/MyStudioListings";
import MyBookingsList from "../components/profile/MyBookingsList";
import {
  initialBookings,
  initialListings,
  type StudioListing,
} from "../components/profile/ProfileData";

const tabTitles: Record<ProfileTab, { title: string; subtitle: string }> = {
  Dashboard: {
    title: "Dashboard",
    subtitle: "See your studios, bookings and account at a glance.",
  },
  "Add New Studio": {
    title: "Add New Studio",
    subtitle: "Upload a studio and start hosting creators.",
  },
  "My Studio Listings": {
    title: "My Studio Listings",
    subtitle: "Everything you have listed on StudioSpace.",
  },
  "My Bookings": {
    title: "My Bookings",
    subtitle: "Studios you have booked, past and upcoming.",
  },
};

const LoggedOutNotice = () => (
  <main className="grid min-h-screen place-items-center bg-[#0b0a10] px-6">
    <div className="max-w-md rounded-2xl border border-white/5 bg-[#191324] p-10 text-center">
      <h1 className="text-xl font-bold text-white">You are not logged in</h1>
      <p className="mt-2 text-sm text-white/50">
        Log in to manage your studios and bookings.
      </p>
      <Link
        href="/login"
        className="mt-6 inline-flex rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)]"
      >
        Go to Login
      </Link>
    </div>
  </main>
);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("Dashboard");
  const [listings, setListings] = useState<StudioListing[]>(initialListings);

  const { data: session, isPending, error } = authClient.useSession();

  if (error) {
    toast.error(error.message);
  }

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0b0a10]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />
      </main>
    );
  }

  if (!session?.user) {
    return <LoggedOutNotice />;
  }


    const user = session.user;



    const handleLogOut = async () => {
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        toast.error(signOutError.message ?? "Failed to log out");
        return;
      }

      toast.success("Logged out successfully");
      window.location.href = "/";
    };





  const handleUpload = (listing: StudioListing) => {
    setListings((current) => [listing, ...current]);
    setActiveTab("My Studio Listings");
  };

  return (
    <div className="min-h-screen bg-[#0b0a10] font-sans">
      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {tabTitles[activeTab].title}
          </h1>
          <p className="mt-2 text-sm text-white/50">
            {tabTitles[activeTab].subtitle}
          </p>
        </div>

        {activeTab === "Dashboard" ? (
          <DashboardOverview
            user={user}
            signout={handleLogOut}
            listings={listings}
            bookings={initialBookings}
            onNavigate={setActiveTab}
          />
        ) : null}

        {activeTab === "Add New Studio" ? (
          <UploadStudioForm onUpload={handleUpload} />
        ) : null}

        {activeTab === "My Studio Listings" ? (
          <MyStudioListings
            listings={listings}
            onDelete={(id) =>
              setListings((current) => current.filter((item) => item.id !== id))
            }
            onNavigate={setActiveTab}
          />
        ) : null}

        {activeTab === "My Bookings" ? (
          <MyBookingsList bookings={initialBookings} />
        ) : null}
      </main>
    </div>
  );
}
