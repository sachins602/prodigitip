import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileForm } from "../MeetingForm";

export function MeetingWindow() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Setup a meeting!</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <ProfileForm />
      </PopoverContent>
    </Popover>
  );
}
