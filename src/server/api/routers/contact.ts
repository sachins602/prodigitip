import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const contactRouter = createTRPCRouter({
  contact: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log(input);
      return {
        message: `Hello ${input.name}, your message has been sent!`,
      };
    }),
});
