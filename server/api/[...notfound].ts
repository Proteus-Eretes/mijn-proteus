import { makeError } from "~/server/helpers/error";

export default defineEventHandler(() => {
  throw makeError(404, "Not Found");
});
