import { Quote } from "@prisma/client";

import { quote } from "~~/logic";

export default defineEventHandler<Quote[]>(async () => {
  return await quote.getAll();
});
