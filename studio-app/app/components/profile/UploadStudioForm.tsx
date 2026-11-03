"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  IconCamera,
  IconCheck,
  IconPlus,
  IconStar,
  IconStore,
  IconUpload,
} from "../AuthIcons";
import {
  amenityOptions,
  studioCategories,
  type StudioListing,
} from "./ProfileData";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export default function UploadStudioForm({
  onUpload,
}: {
  onUpload: (listing: StudioListing) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
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

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setLocation("");
    setPrice("");
    setDescription("");
    setCapacity("");
    setRating("");
    setImageFile(null);
    setImagePreview("");
    setAmenities([]);
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

    if (rating && (Number(rating) < 0 || Number(rating) > 5)) {
      toast.error("Rating must be between 0 and 5.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = "";

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

      const listing: StudioListing = {
        id: `st-${Date.now()}`,
        name: name.trim(),
        category,
        location: location.trim(),
        price: Number(price),
        image: imageUrl || "White Cyc",
        tags: amenities.slice(0, 3),
        status: "Pending",
        bookings: 0,
        rating: rating === "" ? 0 : Number(rating),
      };

      const res = await fetch(`${API_BASE}/createStudios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(listing)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Failed to create studio");
      }

      console.log(data);
      toast.success(data.message ?? "Studio submitted for review");
      onUpload(listing);
      resetForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/5 bg-[#191324] p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
          <IconUpload className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-white">Add New Studio</h2>
          <p className="text-xs text-white/50">
            Fill in the details below — new listings go live after review.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="studio-name" className="text-sm font-medium text-white/80">
            Studio Name
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
            <IconStore className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              id="studio-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Infinity White Cyc Studio"
              className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="studio-category" className="text-sm font-medium text-white/80">
              Category
            </label>
            <select
              id="studio-category"
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
            <label htmlFor="studio-location" className="text-sm font-medium text-white/80">
              Location
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
              <input
                id="studio-location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Dhanmondi, Dhaka"
                className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="grid gap-2">
            <label htmlFor="studio-price" className="text-sm font-medium text-white/80">
              Price per hour (৳)
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
              <input
                id="studio-price"
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="e.g. 1500"
                className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="studio-capacity" className="text-sm font-medium text-white/80">
              Max. Capacity (people)
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
              <input
                id="studio-capacity"
                type="number"
                min="0"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                placeholder="e.g. 8"
                className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="studio-rating" className="text-sm font-medium text-white/80">
              Rating (0 – 5)
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
              <IconStar className="h-4 w-4 shrink-0 text-amber-400" />
              <input
                id="studio-rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                placeholder="e.g. 4.5"
                className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="studio-description" className="text-sm font-medium text-white/80">
            Description
          </label>
          <textarea
            id="studio-description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Tell creators what makes your space special — gear, lighting, vibe..."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/70 focus:outline-none"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="studio-image" className="text-sm font-medium text-white/80">
            Cover Image
          </label>
          <input
            id="studio-image"
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
                onClick={removeImage}
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-red-500/70"
              >
                Remove
              </button>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-medium text-purple-300">
                {imageFile?.name}
              </span>
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
                  {isSelected ? <IconCheck className="h-3 w-3" /> : <IconCamera className="h-3 w-3" />}
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start sm:px-10"
        >
          <IconPlus className="h-4 w-4" />
          Upload Studio
        </button>
      </div>
    </form>
  );
}
