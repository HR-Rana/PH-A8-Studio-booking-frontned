"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  IconCamera,
  IconCheck,
  IconClose,
  IconEdit,
  IconStore,
} from "../AuthIcons";
import {
  amenityOptions,
  studioCategories,
  type StudioListing,
} from "./ProfileData";

const API_BASE = "http://localhost:5000/api";

export default function EditStudioForm({
  listing,
  onClose,
  onUpdate,
}: {
  listing: StudioListing;
  onClose: () => void;
  onUpdate: (listing: StudioListing) => void;
}) {
  const [name, setName] = useState(listing.name);
  const [category, setCategory] = useState(listing.category);
  const [location, setLocation] = useState(listing.location);
  const [price, setPrice] = useState(String(listing.price));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(listing.image);
  const [amenities, setAmenities] = useState<string[]>(listing.tags ?? []);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only jpeg, png, webp or gif images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const restoreImage = () => {
    setImageFile(null);
    setImagePreview(listing.image);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !category || !location.trim() || !price) {
      toast.error("Please fill in studio name, category, location and price.");
      return;
    }

    if (Number(price) <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = listing.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch(`${API_BASE}/uploadImage`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadData.message ?? "Image upload failed");
        }

        imageUrl = uploadData.data.imageUrl;
      }

      const updated: StudioListing = {
        ...listing,
        name: name.trim(),
        category,
        location: location.trim(),
        price: Number(price),
        image: imageUrl,
        tags: amenities.slice(0, 3),
      };

      const res = await fetch(`${API_BASE}/updateStudio/${listing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Failed to update studio");
      }

      toast.success(data.message ?? "Studio updated successfully");
      onUpdate(updated);
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="max-h-full w-full max-w-xl overflow-y-auto rounded-2xl border border-white/5 bg-[#191324] p-6 sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
              <IconEdit className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Edit Studio</h2>
              <p className="text-xs text-white/50">
                Update the details of &quot;{listing.name}&quot;.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit form"
            className="rounded-lg border border-white/10 p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <label
              htmlFor="edit-studio-name"
              className="text-sm font-medium text-white/80"
            >
              Studio Name
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
              <IconStore className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                id="edit-studio-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="edit-studio-category"
                className="text-sm font-medium text-white/80"
              >
                Category
              </label>
              <select
                id="edit-studio-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 text-sm text-white focus:border-purple-500/70 focus:outline-none"
              >
                <option value="">Select a category</option>
                {studioCategories.map((option) => (
                  <option key={option} value={option} className="bg-[#241b33]">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="edit-studio-location"
                className="text-sm font-medium text-white/80"
              >
                Location
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
                <input
                  id="edit-studio-location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="w-full min-w-0 bg-transparent text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="edit-studio-price"
              className="text-sm font-medium text-white/80"
            >
              Price per hour (৳)
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
              <input
                id="edit-studio-price"
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="edit-studio-image"
              className="text-sm font-medium text-white/80"
            >
              Cover Image
            </label>
            <input
              id="edit-studio-image"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              className="block w-full cursor-pointer rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 text-sm text-white/70 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-purple-500 file:px-6 file:py-2 file:text-sm file:font-semibold file:text-white focus-within:border-purple-500/70 focus:outline-none"
            />
            {imagePreview ? (
              <div className="relative h-40 overflow-hidden rounded-xl border border-white/10 sm:h-48">
                <img
                  src={imagePreview}
                  alt="Selected studio cover"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={restoreImage}
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-red-500/70"
                >
                  Reset
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-8 text-center transition-colors hover:border-purple-500/50 hover:bg-purple-500/5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-500/10 text-purple-400">
                  <IconCamera className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/80">
                  Click to upload a photo
                </span>
                <span className="text-xs text-white/40">
                  jpeg, png, webp or gif — max 5 MB
                </span>
              </button>
            )}
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-medium text-white/80">Amenities</span>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((option) => {
                const isSelected = amenities.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAmenity(option)}
                    aria-pressed={isSelected}
                    className={
                      isSelected
                        ? "flex items-center gap-1.5 rounded-lg bg-purple-500/15 px-3 py-2 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/50"
                        : "flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white/70 ring-1 ring-white/10 transition-colors hover:text-white"
                    }
                  >
                    {isSelected ? (
                      <IconCheck className="h-3 w-3" />
                    ) : (
                      <IconCamera className="h-3 w-3" />
                    )}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
            >
              Update Studio
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-xl border border-white/10 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 sm:w-auto sm:px-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
