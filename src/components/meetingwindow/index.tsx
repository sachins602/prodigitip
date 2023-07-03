import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileForm } from "../MeetingForm";
import { useState } from "react";

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
