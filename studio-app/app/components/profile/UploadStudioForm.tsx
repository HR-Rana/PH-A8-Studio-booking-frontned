"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  IconCamera,
  IconCheck,
  IconPlus,
  IconStore,
  IconUpload,
} from "../AuthIcons";
import {
  amenityOptions,
  studioCategories,
  studioImages,
  type StudioImageKey,
  type StudioListing,
} from "./ProfileData";
import error from "next/dist/api/error";

const imageOptions = Object.keys(studioImages) as StudioImageKey[];

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
  const [image, setImage] = useState<StudioImageKey | "">("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setLocation("");
    setPrice("");
    setDescription("");
    setCapacity("");
    setImage("");
    setAmenities([]);
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

    const listing: StudioListing = {
      id: `st-${Date.now()}`,
      name: name.trim(),
      category,
      location: location.trim(),
      price: Number(price),
      image: image || "White Cyc",
      tags: amenities.slice(0, 3),
      status: "Pending",
      bookings: 0,
      rating: 0,
    };


    
    try{
      const res = await fetch(`http://localhost:5000/api/createStudios`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(listing)
      })

      const data = await res.json()
      console.log(data)
      toast.success(data.message);

      if(!res.ok){
        throw new error(data.error)
      }
    }catch(error){
      console.log(error.message)
    }




    onUpload(listing);
    // toast.success(`"${listing.name}" has been submitted for review`);
    resetForm();
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

        <div className="grid gap-5 sm:grid-cols-2">
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
          <span className="text-sm font-medium text-white/80">Cover Image</span>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {imageOptions.map((option) => {
              const isSelected = image === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setImage(option)}
                  aria-pressed={isSelected}
                  className={
                    isSelected
                      ? "relative h-16 overflow-hidden rounded-lg ring-2 ring-purple-500 sm:h-20"
                      : "relative h-16 overflow-hidden rounded-lg ring-1 ring-white/10 transition hover:ring-purple-500/60 sm:h-20"
                  }
                >
                  <Image
                    src={studioImages[option]}
                    alt={option}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  {isSelected ? (
                    <span className="absolute inset-0 grid place-items-center bg-black/50 text-purple-400">
                      <IconCheck className="h-4 w-4" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
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
