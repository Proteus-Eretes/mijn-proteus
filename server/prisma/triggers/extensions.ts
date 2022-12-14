import { prisma } from "..";

export const extensions = [
  prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS btree_gist`),
];
