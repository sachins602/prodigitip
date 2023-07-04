import { z } from "zod";
import nodemailer from "nodemailer";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { env } from "@/env.mjs";

export const meetingRouter = createTRPCRouter({
  meeting: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        email: z.string().email(),
        phone: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const response = ctx.prisma.meeting.create({
        data: {
          name: input.name,
          date: input.date,
          email: input.email,
          phone: input.phone,
          message: input.message,
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
          subject: `Meeting With: ${input.name}`,
          html: `
          <h3>Name:</h3>
          <p>${input.name}</p>
          <h3>Email:</h3>
          <p>${input.email}</p>
          <h3>Phone Number:</h3>
          <p>${input.phone}</p>
          <h3>Message:</h3>
          <p>${input.message}</p>
        `,
        })
        .finally(() => true)
        .catch(() => false);

      return { contactSaved: response, emailSent: emailStatus };
    }),
});
