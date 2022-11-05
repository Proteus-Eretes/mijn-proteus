import { makeError } from "~~/logic";

export default defineEventHandler(() => {
  throw makeError(404, "Not Found");
});
