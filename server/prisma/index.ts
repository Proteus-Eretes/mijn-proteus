import { PrismaClient } from "@prisma/client";

export { addTriggers } from "./triggers";
export { seed } from "./seed";

export const prisma = new PrismaClient();
