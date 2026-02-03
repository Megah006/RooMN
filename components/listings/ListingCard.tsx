import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Pill from "../common/Pill";
import LabelRow from "../common/LabelRow";
import { CalendarDays, Heart, MapPin, BedDouble } from "lucide-react";
import type { Listing } from "../../types/Listing";

type Props = {
  listing: Listing;
  saved: string[];
  onToggleSave: (id: string) => void;
};

export default function ListingCard({ listing: l, saved, onToggleSave }: Props) {
  const isSaved = saved.includes(l.id);

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-sm group">
      {/* Clickable body grows to fill the card */}
      <Link href={`/listing/${l.id}`} className="block flex-1 focus:outline-none focus:ring-2 focus:ring-ring">
        <div className="relative h-40 w-full bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={l.images?.[0] || "https://images.unsplash.com/photo-1560185008-b033106af2b9"}
            alt={l.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave(l.id);
            }}
            className={`absolute top-2 right-2 rounded-full p-2 bg-white/80 backdrop-blur ${
              isSaved ? "text-red-600" : "text-gray-600"
            }`}
            aria-label="save listing"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight">{l.title}</h3>
            <Pill>${l.rent}/mo</Pill>
          </div>

          <div className="flex flex-wrap gap-3 text-gray-600">
            <LabelRow icon={MapPin} label={l.campus} />
            <LabelRow icon={CalendarDays} label={`Start ${new Date(l.startDate).toLocaleDateString()}`} />
            {l.endDate && <LabelRow icon={CalendarDays} label={`End ${new Date(l.endDate).toLocaleDateString()}`} />}
            <LabelRow icon={BedDouble} label={l.roomType} />
          </div>

          <p className="text-sm text-gray-700 line-clamp-3">{l.description}</p>

          <div className="flex items-center gap-2 flex-wrap">
            {l.utilitiesIncluded && <Pill>Utilities incl.</Pill>}
            {l.furnished && <Pill>Furnished</Pill>}
            {l.pets && <Pill>Pets OK</Pill>}
          </div>
        </CardContent>
      </Link>

      {/* Sticky-to-bottom action row */}
      <div className="mt-auto px-4 pb-4 pt-2 flex items-center justify-between">
        <button
          className="border rounded-md px-3 py-1 text-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `mailto:${l.contact}`;
          }}
        >
          Contact
        </button>
        <button
          className="rounded-md px-3 py-1 text-sm bg-gray-900 text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert("Report submitted. (Moderation queue soon)");
          }}
        >
          Report
        </button>
      </div>
    </Card>
  );
}
