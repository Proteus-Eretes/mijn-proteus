import validator from "validator";

export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id && !validator.isUUID(to.params.id as string)) {
    return false;
  }
});
