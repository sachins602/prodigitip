import { PrismaClient } from "@prisma/client";
import { BlogDetails } from "./data";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding");
  await prisma.blog.createMany({
    data: BlogDetails,
  });
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
