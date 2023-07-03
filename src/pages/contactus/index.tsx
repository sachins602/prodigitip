import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { wrapAsyncFunction } from "@/utils/promise-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactDetails } from "prisma/data";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Must be a vaild email",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 10 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 10 characters.",
  }),
});

function Contactus() {
  const { toast } = useToast();
  const contact = api.contact.contact.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    contact.mutate(
      { ...values },
      {
        onSuccess: (res) => {
          form.reset();
          toast({
            title: "Your query has been submitted successfully",
            description: "We will get back to you soon",
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
    <div className="flex justify-center bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className="mx-auto my-14 max-w-6xl sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mx-5 rounded-3xl bg-gray-100 p-6 dark:bg-gray-800">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-5xl">
                Get in touch
              </h1>
              <p className="text-normal mt-2 text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-2xl">
                Fill in the form to start a conversation
              </p>
              <div className="mt-8 flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                  {ContactDetails.address}
                </div>
              </div>
              <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                  {ContactDetails.phone}
                </div>
              </div>
              <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                  {ContactDetails.email}
                </div>
              </div>
            </div>
            <Form {...form}>
              <form
                className="flex flex-col justify-center p-6"
                onSubmit={wrapAsyncFunction(form.handleSubmit(onSubmit))}
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

                      <FormDescription>
                        Please enter your full name.
                      </FormDescription>
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

                      <FormDescription>
                        Please enter your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="hello!" {...field} />
                      </FormControl>

                      <FormDescription>
                        Please enter your subject.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="hello!" {...field} />
                      </FormControl>

                      <FormDescription>
                        Please enter your Description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
