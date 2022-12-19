import validator from "validator";

export default defineNuxtRouteMiddleware((to) => {
  if (!to.params.id) {
    return true;
  }

  if (typeof to.params.id !== "string") {
    return false;
  }

  return validator.isUUID(to.params.id);
});
