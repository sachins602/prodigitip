import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  postComment: publicProcedure
    .input(z.object({ 
      blogId: z.string(),
      name: z.string(),
      email: z.string().email(),
      comment: z.string(),
     }))
    .mutation(async ({ input, ctx }) => {
      const blog = await ctx.prisma.blog.findUnique({
        where: {
          id: input.blogId,
        },
        include: {
          comments: true,
        },
      });
      if (!blog) {
        throw new Error("Blog not found");
      }
      return ctx.prisma.blogComment.create({
        data: {
          name: input.name,
          email: input.email,
          comment: input.comment,
          blog: {
            connect: {
            id: input.blogId,
            },
          }
        },
      });
    }),

  getAll: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({input, ctx }) => {
    return ctx.prisma.blogComment.findMany(
      {
        where: {
         blog: input,
        },
      }
    );
  }),

});
