import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import nodemailer from "nodemailer";
import { env } from "@/env.mjs";

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
    .mutation(async ({ input, ctx }) => {
      const response = ctx.prisma.contact.create({
        data: {
          name: input.name,
          email: input.email,
          subject: input.subject,
          description: input.description,
        },
      });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: env.GMAIL_USER,
          pass: env.GMAIL_PASSWORD,
        },
      });

      const emailStatus = await transporter
        .sendMail({
          from: env.GMAIL_USER,
          to: env.GMAIL_USER,
          subject: `Contact Me: ${input.name}`,
          html: `
          <h3>Name:</h3>
          <p>${input.name}</p>
          <h3>Email:</h3>
          <p>${input.email}</p>
          <h3>Subject:</h3>
          <p>${input.subject}</p>
          <h3>Description:</h3>
          <p>${input.description}</p>
        `,
        })
        .finally(() => true)
        .catch(() => false);

      return { contactSaved: response, emailSent: emailStatus };
    }),
});
