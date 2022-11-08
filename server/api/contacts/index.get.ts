import { defineEventHandler } from "h3";
import { contact } from "~/server/logic";

export default defineEventHandler(async () => {
  return await contact.getAll();
});
