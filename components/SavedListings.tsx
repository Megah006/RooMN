import type { Listing } from "../types/Listing";
import ListingCard from "./listings/ListingCard";

type Props = {
  listings: Listing[];
  saved: string[];
  onToggleSave: (id: string) => void;
};

export default function SavedListings({ listings = [], saved = [], onToggleSave }: Props) {
  const savedList = listings.filter((l) => saved.includes(l.id));

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {savedList.map((l) => (
        <ListingCard key={l.id} listing={l} saved={saved} onToggleSave={onToggleSave} />
      ))}
      {savedList.length === 0 && (
        <div className="col-span-full text-center text-gray-500 p-10 border rounded-2xl">
          No saved listings yet.
        </div>
      )}
    </div>
  );
}

