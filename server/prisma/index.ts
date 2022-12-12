import { PrismaClient } from "@prisma/client";

export { addConstraints } from "./constraints";
export { seed } from "./seed";

export const prisma = new PrismaClient();
