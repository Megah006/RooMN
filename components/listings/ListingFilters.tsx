import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";

type Props = {
  query: string; setQuery: (v: string) => void;
  campus: string; setCampus: (v: string) => void;
  maxRent: string; setMaxRent: (v: string) => void;
  roomType: string; setRoomType: (v: string) => void;
};

export default function ListingFilters({
  query, setQuery, campus, setCampus, maxRent, setMaxRent, roomType, setRoomType,
}: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-3 items-end">
      <div className="md:col-span-2">
        <label className="text-sm font-medium">Search</label>
        <div className="flex gap-2 mt-1">
          <Input
            placeholder="Search by keywords (e.g., furnished, quiet, pets)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="secondary"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Campus</label>
        <Select value={campus} onValueChange={setCampus}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select campus" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="UMN">UMN</SelectItem>
            <SelectItem value="UMich">UMich</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Max rent ($/mo)</label>
        <Input className="mt-1" placeholder="e.g., 900" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium">Room type</label>
        <Select value={roomType} onValueChange={setRoomType}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Any" /></SelectTrigger>
          <SelectContent>
            {["Private Room","Shared Room","Studio","1BR Sublease","Other"].map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
