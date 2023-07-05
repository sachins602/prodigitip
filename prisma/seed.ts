import { PrismaClient } from "@prisma/client";
import { BlogDetails } from "./data";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding");
  await prisma.$transaction(
    BlogDetails.map((blog) =>
     prisma.blog.upsert({
        where: { blogIdentifier: blog.blogIdentifier },
        update: blog,
        create: blog,
     })
    )
  )
  console.log("Seeded");
}
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
