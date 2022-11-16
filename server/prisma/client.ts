// Copied from: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
