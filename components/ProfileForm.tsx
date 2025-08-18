import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Users } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="rounded-2xl border">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Profile</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input className="mt-1" placeholder="Omar Megahed" />
          </div>
          <div>
            <label className="text-sm font-medium">Email (.edu)</label>
            <Input className="mt-1" placeholder="you@umn.edu" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Bio</label>
          <Textarea className="mt-1" rows={3} placeholder="CompE student. Clean, quiet, gym enjoyer." />
        </div>
        <Button>Save</Button>
      </div>
    </div>
  );
}
