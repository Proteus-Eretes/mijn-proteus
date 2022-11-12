import { ErrorCode } from "../error";
import { apiError } from "../utils";

export default defineEventHandler(() => {
  throw apiError(ErrorCode.NotFound, "Route not found.");
});
