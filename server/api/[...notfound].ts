import { makeError } from "~~/server/logic";

export default defineEventHandler(() => {
  throw makeError(404, "Not Found");
});
