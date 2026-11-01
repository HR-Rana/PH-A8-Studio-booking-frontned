import musicMixingConsole from "../../../public/images/music-mixing-console.jpg";
import photoShootSession from "../../../public/images/photo-shoot-session.jpg";
import podcastRecordingRoom from "../../../public/images/podcast-recording-room.jpg";
import redHomeStudio from "../../../public/images/red-home-studio.jpg";
import whiteCycStudio from "../../../public/images/white-cyc-studio.jpg";
import purplePodcastStudio from "../../../public/images/purple-podcast-studio.png";

export const studioImages = {
  "Photo Shoot Session": photoShootSession,
  "Podcast Room": podcastRecordingRoom,
  "Music Console": musicMixingConsole,
  "Home Studio": redHomeStudio,
  "White Cyc": whiteCycStudio,
  "Purple Podcast": purplePodcastStudio,
};

export type StudioImageKey = keyof typeof studioImages;

export type ListingStatus = "Approved" | "Pending" | "Draft";

export type StudioListing = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  image: StudioImageKey;
  tags: string[];
  status: ListingStatus;
  bookings: number;
  rating: number;
};

export type BookingStatus = "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  studio: string;
  image: StudioImageKey;
  location: string;
  date: string;
  time: string;
  hours: number;
  total: number;
  status: BookingStatus;
};

export const initialListings: StudioListing[] = [
  {
    id: "st-1",
    name: "Infinity White Cyc Studio",
    category: "Photography",
    location: "Banani, Dhaka",
    price: 1000,
    image: "White Cyc",
    tags: ["Cyc Wall", "Professional Lights"],
    status: "Approved",
    bookings: 22,
    rating: 4.9,
  },
  {
    id: "st-2",
    name: "The Creator Hub",
    category: "Podcast",
    location: "Dhanmondi, Dhaka",
    price: 1500,
    image: "Podcast Room",
    tags: ["3 Mics", "4K Camera"],
    status: "Approved",
    bookings: 18,
    rating: 4.8,
  },
  {
    id: "st-3",
    name: "Harmony Music Studio",
    category: "Music",
    location: "Gulshan, Dhaka",
    price: 1800,
    image: "Music Console",
    tags: ["Studio Monitors", "Voice Booth"],
    status: "Pending",
    bookings: 7,
    rating: 4.9,
  },
];

export const initialBookings: Booking[] = [
  {
    id: "bk-1",
    studio: "Infinity White Cyc Studio",
    image: "White Cyc",
    location: "Banani, Dhaka",
    date: "Nov 5, 2026",
    time: "10:00 AM – 2:00 PM",
    hours: 4,
    total: 4000,
    status: "Confirmed",
  },
  {
    id: "bk-2",
    studio: "The Creator Hub",
    image: "Podcast Room",
    location: "Dhanmondi, Dhaka",
    date: "Nov 9, 2026",
    time: "3:00 PM – 6:00 PM",
    hours: 3,
    total: 4500,
    status: "Confirmed",
  },
  {
    id: "bk-3",
    studio: "Harmony Music Studio",
    image: "Music Console",
    location: "Gulshan, Dhaka",
    date: "Oct 18, 2026",
    time: "11:00 AM – 4:00 PM",
    hours: 5,
    total: 9000,
    status: "Completed",
  },
  {
    id: "bk-4",
    studio: "Artistry Workshop",
    image: "Home Studio",
    location: "Mirpur, Dhaka",
    date: "Oct 2, 2026",
    time: "9:00 AM – 12:00 PM",
    hours: 3,
    total: 3600,
    status: "Cancelled",
  },
];

export const studioCategories = [
  "Photography",
  "Film",
  "Podcast",
  "Music",
  "Art",
  "Content Creation",
];

export const amenityOptions = [
  "Cyc Wall",
  "Professional Lights",
  "4K Camera",
  "Voice Booth",
  "Studio Monitors",
  "Green Screen",
  "Makeup Room",
  "Free Parking",
  "Wi-Fi",
  "Air Conditioning",
];
