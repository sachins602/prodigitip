import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const newsletterRouter = createTRPCRouter({
  save: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ input, ctx }) => {
      return  ctx.prisma.newsLetterSubscriber.create({
        data: {
          email: input.email,
        }
      });
    }),

});
