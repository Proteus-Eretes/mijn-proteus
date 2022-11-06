import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insert many seeders to be made here...
  await console.log("Seeding...");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
