import { Prisma, Quote } from "@prisma/client";

import { Database } from "./database";

/**
 * Create a new quote.
 * @param quote The quote to create.
 * @returns The created quote.
 */
export const create = async (
  quote: Prisma.QuoteCreateInput,
): Promise<Quote> => {
  const db = Database.get();

  return await db.quote.create({
    data: quote,
  });
};

/**
 * Get all saved quotes.
 * @returns A list of all quotes.
 */
export const getAll = async (): Promise<Quote[]> => {
  const db = Database.get();

  return await db.quote.findMany();
};
