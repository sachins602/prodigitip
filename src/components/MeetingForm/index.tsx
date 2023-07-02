import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/utils/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { api } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  date: z.date().min(new Date(), {
    message: "Date must be in the future.",
  }),
  email: z.string().email({
    message: "Must be a vaild email",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  message: z.string().min(3, {
    message: "Description must be at least 10 characters.",
  }),
});

function wrapAsyncFunction<ARGS extends unknown[]>(
  fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
  return (...args) => {
    void fn(...args);
  };
}

export function ProfileForm({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const meeting = api.meeting.meeting.useMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      email: "",
      phone: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    meeting.mutate(
      { ...values },
      {
        onSuccess: (res) => {
          onSuccess();
          toast({
            title: "Meeting set Sucessfully",
            description: "We will get back with confirmation soon!",
          });
        },
        onError: (err) =>
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Please try again later",
          }),
      }
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={wrapAsyncFunction(form.handleSubmit(onSubmit))}
        className="space-y-4 p-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon Doe" {...field} />
              </FormControl>

              <FormDescription>Please enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Meeting Date</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={() => setOpen(false)}
                    onDayClick={field.onChange}
                    disabled={(date) =>
                      date <
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Choose a date you want to meet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>

              <FormDescription>Please enter your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+01 9876543210" {...field} />
              </FormControl>

              <FormDescription>Please enter your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="hello!" {...field} />
              </FormControl>

              <FormDescription>Please enter your message.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
