import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const blogRouter = createTRPCRouter({
  id: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.blog.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany();
  }),

  getRelatedBlogs: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      take: 4,
    });
  }),
});
