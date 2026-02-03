import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEMO_LISTINGS } from "../../data/demo";
import type { Listing } from "../../types/Listing";
import { CalendarDays, MapPin, BedDouble } from "lucide-react";
import LabelRow from "../../components/common/LabelRow";
import Pill from "../../components/common/Pill";

export default function ListingDetail() {
  const { query } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const [store, setStore] = useState<Listing[] | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("roomn:listings");
      setStore(raw ? JSON.parse(raw) : null);
    } catch {}
  }, []);

  const listing = useMemo(() => {
    const all = [...DEMO_LISTINGS, ...(store ?? [])];
    return all.find((l) => l.id === id);
  }, [id, store]);

  if (!id || !listing) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground">Listing not found.</p>
          <Link href="/" className="text-primary underline">← Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">{listing.title}</h1>
          <Link href="/" className="text-sm text-primary underline">← Back to listings</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <img
            src={listing.images?.[0] || "https://images.unsplash.com/photo-1560185008-b033106af2b9"}
            alt={listing.title}
            className="aspect-[4/3] w-full rounded-xl object-cover border"
            />

            <p className="text-sm text-muted-foreground">
            Posted {new Date(listing.postedAt ?? Date.now()).toLocaleDateString()} · {listing.campus}
            </p>

            <div className="flex flex-wrap gap-3 text-gray-600">
            <LabelRow icon={MapPin} label={listing.campus} />
            <LabelRow icon={CalendarDays} label={`Start ${new Date(listing.startDate).toLocaleDateString()}`} />
            {listing.endDate && <LabelRow icon={CalendarDays} label={`End ${new Date(listing.endDate).toLocaleDateString()}`} />}
            <LabelRow icon={BedDouble} label={listing.roomType} />
            </div>

            <p className="leading-relaxed">{listing.description}</p>

            <div className="flex items-center gap-2 flex-wrap">
            {listing.utilitiesIncluded && <Pill>Utilities incl.</Pill>}
            {listing.furnished && <Pill>Furnished</Pill>}
            {listing.pets && <Pill>Pets OK</Pill>}
            </div>

          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border p-4 space-y-2">
              <div className="text-2xl font-bold">${listing.rent}/mo</div>
              <div className="text-sm text-muted-foreground">{listing.roomType}</div>
              <button
                className="w-full h-10 rounded-md bg-primary text-primary-foreground"
                onClick={() => alert(`Contact: ${listing.contact}`)}
              >
                Contact
              </button>
            </div>
            <div className="rounded-xl border p-4 text-sm text-muted-foreground">
              Safety tip: meet in public first; never send money before seeing the place.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
