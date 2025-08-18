import { useId } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DollarSign, PlusCircle, Loader2, X, CheckCircle2, UploadCloud } from "lucide-react";
import type { Listing } from "../types/Listing";

type Props = {
  form: Omit<Listing, "id" | "postedAt" | "postedBy">;
  setForm: (next: Omit<Listing, "id" | "postedAt" | "postedBy">) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  successMsg: string;
  onDismissSuccess: () => void;
};

export default function PostListingForm({
  form, setForm, onSubmit, submitting, successMsg, onDismissSuccess,
}: Props) {
  const utilId = useId();
  const furnId = useId();
  const petsId = useId();

  return (
    <div className="rounded-2xl border">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Post a listing</h2>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
            <button onClick={onDismissSuccess} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input className="mt-1"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Private room near East Bank"
                required />
            </div>
            <div>
              <label className="text-sm font-medium">Campus</label>
              <Select value={form.campus} onValueChange={(v) => setForm({ ...form, campus: v })}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select campus" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="UMN">UMN</SelectItem>
                  <SelectItem value="UMich">UMich</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Monthly Rent (USD)</label>
              <div className="relative mt-1">
                <Input type="number" value={form.rent}
                  onChange={(e) => setForm({ ...form, rent: Number(e.target.value) })}
                  min={0} required />
                <DollarSign className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Room type</label>
              <Select value={form.roomType}
                onValueChange={(v) => setForm({ ...form, roomType: v as Listing["roomType"] })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Private Room","Shared Room","Studio","1BR Sublease","Other"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start date</label>
              <Input className="mt-1" type="date" value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium">End date (optional)</label>
              <Input className="mt-1" type="date" value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input id={utilId} type="checkbox"
                checked={form.utilitiesIncluded}
                onChange={(e) => setForm({ ...form, utilitiesIncluded: e.target.checked })} />
              Utilities included
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input id={furnId} type="checkbox"
                checked={form.furnished}
                onChange={(e) => setForm({ ...form, furnished: e.target.checked })} />
              Furnished
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input id={petsId} type="checkbox"
                checked={!!form.pets}
                onChange={(e) => setForm({ ...form, pets: e.target.checked })} />
              Pets OK
            </label>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea className="mt-1" rows={5} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Tell people what makes this place a good fit…" />
          </div>

          <div>
            <label className="text-sm font-medium">Contact (email or phone)</label>
            <Input className="mt-1" value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder="you@umn.edu or 555-555-5555" required />
          </div>

          <div>
            <label className="text-sm font-medium">Photos (URLs for now)</label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="https://…"
                value={form.images?.[0] || ""}
                onChange={(e) => setForm({ ...form, images: [e.target.value] })}
              />
              <Button type="button" variant="secondary">
                <UploadCloud className="w-4 h-4 mr-2" />Upload soon
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> $5 posting fee (placeholder)
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting…</>) : (<>Pay & Post</>)}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
