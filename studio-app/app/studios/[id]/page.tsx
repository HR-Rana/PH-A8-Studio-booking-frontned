import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingCard from "../../components/BookingCard";
import { IconMapPin, IconStar } from "../../components/AuthIcons";

export const metadata: Metadata = {
    title: "Studio Details — StudioSpace",
    description:
        "Studio details, amenities and instant booking on StudioSpace.",
};

type StudioDetails = {
    _id: string;
    name: string;
    category?: string;
    description?: string;
    location?: string;
    price: number;
    image: string;
    tags?: string[];
    rating?: number;
    reviews?: number;
    capacity?: number | string;
};

async function getStudio(id: string): Promise<StudioDetails | null> {
    try {
        const res = await fetch(`${process.env.process.env.NEXT_PUBLIC_BASE_URL}/api/getStudios`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        const data: StudioDetails[] = await res.json();

        return data.find((studio) => studio._id === id) ?? null;
    } catch (error) {
        console.error("Error fetching studio:", error);
        return null;
    }
}

function DetailsSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6">
                    <div className="h-64 animate-pulse rounded-2xl bg-white/5 sm:h-80 lg:h-[420px]" />
                    <div className="h-72 animate-pulse rounded-2xl bg-white/5" />
                </div>
                <div className="h-96 animate-pulse rounded-2xl bg-white/5" />
            </div>
        </div>
    );
}

async function StudioDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const studio = await getStudio(id);

    if (!studio) {
        notFound();
    }

    const detailsList = [
        {
            label: "Category",
            value: studio.category ?? "Creative Studio",
        },
        {
            label: "Capacity",
            value:
                studio.capacity !== undefined && studio.capacity !== ""
                    ? `${studio.capacity} people`
                    : "Up to 8 people",
        },
        {
            label: "Price",
            value: `৳${Number(studio.price).toLocaleString("en-US")} /hour`,
        },
        {
            label: "Rating",
            value:
                studio.rating && studio.rating > 0
                    ? `${studio.rating} (${studio.reviews ?? 0} reviews)`
                    : "New listing",
        },
    ];

    return (
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <Link
                href="/explore"
                className="text-sm text-white/60 transition-colors hover:text-purple-400"
            >
                ← Back to Explore
            </Link>

            <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                <div className="space-y-6">
                    <div className="relative h-64 overflow-hidden rounded-2xl border border-white/5 sm:h-80 lg:h-[420px]">
                        <Image
                            src={studio.image}
                            alt={studio.name}
                            fill
                            priority
                            sizes="(min-width: 1024px) 55vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#191324] p-6 sm:p-8">
                        <h1 className="text-2xl font-bold text-white sm:text-3xl">
                            {studio.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                            {studio.location ? (
                                <span className="flex items-center gap-1.5 text-sm text-white/60">
                                    <IconMapPin className="h-4 w-4 text-purple-400" />
                                    {studio.location}
                                </span>
                            ) : null}

                            {studio.rating && studio.rating > 0 ? (
                                <span className="flex items-center gap-1.5 text-sm">
                                    <IconStar className="h-4 w-4 text-amber-400" />
                                    <span className="font-semibold text-white">
                                        {studio.rating}
                                    </span>
                                    <span className="text-white/50">
                                        ({studio.reviews ?? 0} reviews)
                                    </span>
                                </span>
                            ) : null}

                            {studio.category ? (
                                <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold text-purple-300 ring-1 ring-purple-500/30">
                                    {studio.category}
                                </span>
                            ) : null}
                        </div>

                        <p className="mt-5 text-sm leading-relaxed text-white/70">
                            {studio.description ??
                                `The ${studio.name} is a professional creative space available for photography, film, podcast and music sessions. Contact the host through a booking to check availability.`}
                        </p>

                        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/5 pt-6 sm:grid-cols-4">
                            {detailsList.map((item) => (
                                <div key={item.label}>
                                    <dt className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                                        {item.label}
                                    </dt>
                                    <dd className="mt-1.5 text-sm font-semibold text-white">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {studio.tags?.length ? (
                            <div className="mt-7 border-t border-white/5 pt-6">
                                <h2 className="text-sm font-semibold text-white">Amenities</h2>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {studio.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 ring-1 ring-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="lg:sticky lg:top-24">
                    <BookingCard
                        studio={{
                            id: studio._id,
                            name: studio.name,
                            image: studio.image,
                            location: studio.location ?? "",
                            price: Number(studio.price),
                            rating: studio.rating,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function Page({ params }: PageProps<"/studios/[id]">) {
    return (
        <div className="min-h-screen bg-[#0b0a10] font-sans">
            <Navbar active="Explore Studios" />

            <main>
                <Suspense fallback={<DetailsSkeleton />}>
                    <StudioDetails params={params} />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
