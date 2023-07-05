import { blogRouter } from "./routers/blogs";
import { contactRouter } from "./routers/contact";
import { meetingRouter } from "./routers/meeting";
import { createTRPCRouter } from "@/server/api/trpc";
import { newsletterRouter } from "./routers/newsletter";
import { commentRouter } from "./routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  meeting: meetingRouter,
  blogs: blogRouter,
  newsletter: newsletterRouter,
  comments: commentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
