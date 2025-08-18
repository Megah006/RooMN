import React from "react";
import type { Listing } from "../../types/Listing";
import ListingCard from "./ListingCard";

type Props = {
  listings: Listing[];
  saved: string[];
  onToggleSave: (id: string) => void;
};

export default function ListingsGrid({ listings = [], saved = [], onToggleSave }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {listings.map((l) => (
        <ListingCard
          key={l.id}
          listing={l}
          saved={saved}
          onToggleSave={onToggleSave}   // pass the function through
        />
      ))}

      {listings.length === 0 && (
        <div className="col-span-full text-center text-gray-500 p-10 border rounded-2xl">
          No matches. Try widening your filters.
        </div>
      )}
    </div>
  );
}
