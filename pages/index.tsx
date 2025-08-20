
import React, { useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Search, PlusCircle, Heart, Users } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";
import type { Listing } from "../types/Listing";
import { DEMO_LISTINGS, EMPTY_FORM } from "../data/demo";


import ListingFilters from "../components/listings/ListingFilters"; 
import ListingsGrid from "../components/listings/ListingsGrid";    
import PostListingForm from "../components/PostForm";
import SavedListings from "../components/SavedListings";    
import ProfileForm from "../components/ProfileForm";
import ShieldIcon from "../components/common/ShieldIcon";    

console.log({
  ListingFilters,
  ListingsGrid,
  PostListingForm,
  SavedListings,
  ProfileForm,
  ShieldIcon,
});
export default function IndexPage() {
  const [tab, setTab] = useState<"listings" | "post" | "saved" | "profile">("listings");
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("UMN");
  const [maxRent, setMaxRent] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");
  const [saved, setSaved] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [listings, setListings] = useState<Listing[]>(DEMO_LISTINGS);
  const [successMsg, setSuccessMsg] = useState<string>("");


  function toggleSave(id: string) {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }


const filtered = useMemo(() => {
  const src = listings ?? [];
  const rentCap = maxRent ? Number(maxRent) : Number.POSITIVE_INFINITY;
  return src.filter((l) => {
    const matchesCampus = campus ? l.campus === campus : true;
    const matchesQuery = query
      ? (l.title + " " + l.description).toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesRent = l.rent <= rentCap;
    const matchesType = roomType ? l.roomType === roomType : true;
    return matchesCampus && matchesQuery && matchesRent && matchesType;
  });
}, [listings, campus, query, maxRent, roomType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    await new Promise((r) => setTimeout(r, 900));
    const newListing: Listing = {
      ...form,
      id: crypto.randomUUID(),
      postedAt: new Date().toISOString(),
      postedBy: "you@umn.edu",
    } as Listing;
    setListings((prev) => [newListing, ...prev]);
    setSubmitting(false);
    setSuccessMsg("Listing posted! (Payment & moderation coming soon.)");
    setForm(EMPTY_FORM);
  }

return (
  <div className="min-h-screen bg-background p-4 md:p-8">
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab("listings")}
          aria-label="RooMN home"
          className="group inline-flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src="/logo.svg"
            alt="RooMN"
            width={400}
            height={200}
            priority
            className="h-12 w-auto md:h-14 transition-transform duration-200 ease-out
                       group-hover:scale-105 group-active:scale-95"
          />
          <span className="sr-only">Home</span>
        </button>

        <span className="hidden md:inline text-base md:text-lg font-medium text-muted-foreground relative top-1.5">
          Roommates &amp; Subleases for your campus
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={tab === "listings" ? "default" : "secondary"} onClick={() => setTab("listings")}>
          <Search className="w-4 h-4 mr-2" /> Browse
        </Button>
        <Button variant={tab === "post" ? "default" : "secondary"} onClick={() => setTab("post")}>
          <PlusCircle className="w-4 h-4 mr-2" /> Post a listing
        </Button>
        <Button variant={tab === "saved" ? "default" : "secondary"} onClick={() => setTab("saved")}>
          <Heart className="w-4 h-4 mr-2" /> Saved
        </Button>
        <Button variant={tab === "profile" ? "default" : "secondary"} onClick={() => setTab("profile")}>
          <Users className="w-4 h-4 mr-2" /> Profile
        </Button>
      </div>
    </motion.header>

      {/* Content */}
      <main className="max-w-6xl mx-auto mt-6">
        {tab === "listings" && (
          <section>
            <ListingFilters
              query={query}
              setQuery={setQuery}
              campus={campus}
              setCampus={setCampus}
              maxRent={maxRent}
              setMaxRent={setMaxRent}
              roomType={roomType}
              setRoomType={setRoomType}
            />

            <ListingsGrid listings={filtered} saved={saved} onToggleSave={toggleSave} />
          </section>
        )}

        {tab === "post" && (
          <section className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PostListingForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                submitting={submitting}
                successMsg={successMsg}
                onDismissSuccess={() => setSuccessMsg("")}
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border p-5 text-sm text-gray-700 space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldIcon /> Moderation & Safety
                </div>
                <p>RooMN is campus-scoped. We’ll require a .edu email to post or contact. One-click reporting feeds a moderation queue.</p>
              </div>

              <div className="rounded-2xl border p-5 text-sm text-gray-700 space-y-3">
                <div className="font-semibold">Coming Next</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Auth: Email + .edu domain verification</li>
                  <li>Stripe Checkout for $5 listing fee</li>
                  <li>Backend (Supabase) + DB schema</li>
                  <li>Image uploads & moderation queue</li>
                  <li>Search ranking tuned to quality & recency</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {tab === "saved" && (
          <section>
            <SavedListings listings={listings} saved={saved} onToggleSave={toggleSave} />
          </section>
        )}

        {tab === "profile" && (
          <section className="max-w-xl">
            <ProfileForm />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RooMN — campus-first roommates & subleases
      </footer>
    </div>
  );
}
