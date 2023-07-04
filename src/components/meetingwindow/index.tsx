import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ProfileForm } from "../MeetingForm";
import { Button } from "@/components/ui/button";

export function MeetingWindow() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Setup a meeting!</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <ProfileForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
