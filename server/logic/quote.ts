import { Prisma, Quote } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Create a new quote.
 * @param quote The quote to create.
 * @returns The created quote.
 */
export const create = async (
  quote: Prisma.QuoteCreateInput,
): Promise<Quote> => {
  return await prisma.quote.create({
    data: quote,
  });
};

/**
 * Get all saved quotes.
 * @returns A list of all quotes.
 */
export const getAll = async (): Promise<Quote[]> => {
  return await prisma.quote.findMany();
};
