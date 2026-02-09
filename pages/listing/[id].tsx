
import Link from "next/link";
import { CalendarDays, MapPin, BedDouble } from "lucide-react";
import LabelRow from "../../components/common/LabelRow";
import Pill from "../../components/common/Pill";

export default function ListingDetail({ listing }: { listing?: any }) {
  if (!listing) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground">Listing not found.</p>
          <Link href="/" className="text-primary underline">← Back</Link>
        </div>
      </div>
    );
  }

  const postedAt = listing.posted_at ?? listing.created_at ?? Date.now();
  const campus = listing.campus ?? "Unknown campus";
  const startDate = listing.start_date;
  const endDate = listing.end_date;
  const roomType = listing.room_type ?? "Room";
  const rent = listing.rent ?? 0;
  const images = Array.isArray(listing.images) ? listing.images : [];
  const utilitiesIncluded = !!listing.utilities_included;
  const furnished = !!listing.furnished;
  const pets = !!listing.pets;
  const contact = listing.contact ?? "N/A";
  const title = listing.title ?? "Untitled Listing";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
          <Link href="/" className="text-sm text-primary underline">← Back to listings</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <img
              src={images[0] || "https://images.unsplash.com/photo-1560185008-b033106af2b9"}
              alt={title}
              className="aspect-[4/3] w-full rounded-xl object-cover border"
            />

            <p className="text-sm text-muted-foreground">
              Posted {new Date(postedAt).toLocaleDateString()} · {campus}
            </p>

            <div className="flex flex-wrap gap-3 text-gray-600">
              <LabelRow icon={MapPin} label={campus} />
              <LabelRow icon={CalendarDays} label={`Start ${new Date(startDate).toLocaleDateString()}`} />
              {endDate && <LabelRow icon={CalendarDays} label={`End ${new Date(endDate).toLocaleDateString()}`} />}
              <LabelRow icon={BedDouble} label={roomType} />
            </div>

            <p className="leading-relaxed">{listing.description}</p>

            <div className="flex items-center gap-2 flex-wrap">
              {utilitiesIncluded && <Pill>Utilities incl.</Pill>}
              {furnished && <Pill>Furnished</Pill>}
              {pets && <Pill>Pets OK</Pill>}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border p-4 space-y-2">
              <div className="text-2xl font-bold">${rent}/mo</div>
              <div className="text-sm text-muted-foreground">{roomType}</div>
              <button
                className="w-full h-10 rounded-md bg-primary text-primary-foreground"
                onClick={() => alert(`Contact: ${contact}`)}
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
