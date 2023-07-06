import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkeletonVariants } from "@/components/skeleton";
import RelatedArticles from "@/components/relatedArticles";
import { wrapAsyncFunction } from "@/utils/promise-helper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const newsLetterFormSchema = z.object({
  email: z.string().email({
    message: "Must be a vaild email",
  }),
});

const commentFormSchema = z.object({
  name: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Must be a vaild email",
  }),
  comment: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
});

const replyFormSchema = z.object({
  commentId: z.string(),
  name: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Must be a vaild email",
  }),
  comment: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
});

function Blog() {
  const { toast } = useToast();
  const id = useRouter().query.id;
  const blog = api.blogs.id.useQuery({
    id: id as string,
  });

  const comments = api.comments.getAll.useQuery({
    id: id as string,
  });

  const subscribeNewsLetter = api.newsletter.save.useMutation()

  const postComment = api.comments.postComment.useMutation()

  const postCommentReply = api.comments.postCommentReply.useMutation()

  const newsLetterForm = useForm<z.infer<typeof newsLetterFormSchema>>({
    resolver: zodResolver(newsLetterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const replyForm = useForm<z.infer<typeof replyFormSchema>>({
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });


  function onNewsLetterSubmit(values: z.infer<typeof newsLetterFormSchema>): void {
    subscribeNewsLetter.mutate(values, {
      onSuccess: () => {
        newsLetterForm.reset();
        toast({
          title: "Your have subscribed to our newsletter",
          description: "Look forward to our emails",
        });
      },
      onError: () =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again later",
        }),
    });
  }

  function onCommentSubmit(values: z.infer<typeof commentFormSchema>): void {
    if (!blog.data) return;
    postComment.mutate({
      ...values,
      blogId: blog.data.id,
    }, {
      onSuccess: () => {
        commentForm.reset();
        void comments.refetch();
        toast({
          title: "Your comment has been posted",
          description: "Thank you for your feedback",
        });
      },
      onError: () =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again later",
        }),
    });
  }

  function onReplySubmit(values: z.infer<typeof replyFormSchema>): void {
    postCommentReply.mutate(values, {
      onSuccess: () => {
        replyForm.reset();
        void comments.refetch();
        toast({
          title: "Your comment has been posted",
          description: "Thank you for your feedback",
        });
      },
      onError: () =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again later",
        }),
    });
  }

  return (
    <>
      <main className="bg-white pb-16 pt-8 text-black dark:bg-gray-900 dark:text-white lg:pb-24 lg:pt-16">
        {blog.data ? <div className="mx-auto flex max-w-screen-xl justify-between px-4 ">
          <article className="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl space-y-4">
            <header className="not-format mb-4 lg:mb-6">
              <address className="mb-6 flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm">
                  <img
                    className="mr-4 h-16 w-16 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a href="#" rel="author" className="text-xl font-bold">
                      {blog.data?.author}
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      {blog.data?.authorTitle}
                    </p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        dateTime={blog.data?.publishedOn}
                        title={blog.data?.publishedOn}
                      >
                        {blog.data?.publishedOn}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
                {blog.data?.authorTitle}
              </h1>
            </header>
            <h2>{blog.data?.paragraph1}</h2>
            <img
              src={blog.data?.image1}
              alt="Best practices for successful prototypes"
              className="mb-6 w-full rounded-lg shadow-lg"
            />
            <p>{blog.data?.paragraph2}</p>
            <p>{blog.data?.paragraph3}</p>
            <p>{blog.data?.paragraph4}</p>
            <p>{blog.data?.paragraph5}</p>
            <img
              src={blog.data?.image2}
              alt="Best practices for successful prototypes"
              className="mb-6 w-full rounded-lg shadow-lg"
            />
            <p>{blog.data?.paragraph6}</p>
            <p>{blog.data?.paragraph7}</p>
            <p>{blog.data?.paragraph8}</p>
            <img
              src={blog.data?.image3}
              alt="Best practices for successful prototypes"
              className="mb-6 w-full rounded-lg shadow-lg"
            />
            <p>{blog.data?.paragraph9}</p>

            <section className="not-format">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold lg:text-2xl">
                  Discussion ({comments.data?.length || 0})
                </h2>
              </div>
              <Form {...commentForm}>
                <form onSubmit={wrapAsyncFunction(commentForm.handleSubmit(onCommentSubmit))} className=" space-y-6">
                  <FormField
                    control={commentForm.control}
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
                    control={commentForm.control}
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
                    control={commentForm.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="comment"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave your thoughts about this article!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Post Comment</Button>
                </form>
              </Form>
              {comments.data ? comments.data.map((comment, i) => (
                <>
                  <article key={comment.id} className={`my-4 ${i > 0 ? 'border-t' : ''} border-gray-200 bg-white p-6 text-base dark:border-gray-700 dark:bg-gray-900`}>
                    <footer className="mb-2 flex items-center justify-between">
                      <p className="mr-3 inline-flex items-center text-sm">
                        <img
                          className="mr-2 h-6 w-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                          alt={comment.name}
                        />
                        {comment.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime="2022-03-12" title="March 12th, 2022">
                          {comment.updatedAt.toLocaleString()}
                        </time>
                      </p>

                    </footer>
                    <p>
                      {comment.comment}
                    </p>
                    <div className="mt-4 flex flex-col space-x-4">

                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                              <svg
                                aria-hidden="true"
                                className="mr-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              Reply
                            </div></AccordionTrigger>
                          <AccordionContent>
                            <Form {...replyForm}>
                              <form onSubmit={wrapAsyncFunction(replyForm.handleSubmit(onReplySubmit))} className="space-y-3">
                                <FormField
                                  control={replyForm.control}
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
                                  control={replyForm.control}
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
                                  control={replyForm.control}
                                  name="comment"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Comment</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="comment"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Leave your thoughts about this article!
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button onClick={() => replyForm.setValue("commentId", comment.id)} type="submit">Post Reply</Button>
                              </form>
                            </Form>
                          </AccordionContent>
                        </AccordionItem>

                      </Accordion>
                    </div>
                  </article>
                  {comment.replies && comment.replies.map((reply) => (<article key={reply.id} className="mb-6 ml-6 rounded-lg bg-white p-6 text-base dark:bg-gray-900 lg:ml-12">
                    <footer className="mb-2 flex items-center justify-between">
                      <p className="mr-3 inline-flex items-center text-sm">
                        <img
                          className="mr-2 h-6 w-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="Jese Leos"
                        />
                        {reply.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime="2022-02-12" title="February 12th, 2022">
                          {reply.updatedAt.toLocaleString()}
                        </time>
                      </p>

                    </footer>
                    <p>{reply.comment}</p>
                  </article>))}
                </>)) :
                <SkeletonVariants />}
            </section>
          </article>
        </div> :
          <SkeletonVariants />}
      </main>
      <RelatedArticles />
      <section className="w-full bg-white px-4 py-8 text-black dark:bg-gray-900 dark:text-white sm:text-center lg:px-6 lg:py-16">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Sign up for our newsletter
        </h2>
        <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 dark:text-gray-400 sm:text-xl md:mb-12">
          Stay up to date with the roadmap progress, announcements and exclusive
          discounts feel free to sign up with your email.
        </p>
        <Form {...newsLetterForm}>
          <form
            onSubmit={wrapAsyncFunction(newsLetterForm.handleSubmit(onNewsLetterSubmit))}
            className="flex w-full flex-row justify-center gap-4"
          >
            <FormField
              control={newsLetterForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="self-center" type="submit">
              Subscribe
            </Button>
          </form>
        </Form>
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-300">
          We care about the protection of your data.{" "}
          <Link
            href="/privacy"
            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          >
            Read our Privacy Policy
          </Link>
          .
        </div>
      </section>
    </>
  );
}

export default Blog;
