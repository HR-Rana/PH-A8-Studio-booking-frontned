"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import {
  IconEdit,
  IconListings,
  IconMapPin,
  IconPlus,
  IconStar,
  IconTrash,
} from "../AuthIcons";

import type {
  ListingStatus,
  StudioImageKey,
  StudioListing,
} from "./ProfileData";

import { studioImages } from "./ProfileData";
import { useEffect, useState } from "react";
import EditStudioForm from "./EditStudioForm";

const API_BASE = "http://localhost:5000/api";

const statusStyles: Record<ListingStatus, string> = {
  Approved: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  Pending: "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  Draft: "bg-white/5 text-white/60 ring-white/15",
};

export default function MyStudioListings({
  listings,
  onDelete,
  onNavigate,
}: {
  listings: StudioListing[];
  onDelete: (id: string) => void;
  onNavigate: (tab: "Add New Studio") => void;
}) {
  const [studios, setStudios] = useState<StudioListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/getStudios");

        if (!res.ok) {
          throw new Error("Failed to fetch studios");
        }

        const result = await res.json();
        console.log(result)

        setStudios(result);

      } catch (error) {
        console.error("Error fetching studios:", error);
        toast.error("Failed to load studios");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const handleUpdate = (updated: StudioListing) => {
    console.log(updated)
    setStudios((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
  };

  const handleDelete = async (listing: StudioListing) => {
    setDeletingId(listing.id);

    try {
      const res = await fetch(`http://localhost:5000/api/deleteStudios/${listing._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Failed to delete studio");
      }

      setStudios((current) =>
        current.filter((item) => item.id !== listing.id),
      );

      onDelete(listing.id);
      toast.success(`"${listing.name}" Deleted successfully`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const editingListing =
    studios.find((listing) => listing.id === editingId) ?? null;


  // Loading State
  if (loading) {
    return (
      <p className="py-10 text-center text-white/60">
        Studios are loading...
      </p>
    );
  }

  // Empty State
  if (studios.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-[#191324]/60 p-10 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
          <IconListings className="h-6 w-6" />
        </span>

        <h3 className="mt-4 text-lg font-bold text-white">
          No listings yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
          You have not uploaded any studios yet. List your space and start
          hosting creators.
        </p>

        <button
          type="button"
          onClick={() => onNavigate("Add New Studio")}
          className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)] transition-transform hover:scale-[1.02]"
        >
          <IconPlus className="h-4 w-4" />
          Add New Studio
        </button>
      </div>
    );
  }

  // Studios Listing
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {studios.map((listing) => {
        const coverImage =
          studioImages[listing.image as StudioImageKey] ?? listing.image;

        return (
          <article
            key={listing.id}
            className="overflow-hidden rounded-xl border border-white/5 bg-[#191324]"
          >
            <div className="relative h-40">
              <Image
                src={coverImage || "/placeholder.png"}
                alt={listing.name}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />

              <span
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${
                  statusStyles[listing.status]
                }`}
              >
                {listing.status}
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {listing.name}
                </h3>

                <p className="shrink-0 text-sm font-bold text-white">
                  ৳{listing.price.toLocaleString("en-US")}
                  <span className="text-[10px] font-normal text-white/50">
                    {" "}
                    /hour
                  </span>
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <IconStar className="h-3.5 w-3.5 text-amber-400" />

                <span className="font-semibold text-white">
                  {listing.rating > 0 ? listing.rating : "New"}
                </span>

                <span className="text-white/50">
                  ({listing.bookings} bookings)
                </span>

                <IconMapPin className="ml-1 h-3.5 w-3.5 text-purple-400" />

                <span className="text-white/70">
                  {listing.location}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-purple-500/10 px-2 py-1 text-[10px] font-medium text-purple-300 ring-1 ring-purple-500/30">
                  {listing.category}
                </span>

                {listing.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-white/70 ring-1 ring-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(listing.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <IconEdit className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  type="button"
                  disabled={deletingId === listing.id}
                  onClick={() => handleDelete(listing)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IconTrash className="h-3.5 w-3.5" />
                  {deletingId === listing.id ? "Removing..." : "Delete"}
                </button>
              </div>
            </div>
          </article>
        );
      })}

      {editingListing ? (
        <EditStudioForm
          listing={editingListing}
          onClose={() => setEditingId(null)}
          onUpdate={handleUpdate}
        />
      ) : null}
    </div>
  );
}