export interface Listing {
  id: string;
  title: string;
  campus: string;
  rent: number;
  startDate: string;
  endDate?: string;
  roomType: "Private Room" | "Shared Room" | "Studio" | "1BR Sublease" | "Other";
  utilitiesIncluded: boolean;
  furnished: boolean;
  pets?: boolean;
  description: string;
  images?: string[];
  postedBy: string;
  postedAt: string;
  contact: string;
}
