import { ErrorCode, apiError } from "~~/utils/error";

export default defineEventHandler(() => {
  throw apiError(ErrorCode.NotFound, "Route not found.");
});
