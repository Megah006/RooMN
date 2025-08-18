import type { Listing } from "../types/Listing";

export const DEMO_LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Sublease: Private Room near East Bank (Sep–Dec)",
    campus: "UMN",
    rent: 695,
    startDate: "2025-09-01",
    endDate: "2025-12-20",
    roomType: "Private Room",
    utilitiesIncluded: true,
    furnished: true,
    description:
      "5 min walk to bus stop. Quiet house with 3 CompE majors. In-unit laundry. Looking for clean, chill roommate.",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"],
    postedBy: "demo@umn.edu",
    postedAt: new Date().toISOString(),
    contact: "demo@umn.edu",
  },
  {
    id: "l2",
    title: "Studio sublease in Dinkytown (Oct–May)",
    campus: "UMN",
    rent: 1025,
    startDate: "2025-10-01",
    endDate: "2026-05-31",
    roomType: "Studio",
    utilitiesIncluded: false,
    furnished: false,
    description:
      "Modern studio, gym, study rooms, free coffee. Perfect for someone who values quiet & proximity.",
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511"],
    postedBy: "studio@umn.edu",
    postedAt: new Date().toISOString(),
    contact: "555-123-4567",
  },
  {
    id: "l3",
    title: "Shared room – super cheap, walk to campus",
    campus: "UMN",
    rent: 450,
    startDate: "2025-08-20",
    roomType: "Shared Room",
    utilitiesIncluded: true,
    furnished: true,
    description:
      "Shared double in a 3BR. Looking for someone tidy. Utilities & Wi-Fi included.",
    images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb"],
    postedBy: "budget@umn.edu",
    postedAt: new Date().toISOString(),
    contact: "@budget-roommate",
  },
];

export const EMPTY_FORM: Omit<Listing, "id" | "postedAt" | "postedBy"> = {
  title: "",
  campus: "UMN",
  rent: 700,
  startDate: "",
  endDate: "",
  roomType: "Private Room",
  utilitiesIncluded: true,
  furnished: true,
  pets: false,
  description: "",
  images: [],
  contact: "",
};
// Note: In a real app, postedBy would be set server-side based on the authenticated user.
